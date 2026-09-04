'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Target, Users, BarChart2, Zap } from 'lucide-react';
import { FadeInUp, StaggerContainer } from '@/components/ui/animations';
import { cn } from '@/lib/utils';

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  return (
    <section
      id="hero"
      className={cn(
        'relative min-h-screen flex items-center justify-center overflow-hidden pt-16',
        className
      )}
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" aria-hidden="true" />

      <div className="container-custom relative z-10 py-20">
        <StaggerContainer staggerDelay={0.1} className="max-w-4xl mx-auto text-center space-y-8">
          <FadeInUp delay={0}>
            <div className="inline-flex items-center space-x-2 rounded-full bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>New: Claim ₱1,000 OFF your first month with code <strong>VA1000</strong></span>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <h1
              id="hero-heading"
              className="text-display-xl font-display font-bold text-foreground text-balance"
            >
              Your Ads Don&apos;t Need More Clicks.
              <br />
              <span className="gradient-text">They Need Better Next Steps.</span>
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="text-body-lg text-foreground-muted max-w-2xl mx-auto">
              We help e-commerce brands and entrepreneurs scale profitably through expert Facebook Ads management,
              strategic social media, and dedicated virtual assistant support — so every click turns into a customer.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" className="w-full sm:w-auto gap-2" asChild>
                <a href="#booking">
                  Book a Free Consultation
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
              <Button size="xl" variant="outline" className="w-full sm:w-auto gap-2" asChild>
                <a href="#promo">
                  Claim ₱1,000 OFF Promo
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.4}>
            <div className="flex flex-wrap items-center justify-center gap-8 text-body-sm text-foreground-muted">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-gold" aria-hidden="true" />
                <span>Precision Targeting</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-gold" aria-hidden="true" />
                <span>Dedicated VA Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart2 className="h-5 w-5 text-gold" aria-hidden="true" />
                <span>Conversion Optimization</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-gold" aria-hidden="true" />
                <span>Fast Turnaround</span>
              </div>
            </div>
          </FadeInUp>
        </StaggerContainer>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="h-6 w-6 text-foreground-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}