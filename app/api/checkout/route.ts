import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, customerEmail, customerName } = body;

    if (!productId || !customerEmail) {
      return NextResponse.json(
        { error: 'Product ID and customer email are required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Fetch product details
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('is_active', true)
      .single();

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    if (product.price === 0) {
      return NextResponse.json({ error: 'This product is free' }, { status: 400 });
    }

    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: product.currency.toLowerCase(),
            product_data: {
              name: product.name,
              description: product.short_description,
              images: product.image_path ? [`${origin}${product.image_path}`] : [],
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/products/${product.slug}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products/${product.slug}?canceled=true`,
      customer_email: customerEmail,
      metadata: {
        productId: product.id,
        customerName: customerName || '',
      },
      payment_intent_data: {
        metadata: {
          productId: product.id,
          customerName: customerName || '',
        },
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout session error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}