import { Metadata } from 'next';
import { ProductGrid } from '@/components/store/ProductGrid';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Digital Products',
  description: 'Browse our collection of digital templates, planners, and tools for ads managers, agency owners, and e-commerce operators.',
};

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Digital Products for Marketers',
  description: 'Templates, planners, and tools for Facebook Ads management and agency operations',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Product',
        name: 'Facebook Ads Campaign Template Kit',
        description: 'Complete campaign structure templates for e-commerce, lead gen, and local businesses',
        offers: { '@type': 'Offer', price: '1499', priceCurrency: 'PHP', availability: 'https://schema.org/InStock' },
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Product',
        name: 'Client Onboarding & SOP Bundle',
        description: 'Contracts, questionnaires, SOPs, and checklists for agency client onboarding',
        offers: { '@type': 'Offer', price: '999', priceCurrency: 'PHP', availability: 'https://schema.org/InStock' },
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Product',
        name: 'Ad Creative Brief & Report Templates',
        description: 'Professional creative briefs, performance reports, and client presentation decks',
        offers: { '@type': 'Offer', price: '799', priceCurrency: 'PHP', availability: 'https://schema.org/InStock' },
      },
    },
  ],
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={productSchema} />
      <Header />
      <main id="main-content" className="min-h-screen pt-16">
        <section className="section-padding bg-navy" aria-labelledby="products-heading">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold text-sm font-medium">
                Digital Products
              </span>
              <h1 id="products-heading" className="text-display-lg font-display font-bold text-foreground">
                Tools & Templates That Save Weeks of Work
              </h1>
              <p className="text-body-lg text-foreground-muted">
                Battle-tested resources built from managing 100M+ in ad spend. Instant download, lifetime updates.
              </p>
            </div>
            <ProductGrid />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}