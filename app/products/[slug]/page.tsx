import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/store/ProductDetail';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const mockProducts: Record<string, any> = {
  'facebook-ads-campaign-template-kit': {
    id: '1',
    slug: 'facebook-ads-campaign-template-kit',
    name: 'Facebook Ads Campaign Template Kit',
    description: 'Stop building campaigns from scratch. This comprehensive kit includes 12 proven campaign structures for e-commerce, lead generation, local businesses, and info products. Each template comes with audience targeting recommendations, budget allocation formulas, creative testing frameworks, and scaling checklists. Built from managing 100M+ in ad spend across multiple verticals.',
    shortDescription: 'Complete campaign structure templates for e-commerce, lead gen, and local businesses',
    price: 149900,
    currency: 'PHP',
    image: '/products/ads-template-kit.jpg',
    imageAlt: 'Facebook Ads Campaign Template Kit preview',
    features: [
      '12 ready-to-launch campaign structures',
      'Audience targeting cheat sheets per vertical',
      'Budget allocation formulas (daily/lifetime)',
      'Creative testing framework (3-phase)',
      'Scaling checklists (horizontal & vertical)',
      'Exclusion & negative audience lists',
      'Custom conversion setup guides',
      'Client presentation templates',
    ],
    category: 'Templates',
    isFree: false,
    fileFormat: 'PDF + Notion + Google Sheets',
    fileSize: '15 MB',
  },
  'client-onboarding-sop-bundle': {
    id: '2',
    slug: 'client-onboarding-sop-bundle',
    name: 'Client Onboarding & SOP Bundle',
    description: 'Professionalize your agency onboarding with this complete bundle. Includes service agreements, discovery questionnaires, 15+ standard operating procedures, and step-by-step checklists. Everything you need to onboard clients smoothly, set expectations, and deliver consistent results. Used by 50+ agencies.',
    shortDescription: 'Contracts, questionnaires, SOPs, and checklists for agency client onboarding',
    price: 99900,
    currency: 'PHP',
    image: '/products/onboarding-bundle.jpg',
    imageAlt: 'Client Onboarding & SOP Bundle preview',
    features: [
      'Master service agreement template',
      'Project-specific addendums (Ads, SMM, VA)',
      'Discovery questionnaire (15 sections)',
      'Kickoff meeting agenda & checklist',
      '15+ SOPs (campaign setup, reporting, comms)',
      'Client portal setup guide',
      '30/60/90 day milestone templates',
      'Offboarding & renewal templates',
    ],
    category: 'Operations',
    isFree: false,
    fileFormat: 'PDF + Google Docs + Notion',
    fileSize: '8 MB',
  },
  'ad-creative-brief-report-templates': {
    id: '3',
    slug: 'ad-creative-brief-report-templates',
    name: 'Ad Creative Brief & Report Templates',
    description: 'Never stare at a blank page again. Professional creative brief templates that get alignment fast, weekly/monthly performance report templates that clients actually understand, and presentation decks that showcase your value. Includes Figma, Canva, and Google Slides formats.',
    shortDescription: 'Professional creative briefs, performance reports, and client presentation decks',
    price: 79900,
    currency: 'PHP',
    image: '/products/creative-templates.jpg',
    imageAlt: 'Ad Creative Brief & Report Templates preview',
    features: [
      'Creative brief template (Figma/Canva/Slides)',
      'Weekly performance report (automated formulas)',
      'Monthly executive report template',
      'Quarterly business review deck',
      'Creative testing results template',
      'Client-facing dashboard (Looker Studio)',
      'Ad creative swipe file organizer',
      'Brand guidelines one-pager',
    ],
    category: 'Reporting',
    isFree: false,
    fileFormat: 'Figma + Canva + Google Slides + Sheets',
    fileSize: '25 MB',
  },
  'va-hiring-training-checklist': {
    id: '4',
    slug: 'va-hiring-training-checklist',
    name: 'VA Hiring & Training Checklist',
    description: 'The exact process we use to hire and train VAs who manage ad accounts, handle leads, and provide customer support. Includes job descriptions that attract quality candidates, interview scorecards, a 30-day training curriculum, and performance metrics. Free because every business deserves great support.',
    shortDescription: 'Step-by-step process to hire, onboard, and train high-performing virtual assistants',
    price: 0,
    currency: 'PHP',
    image: '/products/va-checklist.jpg',
    imageAlt: 'VA Hiring & Training Checklist preview',
    features: [
      'Job description templates (Ads VA, Support VA, Lead VA)',
      'Interview scorecards with rubric',
      'Test task assignments with grading guide',
      '30-day training curriculum (week-by-week)',
      'SOPs for common VA tasks',
      'Performance dashboard template',
      'Communication protocols & tools setup',
      'Bonus: VA compensation guide (PH rates)',
    ],
    category: 'Free',
    isFree: true,
    fileFormat: 'PDF + Google Docs + Notion',
    fileSize: '5 MB',
  },
};

function generateProductSchema(product: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.id,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'CDO Ads & VA Experts',
    },
    offers: {
      '@type': 'Offer',
      url: `https://cdoadsvaexperts.com/products/${product.slug}`,
      priceCurrency: product.currency,
      price: (product.price / 100).toFixed(2),
      availability: product.isFree ? 'https://schema.org/InStock' : 'https://schema.org/InStock',
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      seller: {
        '@type': 'Organization',
        name: 'CDO Ads & VA Experts',
      },
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'File Format', value: product.fileFormat },
      { '@type': 'PropertyValue', name: 'File Size', value: product.fileSize },
      { '@type': 'PropertyValue', name: 'Instant Download', value: 'true' },
    ],
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = mockProducts[slug];

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [product.image],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.shortDescription,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = mockProducts[slug];

  if (!product) {
    notFound();
  }

  return (
    <>
      <JsonLd data={generateProductSchema(product)} />
      <Header />
      <main id="main-content" className="min-h-screen pt-16">
        <ProductDetail product={product} />
      </main>
      <Footer />
    </>
  );
}