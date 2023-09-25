import * as React from "react";

import SpaceXLogo from "~/assets/logos/spacex.svg?react";

import { ScrollDirection, useWindowScroll } from "~/hooks/useWindowScroll";

import { cn } from "~/lib/tailwind";

import { Nav } from "./nav";
import { ProfileMenu } from "./profile-menu";

const Header = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const { scrollDirection, scrollPositionY } = useWindowScroll();

  return (
    <header
      ref={ref}
      className={cn("fixed left-0 top-0 z-50 flex h-24 w-full items-center bg-transparent px-12", className)}
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
          "container relative flex h-full w-full items-center transition-opacity delay-100 duration-200 ease-linear",
          // Hide Nav Contents
          scrollDirection === ScrollDirection.down && "pointer-events-none opacity-0",
        )}
      >
        <SpaceXLogo className="relative mr-10 h-auto w-[210px] text-white" />
        <Nav />
      </div>

      {/* Header right content */}
      <div
        className={cn(
          "absolute right-12 transition-opacity delay-100 duration-200 ease-linear",
          // Hide Nav Contents
          scrollDirection === ScrollDirection.down && "pointer-events-none opacity-0",
        )}
      >
        <ProfileMenu />
      </div>
    </header>
  );
});

Header.displayName = "Header";

export { Header };
