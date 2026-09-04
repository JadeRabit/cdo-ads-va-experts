'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HoverScale } from '@/components/ui/animations';
import {
  Target,
  Share2,
  UserCheck,
  Download,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  variant?: 'default' | 'featured';
}

const services: Service[] = [
  {
    icon: <Target className="h-7 w-7" aria-hidden="true" />,
    title: 'Facebook Ads Management',
    description: 'Full-funnel campaign management from strategy to scale. We handle creative testing, audience targeting, and conversion optimization.',
    features: [
      'Campaign strategy & setup',
      'Audience research & targeting',
      'Creative testing & optimization',
      'Conversion tracking & reporting',
      'Budget management & scaling',
      'Weekly performance reviews',
    ],
    ctaText: 'Start My Ad Audit',
    ctaHref: '#booking',
    variant: 'featured',
  },
  {
    icon: <Share2 className="h-7 w-7" aria-hidden="true" />,
    title: 'Social Media Management',
    description: 'Build brand authority and engage your audience with strategic content, community management, and growth strategies.',
    features: [
      'Content strategy & calendar',
      'Visual content creation',
      'Copywriting & storytelling',
      'Community engagement',
      'Influencer outreach',
      'Monthly analytics reports',
    ],
    ctaText: 'View Packages',
    ctaHref: '#booking',
  },
  {
    icon: <UserCheck className="h-7 w-7" aria-hidden="true" />,
    title: 'Virtual Assistant Services',
    description: 'Dedicated VAs trained in ads operations, lead management, and customer support to free up your time for high-leverage work.',
    features: [
      'Lead qualification & follow-up',
      'Ad account monitoring',
      'Customer support & chat',
      'Calendar & email management',
      'Data entry & reporting',
      'SOP creation & documentation',
    ],
    ctaText: 'Hire a VA',
    ctaHref: '#booking',
  },
  {
    icon: <Download className="h-7 w-7" aria-hidden="true" />,
    title: 'Digital Products',
    description: 'Ready-to-use templates, planners, and tools designed for ads managers, agency owners, and e-commerce operators.',
    features: [
      'Ad campaign templates',
      'Client onboarding kits',
      'Reporting dashboards',
      'Creative brief templates',
      'SOPs & checklists',
      'Lifetime updates included',
    ],
    ctaText: 'Browse Products',
    ctaHref: '/products',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

export function Services() {
  return (
    <section
      id="services"
      className="section-padding bg-navy"
      aria-labelledby="services-heading"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '100px' }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center space-y-4 mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold text-sm font-medium">
            Our Core Services
          </span>
          <h2 id="services-heading" className="text-display-lg font-display font-bold text-foreground">
            Everything You Need to Scale
          </h2>
          <p className="text-body-lg text-foreground-muted">
            Four integrated services designed to work together — from the first click to the final sale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '100px' }}
              variants={cardVariants}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'group relative overflow-hidden',
                service.variant === 'featured' && 'ring-2 ring-gold/30'
              )}
            >
              <HoverScale>
                <Card className="h-full border-border hover:border-gold/50 transition-colors">
                  <CardHeader className="pb-4">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
                      className={cn(
                        'inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold mb-4 transition-colors group-hover:bg-gold group-hover:text-navy',
                        service.variant === 'featured' && 'bg-gold text-navy'
                      )}
                      aria-hidden="true"
                    >
                      {service.icon}
                    </motion.div>
                    <CardTitle className="text-display-sm">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1">
                    <ul className="space-y-3 mb-6 flex-1" role="list" aria-label={`${service.title} features`}>
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + featureIndex * 0.05 }}
                          className="flex items-start space-x-3 text-body-sm"
                        >
                          <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-foreground-muted">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <Button
                      variant={service.variant === 'featured' ? 'default' : 'outline'}
                      className="w-full justify-between"
                      asChild
                    >
                      <a href={service.ctaHref}>
                        {service.ctaText}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </HoverScale>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}