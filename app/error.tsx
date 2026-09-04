'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Home, RefreshCw, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen pt-16 flex items-center justify-center">
        <div className="container-custom text-center py-20">
          <div className="max-w-md mx-auto space-y-8">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10 mx-auto">
              <AlertCircle className="h-12 w-12 text-red-500" aria-hidden="true" />
            </div>
            <div className="space-y-4">
              <h1 className="text-display-lg font-display font-bold text-foreground">
                Something Went Wrong
              </h1>
              <p className="text-body-lg text-foreground-muted">
                We're sorry, but an unexpected error occurred. Our team has been notified.
              </p>
              {error.digest && (
                <p className="text-body-sm text-foreground/50 font-mono">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={reset}>
                <RefreshCw className="h-5 w-5 mr-2" aria-hidden="true" />
                Try Again
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/">
                  <Home className="h-5 w-5 mr-2" aria-hidden="true" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}