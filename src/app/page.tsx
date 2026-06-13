import { GlowBackground } from "@/components/shared/GlowBackground";
import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ExampleBoards } from "@/components/landing/ExampleBoards";
import { Testimonials } from "@/components/landing/Testimonials";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/shared/Footer";

export default function Home() {
  return (
    <>
      {/* Ambient background — fixed, behind everything */}
      <GlowBackground />

      {/* Sticky nav */}
      <Navbar />

      <main className="relative z-10 flex flex-col">
        <Hero />
        <HowItWorks />
        <ExampleBoards />
        <Testimonials />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}