import * as React from "react";

import { ScrollDirection, useWindowScroll } from "~/hooks/useWindowScroll";

import { cn } from "~/lib/tailwind";

const Header = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => {
  const { scrollDirection, scrollPositionY } = useWindowScroll();

  return (
    <header
      ref={ref}
      className={cn("fixed top-0 z-20 flex h-24 w-full items-center overflow-hidden bg-transparent px-12", className)}
      role="navigation"
      {...props}
    >
      {/* Header background */}
      <div
        className={cn(
          "bg-translate absolute left-0 top-0 h-full w-full transition-all delay-150 duration-700 ease-exponential will-change-transform",
          // Show background
          scrollDirection === ScrollDirection.up && scrollPositionY >= window.innerHeight && "transform-none bg-black delay-0",
          // Hide background
          scrollDirection === ScrollDirection.down && "-translate-y-full opacity-0",
        )}
      >
        {" "}
      </div>

      {/* Header content */}
      <div
        className={cn(
          "relative flex h-full w-full max-w-[1400px] items-center transition-opacity delay-100 duration-200 ease-linear",
          // Hide Nav Contents
          scrollDirection === ScrollDirection.down && "opacity-0",
        )}
      >
        {children}
      </div>
    </header>
  );
});

Header.displayName = "Header";

export { Header };
