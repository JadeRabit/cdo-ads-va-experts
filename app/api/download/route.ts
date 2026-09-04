import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const mockProducts: Record<string, any> = {
  'facebook-ads-campaign-template-kit': {
    id: '1',
    slug: 'facebook-ads-campaign-template-kit',
    name: 'Facebook Ads Campaign Template Kit',
    price: 149900,
    currency: 'PHP',
    isFree: false,
    filePath: 'products/facebook-ads-campaign-template-kit.zip',
  },
  'client-onboarding-sop-bundle': {
    id: '2',
    slug: 'client-onboarding-sop-bundle',
    name: 'Client Onboarding & SOP Bundle',
    price: 99900,
    currency: 'PHP',
    isFree: false,
    filePath: 'products/client-onboarding-sop-bundle.zip',
  },
  'ad-creative-brief-report-templates': {
    id: '3',
    slug: 'ad-creative-brief-report-templates',
    name: 'Ad Creative Brief & Report Templates',
    price: 79900,
    currency: 'PHP',
    isFree: false,
    filePath: 'products/ad-creative-brief-report-templates.zip',
  },
  'va-hiring-training-checklist': {
    id: '4',
    slug: 'va-hiring-training-checklist',
    name: 'VA Hiring & Training Checklist',
    price: 0,
    currency: 'PHP',
    isFree: true,
    filePath: 'products/va-hiring-training-checklist.zip',
  },
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Product slug is required' }, { status: 400 });
  }

  const product = mockProducts[slug];

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const supabase = createClient();

  try {
    const expiryHours = product.isFree ? 1 : 24;
    const { data, error } = await supabase.storage
      .from('digital-products')
      .createSignedUrl(product.filePath, 60 * 60 * expiryHours);

    if (error || !data?.signedUrl) {
      console.error('Signed URL error:', error);
      return NextResponse.json({ error: 'Failed to generate download link' }, { status: 500 });
    }

    await supabase.from('downloads').insert({
      product_id: product.id,
      ip_address: request.headers.get('x-forwarded-for') || 'unknown',
      user_agent: request.headers.get('user-agent') || 'unknown',
    });

    return NextResponse.redirect(data.signedUrl);
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}