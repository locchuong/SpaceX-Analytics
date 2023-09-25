import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { Button } from "~/components/button";
import { Table, TableBody, TableCell, TableRow } from "~/components/table";

import { Section, SectionContent } from "~/features/base-ui";

import { useGetISSLocation } from "../api/getISSLocation";

const MAP_REFRESH_INTERVAL_MS = 5000;

function SpaceStationMapSection() {
  const { data: ISSData } = useGetISSLocation({
    query: {
      refetchInterval: MAP_REFRESH_INTERVAL_MS,
    },
  });

  return (
    <Section className="h-auto">
      <SectionContent className="container relative flex h-full items-start justify-center space-x-10 bg-gradient-radial from-white/10 to-transparent">
        <div className="w-full max-w-xl space-y-6">
          <p className="text-4xl font-bold uppercase text-white">Spot The Station</p>
          <p className="text-base text-white">
            Explore our interactive map and stay connected with the ISS as it orbits Earth, providing awe-inspiring views of our planet from space.
            Join us on this celestial journey and witness the wonders of outer space from the comfort of your screen
          </p>
          <Button
            className="w-full max-w-xs uppercase"
            type="button"
            aria-label="Learn more about the International Space Station"
            variant="outlined"
          >
            Learn More
          </Button>
        </div>
        <div className="relative flex h-full flex-1 flex-col items-center justify-center">
          <div className="h-96 w-full border border-white/30 p-2">
            {ISSData?.data && (
              <MapContainer
                className="h-full w-full"
                center={[Number(ISSData.data.iss_position.latitude), Number(ISSData.data.iss_position.longitude)]}
                zoom={2}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[Number(ISSData.data.iss_position.latitude), Number(ISSData.data.iss_position.longitude)]}>
                  <Popup>International Space Station</Popup>
                </Marker>
              </MapContainer>
            )}
          </div>
          <Table className="[&>tbody>tr>td:first-child]:uppercase [&>tbody>tr>td:last-child]:text-right [&>tbody>tr>td]:w-1/2">
            <TableBody>
              <TableRow>
                <TableCell>Longitude</TableCell>
                <TableCell>
                  {ISSData?.data.iss_position.longitude} <span className="text-zinc-400">Degrees</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Latitude</TableCell>
                <TableCell>
                  {ISSData?.data.iss_position.latitude} <span className="text-zinc-400">Degrees</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </SectionContent>
    </Section>
  );
}
export { SpaceStationMapSection };
