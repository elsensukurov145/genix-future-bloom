import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { DashboardReveal } from "@/components/DashboardReveal";
import { Programs } from "@/components/Programs";
import { Timeline } from "@/components/Timeline";
import { Audience } from "@/components/Audience";
import { Apply } from "@/components/Apply";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CursorFollower } from "@/components/CursorFollower";
import { PageLoader } from "@/components/PageLoader";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <PageLoader onDone={() => setLoaded(true)} />
      <CursorFollower />
      <main className="relative bg-background min-h-screen overflow-x-hidden">
        <Navbar />
        <Hero />
        <Stats />
        <DashboardReveal />
        <Programs />
        <Timeline />
        <Audience />
        <Apply />
        <Footer />
      </main>
    </>
  );
};

export default Index;
