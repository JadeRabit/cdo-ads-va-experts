'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className, variant = 'text', width, height }: SkeletonProps) {
  const baseStyles = 'animate-pulse bg-navy-light rounded';

  const variantStyles = {
    text: 'h-4 w-full',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], className)}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-xl border border-border bg-navy-light p-6 space-y-4', className)}>
      <Skeleton variant="rectangular" width="40%" height={28} />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="100%" />
      <div className="space-y-3">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
      </div>
      <Skeleton variant="rectangular" width="100%" height={40} />
    </div>
  );
}

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-xl border border-border bg-navy-light overflow-hidden', className)}>
      <Skeleton variant="rectangular" className="aspect-video w-full" />
      <div className="p-5 space-y-4">
        <Skeleton variant="rectangular" width="30%" height={24} />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
        <div className="space-y-2">
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Skeleton variant="rectangular" width="25%" height={28} />
          <Skeleton variant="rectangular" width="30%" height={40} />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" aria-label="Loading products" role="list">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TestimonialSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-xl border border-border bg-navy-light p-6 lg:p-8 flex flex-col h-full', className)}>
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} variant="circular" width={20} height={20} />
        ))}
      </div>
      <Skeleton variant="rectangular" width={40} height={40} className="mb-4" />
      <Skeleton variant="text" width="100%" className="mb-6" />
      <Skeleton variant="text" width="100%" className="mb-6" />
      <Skeleton variant="rectangular" width="25%" height={28} className="mb-4" />
      <div className="flex items-center space-x-3 pt-4 border-t border-border">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
    </div>
  );
}

export function FormSkeleton({ className, fields = 5 }: { className?: string; fields?: number }) {
  return (
    <div className={cn('space-y-4', className)}>
      {[...Array(fields)].map((_, i) => (
        <Skeleton key={i} variant="rectangular" width="100%" height={48} />
      ))}
      <Skeleton variant="rectangular" width="100%" height={48} />
    </div>
  );
}

export function HeroSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('max-w-4xl mx-auto text-center space-y-8', className)}>
      <Skeleton variant="rectangular" width="40%" height={32} className="mx-auto" />
      <Skeleton variant="text" width="90%" className="mx-auto" />
      <Skeleton variant="text" width="70%" className="mx-auto" />
      <Skeleton variant="text" width="50%" className="mx-auto" />
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Skeleton variant="rectangular" width={200} height={52} />
        <Skeleton variant="rectangular" width={200} height={52} />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center space-x-2">
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="text" width={100} />
          </div>
        ))}
      </div>
    </div>
  );
}