
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const actionCardVariants = cva(
  "group flex flex-col rounded-lg p-4 transition-all hover:shadow-md cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-card hover:bg-muted/50",
        outline: "border border-border hover:bg-muted/50",
        ghost: "hover:bg-muted/50",
        purple: "bg-wemakit-purple/10 hover:bg-wemakit-purple/20 text-wemakit-purple",
        blue: "bg-blue-500/10 hover:bg-blue-500/20 text-blue-500",
        orange: "bg-orange-500/10 hover:bg-orange-500/20 text-orange-500",
        green: "bg-green-500/10 hover:bg-green-500/20 text-green-500",
      },
      size: {
        default: "gap-3",
        sm: "gap-2",
        lg: "gap-4",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
);

export interface ActionCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof actionCardVariants> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  as?: React.ElementType;
  href?: string;
  to?: string; // Support for React Router's Link
}

const ActionCard = React.forwardRef<HTMLDivElement, ActionCardProps>(
  ({ className, variant, size, icon, title, description, as, href, ...props }, ref) => {
    const Component = as || (href ? 'a' : 'div');
    const linkProps = href ? { href } : {};
    
    return (
      <Component
        ref={ref}
        className={cn(actionCardVariants({ variant, size, className }))}
        {...linkProps}
        {...props}
      >
        {icon && (
          <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-background group-hover:scale-110 transition-transform">
            {icon}
          </div>
        )}
        <div className="space-y-1.5">
          <h3 className="font-medium">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </Component>
    );
  }
);
ActionCard.displayName = "ActionCard";

export { ActionCard, actionCardVariants };
