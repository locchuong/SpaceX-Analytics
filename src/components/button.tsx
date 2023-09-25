import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/tailwind";

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center border border-transparent font-medium tracking-wider ring-offset-2 transition-colors focus-visible:outline-none",
    "focus-visible:ring-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ),
  {
    variants: {
      variant: {
        contained: "bg-zinc-800 text-white hover:bg-zinc-800/90 focus-visible:ring-slate-800",
        outlined: cn(
          "relative border-neutral-300 bg-transparent text-zinc-800 hover:bg-zinc-800 hover:text-white",
          "dark:border-white dark:text-white dark:hover:bg-transparent dark:hover:text-black",
          // Dark Mode Hover Animation
          "dark:before:absolute dark:before:left-0 dark:before:top-0 dark:before:-z-10 dark:before:h-0 dark:before:w-full dark:before:bg-white dark:before:transition-[height] dark:before:duration-300 dark:before:ease-out",
          "dark:hover:before:bottom-0 dark:hover:before:right-0 dark:hover:before:top-auto dark:hover:before:h-full",
        ),
      },
      size: {
        md: "h-12 px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "contained",
      size: "md",
    },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps & VariantProps<typeof buttonVariants>>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
