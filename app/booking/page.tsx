import { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BookingForm } from '@/components/booking/BookingForm';
import { InquiryForm } from '@/components/booking/InquiryForm';
import { CalendlyEmbed } from '@/components/booking/CalendlyEmbed';

export const metadata: Metadata = {
  title: 'Book a Free Consultation',
  description: 'Schedule a free ad audit or discovery call with CDO Ads & VA Experts. Get personalized recommendations for your Facebook Ads, Social Media, or VA needs.',
};

export default function BookingPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-16">
        <section className="section-padding bg-navy" aria-labelledby="booking-heading">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold text-sm font-medium">
                Book a Consultation
              </span>
              <h1 id="booking-heading" className="text-display-lg font-display font-bold text-foreground">
                Let&apos;s Talk About Your Growth
              </h1>
              <p className="text-body-lg text-foreground-muted">
                Choose a time that works for you. No pressure, just expert insights on your ads, social media, or VA needs.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div className="space-y-6">
                <CalendlyEmbed />

                <div className="p-6 rounded-xl bg-navy-light border border-border">
                  <h3 className="text-display-sm font-display font-semibold text-foreground mb-4">
                    Prefer a Custom Form?
                  </h3>
                  <p className="text-body-sm text-foreground-muted mb-4">
                    Calendly not loading? Fill out our form and we'll contact you within 24 hours to schedule.
                  </p>
                  <BookingForm />
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-navy-light border border-gold/20">
                  <h3 className="text-display-sm font-display font-semibold text-foreground mb-4">
                    Have Questions First?
                  </h3>
                  <p className="text-body-sm text-foreground-muted mb-6">
                    Not ready for a call? Send us a quick message about your business and goals. We'll reply with personalized recommendations.
                  </p>
                  <InquiryForm />
                </div>

                <div className="p-6 rounded-xl bg-navy-light border border-border">
                  <h3 className="text-display-sm font-display font-semibold text-foreground mb-4">
                    What Happens Next?
                  </h3>
                  <ol className="space-y-4" role="list">
                    <li className="flex items-start space-x-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold font-bold text-sm shrink-0">1</span>
                      <div>
                        <p className="font-medium text-foreground">You book or inquire</p>
                        <p className="text-body-sm text-foreground-muted">Pick a time or fill out our form</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold font-bold text-sm shrink-0">2</span>
                      <div>
                        <p className="font-medium text-foreground">We research your business</p>
                        <p className="text-body-sm text-foreground-muted">Ad account audit, competitor analysis, goal setting</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold font-bold text-sm shrink-0">3</span>
                      <div>
                        <p className="font-medium text-foreground">Free strategy call (30-45 min)</p>
                        <p className="text-body-sm text-foreground-muted">Actionable insights, no pitch unless you ask</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold font-bold text-sm shrink-0">4</span>
                      <div>
                        <p className="font-medium text-foreground">Custom proposal</p>
                        <p className="text-body-sm text-foreground-muted">Tailored scope, timeline, and investment</p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}