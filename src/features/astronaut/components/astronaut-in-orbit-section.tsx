import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import FakeUserImage from "~/assets/images/fake-user.jpg";

import { Button } from "~/components/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/form";
import { Input } from "~/components/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/table";

import { Section, SectionContent } from "~/features/base-ui";

import { useGetAstronauts } from "../api/getAstronauts";
import ASTRONAUT_TABLE_DATA from "../constants/astronaut-table-data.json";

const formSchema = z.object({
  keywords: z.string(),
});

function AstronautInOrbitSection() {
  const { data: astronautsData } = useGetAstronauts();

  const [keyword, setKeyword] = React.useState<string | null>(null);

  // Filters
  const [nationality, setNationality] = React.useState<string>("Any");
  const [craft, setCraft] = React.useState<string>("Any");
  const [launchDate, setLaunchDate] = React.useState<string>("Any");
  const [landingDate, setLandingDate] = React.useState<string>("Any");

  // Filtered and enriched data, used as the data displayed
  const filteredData = React.useMemo(
    () =>
      // Add additional fields to API data
      (astronautsData?.data.people ?? [])
        .map((record) => {
          const additionalFields = ASTRONAUT_TABLE_DATA[record.name as keyof typeof ASTRONAUT_TABLE_DATA];
          return {
            ...record,
            ...additionalFields,
          };
        })
        // Filter data based on dropdowns
        .filter((record) => (nationality === "Any" ? true : record.nationality === nationality))
        .filter((record) => (craft === "Any" ? true : record.craft === craft))
        .filter((record) => (launchDate === "Any" ? true : record.launchDate === launchDate))
        .filter((record) => (landingDate === "Any" ? true : record.landingDate === landingDate))
        // Filter based on keyword
        .filter((record) =>
          keyword
            ? record.name.includes(keyword) ||
              record.role.includes(keyword) ||
              record.craft.includes(keyword) ||
              record.nationality.includes(keyword) ||
              record.launchDate.includes(keyword) ||
              record.landingDate.includes(keyword)
            : true,
        ),
    [astronautsData, nationality, craft, launchDate, landingDate, keyword],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keywords: "",
    },
    mode: "onSubmit",
  });

  function handleKeywords(values: z.infer<typeof formSchema>) {
    setKeyword(values.keywords || null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.handleSubmit(handleKeywords)(e);
  }

  return (
    <Section className="h-auto min-h-screen">
      <SectionContent className="container relative flex h-full flex-col items-center justify-start space-y-10">
        {/* Table Search */}
        <Form {...form}>
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormLabel className="font-bold">KEYWORDS</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" variant="outlined">
              Search
            </Button>
          </form>
        </Form>
        {/* Table Filters */}
        <div className="flex w-full space-x-3">
          <Select value={nationality} onValueChange={setNationality}>
            <SelectTrigger className="flex-1" aria-label="Filter astronauts by nationality">
              <SelectLabel>Nationality</SelectLabel>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Any">Any</SelectItem>
                <SelectItem value="Russian">Russian</SelectItem>
                <SelectItem value="American">American</SelectItem>
                <SelectItem value="Chinese">Chinese</SelectItem>
                <SelectItem value="European">European</SelectItem>
                <SelectItem value="Japanese">Japanese</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={craft} onValueChange={setCraft}>
            <SelectTrigger className="flex-1" aria-label="Filter astronauts by space craft">
              <SelectLabel>Space Craft</SelectLabel>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Any">Any</SelectItem>
                <SelectItem value="ISS">ISS</SelectItem>
                <SelectItem value="Tiangong">Tiangong</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={launchDate} onValueChange={setLaunchDate}>
            <SelectTrigger className="flex-1" aria-label="Filter astronauts by launch date">
              <SelectLabel>Launch Date</SelectLabel>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Any">Any</SelectItem>
                <SelectItem value="Mar 1, 2020">Mar 1, 2020</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={landingDate} onValueChange={setLandingDate}>
            <SelectTrigger className="flex-1" aria-label="Filter astronauts by landing date">
              <SelectLabel>Landing Date</SelectLabel>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Any">Any</SelectItem>
                <SelectItem value="Aug 5, 2024">Aug 5, 2024</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Table className="[&>tbody>tr>td:first-child]:text-left [&>tbody>tr>td]:text-center [&>tbody>tr>td]:text-zinc-400">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left text-lg uppercase text-white">Name</TableHead>
              <TableHead className="text-lg uppercase text-white">Nationality</TableHead>
              <TableHead className="text-lg uppercase text-white">Space Craft</TableHead>
              <TableHead className="text-lg uppercase text-white">Launch Date</TableHead>
              <TableHead className="text-lg uppercase text-white">Landing Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((person) => (
              <TableRow key={person.name + person.craft}>
                <TableCell className="flex gap-2">
                  <img className="h-10 w-10 rounded-full border-2 border-zinc-500" src={FakeUserImage} alt="User Profile" />
                  <div>
                    <p className="text-white">{person.name}</p>
                    <p>{person.role}</p>
                  </div>
                </TableCell>
                <TableCell>{person.nationality}</TableCell>
                <TableCell>{person.craft}</TableCell>
                <TableCell>{person.launchDate}</TableCell>
                <TableCell>{person.landingDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionContent>
    </Section>
  );
}
export { AstronautInOrbitSection };
