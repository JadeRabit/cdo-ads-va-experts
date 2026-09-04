'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, CheckCircle2, FileText, Shield, ArrowLeft, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  currency: string;
  image: string;
  imageAlt: string;
  features: string[];
  category: string;
  isFree: boolean;
  fileFormat: string;
  fileSize: string;
}

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [downloading, setDownloading] = React.useState(false);
  const [downloadStatus, setDownloadStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  const handleDownload = async () => {
    setDownloading(true);
    setDownloadStatus('idle');
    try {
      if (product.isFree) {
        // Free product - direct download via signed URL
        const response = await fetch(`/api/download?slug=${product.slug}`);
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${product.slug}.zip`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          setDownloadStatus('success');
          toast({
            title: 'Download Started',
            description: 'Your file is downloading now.',
            variant: 'success',
          });
        } else {
          setDownloadStatus('error');
          toast({
            title: 'Download Failed',
            description: 'Please try again or contact support.',
            variant: 'destructive',
          });
        }
      } else {
        // Paid product - redirect to Stripe Checkout
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: product.id,
            customerEmail: '', // Would need to get from auth or prompt
            customerName: '',
          }),
        });
        const data = await response.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          setDownloadStatus('error');
          toast({
            title: 'Checkout Failed',
            description: data.error || 'Please try again.',
            variant: 'destructive',
          });
        }
      }
    } catch {
      setDownloadStatus('error');
      toast({
        title: 'Download Failed',
        description: 'Please try again or contact support.',
        variant: 'destructive',
      });
    } finally {
      setDownloading(false);
    }
  };

  const priceText = product.isFree ? 'Free' : formatCurrency(product.price, product.currency);

  return (
    <article className="section-padding bg-navy" aria-labelledby="product-name">
      <div className="container-custom">
        {/* Live region for download status */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {downloadStatus === 'success' && 'Download started successfully.'}
          {downloadStatus === 'error' && 'Download failed. Please try again.'}
          {downloading && 'Preparing download...'}
        </div>

        <Link
          href="/products"
          className="inline-flex items-center space-x-1 text-body-sm text-foreground-muted hover:text-gold transition-colors mb-8 focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy rounded"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to Products</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="relative aspect-square max-w-xl mx-auto lg:mx-0">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent rounded-2xl blur-xl" aria-hidden="true" />
            <div className="relative rounded-2xl overflow-hidden border border-border bg-navy-light shadow-gold-lg">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <Badge variant={product.isFree ? 'success' : 'gold'} aria-label={`Category: ${product.category}`}>
                  {product.category}
                </Badge>
                {product.isFree && (
                  <Badge variant="outline" className="gap-1" aria-label="Free product">
                    <Download className="h-3 w-3" aria-hidden="true" />
                    Free
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <header className="space-y-4">
              <h1 id="product-name" className="text-display-lg font-display font-bold text-foreground">
                {product.name}
              </h1>
              <p className="text-body-lg text-foreground-muted">{product.shortDescription}</p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="text-display-sm font-display font-bold text-foreground" aria-label={`Price: ${priceText}`}>
                  {priceText}
                </div>
                {product.isFree && (
                  <Badge variant="success" className="gap-1.5" aria-label="Instant download available">
                    <Download className="h-3 w-3" aria-hidden="true" />
                    Instant Download
                  </Badge>
                )}
              </div>
            </header>

            <section aria-labelledby="features-heading" className="p-4 rounded-xl bg-navy-light border border-border space-y-3">
              <h3 id="features-heading" className="font-semibold text-foreground">What You'll Get</h3>
              <ul className="space-y-2" role="list">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3 text-body-sm">
                    <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="specs-heading" className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-navy-light border border-border">
              <h3 id="specs-heading" className="sr-only">Product Specifications</h3>
              <div className="flex items-center space-x-3 p-3 bg-navy rounded-lg">
                <FileText className="h-5 w-5 text-gold" aria-hidden="true" />
                <div>
                  <p className="text-caption text-foreground-muted">Format</p>
                  <p className="text-body-sm font-medium text-foreground">{product.fileFormat}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-navy rounded-lg">
                <Shield className="h-5 w-5 text-gold" aria-hidden="true" />
                <div>
                  <p className="text-caption text-foreground-muted">Size</p>
                  <p className="text-body-sm font-medium text-foreground">{product.fileSize}</p>
                </div>
              </div>
            </section>

            <section aria-labelledby="download-heading" className="pt-4 border-t border-border">
              <h3 id="download-heading" className="sr-only">Download Options</h3>
              <Button
                size="xl"
                className="w-full justify-center gap-2"
                onClick={handleDownload}
                disabled={downloading}
                variant={product.isFree ? 'default' : 'outline'}
                aria-busy={downloading}
                aria-disabled={downloading}
              >
                {downloading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Preparing download...
                  </>
                ) : product.isFree ? (
                  <>
                    <Download className="h-5 w-5" aria-hidden="true" />
                    Download Now — Free
                  </>
                ) : (
                  <>
                    <ExternalLink className="h-5 w-5" aria-hidden="true" />
                    Purchase & Download
                  </>
                )}
              </Button>

              <div aria-live="polite" className="mt-3">
                <p className="text-center text-body-sm text-foreground-muted" role="status">
                  {product.isFree
                    ? 'Instant download. No email required.'
                    : 'Secure checkout via Stripe. Instant access after payment.'}
                </p>
                {downloadStatus === 'error' && (
                  <div role="alert" className="mt-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center space-x-2 text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="text-body-sm">Download failed. Please try again.</span>
                  </div>
                )}
                {downloadStatus === 'success' && (
                  <div role="status" className="mt-2 p-3 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center space-x-2 text-green-400">
                    <CheckCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="text-body-sm">Download started successfully.</span>
                  </div>
                )}
              </div>
            </section>

            <div className="p-4 rounded-xl bg-gold/5 border border-gold/20" role="note">
              <p className="text-body-sm text-navy">
                <strong>Lifetime updates included.</strong> When we update templates or add new resources,
                you get access at no extra cost.
              </p>
            </div>
          </div>
        </div>

        <section aria-labelledby="details-heading" className="mt-16">
          <h2 id="details-heading" className="text-display-md font-display font-bold text-foreground text-center mb-10">
            Full Product Details
          </h2>
          <div className="max-w-3xl mx-auto prose prose-invert max-w-none">
            <div className="space-y-6 text-body-lg text-foreground-muted">
              {product.description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}