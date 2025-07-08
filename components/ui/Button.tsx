// File: components/ui/Button.tsx
'use client'; // This is a client component because it uses forwardRef and event handlers

import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils'; // We just created this!

// Define the styles for all button variants and sizes
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-brand-primary text-white hover:bg-brand-primary/90',
        destructive: 'bg-red-600 text-white hover:bg-red-600/90',
        outline: 'border border-brand-secondary bg-transparent text-brand-secondary hover:bg-brand-secondary hover:text-white',
        secondary: 'bg-brand-secondary text-white hover:bg-brand-secondary/80',
        ghost: 'hover:bg-gray-100',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };