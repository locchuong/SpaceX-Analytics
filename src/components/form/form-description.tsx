import * as React from "react";

import { useFormField } from "~/components/form/use-form-field";

import { cn } from "~/lib/tailwind";

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return <p ref={ref} id={formDescriptionId} className={cn("text-[0.8rem] text-muted-foreground", className)} {...props} />;
});
FormDescription.displayName = "FormDescription";

export { FormDescription };
