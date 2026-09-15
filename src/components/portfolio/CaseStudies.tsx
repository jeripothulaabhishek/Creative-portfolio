"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import Sparkle3D from "@/components/ui/Sparkle3D";
import { PORTFOLIO_CATEGORIES } from "@/data/projects";

export default function CaseStudies() {
  const tedxCategory = PORTFOLIO_CATEGORIES.find((cat) => cat.id === "tedx-ace-2026");
  const mainProject = tedxCategory?.projects[0];

  if (!mainProject) return null;

  return (
    <section className="py-24 bg-[#F7F7F3] bg-swiss-grid border-b border-[#E5E5E0]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* SECTION HEADER */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E5E5E0] shadow-xs mb-4">
            <Sparkle3D className="w-4 h-4" />
            <span className="font-mono-meta text-xs font-semibold text-[#FFB800] tracking-widest uppercase">
              07 / FEATURED CASE STUDY
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#111111] uppercase tracking-tight">
            TEDx ACE COLLEGE — EVENT BRAND ECOSYSTEM.
          </h2>
          <p className="text-[#707070] text-base max-w-2xl mt-3">
            A comprehensive visual identity system, stage graphics, speaker launch series, attendee credential badges & digital marketing campaign engineered for TEDx ACE Engineering College 2026.
          </p>
        </div>

        {/* FLAGSHIP CASE STUDY CARD */}
        <div className="bg-white border border-[#E5E5E0] rounded-3xl overflow-hidden shadow-studio">

          {/* LARGE 3D DESK & POSTER MOCKUP HERO */}
          <div className="relative h-[380px] sm:h-[500px] lg:h-[600px] w-full bg-[#111111] overflow-hidden">
            <Image
              src="/tedx-ace-2026/tedx-1.png"
              alt="TEDx ACE College 2026 Event Branding"
              fill
              className="object-cover hover:scale-102 transition-transform duration-700"
              priority
            />
            <div className="absolute top-6 left-6 bg-[#111111]/80 backdrop-blur-md px-4 py-2 rounded-full font-mono-meta text-xs font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-pulse" />
              FLAGSHIP CASE STUDY 2026
            </div>
          </div>

          {/* PROJECT METADATA BAR */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-8 border-b border-[#E5E5E0] bg-[#F7F7F3]">
            <div>
              <span className="font-mono-meta text-[11px] text-[#707070] uppercase block">CLIENT</span>
              <span className="font-display text-sm font-bold text-[#111111]">TEDx ACE College</span>
            </div>
            <div>
              <span className="font-mono-meta text-[11px] text-[#707070] uppercase block">ROLE</span>
              <span className="font-display text-sm font-bold text-[#111111]">Content & Design Lead</span>
            </div>
            <div>
              <span className="font-mono-meta text-[11px] text-[#707070] uppercase block">YEAR</span>
              <span className="font-display text-sm font-bold text-[#111111]">2026</span>
            </div>
            <div>
              <span className="font-mono-meta text-[11px] text-[#707070] uppercase block">SERVICES</span>
              <span className="font-display text-sm font-bold text-[#FFB800]">Identity, Print, Social, Stage</span>
            </div>
          </div>

          {/* EDITORIAL NARRATIVE GRID: PROBLEM -> IDEA -> EXPERIENCE -> RESULT */}
          <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* LEFT: STORY NARRATIVE IN 4 CHAPTERS */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* 01 / THE PROBLEM */}
                <div className="bg-[#F7F7F3] p-6 rounded-2xl border border-[#E5E5E0]">
                  <span className="font-mono-meta text-[11px] font-bold text-[#E50914] uppercase tracking-wider block mb-2">
                    01 / THE PROBLEM
                  </span>
                  <h4 className="font-display text-lg font-bold text-[#111111] mb-2">
                    IDENTITY VS GLOBAL STANDARDS
                  </h4>
                  <p className="text-[#707070] text-sm leading-relaxed">
                    How do you turn a major college event into an authoritative visual ecosystem that adheres strictly to global TEDx rules while feeling locally unique and energetic?
                  </p>
                </div>

                {/* 02 / THE IDEA */}
                <div className="bg-[#F7F7F3] p-6 rounded-2xl border border-[#E5E5E0]">
                  <span className="font-mono-meta text-[11px] font-bold text-[#FFB800] uppercase tracking-wider block mb-2">
                    02 / THE IDEA
                  </span>
                  <h4 className="font-display text-lg font-bold text-[#111111] mb-2">
                    KINETIC RED & OBSIDIAN
                  </h4>
                  <p className="text-[#707070] text-sm leading-relaxed">
                    Constructing high-contrast obsidian backdrops framed with energetic red light rays, bold display typography, and modular grid frames for every medium.
                  </p>
                </div>

                {/* 03 / THE EXPERIENCE */}
                <div className="bg-[#F7F7F3] p-6 rounded-2xl border border-[#E5E5E0]">
                  <span className="font-mono-meta text-[11px] font-bold text-[#19C8D8] uppercase tracking-wider block mb-2">
                    03 / THE EXPERIENCE
                  </span>
                  <h4 className="font-display text-lg font-bold text-[#111111] mb-2">
                    5 INTEGRATED TOUCHPOINTS
                  </h4>
                  <p className="text-[#707070] text-sm leading-relaxed">
                    Brand Identity System → Speaker Reveal Posters → Social Media Carousels → 4K LED Stage Loops → Tactile Delegate Badges & Merchandise.
                  </p>
                </div>

                {/* 04 / THE RESULT */}
                <div className="bg-[#F7F7F3] p-6 rounded-2xl border border-[#E5E5E0]">
                  <span className="font-mono-meta text-[11px] font-bold text-[#FF6B35] uppercase tracking-wider block mb-2">
                    04 / THE RESULT
                  </span>
                  <h4 className="font-display text-lg font-bold text-[#111111] mb-2">
                    UNIFIED EVENT PRESENCE
                  </h4>
                  <p className="text-[#707070] text-sm leading-relaxed">
                    Flawless physical & digital synchronization creating a high-impact attendee journey and establishing a benchmark visual standard for the institution.
                  </p>
                </div>

              </div>

              <div className="pt-6 border-t border-[#E5E5E0]">
                <Link
                  href={`/work/${mainProject.slug}`}
                  className="inline-flex items-center gap-3 bg-[#111111] text-white hover:bg-[#FFB800] hover:text-[#111111] px-8 py-4 rounded-xl font-display font-bold text-sm transition-all duration-300 shadow-sm"
                >
                  <span>EXPLORE FULL TEDx CASE STUDY</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* RIGHT: 4 TOUCHPOINT GALLERY PREVIEWS */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="group relative h-48 rounded-2xl overflow-hidden bg-[#111111] border border-[#E5E5E0]">
                <Image
                  src="/tedx-ace-2026/tedx-2.png"
                  alt="Speaker Showcase Poster"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 bg-[#111111]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono-meta font-bold text-white uppercase">
                  SPEAKER POSTERS
                </div>
              </div>
              <div className="group relative h-48 rounded-2xl overflow-hidden bg-[#111111] border border-[#E5E5E0]">
                <Image
                  src="/tedx-ace-2026/tedx-3.png"
                  alt="Stage Graphics"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 bg-[#111111]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono-meta font-bold text-white uppercase">
                  4K STAGE LOOPS
                </div>
              </div>
              <div className="group relative h-48 rounded-2xl overflow-hidden bg-[#111111] border border-[#E5E5E0]">
                <Image
                  src="/tedx-ace-2026/tedx-4.png"
                  alt="Attendee Badges"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 bg-[#111111]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono-meta font-bold text-white uppercase">
                  DELEGATE BADGES
                </div>
              </div>
              <div className="group relative h-48 rounded-2xl overflow-hidden bg-[#111111] border border-[#E5E5E0]">
                <Image
                  src="/tedx-ace-2026/tedx-5.png"
                  alt="Social Media Campaign"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 bg-[#111111]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono-meta font-bold text-white uppercase">
                  SOCIAL CAMPAIGNS
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
