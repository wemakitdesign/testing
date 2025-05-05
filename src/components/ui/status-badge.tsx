
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary",
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        danger: "bg-destructive/10 text-destructive",
        info: "bg-blue-500/10 text-blue-500",
        pending: "bg-yellow-500/10 text-yellow-500",
        completed: "bg-green-500/10 text-green-500",
        cancelled: "bg-gray-500/10 text-gray-500",
        inProgress: "bg-wemakit-purple/10 text-wemakit-purple",
        highPriority: "bg-red-500/10 text-red-500",
        mediumPriority: "bg-orange-500/10 text-orange-500",
        lowPriority: "bg-blue-500/10 text-blue-500",
      },
      pulse: {
        true: "animate-pulse",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      pulse: false,
    }
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  icon?: React.ReactNode;
}

const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ className, variant, pulse, icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(statusBadgeVariants({ variant, pulse, className }))}
        {...props}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </div>
    );
  }
);
StatusBadge.displayName = "StatusBadge";

export { StatusBadge, statusBadgeVariants };
