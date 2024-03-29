import * as React from "react";

import { useFormField } from "~/components/form/use-form-field";

import { cn } from "~/lib/tailwind";

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p ref={ref} id={formMessageId} className={cn("absolute -bottom-5 text-xs font-medium text-red-500", className)} {...props}>
      {body}
    </p>
  );
});

FormMessage.displayName = "FormMessage";

export { FormMessage };
