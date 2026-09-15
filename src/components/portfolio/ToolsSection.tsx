"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, Sparkle, X, Layers, CheckCircle2, ChevronRight, Zap, PlayCircle, Code2, Palette, Flame } from "lucide-react";

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  group: "DESIGN" | "DEV" | "MOTION" | "STRATEGY";
  desc: string;
  details: string;
  proficiency: number;
  experience: string;
  keyProjects: string[];
  iconUrl: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
}

const SKILLS: SkillItem[] = [
  {
    id: "capcut",
    name: "CapCut",
    category: "SHORT-FORM MOTION & REELS",
    group: "MOTION",
    desc: "Dynamic short-form video editing, auto-captioning & viral reel pacing.",
    details: "Keyframe animation, kinetic text overlays, speed ramping, audio sync, and high-engagement short-form video content creation for Instagram Reels, Shorts & TikTok.",
    proficiency: 100,
    experience: "3+ Years",
    keyProjects: ["TEDx ACE Promo Reels", "Rise Creative Campaign Shorts", "Client Video Ads"],
    iconUrl: "/tools/capcut-3d.jpg",
    accentBg: "bg-[#111111]/10",
    accentBorder: "border-[#111111]/30",
    accentText: "text-[#111111]",
  },
  {
    id: "figma",
    name: "Figma",
    category: "UI / UX & DESIGN SYSTEMS",
    group: "DESIGN",
    desc: "Design system architecture, wireframing & interactive prototypes.",
    details: "Mastery over design tokens, auto-layout 5.0, component variants, and interactive prototype flows for web & mobile applications.",
    proficiency: 100,
    experience: "4+ Years",
    keyProjects: ["TEDx ACE 2026 Site", "Prime Estates Portal", "This Is It Cafe UI"],
    iconUrl: "/tools/figma-3d.png",
    accentBg: "bg-[#FFB800]/10",
    accentBorder: "border-[#FFB800]/30",
    accentText: "text-[#FFB800]",
  },
  {
    id: "photoshop",
    name: "Photoshop",
    category: "RASTER & PHOTO ART",
    group: "DESIGN",
    desc: "High-end photo manipulation, retouching & digital poster composition.",
    details: "Advanced frequency separation, complex masking, color grading, and hyper-realistic visual synthesis for marketing campaigns.",
    proficiency: 100,
    experience: "5+ Years",
    keyProjects: ["TEDx Speaker Key Visuals", "Kinetix Sportswear Ads", "Rise Creative Posters"],
    iconUrl: "/tools/photoshop-3d.png",
    accentBg: "bg-[#31A8FF]/10",
    accentBorder: "border-[#31A8FF]/30",
    accentText: "text-[#31A8FF]",
  },
  {
    id: "illustrator",
    name: "Illustrator",
    category: "VECTOR & LOGO MARKS",
    group: "DESIGN",
    desc: "Precision vector logo marks, typography scales & brand guidelines.",
    details: "Bezier curve precision, grid-aligned logo construction, brand book generation, and print-ready CMYK vector assets.",
    proficiency: 100,
    experience: "5+ Years",
    keyProjects: ["MGR Constructions Brand Identity", "Swapna Catering Visual System", "Keesari Hospital Identity"],
    iconUrl: "/tools/illustrator-3d.png",
    accentBg: "bg-[#FF6B35]/10",
    accentBorder: "border-[#FF6B35]/30",
    accentText: "text-[#FF6B35]",
  },
  {
    id: "canva",
    name: "Canva",
    category: "RAPID SOCIAL ASSETS",
    group: "DESIGN",
    desc: "High-speed social collateral, pitch decks & template distributions.",
    details: "Streamlined brand kit maintenance, collaborative team templates, and high-velocity social media output.",
    proficiency: 95,
    experience: "3+ Years",
    keyProjects: ["Swapna Catering Daily Content", "TEDx Social Carousels"],
    iconUrl: "/tools/canva-3d.png",
    accentBg: "bg-[#00C4CC]/10",
    accentBorder: "border-[#00C4CC]/30",
    accentText: "text-[#00C4CC]",
  },
  {
    id: "after-effects",
    name: "After Effects",
    category: "MOTION & VISUAL FX",
    group: "MOTION",
    desc: "Logo motion reveals, particle animation & promotional video assets.",
    details: "Complex expression scripts, 3D camera tracker integration, Lottie JSON animation exports, and fluid keyframing.",
    proficiency: 90,
    experience: "3+ Years",
    keyProjects: ["TEDx Stage Backdrop Motion", "Logo Ident Animations"],
    iconUrl: "/tools/after-effects-3d.png",
    accentBg: "bg-[#8E2DE2]/10",
    accentBorder: "border-[#8E2DE2]/30",
    accentText: "text-[#8E2DE2]",
  },
  {
    id: "premiere-pro",
    name: "Premiere Pro & Video",
    category: "VIDEO PRODUCTION",
    group: "MOTION",
    desc: "Timeline editing, Lumetri color grading & multi-track sound design.",
    details: "Narrative pacing, dialogue cleanup, multi-track audio mastering, and broadcast-ready H.264/HEVC video production.",
    proficiency: 95,
    experience: "3+ Years",
    keyProjects: ["TEDx Keynote Recap Video", "Brand Story Documentaries"],
    iconUrl: "/tools/capcut-3d.jpg",
    accentBg: "bg-[#111111]/10",
    accentBorder: "border-[#111111]/30",
    accentText: "text-[#111111]",
  },
  {
    id: "html",
    name: "HTML5",
    category: "SEMANTIC STRUCTURE",
    group: "DEV",
    desc: "Accessible HTML5 markup, microdata & SEO structural hierarchy.",
    details: "WCAG 2.1 compliance, WAI-ARIA roles, schema.org structured data, and flawless document outline architecture.",
    proficiency: 100,
    experience: "4+ Years",
    keyProjects: ["All Client Web Applications"],
    iconUrl: "/tools/vscode-3d.png",
    accentBg: "bg-[#E34F26]/10",
    accentBorder: "border-[#E34F26]/30",
    accentText: "text-[#E34F26]",
  },
  {
    id: "css",
    name: "CSS3 & Tailwind",
    category: "MODERN STYLING",
    group: "DEV",
    desc: "Custom CSS properties, glassmorphism, flexbox & grid design systems.",
    details: "Container queries, CSS custom properties, GPU-accelerated keyframes, and Tailwind CSS utility architectures.",
    proficiency: 100,
    experience: "4+ Years",
    keyProjects: ["Portfolio Design Tokens", "Prime Estates UI Theme"],
    iconUrl: "/tools/vscode-3d.png",
    accentBg: "bg-[#1572B6]/10",
    accentBorder: "border-[#1572B6]/30",
    accentText: "text-[#1572B6]",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "INTERACTIVE LOGIC",
    group: "DEV",
    desc: "DOM animation loops, async data fetching & state management.",
    details: "ES6+ syntax, custom event dispatchers, IntersectionObservers, web workers, and smooth math interpolation.",
    proficiency: 95,
    experience: "3+ Years",
    keyProjects: ["Dynamic Carousel Engines", "Interactive Canvas Visuals"],
    iconUrl: "/tools/vscode-3d.png",
    accentBg: "bg-[#F7DF1E]/10",
    accentBorder: "border-[#F7DF1E]/30",
    accentText: "text-[#F7DF1E]",
  },
  {
    id: "react",
    name: "React",
    category: "COMPONENT SYSTEMS",
    group: "DEV",
    desc: "Reusable component libraries, custom hooks & reactive UI state.",
    details: "Virtual DOM optimizations, useMemo/useCallback memoization, Context API, and Framer Motion integration.",
    proficiency: 95,
    experience: "3+ Years",
    keyProjects: ["Portfolio Web Application", "Client Dashboards"],
    iconUrl: "/tools/react-next-3d.png",
    accentBg: "bg-[#61DAFB]/10",
    accentBorder: "border-[#61DAFB]/30",
    accentText: "text-[#61DAFB]",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "FULL-STACK WEB",
    group: "DEV",
    desc: "App Router SSR, static site generation & API route handlers.",
    details: "Server Components, dynamic metadata generation, image optimization, dynamic imports, and Vercel edge deployment.",
    proficiency: 95,
    experience: "3+ Years",
    keyProjects: ["Graphic Design Portfolio", "Keesari Hospital Portal"],
    iconUrl: "/tools/react-next-3d.png",
    accentBg: "bg-[#111111]/10",
    accentBorder: "border-[#111111]/30",
    accentText: "text-[#111111]",
  },
  {
    id: "uiux",
    name: "UI / UX Design",
    category: "USER EXPERIENCE",
    group: "STRATEGY",
    desc: "User journey mapping, wireframing & interactive prototype testing.",
    details: "Information architecture, visual hierarchy enforcement, accessibility audits, and micro-interaction design.",
    proficiency: 100,
    experience: "4+ Years",
    keyProjects: ["Prime Estates Portal", "This Is It Cafe Order Flow"],
    iconUrl: "/tools/ui-ux-3d.jpg",
    accentBg: "bg-[#00D2FF]/10",
    accentBorder: "border-[#00D2FF]/30",
    accentText: "text-[#00D2FF]",
  },
  {
    id: "branding",
    name: "Branding",
    category: "VISUAL SYSTEMS",
    group: "STRATEGY",
    desc: "Complete visual identity creation, logo systems & brand guidelines.",
    details: "Positioning strategy, color theory architecture, brand tone of voice, and multi-channel asset handoff kits.",
    proficiency: 100,
    experience: "5+ Years",
    keyProjects: ["MGR Constructions", "Swapna Catering", "Rise Creative"],
    iconUrl: "/tools/illustrator-3d.png",
    accentBg: "bg-[#FFB800]/10",
    accentBorder: "border-[#FFB800]/30",
    accentText: "text-[#FFB800]",
  },
  {
    id: "motion-graphics",
    name: "Motion Graphics",
    category: "VISUAL ANIMATION",
    group: "MOTION",
    desc: "Kinetic typography, animated promotional assets & video transitions.",
    details: "2D/3D visual rhythm, lower third graphics, social ad intros, and animated campaign teasers.",
    proficiency: 95,
    experience: "3+ Years",
    keyProjects: ["TEDx Event Key Visuals", "Rise Creative Reels"],
    iconUrl: "/tools/capcut-3d.jpg",
    accentBg: "bg-[#111111]/10",
    accentBorder: "border-[#111111]/30",
    accentText: "text-[#111111]",
  },
  {
    id: "social-design",
    name: "Social Media Design",
    category: "CAMPAIGN ASSETS",
    group: "DESIGN",
    desc: "High-converting social posts, ad carousels & thumbnail packages.",
    details: "CTR-driven visual layout, attention-grabbing hooks, story highlights, and YouTube thumbnail engineering.",
    proficiency: 100,
    experience: "4+ Years",
    keyProjects: ["Swapna Catering Campaigns", "MGR Social Ads"],
    iconUrl: "/tools/canva-3d.png",
    accentBg: "bg-[#FF6B35]/10",
    accentBorder: "border-[#FF6B35]/30",
    accentText: "text-[#FF6B35]",
  },
  {
    id: "web-design",
    name: "Web Design",
    category: "INTERACTIVE WEB",
    group: "DESIGN",
    desc: "Responsive web layouts, landing pages & aesthetic UI systems.",
    details: "Grid-aligned editorial design, fluid typography scales, mobile-first layouts, and high-impact visual heroes.",
    proficiency: 100,
    experience: "4+ Years",
    keyProjects: ["TEDx ACE 2026 Site", "This Is It Cafe Web"],
    iconUrl: "/tools/figma-3d.png",
    accentBg: "bg-[#19C8D8]/10",
    accentBorder: "border-[#19C8D8]/30",
    accentText: "text-[#19C8D8]",
  },
  {
    id: "creative-direction",
    name: "Creative Direction",
    category: "ART DIRECTION",
    group: "STRATEGY",
    desc: "End-to-end visual vision, moodboard strategy & campaign lead.",
    details: "Cross-disciplinary campaign orchestration, visual quality control, concept synthesis, and project delivery.",
    proficiency: 100,
    experience: "5+ Years",
    keyProjects: ["TEDx ACE 2026 Flagship", "Keesari Hospital Campaign"],
    iconUrl: "/tools/palette-3d.jpg",
    accentBg: "bg-[#FFB800]/10",
    accentBorder: "border-[#FFB800]/30",
    accentText: "text-[#FFB800]",
  },
];

