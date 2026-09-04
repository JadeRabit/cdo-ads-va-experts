## 1. Project Setup & Configuration

- [x] 1.1 Initialize Next.js 14+ project with App Router, TypeScript, and Tailwind CSS
- [x] 1.2 Configure ESLint, Prettier, and Husky pre-commit hooks
- [x] 1.3 Install and configure Shadcn UI with required components (button, card, input, textarea, select, badge, toast, dialog, carousel)
- [x] 1.4 Install Lucide React icons package
- [x] 1.5 Set up Supabase client (`@supabase/ssr`) with environment variables
- [x] 1.6 Configure `next.config.js` for images (Supabase Storage domains), experimental features
- [x] 1.7 Create Tailwind config with brand theme tokens (colors, typography, spacing, shadows, radius, animations)
- [x] 1.8 Create global CSS (`app/globals.css`) with CSS variables, base styles, selection styles
- [ ] 1.9 Set up Vercel project linking and environment variable configuration

## 2. Design System & Base Components (brand-theme spec)

- [x] 2.1 Create `components/ui/` with all Shadcn base components customized for brand
- [x] 2.2 Implement branded Button variants (default, outline, ghost, gold, navy)
- [x] 2.3 Implement branded Card component with hover variant
- [x] 2.4 Implement branded Input, Textarea, Select with focus states
- [x] 2.5 Implement branded Badge variants (gold, navy, outline)
- [x] 2.6 Implement Toast component for notifications
- [x] 2.7 Create `components/layout/Header.tsx` with navigation, logo, mobile menu
- [x] 2.8 Create `components/layout/Footer.tsx` with social links, address, hours, contact
- [x] 2.9 Create utility functions: `cn()` for class merging, formatters, validators
- [x] 2.10 Add Framer Motion for animations (install and configure)

## 3. Landing Page Implementation (landing-page spec)

- [x] 3.1 Create `app/page.tsx` as main landing page with all sections
- [x] 3.2 Build `components/landing/Hero.tsx` with headline, sub-headline, dual CTAs
- [x] 3.3 Build `components/landing/Services.tsx` with 4 interactive service cards grid
- [x] 3.4 Build `components/landing/FunnelExplainer.tsx` with interactive journey diagram + checklist
- [x] 3.5 Build `components/landing/PromoBanner.tsx` with VA1000 promo code and CTA
- [x] 3.6 Build `components/landing/Testimonials.tsx` with carousel (embla-carousel-react)
- [x] 3.7 Implement responsive layouts for all sections (mobile/tablet/desktop)
- [x] 3.8 Add metadata generation for SEO (`generateMetadata` in page.tsx)
- [x] 3.9 Implement structured data (JSON-LD) for Organization and Service schema
- [x] 3.10 Optimize images with `next/image` and proper sizing
- [x] 3.11 Add lazy loading for below-fold sections
- [ ] 3.12 Test Lighthouse performance score ≥90

## 4. Booking Portal Implementation (booking-portal spec)

- [x] 4.1 Create `app/booking/page.tsx` or section on landing page
- [x] 4.2 Build `components/booking/CalendlyEmbed.tsx` with async script loading
- [x] 4.3 Build `components/booking/BookingForm.tsx` (fallback custom form with RHF + Zod)
- [x] 4.4 Build `components/booking/InquiryForm.tsx` with fields: name, email, business, budget, service
- [x] 4.5 Create Zod schemas for booking and inquiry validation
- [x] 4.6 Create API route `app/api/booking/route.ts` for custom form submissions
- [x] 4.7 Create API route `app/api/inquiry/route.ts` for inquiry form submissions
- [x] 4.8 Implement Supabase `bookings` and `inquiries` tables with RLS policies
- [x] 4.9 Add honeypot field and rate limiting (middleware implementation)
- [ ] 4.10 Integrate Resend for email confirmations (booking + inquiry)
- [x] 4.11 Add success/error toast notifications
- [x] 4.12 Ensure WCAG AA accessibility (labels, focus, aria-live, keyboard nav)

## 5. Digital Products Store (digital-store spec)

- [x] 5.1 Create Supabase migrations for `products`, `orders`, `downloads` tables
- [x] 5.2 Seed Supabase with initial digital products (images in Storage)
- [x] 5.3 Create `app/products/page.tsx` with product grid (SSG via `generateStaticParams`)
- [x] 5.4 Build `components/store/ProductGrid.tsx` responsive grid layout
- [x] 5.5 Build `components/store/ProductCard.tsx` with image, title, price, download button
- [x] 5.6 Create dynamic route `app/products/[slug]/page.tsx` for product detail
- [x] 5.7 Build `components/store/ProductDetail.tsx` with full description, features, download
- [x] 5.8 Implement `app/api/download/route.ts` for signed URL generation
- [x] 5.9 Implement free product instant download (1-hour signed URL)
- [x] 5.10 Implement paid product checkout (Stripe Checkout Session integration)
- [x] 5.11 Create `app/api/webhook/stripe/route.ts` for payment confirmation
- [x] 5.12 On successful payment: generate 24-hour signed URL, email delivery, create order
- [x] 5.13 Add download logging to `downloads` table
- [x] 5.14 Add product metadata SEO and JSON-LD Product schema
- [x] 5.15 Ensure accessibility for grid, detail, and download flows

## 6. Supabase Backend Setup

- [x] 6.1 Create Supabase project and configure database
- [x] 6.2 Run migrations for all tables (products, orders, downloads, bookings, inquiries)
- [x] 6.3 Configure Row Level Security policies for all tables
- [x] 6.4 Set up Supabase Storage bucket for product images and digital files
- [x] 6.5 Configure Storage policies (public read for images, signed URLs for files)
- [x] 6.6 Set up Supabase Auth (email/password) for future admin access
- [x] 6.7 Configure Edge Functions for API routes if needed
- [ ] 6.8 Test all database operations and RLS policies

## 7. Integration & Polish

- [ ] 7.1 Connect all forms to Supabase and verify data flow
- [ ] 7.2 Test Calendly embed and fallback form end-to-end
- [ ] 7.3 Test free and paid product download flows end-to-end
- [x] 7.4 Add Framer Motion animations: fade-in, slide-up, stagger for sections
- [x] 7.5 Implement error boundaries for each major section
- [x] 7.6 Add loading skeletons for async components
- [ ] 7.7 Configure Vercel Analytics and custom events
- [ ] 7.8 Run full accessibility audit (axe-core, manual keyboard testing)
- [ ] 7.9 Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] 7.10 Mobile device testing (iOS Safari, Android Chrome)
- [ ] 7.11 Performance optimization: bundle analysis, remove unused code
- [x] 7.12 Create 404 page and global error page

## 8. Deployment & Launch

- [ ] 8.1 Push to GitHub repository
- [ ] 8.2 Connect Vercel project to repository
- [ ] 8.3 Configure all environment variables in Vercel (Supabase, Stripe, Resend, Calendly)
- [ ] 8.4 Deploy preview and run Lighthouse CI
- [ ] 8.5 Run production deployment
- [ ] 8.6 Verify all functionality in production
- [ ] 8.7 Set up custom domain and SSL
- [ ] 8.8 Configure monitoring and error tracking (Sentry or Vercel)
- [ ] 8.9 Document deployment process and environment variables
- [ ] 8.10 Hand off to client with admin access guide