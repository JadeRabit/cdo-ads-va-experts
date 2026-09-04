'use client';

import * as React from 'react';
import Script from 'next/script';
import { cn } from '@/lib/utils';

interface CalendlyEmbedProps {
  url?: string;
  className?: string;
}

export function CalendlyEmbed({ url = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-link', className }: CalendlyEmbedProps) {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const widget = containerRef.current.querySelector('[data-calendly-widget]');
    if (widget) {
      setLoaded(true);
    }
  }, []);

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://calendly.com') return;
      if (event.data.event === 'calendly.widget_loaded') {
        setLoaded(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className={cn('relative', className)}>
      {!loaded && !error && (
        <div className="aspect-video bg-navy-light rounded-xl border border-border flex items-center justify-center">
          <div className="text-center p-6">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent mx-auto mb-4" aria-hidden="true" />
            <p className="text-body text-foreground-muted">Loading scheduler...</p>
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        className={cn('w-full', loaded ? 'block' : 'hidden')}
        data-calendly-widget
      >
        <div className="calendly-inline-widget" data-url={url} style={{ minHeight: '600px' }} />
      </div>

      {error && (
        <div className="aspect-video bg-navy-light rounded-xl border border-border flex flex-col items-center justify-center p-6 text-center">
          <p className="text-body text-foreground-muted mb-4">Unable to load scheduler</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            Open Calendly in new tab →
          </a>
        </div>
      )}

      <Script
        id="calendly-script"
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onError={() => setError(true)}
      />
    </div>
  );
}