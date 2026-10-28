"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/LanguageContext";
import { gsap } from "@/lib/gsap";
import { withBasePath } from "@/lib/assetPath";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function renderHeadingWords(text) {
  return text.split(" ").map((word, index) => (
      <span key={`${word}-${index}`} className="mr-[0.3ch] inline-block overflow-hidden">
      <span className="about-title-word inline-block">{word}</span>
    </span>
  ));
}

export default function AboutSection() {
  const { content } = useLanguage();
  const personal = content.personal;
  const sectionRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return undefined;
    const ctx = gsap.context(() => {
      const root = sectionRef.current;
      const titleWords = root.querySelectorAll(".about-title-word");
      const copyLines = root.querySelectorAll(".about-copy-line");
      const panel = root.querySelector(".identity-panel");
      const portrait = root.querySelector(".about-portrait-frame");
      const caption = root.querySelector(".about-caption");

      gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: sectionRef.current, start: "top 72%", end: "bottom 35%", toggleActions: "play none none none", once: true } })
          .from(titleWords, { yPercent: 120, autoAlpha: 0, stagger: 0.03, duration: 0.8 })
          .fromTo(copyLines, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.16, duration: 0.65 }, "-=0.35")
          .fromTo(panel, { x: 60, y: 20, rotate: 5, autoAlpha: 0 }, { x: 0, y: 0, rotate: 0, autoAlpha: 1, duration: 0.9 }, "-=0.5")
          .fromTo(portrait, { scale: 1.08, autoAlpha: 0.8 }, { scale: 1, autoAlpha: 1, duration: 0.9 }, "-=0.55")
          .fromTo(caption, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, "-=0.45");
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
      <section id="about" data-section ref={sectionRef} className="relative py-28 md:py-36">
        <div className="section-shell relative z-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-silver/70">
              Раздел 02 / Обо мне
            </div>
            <h2 className="display-font text-balance text-[clamp(2rem,4.5vw,4rem)] font-semibold leading-[1.15]">{renderHeadingWords(personal.aboutHeading)}</h2>
            <div className="mt-8 space-y-5">
              {personal.aboutParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 22)} className="about-copy-line max-w-2xl text-base leading-relaxed text-silver/80 md:text-lg">{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="identity-panel relative mx-auto mt-2 max-w-[420px]">
              <figure className="about-portrait-frame relative aspect-[2/3] w-full overflow-hidden rounded-[20px] shadow-[0_28px_70px_rgba(2,3,11,0.55)]">
                <Image src={withBasePath("/yaroslav2.JPEG")} alt={`${personal.name} portrait`} fill sizes="(max-width: 1023px) 80vw, 420px" className="object-cover object-center" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(175deg,rgba(8,9,19,0.08),rgba(8,9,19,0.3))]" />
              </figure>

              <figcaption className="about-caption mt-4 flex items-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <p className="mono-font text-[10px] uppercase tracking-[0.2em] text-neon-cyan">Junior Java Developer</p>
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </figcaption>
            </div>
          </div>
        </div>
      </section>
  );
}