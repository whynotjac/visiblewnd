"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type TeamMember = {
  name: string;
  title: string;
  description: string;
  /** Percentage-based zone: [left%, right%] */
  zone: [number, number];
};

const members: TeamMember[] = [
  {
    name: "Jonathan Cubbison",
    title: "Partner",
    description:
      "Jonathan leads project coordination, installation execution, and client communication from kickoff through completion. He is known for clear planning, clean jobsite standards, and detail-focused delivery on both custom homes and high-end renovations.",
    zone: [0, 36]
  },
  {
    name: "Neil Cubbison",
    title: "Partner",
    description:
      "Neil is the foundation of the team expertise. He has worked on complex window and door projects for over 30 years and in glass even longer, passing on decades of hands-on knowledge, precision practices, and professional standards to the next generation.",
    zone: [30, 64]
  },
  {
    name: "William Cubbison",
    title: "Partner",
    description:
      "William supports product selection, technical layout review, and field problem-solving across complex window and door scopes. His approach balances performance, design intent, and practical installation methods that hold up over time.",
    zone: [62, 100]
  }
];

const CYCLE_MS = 5500;

export function TeamPhotoShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback(() => {
    setActiveIndex((i) => (i + 1) % members.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(advance, CYCLE_MS);
    return () => clearInterval(id);
  }, [isPaused, advance]);

  function handleSelect(index: number) {
    setActiveIndex(index);
    setIsPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setIsPaused(false), 12_000);
  }

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  const active = members[activeIndex];

  return (
    <div className="space-y-6">
      {/* Photo with spotlight */}
      <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-line shadow-card sm:aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/3]">
        <Image
          src="/images/team/vfamilyphoto.jpg"
          alt="The Cubbison family — Jonathan, Neil, and William"
          fill
          className="object-cover object-left-top"
          sizes="(min-width: 1024px) 70vw, 95vw"
          priority
        />

        {/* Dark overlay with spotlight cutout */}
        <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
          {/* Left dim zone */}
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-black/60 to-black/50 transition-opacity duration-1000"
            style={{
              right: `${100 - active.zone[0]}%`,
              opacity: active.zone[0] === 0 ? 0 : 1
            }}
          />
          {/* Right dim zone */}
          <div
            className="absolute inset-y-0 right-0 bg-gradient-to-l from-black/60 to-black/50 transition-opacity duration-1000"
            style={{
              left: `${active.zone[1]}%`,
              opacity: active.zone[1] === 100 ? 0 : 1
            }}
          />
          {/* Soft edges on the spotlight */}
          <div
            className="pointer-events-none absolute inset-y-0 transition-all duration-1000"
            style={{
              left: `${active.zone[0]}%`,
              right: `${100 - active.zone[1]}%`,
              background:
                "linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.45) 100%)"
            }}
          />
        </div>

        {/* Bottom gradient for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Clickable zones */}
        {members.map((member, i) => (
          <button
            key={member.name}
            type="button"
            aria-label={`View ${member.name}'s profile`}
            className="absolute inset-y-0 cursor-pointer transition-all"
            style={{
              left: `${member.zone[0]}%`,
              right: `${100 - member.zone[1]}%`
            }}
            onClick={() => handleSelect(i)}
          />
        ))}

        {/* Active member info overlay */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-5 sm:px-8 sm:pb-8">
          <div
            key={activeIndex}
            className="animate-fade-up"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              {active.title}
            </p>
            <h3 className="mt-1 font-display text-2xl text-white sm:text-3xl lg:text-4xl">
              {active.name}
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base sm:leading-7">
              {active.description}
            </p>
          </div>
        </div>
      </div>

      {/* Indicator dots / nav */}
      <div className="flex items-center justify-center gap-3">
        {members.map((member, i) => (
          <button
            key={member.name}
            type="button"
            aria-label={`Show ${member.name}`}
            onClick={() => handleSelect(i)}
            className="group/dot flex flex-col items-center gap-2"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? "w-10 bg-accent"
                  : "w-2 bg-accent/30 group-hover/dot:bg-accent/60"
              }`}
            />
            <span
              className={`text-xs font-medium tracking-wide transition-colors duration-300 ${
                i === activeIndex ? "text-accent" : "text-accent/40"
              }`}
            >
              {member.name.split(" ")[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
