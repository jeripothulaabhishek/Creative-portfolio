"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Layers } from "lucide-react";
import Sparkle3D from "@/components/ui/Sparkle3D";
import { PORTFOLIO_CATEGORIES, ProjectItem } from "@/data/projects";

export default function SelectedWork() {
  // Extract TEDx flagship project
  const tedxCategory = PORTFOLIO_CATEGORIES.find((cat) => cat.id === "tedx-ace-2026");
  const flagshipProject = tedxCategory?.projects[0];

  // Extract other key featured projects
  const brandingCat = PORTFOLIO_CATEGORIES.find((cat) => cat.id === "branding");
  const socialCat = PORTFOLIO_CATEGORIES.find((cat) => cat.id === "social");
  const webCat = PORTFOLIO_CATEGORIES.find((cat) => cat.id === "web");
  const aiCat = PORTFOLIO_CATEGORIES.find((cat) => cat.id === "ai-creative");

  const riseProject = brandingCat?.projects.find((p) => p.id === "brand-1") || brandingCat?.projects[0];
  const socialCampaignProject = socialCat?.projects[0];
  const aiProject = aiCat?.projects[0];

  // Interactive preview state for RISE Creative Card
  const [risePreviewIndex, setRisePreviewIndex] = useState(0);
  const risePreviewImages = [
    "/rise-creative-branding/rise-logo-2.png",
    "/rise-creative-branding/main-logo.png",
    "/rise-creative-branding/brand-identity.png",
    "/rise-creative-branding/ad-design-1.png",
    "/rise-creative-branding/ad-design-2.png",
    "/rise-creative-branding/rise-logo.png",
  ];
  const currentRiseImage = risePreviewImages[risePreviewIndex] || riseProject?.image || "/rise-creative-branding/rise-logo-2.png";

  return (
    <section id="work" className="py-24 bg-[#F7F7F3] border-b border-[#E5E5E0]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E5E5E0] shadow-xs mb-4">
              <span className="font-mono-meta text-xs font-semibold text-[#FFB800] tracking-widest uppercase">
                03 / SELECTED WORK
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#111111] uppercase tracking-tight">
              SELECTED WORK.
            </h2>
          </div>
          <p className="text-[#707070] text-base max-w-md">
            A curated collection of brand identities, event ecosystems, digital campaigns, user interfaces and marketing graphics.
          </p>
        </div>

        {/* ASYMMETRIC EDITORIAL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* 1. LARGE FEATURED PROJECT: TEDX ACE COLLEGE (SPAN 12) */}
          {flagshipProject && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-12 group relative bg-white border border-[#E5E5E0] rounded-3xl overflow-hidden shadow-card hover:shadow-lift transition-all duration-300"
            >
              <Link href={`/work/${flagshipProject.slug}`} className="grid grid-cols-1 lg:grid-cols-12 items-center">

                {/* Visual Image Preview */}
                <div className="lg:col-span-7 relative h-[380px] sm:h-[450px] lg:h-[520px] overflow-hidden bg-[#111111]">
                  <Image
                    src={flagshipProject.image}
                    alt={flagshipProject.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
                  <div className="absolute top-6 left-6 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#111111]/80 backdrop-blur-md text-white font-mono-meta text-xs font-bold tracking-wider shadow-lg">
                      <Sparkle3D className="w-4 h-4" />
                      FLAGSHIP CASE STUDY 2026
                    </span>
                  </div>
                </div>

                {/* Project Metadata & Narrative */}
                <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between font-mono-meta text-xs text-[#707070] mb-4">
                      <span className="uppercase tracking-widest text-[#FFB800] font-bold">
                        {flagshipProject.category}
                      </span>
                      <span>{flagshipProject.year}</span>
                    </div>

                    <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111111] uppercase tracking-tight mb-4 group-hover:text-[#FFB800] transition-colors">
                      {flagshipProject.title}
                    </h3>

                    <p className="text-[#707070] text-base leading-relaxed mb-6">
                      {flagshipProject.subtitle || flagshipProject.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {flagshipProject.deliverables.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 rounded-full bg-[#F7F7F3] border border-[#E5E5E0] text-xs font-mono-meta text-[#111111]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#E5E5E0] flex items-center justify-between">
                    <span className="font-mono-meta text-xs font-bold text-[#111111]">
                      ROLE: {flagshipProject.role}
                    </span>
                    <span className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center group-hover:bg-[#FFB800] group-hover:text-[#111111] transition-colors">
                      <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>

              </Link>
            </motion.div>
          )}

          {/* 2. MEDIUM PROJECT: RISE CREATIVE BRAND IDENTITY (SPAN 7) */}
          {riseProject && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 group bg-white border border-[#E5E5E0] rounded-3xl overflow-hidden shadow-card hover:shadow-lift transition-all duration-300 flex flex-col justify-between"
            >
              <Link href={`/work/${riseProject.slug}`}>
                {/* AMBIENT STUDIO CANVAS (ZERO BLACK BARS) */}
                <div className="relative h-72 sm:h-96 overflow-hidden bg-[#0A0A0E] flex items-center justify-center">

                  {/* AMBIENT BACKGROUND GLOW DERIVED FROM ACTIVE IMAGE */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <Image
                      src={currentRiseImage}
                      alt=""
                      fill
                      className="object-cover blur-3xl opacity-50 scale-125 brightness-110 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E]/80 via-transparent to-[#0A0A0E]/30" />
                  </div>

                  {/* ACTIVE IMAGE DISPLAY */}
                  <Image
                    src={currentRiseImage}
                    alt={riseProject.title}
                    fill
                    className="relative z-10 object-contain p-6 sm:p-10 filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* TOP BADGE */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#111111] font-mono-meta text-xs font-bold shadow-sm flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
                      <span>{riseProject.category}</span>
                    </span>
                  </div>

                  {/* INTERACTIVE MINI THUMBNAIL PREVIEW SWITCHER */}
                  <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 p-1.5 rounded-full bg-[#111111]/85 backdrop-blur-md border border-white/10 shadow-lg">
                    {risePreviewImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setRisePreviewIndex(i);
                        }}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${risePreviewIndex === i
                            ? "bg-[#FFB800] scale-125 shadow-xs"
                            : "bg-white/40 hover:bg-white"
                          }`}
                        aria-label={`Preview Asset ${i + 1}`}
                      />
                    ))}
                  </div>

                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between font-mono-meta text-xs text-[#707070] mb-2">
                    <span className="font-bold text-[#FFB800]">{riseProject.client}</span>
                    <span>{riseProject.year}</span>
                  </div>
                  <h4 className="font-display text-2xl font-bold text-[#111111] uppercase tracking-tight group-hover:text-[#FFB800] transition-colors flex items-center justify-between">
                    <span>{riseProject.title}</span>
                    <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </h4>
                  <p className="text-[#707070] text-sm mt-2 line-clamp-2">
                    {riseProject.subtitle || riseProject.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          )}



          {/* 4. SWAPNA CATERING INTERACTIVE MENU BOOK (SPAN 6) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-6 group bg-white border border-[#E5E5E0] rounded-3xl overflow-hidden shadow-card hover:shadow-lift transition-all duration-300"
          >
            <Link href="#swapna-catering-menu">
              <div className="relative h-64 sm:h-80 overflow-hidden bg-[#FAF9F5] flex items-center justify-center">
                <Image
                  src="/catering-menu/catering-thumbnail.webp"
                  alt="Swapna Catering Menu Design"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out p-2"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#111111]/80 backdrop-blur-md text-[#FFB800] font-mono-meta text-xs font-bold shadow-sm">
                    CATERING MENU & PRINT
                  </span>
                </div>
              </div>
              <div className="p-6">
                <span className="font-mono-meta text-xs text-[#FF6B35] font-bold uppercase tracking-wider block mb-1">
                  Swapna Catering
                </span>
                <h4 className="font-display text-xl font-bold text-[#111111] group-hover:text-[#FF6B35] transition-colors flex items-center justify-between">
                  <span>SWAPNA CATERING MENU BOOK</span>
                  <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </h4>
                <p className="text-[#707070] text-sm mt-1 line-clamp-2 font-sans">
                  5-page editorial menu design with interactive 3D publication physics.
                </p>
              </div>
            </Link>
          </motion.div>

          {/* 5. VIDHARA SOCIAL MEDIA CAMPAIGN (SPAN 6) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-6 group bg-white border border-[#E5E5E0] rounded-3xl overflow-hidden shadow-card hover:shadow-lift transition-all duration-300"
          >
            <Link href="#vidhara-case-study">
              <div className="relative h-64 sm:h-80 overflow-hidden bg-[#0A0A0E] flex items-center justify-center">
                {/* Ambient glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                  <Image
                    src="/projects/vidhara/creative-01.webp"
                    alt=""
                    fill
                    className="object-cover blur-2xl opacity-40 scale-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0E]/80 via-transparent to-[#0A0A0E]/30" />
                </div>

                <Image
                  src="/projects/vidhara/creative-01.webp"
                  alt="Vidhara Social Media Creative Campaign"
                  fill
                  className="relative z-10 object-contain p-4 filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#111111] font-mono-meta text-xs font-bold shadow-sm">
                    SOCIAL MEDIA CAMPAIGN
                  </span>
                </div>
              </div>
              <div className="p-6">
                <span className="font-mono-meta text-xs text-[#19C8D8] font-bold uppercase tracking-wider block mb-1">
                  Vidhara
                </span>
                <h4 className="font-display text-xl font-bold text-[#111111] group-hover:text-[#19C8D8] transition-colors flex items-center justify-between">
                  <span>VIDHARA CREATIVE CAMPAIGN</span>
                  <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </h4>
                <p className="text-[#707070] text-sm mt-1 line-clamp-2 font-sans">
                  Visual storytelling campaign blending typography with cultural motifs.
                </p>
              </div>
            </Link>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

