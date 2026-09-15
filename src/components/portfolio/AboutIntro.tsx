"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Cpu, Palette, Layers, Box, Code, Compass, Film } from "lucide-react";
import Sparkle3D from "@/components/ui/Sparkle3D";

const CAPABILITIES = [
  {
    num: "01",
    title: "BRAND IDENTITY",
    desc: "Visual identity systems, logo design, brand books & typography architecture.",
    icon: Palette,
    accent: "border-l-4 border-l-[#FFB800]",
  },
  {
    num: "02",
    title: "SOCIAL & CAMPAIGN DESIGN",
    desc: "High-converting social media creatives, ad carousels & promotional visual suites.",
    icon: Layers,
    accent: "border-l-4 border-l-[#19C8D8]",
  },
  {
    num: "03",
    title: "UI/UX DESIGN",
    desc: "User experience architecture, web app design systems & interactive interfaces.",
    icon: Compass,
    accent: "border-l-4 border-l-[#FF6B35]",
  },
  {
    num: "04",
    title: "MARKETING & GRAPHIC DESIGN",
    desc: "Digital marketing collateral, promotional banners, print suites & pitch presentation decks.",
    icon: Film,
    accent: "border-l-4 border-l-[#111111]",
  },
  {
    num: "05",
    title: "WEB DESIGN & DEVELOPMENT",
    desc: "Production Next.js, React, Tailwind CSS & responsive client web applications.",
    icon: Code,
    accent: "border-l-4 border-l-[#FFB800]",
  },
  {
    num: "06",
    title: "AI ART DIRECTION",
    desc: "Generative AI visual synthesis, ComfyUI workflows & futurist key visual art direction.",
    icon: Cpu,
    accent: "border-l-4 border-l-[#19C8D8]",
  },
];

export default function AboutIntro() {
  return (
    <section id="about" className="py-24 bg-[#F7F7F3] border-b border-[#E5E5E0]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E5E5E0] shadow-xs mb-4">
            <span className="font-mono-meta text-xs font-semibold text-[#19C8D8] tracking-widest uppercase">
              02 / ABOUT ME & PHILOSOPHY
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] uppercase tracking-tight max-w-3xl">
            DESIGN IS HOW IDEAS BECOME VISIBLE.
          </h2>
        </div>

        {/* SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: 3D PORTRAIT / AVATAR CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-white border border-[#E5E5E0] rounded-3xl p-8 shadow-card relative overflow-hidden"
          >
            {/* Signature Yellow Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFB800]/15 rounded-full blur-3xl -z-10" />

            <div className="flex items-center justify-between border-b border-[#E5E5E0] pb-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#111111] border border-[#E5E5E0] overflow-hidden relative shadow-sm">
                  <Image
                    src="/my-image.png"
                    alt="Abhishek Avatar"
                    fill
                    sizes="48px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#111111]">ABHISHEK GOUD</h3>
                  <p className="font-mono-meta text-xs text-[#707070]">VISUAL CREATIVE DIRECTOR</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F7F3] border border-[#E5E5E0] font-mono-meta text-[11px] text-[#111111]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                AVAILABLE
              </span>
            </div>

            {/* Stylized Visual Box */}
            <div className="w-full h-64 rounded-2xl bg-gradient-to-tr from-[#111111] to-[#222222] p-6 flex flex-col justify-between text-white relative overflow-hidden mb-6 shadow-inner">
              <div className="flex justify-between items-start z-10">
                <span className="font-mono-meta text-xs text-[#FFB800] tracking-wider uppercase font-semibold">01 / AVATAR MARK</span>
                <Sparkle3D className="w-5 h-5" />
              </div>

              <div className="my-auto text-center py-2 z-10">
                <div className="w-24 h-24 mx-auto rounded-full border-4 border-[#FFB800] ring-4 ring-[#FFB800]/20 overflow-hidden relative shadow-xl transform hover:scale-105 transition-all duration-300">
                  <Image
                    src="/my-image.png"
                    alt="Abhishek Avatar Mark"
                    fill
                    priority
                    sizes="96px"
                    className="object-cover object-center filter drop-shadow-md"
                  />
                </div>
                <p className="font-display text-sm font-bold text-white mt-3 uppercase tracking-wide">
                  "IDEAS DESERVE BETTER VISUALS."
                </p>
              </div>

              <div className="flex justify-between items-center text-[11px] font-mono-meta text-zinc-400 z-10">
                <span>EST. 2026</span>
                <span>TEDx DESIGN LEAD</span>
              </div>
            </div>

            {/* Quick Summary Bio */}
            <p className="text-[#707070] text-sm leading-relaxed mb-6">
              Combining visual thinking with modern engineering to craft brand identities, marketing collateral, high-converting social campaigns, and high-performance digital experiences.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono-meta text-[#111111] font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#FFB800]" />
              <span>OVER 5+ YEARS OF MULTIDISCIPLINARY EXPERIENCE</span>
            </div>
          </motion.div>

          {/* RIGHT: PERSONAL INTRODUCTION & CAPABILITIES GRID */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            
            {/* INTRO PARAGRAPH */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-[#E5E5E0] rounded-3xl p-8 mb-8 shadow-xs"
            >
              <h3 className="font-display text-2xl font-bold text-[#111111] mb-4">
                Hello, I'm Abhishek.
              </h3>
              <p className="text-[#707070] text-base md:text-lg leading-relaxed">
                I design brand identities, digital campaigns, interfaces and visual systems — while exploring the space between design, technology and user experience. My work bridges physical editorial aesthetics with modern interactive web architecture.
              </p>
            </motion.div>

            {/* CAPABILITIES SECTION */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-mono-meta text-xs font-bold text-[#111111] tracking-widest uppercase">
                  CAPABILITIES & DISCIPLINES
                </h3>
                <span className="font-mono-meta text-xs text-[#707070]">06 CORE SERVICES</span>
              </div>

              {/* 6 COMPACT EDITORIAL CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CAPABILITIES.map((cap, idx) => {
                  const Icon = cap.icon;
                  return (
                    <motion.div
                      key={cap.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      className={`bg-white border border-[#E5E5E0] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 ${cap.accent}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono-meta text-xs font-bold text-[#707070]">{cap.num}</span>
                        <Icon className="w-4 h-4 text-[#111111]" />
                      </div>
                      <h4 className="font-display text-sm font-bold text-[#111111] mb-1 tracking-tight">
                        {cap.title}
                      </h4>
                      <p className="text-[#707070] text-xs leading-relaxed">
                        {cap.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
