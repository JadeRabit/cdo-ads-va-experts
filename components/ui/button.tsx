import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-fast focus-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-gold text-navy hover:bg-gold-light hover:shadow-gold',
        outline: 'border-2 border-gold text-gold bg-transparent hover:bg-gold/10 hover:shadow-gold',
        ghost: 'text-gold hover:bg-gold/10 hover:shadow-gold',
        gold: 'bg-gold text-navy hover:bg-gold-light hover:shadow-gold',
        navy: 'bg-navy-light text-gold border border-gold/30 hover:bg-navy hover:border-gold hover:shadow-gold',
        destructive: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-red-600/30',
        secondary: 'bg-navy-light text-foreground border border-border hover:bg-navy hover:border-gold/50',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-lg px-8 text-base',
        xl: 'h-12 rounded-xl px-10 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    // For Slot, we need exactly one child element
    const childContent = loading
      ? (
        <>
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Loading...</span>
        </>
      )
      : children;

    // When using Slot, wrap multiple children in a single span to satisfy single-child requirement
    const content = asChild && !loading && React.Children.count(children) > 1
      ? <span className="inline-flex items-center justify-center">{children}</span>
      : childContent;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };