import { Section, SectionContent } from "~/features/base-ui";

import ASTRONAUT_OVERVIEW_DATA from "../constants/astronaut-overview-data.json";
import { CountUpItem } from "./count-up-item";

function AstronautOverviewSection() {
  return (
    <Section className="h-80">
      <SectionContent className="left-1/2 top-1/2 flex w-3/5 -translate-x-1/2 -translate-y-1/2 items-center justify-around space-x-10">
        {ASTRONAUT_OVERVIEW_DATA.map((record) => (
          <CountUpItem key={record.field} field={record.field} value={record.value} />
        ))}
      </SectionContent>
    </Section>
  );
}
export { AstronautOverviewSection };
