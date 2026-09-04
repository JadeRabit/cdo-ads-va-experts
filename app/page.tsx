import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

const Hero = dynamic(() => import('@/components/landing/Hero').then((mod) => mod.Hero), {
  ssr: true,
  loading: () => <div className="min-h-[600px] flex items-center justify-center" />,
});

const Services = dynamic(() => import('@/components/landing/Services').then((mod) => mod.Services), {
  ssr: false,
  loading: () => <div className="section-padding bg-navy" />,
});

const FunnelExplainer = dynamic(() => import('@/components/landing/FunnelExplainer').then((mod) => mod.FunnelExplainer), {
  ssr: false,
  loading: () => <div className="section-padding bg-navy-light" />,
});

const PromoBanner = dynamic(() => import('@/components/landing/PromoBanner').then((mod) => mod.PromoBanner), {
  ssr: false,
  loading: () => <div className="section-padding" />,
});

const Testimonials = dynamic(() => import('@/components/landing/Testimonials').then((mod) => mod.Testimonials), {
  ssr: false,
  loading: () => <div className="section-padding bg-navy" />,
});

export const metadata: Metadata = {
  title: 'Scale Your Business with Expert Ads & VA Support',
  description: 'Your Ads Don\'t Need More Clicks. They Need Better Next Steps. Expert Facebook Ads Management, Social Media Management, Virtual Assistant Services, and Digital Products.',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CDO Ads & VA Experts',
  url: 'https://cdoadsvaexperts.com',
  logo: 'https://cdoadsvaexperts.com/logo.png',
  sameAs: [
    'https://facebook.com/cdoadsvaexperts',
    'https://instagram.com/cdoadsvaexperts',
    'https://linkedin.com/company/cdoadsvaexperts',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cagayan de Oro City',
    addressCountry: 'PH',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+63-XX-XXX-XXXX',
    contactType: 'customer service',
    availableLanguage: ['English', 'Filipino'],
  },
};

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Digital Marketing Services',
  provider: {
    '@type': 'Organization',
    name: 'CDO Ads & VA Experts',
  },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital Marketing Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Facebook Ads Management',
          description: 'Campaign setup, audience targeting, conversion optimization, and ongoing management.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Social Media Management',
          description: 'Content creation, branding, engagement strategies, and community management.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Virtual Assistant Services',
          description: 'Administrative support, lead management, customer support, and business operations.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Digital Products',
          description: 'Downloadable templates, planners, and business tools for entrepreneurs.',
        },
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema, servicesSchema]} />
      <Header />
      <main id="main-content" className="min-h-screen">
        <ErrorBoundary sectionName="Hero">
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary sectionName="Services">
          <Services />
        </ErrorBoundary>
        <ErrorBoundary sectionName="Funnel Explainer">
          <FunnelExplainer />
        </ErrorBoundary>
        <ErrorBoundary sectionName="Promo Banner">
          <PromoBanner />
        </ErrorBoundary>
        <ErrorBoundary sectionName="Testimonials">
          <Testimonials />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}