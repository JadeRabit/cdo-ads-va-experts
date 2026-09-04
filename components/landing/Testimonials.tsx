'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ChevronLeft, ChevronRight, Quote, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  result?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "CDO Ads & VA Experts transformed our ad account from bleeding money to consistent 3.5x ROAS in just 60 days. Their VA team handles all lead follow-up so we never miss an opportunity.",
    author: "Maria Santos",
    role: "Founder",
    company: "GlowSkin PH",
    rating: 5,
    result: "3.5x ROAS in 60 days",
  },
  {
    id: 2,
    quote: "The difference is their post-click strategy. Most agencies just run ads. These guys built our entire funnel — landing pages, email sequences, VA follow-up. Our cost per acquisition dropped 40%.",
    author: "James Chen",
    role: "Marketing Director",
    company: "FitGear Co.",
    rating: 5,
    result: "40% lower CPA",
  },
  {
    id: 3,
    quote: "As a solopreneur, I couldn't manage ads AND fulfill orders. Their VA service handles customer support, order processing, and lead qualification. I've reclaimed 20+ hours/week.",
    author: "Ana Rodriguez",
    role: "Owner",
    company: "Boho Home Decor",
    rating: 5,
    result: "20+ hours saved weekly",
  },
  {
    id: 4,
    quote: "Their digital templates saved us months of work. The ad campaign structure template alone is worth 10x the price. Plus their team is genuinely invested in your success.",
    author: "Kevin Park",
    role: "Co-Founder",
    company: "ScaleUp Agency",
    rating: 5,
    result: "Months of work saved",
  },
  {
    id: 5,
    quote: "Finally, an agency that understands the Filipino market AND international scaling. They localized our creatives for PH audiences while maintaining global brand standards.",
    author: "Lisa Tan",
    role: "E-commerce Manager",
    company: "TechStyle PH",
    rating: 5,
    result: "2.8x ROAS PH market",
  },
  {
    id: 6,
    quote: "The communication is exceptional. Weekly calls, detailed reports, and their VA team feels like an extension of our own staff. 100% recommend to any serious business owner.",
    author: "Robert Lim",
    role: "CEO",
    company: "PetCare Plus",
    rating: 5,
    result: "100% satisfaction",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', slidesToScroll: 1 });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = React.useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onInit = () => setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onReInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('init', onInit);
    emblaApi.on('reInit', onReInit);
    emblaApi.on('select', onSelect);

    onInit();

    return () => {
      emblaApi.off('init', onInit);
      emblaApi.off('reInit', onReInit);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <section
      id="testimonials"
      className="section-padding bg-navy"
      aria-labelledby="testimonials-heading"
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
            Trusted by Growing Brands
          </span>
          <h2 id="testimonials-heading" className="text-display-lg font-display font-bold text-foreground">
            100% Client Recommendation Rate
          </h2>
          <p className="text-body-lg text-foreground-muted">
            Real results from real businesses. No fake reviews, no cherry-picked screenshots.
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex" style={{ minWidth: '100%' }}>
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] min-w-0 px-2"
                  style={{ minWidth: '100%' }}
                >
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: testimonial.id * 0.1 }}
                  >
                    <Card className="h-full border-border hover:border-gold/30 transition-colors">
                      <CardContent className="p-6 lg:p-8 flex flex-col h-full">
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-center space-x-1 mb-4"
                          aria-label={`${testimonial.rating} out of 5 stars`}
                        >
                          {[...Array(5)].map((_, i) => (
                            <motion.span
                              key={i}
                              initial={{ scale: 0, rotate: -90 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 20,
                                delay: 0.3 + i * 0.05,
                              }}
                            >
                              <Star
                                className={cn(
                                  'h-5 w-5',
                                  i < testimonial.rating ? 'fill-gold text-gold' : 'text-foreground/20'
                                )}
                                aria-hidden="true"
                              />
                            </motion.span>
                          ))}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
                        >
                          <Quote className="h-10 w-10 text-gold/20 mb-4" aria-hidden="true" />
                        </motion.div>
                        <motion.blockquote
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-body-lg text-foreground mb-6 flex-1 leading-relaxed"
                        >
                          &ldquo;{testimonial.quote}&rdquo;
                        </motion.blockquote>

                        {testimonial.result && (
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <Badge variant="gold" className="mb-4 w-fit">
                              <Shield className="h-3 w-3 mr-1.5" aria-hidden="true" />
                              {testimonial.result}
                            </Badge>
                          </motion.div>
                        )}

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="pt-4 border-t border-border"
                        >
                          <div className="flex items-center space-x-3">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                              className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-semibold"
                            >
                              {testimonial.author.charAt(0)}
                            </motion.div>
                            <div>
                              <p className="font-semibold text-foreground">{testimonial.author}</p>
                              <p className="text-body-sm text-foreground-muted">
                                {testimonial.role}, {testimonial.company}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center space-x-4 mt-8"
          >
            <motion.button
              onClick={scrollPrev}
              disabled={!emblaApi || emblaApi.canScrollPrev() === false}
              aria-label="Previous testimonial"
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gold text-gold bg-transparent hover:bg-gold/10',
                'disabled:cursor-not-allowed disabled:opacity-30',
                'transition-opacity'
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </motion.button>

            <div className="flex space-x-2" role="tablist" aria-label="Testimonial navigation">
              {scrollSnaps.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={cn(
                    'h-2 w-2 rounded-full transition-all duration-fast',
                    index === selectedIndex
                      ? 'bg-gold w-6'
                      : 'bg-foreground/20 hover:bg-foreground/40'
                  )}
                  role="tab"
                  aria-selected={index === selectedIndex}
                  aria-label={`Go to testimonial ${index + 1}`}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>

            <motion.button
              onClick={scrollNext}
              disabled={!emblaApi || emblaApi.canScrollNext() === false}
              aria-label="Next testimonial"
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-gold text-gold bg-transparent hover:bg-gold/10',
                'disabled:cursor-not-allowed disabled:opacity-30',
                'transition-opacity'
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="mt-12 text-center"
          >
            <Badge variant="outline" className="text-base px-4 py-2">
              <Shield className="h-4 w-4 mr-2" aria-hidden="true" />
              100% Recommendation Rate Across All Clients
            </Badge>
          </motion.div>
        </div>
      </div>
    </section>
  );
}