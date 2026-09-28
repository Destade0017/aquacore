import React from "react";
import { HeroSection } from "@/components/home/hero-section";
import { ProgramsOverview } from "@/components/home/programs-overview";
import { LearningSection } from "@/components/home/learning-section";
import { LocationsSection } from "@/components/home/locations-section";
import { SafetySection } from "@/components/home/safety-section";
import { FinalCTA } from "@/components/home/final-cta";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <HeroSection />
      <ProgramsOverview />
      <LearningSection />
      <LocationsSection />
      <SafetySection />
      <FinalCTA />
    </main>
  );
}
