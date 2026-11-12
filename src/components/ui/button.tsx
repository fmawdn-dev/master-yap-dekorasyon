import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gold: "bg-gradient-gold text-gold-foreground shadow-gold hover:-translate-y-0.5 hover:scale-[1.03] hover:brightness-105 active:scale-[0.98]",
        ink: "bg-ink text-ink-foreground shadow-soft hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-ink-soft active:scale-[0.98]",
        glass:
          "border border-ink-foreground/30 bg-ink-foreground/10 text-ink-foreground backdrop-blur-md hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-ink-foreground/20 active:scale-[0.98]",
        whatsapp:
          "bg-whatsapp text-whatsapp-foreground shadow-soft hover:-translate-y-0.5 hover:scale-[1.03] hover:brightness-110 active:scale-[0.98]",
        soft: "border border-border bg-card text-foreground shadow-soft hover:-translate-y-0.5 hover:border-gold hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-11 px-6",
        xl: "h-13 px-7 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
