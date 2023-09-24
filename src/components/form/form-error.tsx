import * as React from "react";

import WarningCircleIcon from "~/assets/icons/warning-circle.svg?react";

import { Alert, AlertDescription, AlertTitle } from "~/components/alert";

import { cn } from "~/lib/tailwind";

const FormError = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => (
  <Alert variant="danger" ref={ref} className={cn("mb-4", className)} {...props}>
    <WarningCircleIcon className="h-5 w-5" />
    <AlertTitle> </AlertTitle>
    <AlertDescription>{children}</AlertDescription>
  </Alert>
));

FormError.displayName = "FormError";

export { FormError };
