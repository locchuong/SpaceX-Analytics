import { Page } from "~/features/base-ui";
import { SpaceStationHeroSection, SpaceStationMapSection, SpaceStationModelSection } from "~/features/space-station";

function SpaceStation() {
  return (
    <Page>
      <SpaceStationHeroSection />
      <SpaceStationModelSection />
      <SpaceStationMapSection />
    </Page>
  );
}
export default SpaceStation;
