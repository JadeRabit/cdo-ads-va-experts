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
  icon: React.ReactNode;
  gradient: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'facebook-ads-campaign-template-kit',
    name: 'Facebook Ads Campaign Template Kit',
    shortDescription: 'Complete campaign structure templates for e-commerce, lead gen, and local businesses',
    price: 149900,
    currency: 'PHP',
    image: '',
    imageAlt: '',
    features: ['12 campaign structures', 'Audience targeting guides', 'Budget allocation formulas', 'Testing frameworks'],
    category: 'Templates',
    isFree: false,
    icon: <Target className="h-8 w-8" aria-hidden="true" />,
    gradient: 'from-amber-500/20 via-orange-500/10 to-amber-500/20',
  },
  {
    id: '2',
    slug: 'client-onboarding-sop-bundle',
    name: 'Client Onboarding & SOP Bundle',
    shortDescription: 'Contracts, questionnaires, SOPs, and checklists for agency client onboarding',
    price: 99900,
    currency: 'PHP',
    image: '',
    imageAlt: '',
    features: ['Service agreements', 'Discovery questionnaires', '15+ SOPs', 'Onboarding checklists'],
    category: 'Operations',
    isFree: false,
    icon: <FileText className="h-8 w-8" aria-hidden="true" />,
    gradient: 'from-blue-500/20 via-cyan-500/10 to-blue-500/20',
  },
  {
    id: '3',
    slug: 'ad-creative-brief-report-templates',
    name: 'Ad Creative Brief & Report Templates',
    shortDescription: 'Professional creative briefs, performance reports, and client presentation decks',
    price: 79900,
    currency: 'PHP',
    image: '',
    imageAlt: '',
    features: ['Creative brief templates', 'Weekly/monthly reports', 'Client presentation decks', 'KPI dashboards'],
    category: 'Reporting',
    isFree: false,
    icon: <BarChart2 className="h-8 w-8" aria-hidden="true" />,
    gradient: 'from-purple-500/20 via-pink-500/10 to-purple-500/20',
  },
  {
    id: '4',
    slug: 'va-hiring-training-checklist',
    name: 'VA Hiring & Training Checklist',
    shortDescription: 'Step-by-step process to hire, onboard, and train high-performing virtual assistants',
    price: 0,
    currency: 'PHP',
    image: '',
    imageAlt: '',
    features: ['Job description templates', 'Interview scorecards', '30-day training plan', 'Performance metrics'],
    category: 'Free',
    isFree: true,
    icon: <UserCheck className="h-8 w-8" aria-hidden="true" />,
    gradient: 'from-green-500/20 via-emerald-500/10 to-green-500/20',
  },
];

import { Target, FileText, BarChart2, UserCheck } from 'lucide-react';

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