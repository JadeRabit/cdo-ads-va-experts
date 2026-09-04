import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature || !webhookSecret) {
      console.error('Missing stripe signature or webhook secret');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const supabase = createClient();

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.payment_status === 'paid' && session.metadata?.productId) {
          const productId = session.metadata.productId;
          const customerEmail = session.customer_details?.email || session.customer_email;
          const customerName = session.customer_details?.name || session.metadata?.customerName || 'Customer';

          // Get product details
          const { data: product, error: productError } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single();

          if (productError || !product) {
            console.error('Product not found:', productError);
            break;
          }

          // Create signed URL with 24-hour expiry for paid product
          const { data: signedUrlData, error: urlError } = await supabase.storage
            .from('digital-products')
            .createSignedUrl(product.file_path, 60 * 60 * 24);

          if (urlError || !signedUrlData?.signedUrl) {
            console.error('Failed to create signed URL:', urlError);
            break;
          }

          // Create order record
          const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
              product_id: productId,
              customer_email: customerEmail,
              customer_name: customerName,
              amount: session.amount_total || product.price,
              currency: session.currency?.toUpperCase() || product.currency,
              status: 'completed',
              stripe_session_id: session.id,
              download_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            })
            .select()
            .single();

          if (orderError) {
            console.error('Failed to create order:', orderError);
            break;
          }

          // TODO: Send email with download link using Resend
          // await sendDownloadEmail(customerEmail, signedUrlData.signedUrl, product.name);

          console.log('Order created and download link generated for:', customerEmail);
        }
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Checkout session expired:', session.id);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}