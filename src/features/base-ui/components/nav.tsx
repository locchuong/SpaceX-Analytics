import * as React from "react";

import { cn } from "~/lib/tailwind";

import { Link } from "~/router";

const Nav = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ ...props }, ref) => (
  <nav ref={ref} {...props}>
    <ul className="flex w-full flex-row">
      <li>
        <Link
          to="/"
          className={cn(
            "relative mx-3 text-sm font-semibold uppercase text-white",
            "before:absolute before:-bottom-0.5 before:right-0 before:h-px before:w-0 before:bg-white before:transition-[width] before:duration-200 before:ease-linear",
            "hover:before:left-0 hover:before:right-auto hover:before:w-full",
          )}
          aria-label="Profile Page"
        >
          Profile
        </Link>
      </li>
      <li>
        <Link
          to="/astronauts"
          className={cn(
            "relative mx-3 text-sm font-semibold uppercase text-white",
            "before:absolute before:-bottom-0.5 before:right-0 before:h-px before:w-0 before:bg-white before:transition-[width] before:duration-200 before:ease-linear",
            "hover:before:left-0 hover:before:right-auto hover:before:w-full",
          )}
          aria-label="Learn about the Astronauts currently in space"
        >
          Astronauts
        </Link>
      </li>
      <li>
        <Link
          to="/iss-location"
          className={cn(
            "relative mx-3 text-sm font-semibold uppercase text-white",
            "before:absolute before:-bottom-0.5 before:right-0 before:h-px before:w-0 before:bg-white before:transition-[width] before:duration-200 before:ease-linear",
            "hover:before:left-0 hover:before:right-auto hover:before:w-full",
          )}
          aria-label="Learn about the International Space Station"
        >
          ISS Location
        </Link>
      </li>
    </ul>
  </nav>
));

Nav.displayName = "Nav";

export { Nav };
