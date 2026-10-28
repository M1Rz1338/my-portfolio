"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/app/LanguageContext";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function SkillsSection() {
  const { content, lang } = useLanguage();
  const skills = content.skills;
  const sectionRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return undefined;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: sectionRef.current, start: "top 72%", end: "bottom 35%", toggleActions: "play none none none", once: true } })
          .fromTo(".skills-title", { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 })
          .fromTo(".skill-group", { y: 32, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.12, duration: 0.65 }, "-=0.45")
          .fromTo(".skill-pill", { scale: 0.9, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, stagger: 0.04, duration: 0.45, ease: "back.out(1.7)" }, "-=0.3");
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
      <section id="skills" data-section ref={sectionRef} className="relative py-28 md:py-36">
        <div className="section-shell relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-silver/70">
            {lang === "ru" ? "Раздел 04 / Инструменты" : "Section 04 / Toolkit"}
          </div>
          <h2 className="skills-title display-font text-balance text-[clamp(2rem,4.8vw,4.2rem)] font-semibold leading-[1.15]">{lang === "ru" ? "Мой стек технологий" : "My technical toolkit"}</h2>

          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            {skills.map((group) => (
                <div key={group.category} className="skill-group lg:col-span-3">
                  <h3 className="display-font text-xl font-semibold leading-tight text-white">{group.category}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                        <span
                            key={item}
                            className="skill-pill inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-silver/80 transition-all duration-300 hover:border-neon-cyan/40 hover:bg-neon-cyan/5 hover:text-white"
                        >
                    {item}
                  </span>
                    ))}
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
}