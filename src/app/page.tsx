import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/portfolio/Hero";
import ToolsSection from "@/components/portfolio/ToolsSection";
import WhatICreate from "@/components/portfolio/WhatICreate";
import AboutIntro from "@/components/portfolio/AboutIntro";
import SelectedWork from "@/components/portfolio/SelectedWork";
import WebShowcase from "@/components/portfolio/WebShowcase";
import MenuBookSection from "@/components/portfolio/MenuBookSection";
import VisualArchive from "@/components/ui/3d-folder";
import VidharaCaseStudy from "@/components/portfolio/VidharaCaseStudy";
import CaseStudies from "@/components/portfolio/CaseStudies";
import ContactFooter from "@/components/portfolio/ContactFooter";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#F7F7F3] text-[#111111] selection:bg-[#FFB800] selection:text-[#111111]">
      {/* 00 / FLOATING EDITORIAL NAVBAR */}
      <Navbar />

      {/* 01 / HERO WITH 3D CREATIVE STUDIO SCENE */}
      <Hero />

      {/* 02 / ABOUT ABHISHEK & CAPABILITIES */}
      <AboutIntro />

      {/* 03 / WHAT I CREATE (4 EDITORIAL DISCIPLINES) */}
      <WhatICreate />

      {/* 04 / MY CREATIVE STACK (12 CORE SKILLS) */}
      <ToolsSection />

      {/* 05 / SELECTED WORK MASONRY GRID */}
      <SelectedWork />

      {/* 06 / WEBSITES & DIGITAL EXPERIENCES SHOWCASE */}
      <WebShowcase />

      {/* 07 / SWAPNA CATERING INTERACTIVE MENU BOOK */}
      <MenuBookSection />

      {/* 08 / VIDHARA SOCIAL MEDIA CREATIVE CAMPAIGN CASE STUDY */}
      <VidharaCaseStudy />

      {/* 09 / 3D MANUFACTURED VISUAL ARCHIVE */}
      <VisualArchive />

      {/* 10 / FLAGSHIP TEDX CASE STUDY */}
      <CaseStudies />

      {/* 11 / CONTACT & MINIMAL FOOTER */}
      <ContactFooter />
    </main>
  );
}
