import * as React from "react";

import { useAuthState } from "react-firebase-hooks/auth";

import ProfileBackgroundImage from "~/assets/images/profile-background.webp";

import { Button } from "~/components/button";

import { firebaseAuth } from "~/config/firebase";

import { Section, SectionBackground, SectionContent } from "~/features/base-ui";

import { cn } from "~/lib/tailwind";

import { useNavigate } from "~/router";

function ProfileHeroSection() {
  const [user] = useAuthState(firebaseAuth);
  const navigate = useNavigate();

  const [animateIn, setAnimateIn] = React.useState<boolean>(true);

  return (
    <Section className="py-0">
      <SectionBackground src={ProfileBackgroundImage} alt="Profile hero background" />
      <SectionContent className="container left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="mb-4 w-fit max-w-none text-left text-5xl font-bold uppercase tracking-wider text-white duration-700 ease-out animate-in fade-in-0 slide-in-from-bottom-16">
          SpaceX Analytics
        </h1>
        <p className="mb-2 w-fit text-left text-base font-medium tracking-wide text-white duration-700 ease-in-out animate-in fade-in-0 slide-in-from-bottom-16 fill-mode-forwards">
          Welcome, {user?.displayName ?? "Unknown"}!
        </p>
        <p className="mb-6 w-[75ch] text-left text-base tracking-wide text-white duration-700 ease-in-out animate-in fade-in-0 slide-in-from-bottom-16 fill-mode-forwards">
          Your gateway to exploring the groundbreaking achievements and data-driven insights from SpaceX&apos;s visionary space missions. Dive into a
          universe of information, from rocket launches to interplanetary exploration, as we unravel the mysteries of space and innovation. Join us on
          this exhilarating journey, where data meets the cosmos, and explore the limitless possibilities of human space exploration with SpaceX
          Analytics.
        </p>
        <Button
          className={cn("w-full max-w-xs ease-in-out animate-in fade-in-0 slide-in-from-bottom-16 fill-mode-forwards", animateIn && "duration-700")}
          variant="outlined"
          type="button"
          onAnimationEnd={() => setAnimateIn(false)}
          onClick={() => navigate("/astronauts")}
        >
          Get Started
        </Button>
      </SectionContent>
    </Section>
  );
}
export { ProfileHeroSection };
