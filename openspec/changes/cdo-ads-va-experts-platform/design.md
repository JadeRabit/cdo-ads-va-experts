## Context

CDO Ads & VA Experts is a digital agency based in Cagayan de Oro City, Philippines, specializing in Facebook Ads Management, Social Media Management, Virtual Assistant Services, and Digital Products. They need a modern web platform to replace their current lack of professional online presence. The platform must be built with Next.js App Router, TypeScript, Tailwind CSS, Shadcn UI, and Lucide Icons, deployed on Vercel. The brand identity uses dark navy (#0A0F1D) background, vibrant gold/yellow (#EAB308) accents, and crisp white typography.

## Goals / Non-Goals

**Goals:**
- Build a performant, SEO-friendly Next.js 14+ application using App Router
- Implement a design system with reusable components matching brand guidelines
- Create a high-converting landing page with interactive elements
- Build a booking/lead capture portal with Calendly integration
- Create a digital products storefront with instant download/checkout
- Optimize for Vercel deployment with static generation where possible
- Ensure full mobile responsiveness and accessibility (WCAG AA)
- Integrate Supabase/Firebase for backend data (forms, bookings, products)

**Non-Goals:**
- Full e-commerce cart/payment processing (digital products use simple download links)
- User authentication/dashboard (client portal is future phase)
- Complex CMS for content management (static content with easy markdown updates)
- Multi-language support (English only for MVP)
- Admin panel for managing bookings/products (use Supabase/Firebase console directly)

## Decisions

### 1. Framework: Next.js 14+ App Router with TypeScript
**Rationale:** App Router provides React Server Components, streaming, and better performance. TypeScript ensures type safety across components and API routes. Vercel is the native deployment platform.
**Alternatives:** Remix (less Vercel optimization), Astro (less dynamic interactivity needed), plain React + Vite (no SSR/SEO benefits).

### 2. Styling: Tailwind CSS + Shadcn UI + Lucide Icons
**Rationale:** Tailwind enables rapid styling with design tokens. Shadcn UI provides accessible, customizable components built on Radix UI. Lucide Icons are lightweight and tree-shakeable.
**Alternatives:** Material UI (heavy, hard to customize), Chakra UI (less flexible), custom CSS (slow development).

### 3. State Management: React Server Components + Client Components + URL State
**Rationale:** RSC for data fetching (products, testimonials), client components for interactivity (booking forms, carousel), URL state for filters. No need for Redux/Zustand in MVP.
**Alternatives:** Zustand (if client state grows), TanStack Query (for complex server state).

### 4. Backend: Supabase (PostgreSQL + Auth + Storage)
**Rationale:** Supabase provides PostgreSQL database, real-time subscriptions, auth, and file storage. Free tier sufficient for MVP. Easy integration with Next.js via `@supabase/ssr`.
**Alternatives:** Firebase (NoSQL, vendor lock-in), PlanetScale (no auth/storage), custom API + database (more maintenance).

### 5. Deployment: Vercel with Edge Functions
**Rationale:** Native Next.js support, edge functions for fast geo-distributed API routes, automatic static optimization, preview deployments.
**Alternatives:** Netlify (similar but less Next.js optimization), AWS Amplify (more complex).

### 6. Component Architecture: Feature-based folders under `components/`
**Rationale:** Scales better than flat structure. Each feature (landing, booking, store) has its own components. Shared UI in `components/ui/`.
**Structure:**
```
components/
├── ui/              # Shadcn base components (button, card, input, etc.)
├── landing/         # Hero, Services, FunnelExplainer, PromoBanner, Testimonials, Footer
├── booking/         # BookingForm, CalendlyEmbed, InquiryForm
├── store/           # ProductGrid, ProductCard, DownloadButton
└── layout/          # Header, Footer, Navigation
```

### 7. Data Fetching: Server Components with Supabase Client
**Rationale:** Fetch products, testimonials, and config at build time (SSG) or request time (SSR) using Supabase client in Server Components. Reduces client bundle and improves SEO.
**Pattern:** `async function getProducts() { return await supabase.from('products').select() }` in page.tsx

### 8. Forms: React Hook Form + Zod Validation
**Rationale:** Type-safe form validation with minimal re-renders. Zod schemas shared between client/server.
**Alternatives:** Formik (heavier), native forms (no validation).

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Calendly embed performance impact | Load Calendly script async, use `next/script` with `strategy="lazyOnload"` |
| Supabase cold start latency | Use Vercel Edge Functions for API routes, enable connection pooling |
| Shadcn customization complexity | Extend via Tailwind config, use `className` props, avoid ejecting components |
| Image optimization for digital products | Use `next/image` with Supabase Storage CDN, proper sizing |
| SEO for dynamic content | Pre-render landing page, use `generateMetadata` for dynamic pages |
| Bundle size from Lucide Icons | Import individual icons (`import { ArrowRight } from 'lucide-react'`), tree-shaking |
| Form spam | Add honeypot field, rate limiting via Vercel Edge Config, Supabase RLS policies |
| Digital product delivery security | Signed URLs with expiry, RLS policies on storage bucket |

## Migration Plan

1. **Phase 1 - Foundation**: Initialize Next.js project, configure Tailwind/Shadcn, set up Supabase client, create design system tokens
2. **Phase 2 - Landing Page**: Build all landing page sections as Server Components with static data, add interactivity via Client Components
3. **Phase 3 - Booking Portal**: Create inquiry form with RHF/Zod, embed Calendly, build API route for form submission to Supabase
4. **Phase 4 - Digital Store**: Build product grid, product detail modal/page, implement signed URL downloads via Supabase Storage
5. **Phase 5 - Polish**: Add animations (Framer Motion), optimize images, configure Vercel analytics, add error boundaries
6. **Phase 6 - Deploy**: Connect to Vercel, configure environment variables, run Lighthouse audit, launch

**Rollback:** Vercel instant rollback via previous deployment. Database changes are additive only (new tables).

## Open Questions

1. **Calendly vs Custom Booking**: Should we use Calendly embed or build custom availability calendar with Supabase? (Calendly faster for MVP)
2. **Product Delivery**: Instant download vs email delivery? (Instant download via signed URL for MVP)
3. **Analytics**: Vercel Analytics + custom events vs Plausible/GA4? (Vercel Analytics for MVP)
4. **Content Management**: Markdown files in repo vs Supabase content table? (Markdown for static content, Supabase for dynamic)
5. **Email Notifications**: Resend/SendGrid for form submissions? (Resend for transactional emails)