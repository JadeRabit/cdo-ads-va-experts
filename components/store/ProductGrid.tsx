'use client';

import * as React from 'react';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  price: number;
  currency: string;
  image: string;
  imageAlt: string;
  features: string[];
  category: string;
  isFree: boolean;
}

const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'facebook-ads-campaign-template-kit',
    name: 'Facebook Ads Campaign Template Kit',
    shortDescription: 'Complete campaign structure templates for e-commerce, lead gen, and local businesses',
    price: 149900,
    currency: 'PHP',
    image: '/products/ads-template-kit.jpg',
    imageAlt: 'Facebook Ads Campaign Template Kit preview',
    features: ['12 campaign structures', 'Audience targeting guides', 'Budget allocation formulas', 'Testing frameworks'],
    category: 'Templates',
    isFree: false,
  },
  {
    id: '2',
    slug: 'client-onboarding-sop-bundle',
    name: 'Client Onboarding & SOP Bundle',
    shortDescription: 'Contracts, questionnaires, SOPs, and checklists for agency client onboarding',
    price: 99900,
    currency: 'PHP',
    image: '/products/onboarding-bundle.jpg',
    imageAlt: 'Client Onboarding & SOP Bundle preview',
    features: ['Service agreements', 'Discovery questionnaires', '15+ SOPs', 'Onboarding checklists'],
    category: 'Operations',
    isFree: false,
  },
  {
    id: '3',
    slug: 'ad-creative-brief-report-templates',
    name: 'Ad Creative Brief & Report Templates',
    shortDescription: 'Professional creative briefs, performance reports, and client presentation decks',
    price: 79900,
    currency: 'PHP',
    image: '/products/creative-templates.jpg',
    imageAlt: 'Ad Creative Brief & Report Templates preview',
    features: ['Creative brief templates', 'Weekly/monthly reports', 'Client presentation decks', 'KPI dashboards'],
    category: 'Reporting',
    isFree: false,
  },
  {
    id: '4',
    slug: 'va-hiring-training-checklist',
    name: 'VA Hiring & Training Checklist',
    shortDescription: 'Step-by-step process to hire, onboard, and train high-performing virtual assistants',
    price: 0,
    currency: 'PHP',
    image: '/products/va-checklist.jpg',
    imageAlt: 'VA Hiring & Training Checklist preview',
    features: ['Job description templates', 'Interview scorecards', '30-day training plan', 'Performance metrics'],
    category: 'Free',
    isFree: true,
  },
];

export function ProductGrid() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      role="list"
      aria-label="Digital products"
    >
      {mockProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}