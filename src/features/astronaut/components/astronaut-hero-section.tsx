import AstronautsBackgroundImage from "~/assets/images/astronauts-background.webp";

import { Section, SectionBackground, SectionContent } from "~/features/base-ui";

function AstronautHeroSection() {
  return (
    <Section className="py-0">
      <SectionBackground src={AstronautsBackgroundImage} alt="Astronauts hero background" />
      <SectionContent className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="mb-4 max-w-none text-center text-5xl font-bold uppercase tracking-wider text-white duration-700 ease-out animate-in fade-in-0 slide-in-from-bottom-16">
          Astronauts
        </h1>
        <p className="text-center text-base font-medium uppercase tracking-wide text-white duration-700 ease-in-out animate-in fade-in-0 slide-in-from-bottom-16 fill-mode-forwards">
          Making Life Multiplanetary
        </p>
      </SectionContent>
    </Section>
  );
}
export { AstronautHeroSection };
