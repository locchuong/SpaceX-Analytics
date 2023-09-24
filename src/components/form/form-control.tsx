import * as React from "react";

import { Slot } from "@radix-ui/react-slot";

import { useFormField } from "~/components/form/use-form-field";

import { cn } from "~/lib/tailwind";

// Placeholder for Form Input
const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(({ className, ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      className={cn("mb-3 transition-[margin] duration-75", error && "mb-9", className)}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

export { FormControl };
