import * as React from "react";

import { cn } from "~/lib/tailwind";

const Footer = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className, ...props }, ref) => (
  <footer ref={ref} className={cn("mx-auto flex h-14 items-baseline justify-center space-x-5 py-5", className)} role="navigation" {...props}>
    <p className="text-xs text-neutral-400">SPACEX © 2023</p>
    <a className="text-xs font-bold uppercase text-white" href="#main">
      Privacy policy
    </a>
    <a className="text-xs font-bold uppercase text-white" href="#main">
      Suppliers
    </a>
  </footer>
));

Footer.displayName = "Footer";

export { Footer };
