import { AstronautHeroSection, AstronautInOrbitSection, AstronautModelSection, AstronautOverviewSection } from "~/features/astronaut";
import { Page } from "~/features/base-ui";

function Astronauts() {
  return (
    <Page>
      <AstronautHeroSection />
      <AstronautOverviewSection />
      <AstronautModelSection />
      <AstronautInOrbitSection />
    </Page>
  );
}
export default Astronauts;
