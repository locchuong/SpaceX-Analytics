import * as React from "react";

import { cva, VariantProps } from "class-variance-authority";

import { cn } from "~/lib/tailwind";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const inputVariants = cva(
  cn(
    "peer relative flex h-12 w-full border border-neutral-200 bg-transparent px-[10px] py-1 pb-[10px] pt-4 text-sm transition-colors dark:border-white dark:text-white",
    "placeholder:text-muted-foreground",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-300 dark:focus-visible:ring-blue-400",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
  ),
);

const Input = React.forwardRef<HTMLInputElement, InputProps & VariantProps<typeof inputVariants>>(
  ({ className, type, placeholder, ...props }, ref) => (
    <input type={type} className={cn(inputVariants(), className)} ref={ref} placeholder={placeholder ?? " "} {...props} />
  ),
);
Input.displayName = "Input";

export { Input };
