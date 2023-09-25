import { Section, SectionContent } from "~/features/base-ui";

import ASTRONAUT_OVERVIEW_DATA from "../constants/astronaut-overview-data.json";

function AstronautOverviewSection() {
  return (
    <Section className="h-80">
      <SectionContent className="left-1/2 top-1/2 flex w-3/5 -translate-x-1/2 -translate-y-1/2 items-center justify-around space-x-10">
        {ASTRONAUT_OVERVIEW_DATA.map((record) => (
          <div key={record.field}>
            <p className="mb-4 text-center text-8xl uppercase tracking-wider text-white">{record.value}</p>
            <p className="text-center text-xl uppercase text-white">{record.field}</p>
          </div>
        ))}
      </SectionContent>
    </Section>
  );
}
export { AstronautOverviewSection };
