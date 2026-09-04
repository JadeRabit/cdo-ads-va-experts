import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { Resend } from 'resend';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  serviceType: z.enum(['ad-audit', 'discovery-call', 'strategy-session']),
  preferredDate: z.string().min(1, 'Please select a date'),
  preferredTime: z.string().min(1, 'Please select a time'),
  timezone: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = bookingSchema.safeParse(body);
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

    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        ...data,
        status: 'confirmed',
        ip_address: request.headers.get('x-forwarded-for') || 'unknown',
        user_agent: request.headers.get('user-agent') || 'unknown',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }

    // Initialize Resend lazily to avoid build-time errors
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      try {
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
          to: data.email,
          subject: 'Booking Confirmed - CDO Ads & VA Experts',
          html: `
            <div style="font-family: Inter, system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: #0A0F1D; color: #FFFFFF; padding: 30px; border-radius: 12px 12px 0 0;">
                <h1 style="margin: 0; font-size: 24px;">Booking Confirmed!</h1>
              </div>
              <div style="background: #111827; color: #FFFFFF; padding: 30px; border-radius: 0 0 12px 12px;">
                <p style="font-size: 16px; line-height: 1.6;">Hi ${data.name},</p>
                <p style="font-size: 16px; line-height: 1.6;">Your <strong>${data.serviceType.replace('-', ' ')}</strong> has been scheduled.</p>
                <div style="background: #0A0F1D; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0 0 8px; font-size: 14px; color: #9CA3AF;">Date & Time</p>
                  <p style="margin: 0; font-size: 18px; font-weight: bold; color: #EAB308;">${new Date(data.preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${data.preferredTime} ${data.timezone || '(PHT)'}</p>
                </div>
                <p style="font-size: 14px; color: #9CA3AF;">We'll send a calendar invite with meeting details shortly. If you need to reschedule, please reply to this email.</p>
              </div>
            </div>
          `,
        });

        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
          to: 'hello@cdoadsvaexperts.com',
          subject: `New Booking: ${data.serviceType} - ${data.name}`,
          html: `
            <div style="font-family: Inter, system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #EAB308;">New Booking</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px; border-bottom: 1px solid #1F2937;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #1F2937;">${data.name}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #1F2937;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #1F2937;">${data.email}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #1F2937;"><strong>Service:</strong></td><td style="padding: 8px; border-bottom: 1px solid #1F2937;">${data.serviceType}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #1F2937;"><strong>Date:</strong></td><td style="padding: 8px; border-bottom: 1px solid #1F2937;">${data.preferredDate}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #1F2937;"><strong>Time:</strong></td><td style="padding: 8px; border-bottom: 1px solid #1F2937;">${data.preferredTime} ${data.timezone || '(PHT)'}</td></tr>
              </table>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Email send error:', emailError);
      }
    }

    return NextResponse.json({ success: true, id: booking.id });
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}