import SpaceStationBackgroundImage from "~/assets/images/space-station-background.webp";

import { Section, SectionBackground, SectionContent } from "~/features/base-ui";

function SpaceStationHeroSection() {
  return (
    <Section className="py-0">
      <SectionBackground src={SpaceStationBackgroundImage} alt="TODO" />
      <SectionContent className="left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2">
        <p className="mb-4 max-w-none text-center text-5xl font-bold uppercase tracking-wider text-white duration-700 ease-out animate-in fade-in-0 slide-in-from-bottom-16">
          International Space Station
        </p>
        <p className="text-center text-base font-medium uppercase tracking-wide text-white duration-700 ease-in-out animate-in fade-in-0 slide-in-from-bottom-16 fill-mode-forwards">
          Earth&apos;s Space Outpost
        </p>
      </SectionContent>
    </Section>
  );
}
export { SpaceStationHeroSection };
