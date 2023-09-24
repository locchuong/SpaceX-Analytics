import * as React from "react";

import * as LabelPrimitive from "@radix-ui/react-label";

import { useFormField } from "~/components/form/use-form-field";
import { Label } from "~/components/label";

import { cn } from "~/lib/tailwind";

const FormLabel = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(
  ({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField();

    return <Label ref={ref} className={cn(error && "", className)} htmlFor={formItemId} {...props} />;
  },
);
FormLabel.displayName = "FormLabel";

export { FormLabel };
