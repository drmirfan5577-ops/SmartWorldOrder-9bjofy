import React from "react";
import HeroSection from "@/components/features/HeroSection";
import BrandShowcase from "@/components/features/BrandShowcase";
import LauncherGrid from "@/components/features/LauncherGrid";
import MissionBanner from "@/components/features/MissionBanner";

const Home: React.FC = () => {
  return (
    <main className="bg-platform-hero min-h-screen">
      <HeroSection />
      <BrandShowcase />
      <MissionBanner />
      <LauncherGrid />
    </main>
  );
};

export default Home;
