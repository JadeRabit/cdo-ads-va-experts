import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Home, Search, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'Sorry, we couldn\'t find the page you\'re looking for.',
  robots: 'noindex',
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-16 flex items-center justify-center">
        <div className="container-custom text-center py-20">
          <div className="max-w-md mx-auto space-y-8">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gold/10 mx-auto">
              <span className="text-display-xl font-display font-bold text-gold">404</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-display-lg font-display font-bold text-foreground">
                Page Not Found
              </h1>
              <p className="text-body-lg text-foreground-muted">
                Sorry, we couldn't find the page you're looking for. It might have been moved
                or doesn't exist.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/">
                  <Home className="h-5 w-5 mr-2" aria-hidden="true" />
                  Back to Home
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/products">
                  <Search className="h-5 w-5 mr-2" aria-hidden="true" />
                  Browse Products
                </Link>
              </Button>
            </div>
            <p className="text-body-sm text-foreground-muted">
              Think this is a mistake?{' '}
              <a href="mailto:hello@cdoadsvaexperts.com" className="text-gold hover:underline">
                Contact us
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}