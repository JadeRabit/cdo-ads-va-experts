import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-gold text-navy hover:bg-gold-light',
        gold: 'bg-gold text-navy',
        navy: 'bg-navy-light text-gold border border-gold/30',
        outline: 'text-gold border border-gold bg-transparent',
        secondary: 'bg-navy-light text-foreground-muted border border-border',
        destructive: 'bg-red-500/20 text-red-400 border border-red-500/30',
        success: 'bg-green-500/20 text-green-400 border border-green-500/30',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-[10px]',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size, className }))} {...props} />;
}

export { Badge, badgeVariants };