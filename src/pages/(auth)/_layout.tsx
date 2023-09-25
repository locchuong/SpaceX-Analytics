import { Outlet } from "react-router-dom";

import AuthBackgroundImage from "~/assets/images/auth-background.webp";
import SpaceXLogo from "~/assets/logos/spacex.svg?react";

import { CompanyPolicy } from "~/features/auth";

import { cn } from "~/lib/tailwind";

function AuthLayout() {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-zinc-400 to-zinc-800 pl-0 sm:pl-4">
      <img
        className="absolute left-0 top-0 h-full w-full object-cover opacity-25 mix-blend-luminosity"
        src={AuthBackgroundImage}
        alt="Astronauts floating by a Space Station"
      />
      <main id="main" className={cn("relative h-full max-w-none bg-white px-4 py-6", "sm:max-w-lg sm:px-14 sm:py-10")}>
        <SpaceXLogo />
        <Outlet />
        <CompanyPolicy />
      </main>
    </div>
  );
}
export default AuthLayout;
