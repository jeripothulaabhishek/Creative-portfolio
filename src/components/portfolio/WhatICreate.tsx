"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Palette, Layers, Film, Code, Compass, Sparkles } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    num: "01",
    title: "BRAND IDENTITY",
    subtitle: "VISUAL ARCHITECTURE & LOGO SYSTEMS",
    desc: "Crafting iconic vector logo marks, complete visual design systems, brand guidelines, typography hierarchies, and print/digital identity suites.",
    deliverables: ["Logo Design", "Visual Identity Systems", "Brand Guidelines", "Typography Rules", "Color Systems"],
    accent: "from-[#FFB800]/20 via-transparent to-transparent",
    badgeColor: "bg-[#FFB800]/10 border-[#FFB800]/30 text-[#111111]",
    icon: Palette,
    href: "#work",
  },
  {
    num: "02",
    title: "DIGITAL EXPERIENCES",
    subtitle: "WEBSITES, LANDING PAGES & UI/UX",
    desc: "Designing and engineering responsive websites, landing pages, modern user interfaces, and interactive web applications that engage visitors.",
    deliverables: ["UI/UX Interface Design", "Responsive Websites", "Next.js Web Apps", "Wireframing & Prototyping", "Design Systems"],
    accent: "from-[#00D2FF]/20 via-transparent to-transparent",
    badgeColor: "bg-[#00D2FF]/10 border-[#00D2FF]/30 text-[#00D2FF]",
    icon: Code,
    href: "#websites",
  },
  {
    num: "03",
    title: "SOCIAL & CONTENT",
    subtitle: "CAMPAIGNS, AD CAROUSELS & THUMBNAILS",
    desc: "Building high-converting social media creatives, ad campaigns, Instagram carousels, marketing banners, and YouTube thumbnail graphics.",
    deliverables: ["Social Media Campaigns", "Ad Carousels", "YouTube Thumbnails", "Marketing Banners", "Event Collateral"],
    accent: "from-[#FF6B35]/20 via-transparent to-transparent",
    badgeColor: "bg-[#FF6B35]/10 border-[#FF6B35]/30 text-[#FF6B35]",
    icon: Layers,
    href: "#social",
  },
  {
    num: "04",
    title: "MOTION & VISUALS",
    subtitle: "REELS, MOTION GRAPHICS & ANIMATIONS",
    desc: "Creating short-form promo video reels, kinetic typography, logo reveals, stage background animations, and dynamic visual storytelling.",
    deliverables: ["Instagram & TikTok Reels", "Motion Graphics", "Logo Ident Animations", "Stage Backdrops", "Video Graphics"],
    accent: "from-[#8E2DE2]/20 via-transparent to-transparent",
    badgeColor: "bg-[#8E2DE2]/10 border-[#8E2DE2]/30 text-[#8E2DE2]",
    icon: Film,
    href: "#archive",
  },
];

export default function WhatICreate() {
  return (
    <section id="services" className="relative py-28 bg-[#F7F7F3] bg-swiss-grid border-b border-[#E5E5E0] overflow-hidden">
      {/* AMBIENT BACKGROUND LIGHTING */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#FFB800]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E5E0] shadow-xs mb-4"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
              <span className="font-mono-meta text-xs font-semibold text-[#111111] tracking-widest uppercase">
                03 / WHAT I CREATE & DISCIPLINES
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#111111] uppercase tracking-tight"
            >
              WHAT I CREATE.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#707070] font-normal leading-relaxed max-w-xl self-start md:self-auto"
          >
            Core creative disciplines tailored to elevate brands, build digital products, and capture audience attention.
          </motion.p>
        </div>

        {/* 4 EDITORIAL CAPABILITY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white border border-[#E5E5E0] rounded-3xl p-8 sm:p-10 shadow-card hover:shadow-2xl hover:border-[#FFB800]/60 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
              >
                {/* AMBIENT GRADIENT SHINETHROUGH */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div>
                  {/* CARD TOP ROW: OVERSIZED NUMBER & ICON */}
                  <div className="flex justify-between items-start mb-8 z-10 relative">
                    <span className="font-display text-5xl sm:text-6xl font-black text-[#111111]/15 group-hover:text-[#FFB800] transition-colors">
                      {service.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#F7F7F3] border border-[#E5E5E0] flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-[#FFB800] transition-all duration-300 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* TITLE & SUBTITLE */}
                  <span className="font-mono-meta text-[11px] font-bold text-[#707070] tracking-widest uppercase block mb-1">
                    {service.subtitle}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111111] uppercase tracking-tight mb-4 group-hover:text-[#111111]">
                    {service.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-[#707070] text-sm leading-relaxed mb-8">
                    {service.desc}
                  </p>

                  {/* DELIVERABLE TAG PILLS */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.deliverables.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 rounded-full bg-[#F7F7F3] border border-[#E5E5E0] font-mono-meta text-[11px] font-semibold text-[#111111] shadow-2xs group-hover:border-[#111111]/20 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CARD FOOTER LINK */}
                <div className="pt-6 border-t border-[#E5E5E0] flex justify-between items-center z-10 relative">
                  <span className="font-mono-meta text-xs font-bold text-[#111111] uppercase tracking-wider">
                    EXPLORE PROJECTS
                  </span>
                  <Link
                    href={service.href}
                    className="w-9 h-9 rounded-full bg-[#111111] text-white flex items-center justify-center group-hover:bg-[#FFB800] group-hover:text-[#111111] transition-all duration-300 shadow-xs"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
