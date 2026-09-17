"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import Sparkle3D from "@/components/ui/Sparkle3D";

// Pure math wrap helper function
function wrap(min: number, max: number, v: number): number {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

interface ParallaxTextProps {
  children: string[];
  baseVelocity: number;
  direction?: number;
  bgColor: string;
  textColor: string;
  starColor: string;
  tiltAngle: string;
}

function ParallaxRibbonRow({
  children,
  baseVelocity = 100,
  direction = 1,
  bgColor,
  textColor,
  starColor,
  tiltAngle,
}: ParallaxTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // Calculate dynamic velocity skew (-6deg to 6deg) based on scroll speed
  const velocityFactor = useTransform(smoothVelocity, [ -1000, 0, 1000 ], [ -3, 0, 3 ], {
    clamp: false,
  });

  const skewX = useSpring(velocityFactor, { damping: 30, stiffness: 300 });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  const [isHovered, setIsHovered] = React.useState(false);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Reverses movement direction depending on scroll direction
    if (smoothVelocity.get() < 0) {
      directionFactor.current = -1 * direction;
    } else if (smoothVelocity.get() > 0) {
      directionFactor.current = 1 * direction;
    }

    // Accelerate speed based on scroll velocity
    moveBy += directionFactor.current * moveBy * Math.abs(smoothVelocity.get() / 400);

    // Slow down smoothly when hovered
    if (isHovered) {
      moveBy *= 0.2;
    }

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className={`w-full overflow-hidden py-3.5 shadow-xl transition-transform duration-300 select-none ${bgColor} ${tiltAngle}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="pointer"
    >
      <motion.div
        className="flex whitespace-nowrap gap-8"
        style={{ x, skewX }}
      >
        {/* Render 4 repeated cycles for continuous infinite wrap */}
        {Array.from({ length: 4 }).map((_, loopIdx) => (
          <React.Fragment key={loopIdx}>
            {children.map((text, idx) => (
              <div
                key={`${loopIdx}-${idx}`}
                className="flex items-center gap-8 group cursor-pointer"
              >
                <span
                  className={`font-display font-extrabold text-sm sm:text-base md:text-lg tracking-widest uppercase transition-transform duration-300 group-hover:scale-105 ${textColor}`}
                >
                  {text}
                </span>

                <span className={`flex items-center justify-center ${starColor}`}>
                  <Sparkle3D className="w-4 h-4" />
                </span>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

const ITEMS_TOP = [
  "BRAND IDENTITY",
  "POSTER ART & GRAPHICS",
  "UI / UX INTERFACE DESIGN",
  "TEDx BRAND ECOSYSTEM",
  "MARKETING CAMPAIGNS",
  "TYPOGRAPHY & EDITORIAL",
];

const ITEMS_BOTTOM = [
  "FRONTEND WEB DEVELOPMENT",
  "NEXT.JS & REACT EXPERIENCES",
  "SWAPNA CATERING MENU BOOK",
  "VIDHARA CREATIVE CAMPAIGN",
  "CREATIVE DIRECTION",
  "SWISS EDITORIAL LAYOUTS",
];

export default function KineticRibbon() {
  return (
    <div className="relative w-full py-10 overflow-hidden my-6">
      {/* BACKGROUND ACCENT BLUR GLOW */}
      <div className="absolute inset-0 bg-[#FFB800]/5 blur-3xl pointer-events-none -z-10" />

      {/* DUAL ANGLED VELOCITY SCROLL RIBBONS */}
      <div className="flex flex-col gap-1 sm:gap-2">
        {/* RIBBON 1: DARK OBSIDIAN LAYER (SCROLLS LEFT, TILTED -1.5deg) */}
        <ParallaxRibbonRow
          baseVelocity={-2.5}
          direction={-1}
          bgColor="bg-[#111111] border-y border-[#111111]"
          textColor="text-[#F7F7F3]"
          starColor="text-[#FFB800]"
          tiltAngle="-rotate-1 sm:-rotate-2 scale-105"
        >
          {ITEMS_TOP}
        </ParallaxRibbonRow>

        {/* RIBBON 2: GOLD ACCENT LAYER (SCROLLS RIGHT, TILTED +1.5deg OVERLAPPING) */}
        <ParallaxRibbonRow
          baseVelocity={2.5}
          direction={1}
          bgColor="bg-[#FFB800] border-y border-[#111111]"
          textColor="text-[#111111]"
          starColor="text-[#111111]"
          tiltAngle="rotate-1 sm:rotate-2 scale-105 -mt-3 sm:-mt-5 z-10 shadow-2xl"
        >
          {ITEMS_BOTTOM}
        </ParallaxRibbonRow>
      </div>
    </div>
  );
}
