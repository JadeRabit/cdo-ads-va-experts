'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ExternalLink, CheckCircle2 } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  price: number;
  currency: string;
  image: string;
  imageAlt: string;
  features: string[];
  category: string;
  isFree: boolean;
  icon: React.ReactNode;
  gradient: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const priceText = product.isFree ? 'Free' : formatCurrency(product.price, product.currency);
  const cardId = `product-${product.id}`;

  return (
    <article className="group" role="listitem" aria-labelledby={`${cardId}-title`}>
      <Card className="h-full flex flex-col overflow-hidden border-border hover:border-gold/30 transition-all duration-normal bg-navy-light">
        <div className="relative aspect-video overflow-hidden">
          <div 
            className="absolute inset-0 rounded-t-2xl bg-gradient-to-br"
            style={{ background: product.gradient }}
            aria-hidden="true"
          />
          <div 
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity duration-500">
              {product.icon}
            </div>
          </div>
          <div className="absolute top-3 left-3">
            <Badge variant={product.isFree ? 'success' : 'gold'} className="text-xs" aria-label={`Category: ${product.category}`}>
              {product.category}
            </Badge>
          </div>
          {product.isFree && (
            <div className="absolute top-3 right-3">
              <Badge variant="outline" className="text-xs gap-1" aria-label="Free product">
                <Download className="h-3 w-3" aria-hidden="true" />
                Free Download
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="flex flex-col flex-1 p-5">
          <h3 id={`${cardId}-title`} className="text-display-sm font-display font-semibold text-foreground mb-2 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-body-sm text-foreground-muted mb-4 flex-1 line-clamp-2">
            {product.shortDescription}
          </p>

          <ul className="space-y-2 mb-4" role="list" aria-label={`${product.name} key features`}>
            {product.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start space-x-2 text-body-sm text-foreground-muted">
                <CheckCircle2 className="h-4 w-4 text-gold/70 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
            {product.features.length > 3 && (
              <li className="flex items-start space-x-2 text-body-sm text-gold">
                <ExternalLink className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
                <span>+{product.features.length - 3} more features</span>
              </li>
            )}
          </ul>
        </CardContent>

        <CardFooter className="pt-0 pb-5 px-5">
          <div className="flex items-center justify-between w-full">
            <div className="text-display-sm font-display font-bold text-foreground" aria-label={`Price: ${priceText}`}>
              {priceText}
            </div>
            <Button
              size="sm"
              variant={product.isFree ? 'default' : 'outline'}
              className="gap-1.5"
              asChild
            >
              <Link
                href={`/products/${product.slug}`}
                aria-label={product.isFree ? `Download ${product.name} for free` : `View details for ${product.name}`}
              >
                {product.isFree ? (
                  <>
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Download
                  </>
                ) : (
                  <>
                    View Details
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </article>
  );
}