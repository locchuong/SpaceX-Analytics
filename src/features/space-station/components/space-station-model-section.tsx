import * as React from "react";

import SpaceStationModel from "~/assets/images/space-station-model.webp";
import SpaceStationTransparentModel from "~/assets/images/space-station-transparent-model.webp";

import { Table, TableBody, TableCell, TableRow } from "~/components/table";

import { Section, SectionContent } from "~/features/base-ui";

import { useWindowScroll } from "~/hooks/useWindowScroll";

import { cn } from "~/lib/tailwind";

import ASTRONAUT_MODEL_DATA from "../constants/space-station-model-data.json";

// Offsets the scroll min value
const scrollOffset = 0;

function SpaceStationModelSection() {
  const { scrollPositionY } = useWindowScroll();

  // Calculate opacity of model based on scrollY min and max
  const opacity = React.useMemo(() => {
    const min = scrollOffset + window.innerHeight / 2;
    const max = scrollOffset + window.innerHeight;
    const visible = ((scrollPositionY - min) / (max - min)) * 100;
    const clamp = Math.min(Math.max(visible, 0), 100);
    return (clamp / 100).toFixed(2);
  }, [scrollPositionY]);

  return (
    <Section>
      <SectionContent className="container relative flex h-full items-center justify-center space-x-10 bg-gradient-radial from-white/10 to-transparent">
        <div className="w-full max-w-xl">
          <p className="text-xl uppercase text-white">International Space Station</p>
          <p className="mb-10 text-4xl font-bold uppercase text-white">Overview</p>
          <Table className="[&>tbody>tr>td:first-child]:uppercase [&>tbody>tr>td:last-child]:text-right">
            <TableBody>
              {ASTRONAUT_MODEL_DATA.map((record) => (
                <TableRow key={record.field}>
                  <TableCell>{record.field}</TableCell>
                  <TableCell>
                    {typeof record.value === "string" ? record.value : record.value.toLocaleString("en-US")}{" "}
                    <span className="text-zinc-400">{record.units}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="relative flex h-full flex-1 items-center ">
          <img
            className={cn("absolute left-0 top-0 h-full w-full object-contain brightness-100 ")}
            src={SpaceStationModel}
            style={{ opacity: Number(opacity) }}
            alt="Internation Space Station"
          />
          <img
            className={cn("absolute left-0 top-0 h-full w-full object-contain")}
            src={SpaceStationTransparentModel}
            alt="Internation Space Station Line art"
            style={{ opacity: 1 - Number(opacity) }}
          />
          <div className="absolute bottom-[10%] right-0 h-1/4 w-full bg-gradient-radial from-white/10 to-transparent"> </div>
        </div>
      </SectionContent>
    </Section>
  );
}
export { SpaceStationModelSection };
