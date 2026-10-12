import { Hero } from "@/components/home/hero";
import { PersonTimePlace } from "@/components/home/person-time-place";
import {
  AcrossTheTable,
  BeyondExams,
  FinalCta,
  PlaceMatters,
  Retreats,
  Scenarios,
  Spaces,
  TheDetails,
  TheMoment,
} from "@/components/home/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PersonTimePlace />
      <TheMoment />
      <TheDetails />
      <AcrossTheTable />
      <PlaceMatters />
      <Spaces />
      <Scenarios />
      <BeyondExams />
      <Retreats />
      <FinalCta />
    </>
  );
}
