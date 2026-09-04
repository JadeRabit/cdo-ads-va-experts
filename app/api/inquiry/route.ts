import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { Resend } from 'resend';

const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  businessName: z.string().min(2, 'Business name is required'),
  monthlyAdBudget: z.string().min(1, 'Please select a budget range'),
  serviceNeeded: z.string().min(1, 'Please select a service'),
  message: z.string().optional(),
  honeypot: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = inquirySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { honeypot, ...data } = result.data;

    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    const supabase = createClient();

    const { data: inquiry, error } = await supabase
      .from('inquiries')
      .insert({
        ...data,
        status: 'new',
        ip_address: request.headers.get('x-forwarded-for') || 'unknown',
        user_agent: request.headers.get('user-agent') || 'unknown',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
    }

    // Initialize Resend lazily to avoid build-time errors
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      try {
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
          to: data.email,
          subject: 'Thanks for reaching out to CDO Ads & VA Experts!',
          html: `
            <div style="font-family: Inter, system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: #0A0F1D; color: #FFFFFF; padding: 30px; border-radius: 12px 12px 0 0;">
                <h1 style="margin: 0; font-size: 24px;">Thanks for reaching out, ${data.name}!</h1>
              </div>
              <div style="background: #111827; color: #FFFFFF; padding: 30px; border-radius: 0 0 12px 12px;">
                <p style="font-size: 16px; line-height: 1.6;">We've received your inquiry about <strong>${data.serviceNeeded}</strong> for <strong>${data.businessName}</strong>.</p>
                <p style="font-size: 16px; line-height: 1.6;">Our team will review your details and get back to you within 24 hours with a personalized recommendation.</p>
                <div style="background: #0A0F1D; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0; font-size: 14px; color: #9CA3AF;">Your inquiry reference: <strong style="color: #EAB308;">#${inquiry.id.slice(0, 8).toUpperCase()}</strong></p>
                </div>
                <p style="font-size: 14px; color: #9CA3AF;">In the meantime, check out our <a href="https://cdoadsvaexperts.com/products" style="color: #EAB308;">digital products</a> for immediate resources.</p>
              </div>
            </div>
          `,
        });

        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
          to: 'hello@cdoadsvaexperts.com',
          subject: `New Inquiry: ${data.serviceNeeded} - ${data.businessName}`,
          html: `
            <div style="font-family: Inter, system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #EAB308;">New Inquiry Received</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px; border-bottom: 1px solid #1F2937;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #1F2937;">${data.name}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #1F2937;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #1F2937;">${data.email}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #1F2937;"><strong>Business:</strong></td><td style="padding: 8px; border-bottom: 1px solid #1F2937;">${data.businessName}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #1F2937;"><strong>Monthly Ad Budget:</strong></td><td style="padding: 8px; border-bottom: 1px solid #1F2937;">${data.monthlyAdBudget}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #1F2937;"><strong>Service Needed:</strong></td><td style="padding: 8px; border-bottom: 1px solid #1F2937;">${data.serviceNeeded}</td></tr>
                ${data.message ? `<tr><td style="padding: 8px; border-bottom: 1px solid #1F2937;"><strong>Message:</strong></td><td style="padding: 8px; border-bottom: 1px solid #1F2937;">${data.message}</td></tr>` : ''}
              </table>
              <p style="margin-top: 20px; color: #9CA3AF; font-size: 14px;">Reference: #${inquiry.id.slice(0, 8).toUpperCase()}</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Email send error:', emailError);
      }
    }

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch (error) {
    console.error('Inquiry API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}