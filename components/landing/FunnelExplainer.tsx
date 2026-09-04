'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, AlertTriangle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FunnelStep {
  id: number;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  detail: string;
}

const funnelSteps: FunnelStep[] = [
  {
    id: 1,
    label: 'Ad',
    description: 'Your ad stops the scroll',
    icon: <Lightbulb className="h-5 w-5" aria-hidden="true" />,
    color: '#EAB308',
    detail: 'Compelling creative + precise targeting = qualified traffic',
  },
  {
    id: 2,
    label: 'Click',
    description: 'User lands on your page',
    icon: <ArrowRight className="h-5 w-5" aria-hidden="true" />,
    color: '#3B82F6',
    detail: 'Fast-loading landing page with congruent messaging',
  },
  {
    id: 3,
    label: 'Inquiry',
    description: 'They express interest',
    icon: <CheckCircle2 className="h-5 w-5" aria-hidden="true" />,
    color: '#10B981',
    detail: 'Simple form, chat, or DM — low friction, high intent',
  },
  {
    id: 4,
    label: 'Follow-Up',
    description: 'You respond in minutes',
    icon: <AlertTriangle className="h-5 w-5" aria-hidden="true" />,
    color: '#F97316',
    detail: 'Speed to lead determines close rate — 5 min rule',
  },
  {
    id: 5,
    label: 'Sale',
    description: 'Deal closed',
    icon: <Lightbulb className="h-5 w-5" aria-hidden="true" />,
    color: '#8B5CF6',
    detail: 'Smooth checkout, onboarding, and retention sequence',
  },
];

const checklistItems = [
  { id: 1, text: 'Does your landing page match your ad promise?' },
  { id: 2, text: 'Is your form under 5 fields?' },
  { id: 3, text: 'Do you respond to leads within 5 minutes?' },
  { id: 4, text: 'Is there a clear next step after inquiry?' },
  { id: 5, text: 'Do you have automated follow-up sequences?' },
  { id: 6, text: 'Can your VA handle lead qualification 24/7?' },
  { id: 7, text: 'Are you tracking cost per qualified lead?' },
  { id: 8, text: 'Do you know your inquiry-to-sale conversion rate?' },
];

const stepVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export function FunnelExplainer() {
  const [checkedItems, setCheckedItems] = React.useState<Set<number>>(new Set());

  const toggleCheck = (id: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const checkedCount = checkedItems.size;
  const totalItems = checklistItems.length;
  const percentage = Math.round((checkedCount / totalItems) * 100);

  return (
    <section
      id="funnel"
      className="section-padding bg-navy-light"
      aria-labelledby="funnel-heading"
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
            The Conversion Gap
          </span>
          <h2 id="funnel-heading" className="text-display-lg font-display font-bold text-foreground">
            Why Most Ad Spend Bleeds After the Click
          </h2>
          <p className="text-body-lg text-foreground-muted">
            The ad got the click. But what happens next determines if you profit or lose money.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '100px' }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="relative">
              <div className="absolute left-6 top-14 bottom-14 w-0.5 bg-gradient-to-b from-gold to-gold/20 lg:left-[calc(50%+1rem)]" aria-hidden="true" />
              <div className="space-y-12">
                {funnelSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    variants={stepVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '50px' }}
                    transition={{ delay: index * 0.15 }}
                    className="relative flex items-start space-x-4 group"
                    role="listitem"
                    aria-label={`Step ${step.id}: ${step.label}`}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
                      className={cn(
                        'relative flex h-14 w-14 items-center justify-center rounded-2xl shrink-0 z-10',
                        index % 2 === 0
                          ? 'bg-gradient-to-br from-gold to-gold-dark'
                          : `bg-gradient-to-br from-[${step.color}] to-[${step.color}]`
                      )}
                      aria-hidden="true"
                    >
                      {step.icon}
                    </motion.div>
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="flex-1 pt-1"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-display-sm font-display font-bold text-foreground">
                          {step.label}
                        </span>
                        {index < funnelSteps.length - 1 && (
                          <div className="flex-1 h-0.5 bg-gradient-to-r from-gold/30 to-transparent" aria-hidden="true" />
                        )}
                      </div>
                      <p className="text-body text-foreground-muted">{step.description}</p>
                      <p className="text-body-sm text-foreground/50 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        {step.detail}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="border-gold/20">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-gold" aria-hidden="true" />
                  <CardTitle className="text-display-sm">Is Your Customer Journey Losing Money?</CardTitle>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-foreground-muted">{checkedCount}/{totalItems} checks passed</span>
                  <div className="flex-1 h-2 bg-navy rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-gold to-gold-light"
                      role="progressbar"
                      aria-valuenow={percentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Checklist completion"
                    />
                  </div>
                  <span className="text-gold font-semibold">{percentage}%</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3" role="list" aria-label="Self-assessment checklist">
                  {checklistItems.map((item) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + item.id * 0.05 }}
                      layout
                    >
                      <label
                        className={cn(
                          'flex items-start space-x-3 p-3 rounded-lg border border-border bg-navy cursor-pointer transition-all duration-fast',
                          checkedItems.has(item.id) && 'border-gold/50 bg-gold/5'
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={checkedItems.has(item.id)}
                          onChange={() => toggleCheck(item.id)}
                          className={cn(
                            'h-5 w-5 shrink-0 mt-0.5 rounded border-border text-gold',
                            'focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy'
                          )}
                          aria-label={item.text}
                        />
                        <span className="text-body-sm text-foreground flex-1">
                          {item.text}
                        </span>
                        {checkedItems.has(item.id) ? (
                          <motion.div
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          >
                            <CheckCircle2 className="h-5 w-5 text-gold" aria-hidden="true" />
                          </motion.div>
                        ) : (
                          <XCircle className="h-5 w-5 text-foreground/20" aria-hidden="true" />
                        )}
                      </label>
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 p-4 rounded-lg bg-navy border border-border"
                >
                  <p className="text-body-sm text-foreground-muted">
                    <strong className="text-foreground">Score:</strong>{' '}
                    {percentage >= 75
                      ? '🎉 Strong funnel! You\'re capturing most opportunities.'
                      : percentage >= 50
                      ? '⚠️ Moderate leaks. Fix the gaps above to recover lost revenue.'
                      : '🚨 Critical leaks. Your ad spend is likely wasting 50%+ of budget.'}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button className="w-full mt-4" variant="gold" asChild>
                    <a href="#booking">Get a Free Funnel Audit</a>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}