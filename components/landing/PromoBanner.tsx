'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tag, Sparkles, ArrowRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PromoBanner() {
  const [copied, setCopied] = React.useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText('VA1000');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="promo" className="section-padding relative overflow-hidden" aria-labelledby="promo-heading">
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden="true" />
      <div className="container-custom relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '100px' }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, duration: 0.6 }}
          >
            <Card className="relative border-gold/30 bg-gradient-to-br from-gold/5 via-navy-light to-gold/5 gradient-border">
              <CardContent className="p-6 lg:p-10">
                <div className="lg:grid lg:grid-cols-[1fr_auto] gap-8 items-center">
                  <div className="text-center lg:text-left space-y-6 mb-8 lg:mb-0">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }} className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                      <Badge variant="gold" className="text-base px-4 py-1.5"><Sparkles className="h-4 w-4 mr-2" aria-hidden="true" /> LIMITED TIME OFFER</Badge>
                      <Badge variant="navy" className="text-base px-4 py-1.5"><Tag className="h-4 w-4 mr-2" aria-hidden="true" /> CODE: VA1000</Badge>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }} className="space-y-3">
                      <h2 id="promo-heading" className="text-display-lg font-display font-bold text-foreground">Claim <span className="gradient-text">\u20B11,000 OFF</span> Your First Month</h2>
                      <p className="text-body-lg text-foreground-muted">New clients save on any service package \u2014 Facebook Ads Management, Social Media Management, or Virtual Assistant Services.</p>
                      <ul className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-body-sm text-foreground-muted">
                        <li className="flex items-center space-x-1.5"><Clock className="h-4 w-4 text-gold" aria-hidden="true" /><span>Valid for first 30 days</span></li>
                        <li className="flex items-center space-x-1.5"><Tag className="h-4 w-4 text-gold" aria-hidden="true" /><span>No setup fees</span></li>
                        <li className="flex items-center space-x-1.5"><Sparkles className="h-4 w-4 text-gold" aria-hidden="true" /><span>Cancel anytime</span></li>
                      </ul>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                      <Button size="xl" className="w-full sm:w-auto gap-2" asChild><a href="#booking" onClick={copyCode}>Book Consultation & Apply Code<ArrowRight className="h-5 w-5" aria-hidden="true" /></a></Button>
                      <Button size="xl" variant="ghost" className="w-full sm:w-auto gap-2" onClick={copyCode}>{copied ? (<><span className="text-gold">\u2713 Copied!</span><span className="text-gold">VA1000</span></>) : (<><Tag className="h-5 w-5" aria-hidden="true" />Copy Code: <strong>VA1000</strong></>)}</Button>
                    </motion.div>
                  </div>
                  <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="relative hidden lg:block">
                    <div className="relative aspect-square w-full max-w-sm mx-auto lg:max-w-xs">
                      <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-2xl blur-2xl" aria-hidden="true" />
                      <div className="relative bg-navy rounded-2xl p-6 border border-gold/20 shadow-gold-lg">
                        <div className="space-y-4">
                          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex items-center justify-between p-4 bg-navy-light rounded-xl border border-gold/10"><div className="flex items-center space-x-3"><motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center"><Tag className="h-5 w-5 text-gold" aria-hidden="true" /></motion.div><div><p className="text-caption text-foreground-muted">Promo Code Applied</p><p className="text-display-sm font-display font-bold text-gold">VA1000</p></div></div><Badge variant="success">ACTIVE</Badge></motion.div>
                          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="grid grid-cols-2 gap-4"><div className="p-4 bg-navy-light rounded-xl border border-border"><p className="text-caption text-foreground-muted">Regular Price</p><p className="text-display-sm font-display font-bold text-foreground-muted line-through">\u20B115,000/mo</p></div><motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.6 }} className="p-4 bg-navy-light rounded-xl border border-gold/20"><p className="text-caption text-foreground-muted">With VA1000</p><p className="text-display-sm font-display font-bold text-gold">\u20B114,000/mo</p></motion.div></motion.div>
                          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.7 }} className="p-4 bg-gold/10 rounded-xl border border-gold/20 text-center"><p className="text-body-sm text-navy">You save <strong className="text-display-sm">\u20B11,000</strong> in your first month</p></motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
export function copyCode() { navigator.clipboard.writeText('VA1000'); }