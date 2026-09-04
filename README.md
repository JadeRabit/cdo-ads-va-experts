# CDO Ads & VA Experts Platform

Modern, high-converting web platform for CDO Ads & VA Experts digital agency.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend
- **Payments**: Stripe
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account (for payments)
- Resend account (for emails)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd cdo-ads-va-experts

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Configure your environment variables in .env.local

# Run development server
npm run dev
```

### Environment Variables

See `.env.example` for required variables:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `RESEND_API_KEY` - Resend API key
- `EMAIL_FROM` - Sender email address
- `NEXT_PUBLIC_CALENDLY_URL` - Calendly embed URL
- `NEXT_PUBLIC_APP_URL` - Application URL

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── booking/           # Booking page
│   ├── products/          # Digital products pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/               # Base UI components (Shadcn)
│   ├── layout/           # Header, Footer
│   ├── landing/          # Landing page sections
│   ├── booking/          # Booking components
│   ├── store/            # Digital store components
│   └── seo/              # SEO components
├── lib/
│   ├── utils.ts          # Utility functions
│   └── supabase/         # Supabase clients
├── public/               # Static assets
└── middleware.ts         # Next.js middleware
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format with Prettier

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database Setup

Run Supabase migrations in the Supabase dashboard or via CLI:

```bash
supabase db push
```

## Features

- 🎨 Dark navy/gold brand theme
- 📱 Fully responsive design
- ♿ WCAG AA accessible
- ⚡ Optimized for Vercel
- 🔒 Secure with Supabase RLS
- 📧 Email notifications via Resend
- 💳 Stripe payments for digital products
- 📅 Calendly integration for bookings

## License

Private - All rights reserved