const STACK_FILTERS = [
  { id: "ALL", label: "ALL 18 SKILLS", icon: Sparkle },
  { id: "MOTION", label: "MOTION & CAPCUT", icon: PlayCircle },
  { id: "DESIGN", label: "UI & VECTOR", icon: Palette },
  { id: "DEV", label: "WEB DEV", icon: Code2 },
  { id: "STRATEGY", label: "BRAND STRATEGY", icon: Flame },
];

export default function ToolsSection() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const filteredSkills = SKILLS.filter((s) => {
    if (activeTab === "ALL") return true;
    return s.group === activeTab;
  });

  return (
    <section 
      id="tools" 
      className="relative py-28 bg-[#F7F7F3] bg-swiss-grid border-b border-[#E5E5E0] overflow-hidden"
    >
      {/* AMBIENT BACKGROUND GLOW */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#FFB800]/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E5E0] shadow-xs mb-4"
            >
              <Wrench className="w-3.5 h-3.5 text-[#111111]" />
              <span className="font-mono-meta text-xs font-semibold text-[#111111] tracking-widest uppercase">
                04 / CREATIVE TECH STACK
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#111111] uppercase tracking-tight"
            >
              MY CREATIVE STACK.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-[#707070] font-normal leading-relaxed max-w-2xl mt-3"
            >
              The tools I use to turn ideas into visuals, experiences, and digital products.
            </motion.p>
          </div>

          {/* FILTER PILLS WITH ICON BADGES */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl md:rounded-full border border-[#E5E5E0] shadow-xs">
            {STACK_FILTERS.map((tab) => {
              const isActive = activeTab === tab.id;
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-mono-meta text-xs font-bold tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-[#111111] text-[#FFB800] shadow-sm scale-105"
                      : "text-[#707070] hover:text-[#111111] hover:bg-[#F7F7F3]"
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FLUID STAGGERED GRID SHOWCASE WITH SMOOTH SPRING ANIMATIONS */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[460px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -10 }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 25,
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 20 } 
                }}
                onClick={() => setSelectedSkill(skill)}
                className="bg-white/90 border border-[#E5E5E0] rounded-3xl p-6 shadow-card hover:shadow-2xl hover:border-[#FFB800]/70 transition-all duration-300 group flex flex-col justify-between cursor-pointer relative overflow-hidden backdrop-blur-xl"
              >
                {/* TOP ACCENT LINE ON HOVER */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFB800] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-mono-meta text-[10px] font-bold text-[#707070] uppercase tracking-wider">
                      {skill.category}
                    </span>
                    
                    {/* 3D GLOSSY APP ICON CONTAINER */}
                    <div className={`w-14 h-14 rounded-2xl p-1.5 flex items-center justify-center border shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${skill.accentBg} ${skill.accentBorder}`}>
                      <Image
                        src={skill.iconUrl}
                        alt={`${skill.name} 3D Icon`}
                        width={52}
                        height={52}
                        className="w-full h-full object-contain rounded-xl filter drop-shadow-sm"
                      />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-extrabold text-[#111111] mb-2 tracking-tight group-hover:text-[#FFB800] transition-colors flex items-center justify-between">
                    <span>{skill.name}</span>
                    <Zap className="w-4 h-4 text-[#FFB800] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>

                  <p className="text-[#707070] text-xs leading-relaxed mb-4 line-clamp-2">
                    {skill.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E5E0] flex justify-between items-center text-[10px] font-mono-meta text-[#707070]">
                  <span className="font-bold text-[#111111]">EXP: {skill.experience}</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-emerald-600 font-bold">{skill.proficiency}% PROFICIENT</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* SKILL CONTEXTUAL INSIGHT MODAL DRAWER */}
      <AnimatePresence>
        {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#111111]/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-lg bg-white border border-[#E5E5E0] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#F7F7F3] border border-[#E5E5E0] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* MODAL HEADER */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl p-2 flex items-center justify-center border shadow-sm ${selectedSkill.accentBg} ${selectedSkill.accentBorder}`}>
                  <Image
                    src={selectedSkill.iconUrl}
                    alt={selectedSkill.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                <div>
                  <span className="font-mono-meta text-xs font-bold text-[#FFB800] uppercase tracking-wider">
                    {selectedSkill.category}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold text-[#111111]">
                    {selectedSkill.name}
                  </h3>
                  <span className="font-mono-meta text-xs text-[#707070]">
                    Experience: {selectedSkill.experience} • {selectedSkill.proficiency}% Proficiency
                  </span>
                </div>
              </div>

              {/* DETAILED TOOL DESCRIPTION */}
              <div className="mb-6 bg-[#F7F7F3] rounded-2xl p-4 border border-[#E5E5E0]">
                <h4 className="font-mono-meta text-xs font-bold text-[#111111] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Sparkle className="w-3.5 h-3.5 text-[#FFB800]" />
                  <span>HOW I USE {selectedSkill.name.toUpperCase()}</span>
                </h4>
                <p className="text-sm text-[#707070] leading-relaxed">
                  {selectedSkill.details}
                </p>
              </div>

              {/* KEY PROJECTS BUILT WITH THIS TOOL */}
              <div className="mb-6">
                <h4 className="font-mono-meta text-xs font-bold text-[#111111] uppercase tracking-wider mb-3">
                  FEATURED WORK UTILIZING THIS TOOL
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSkill.keyProjects.map((proj) => (
                    <span 
                      key={proj}
                      className="px-3 py-1.5 rounded-full bg-white border border-[#E5E5E0] font-mono-meta text-xs font-semibold text-[#111111] shadow-xs flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB800]" />
                      <span>{proj}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* ACTION FOOTER */}
              <div className="pt-4 border-t border-[#E5E5E0] flex justify-end">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#111111] text-white font-display font-bold text-xs hover:bg-[#FFB800] hover:text-[#111111] transition-colors"
                >
                  CLOSE INSIGHTS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
