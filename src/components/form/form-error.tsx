import * as React from "react";

import { cn } from "~/lib/tailwind";

const FormError = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-red-800", className)} {...props} />
));

FormError.displayName = "FormError";

export { FormError };
