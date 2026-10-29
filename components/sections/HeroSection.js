"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/LanguageContext";
import { gsap } from "@/lib/gsap";
import { withBasePath } from "@/lib/assetPath";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function HeroSection() {
  const { content, lang } = useLanguage();
  const personal = content.personal;
  const sectionRef = useRef(null);
  const cvBtnRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return undefined;
    let cleanup = () => {};
    const initHeroAnimations = () => {
      const ctx = gsap.context(() => {
        const root = sectionRef.current;
        const name = root.querySelector(".hero-name");
        const field = root.querySelector(".hero-field");
        const statement = root.querySelector(".hero-statement");
        const cue = root.querySelector(".hero-scroll-cue");
        const contentEl = root.querySelector(".hero-scene-content");
        const portrait = root.querySelector(".hero-portrait");
        const buttons = root.querySelector(".hero-buttons");

        const intro = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            end: "bottom 40%",
            toggleActions: "play none none none",
            once: true
          }
        });

        intro
            .from(name, { y: 20, autoAlpha: 0, duration: 0.7 })
            .from(field, { y: 14, autoAlpha: 0, duration: 0.55 }, "-=0.35")
            .fromTo(statement, { y: 18, autoAlpha: 0, filter: "blur(8px)" }, { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.65 }, "-=0.3")
            .fromTo(buttons, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, "-=0.2")
            .fromTo(cue, { y: -6, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45 }, "-=0.15")
            .fromTo(portrait, { x: 20, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.7 }, "-=0.6");

        gsap.to(contentEl, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top+=20%", scrub: 1 }
        });
      }, sectionRef);
      cleanup = () => ctx.revert();
    };

    const onLoaderDone = () => initHeroAnimations();
    if (window.__cv2LoaderDone) {
      initHeroAnimations();
    } else {
      window.addEventListener("cv2:loader-done", onLoaderDone, { once: true });
    }

    return () => {
      window.removeEventListener("cv2:loader-done", onLoaderDone);
      cleanup();
    };
  }, [reducedMotion]);

  useEffect(() => {
    const btn = cvBtnRef.current;
    if (!btn || reducedMotion) return;

    gsap.set(btn, { transformStyle: "preserve-3d", transformPerspective: 1000 });

    const move = (event) => {
      const rect = btn.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      gsap.to(btn, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: "power2.out"
      });

      btn.style.setProperty("--mouse-x", `${x}px`);
      btn.style.setProperty("--mouse-y", `${y}px`);
    };

    const leave = () => {
      gsap.to(btn, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "power3.out"
      });
    };

    btn.addEventListener("mousemove", move);
    btn.addEventListener("mouseleave", leave);

    return () => {
      btn.removeEventListener("mousemove", move);
      btn.removeEventListener("mouseleave", leave);
    };
  }, [reducedMotion]);

  return (
      <section
          id="hero"
          data-section
          ref={sectionRef}
          className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32 md:pb-20 md:pt-36"
      >
        <div className="section-shell hero-scene-content relative z-10 w-full">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="max-w-[820px] lg:col-span-7">
              <h1 className="hero-name display-font text-balance text-[clamp(2.1rem,5.4vw,4.9rem)] font-semibold leading-[1.15] text-white">
                {personal.name}
              </h1>
              <p className="hero-field mono-font mt-3 text-xs uppercase tracking-[0.2em] text-neon-cyan">
                {personal.title}
              </p>
              <p className="hero-statement text-balance mt-4 max-w-lg text-sm leading-relaxed text-silver/80 md:text-base">
                {personal.heroStatement}
              </p>

              <div className="hero-buttons mt-8 flex flex-wrap items-center gap-4 perspective-[1000px]">
                <a
                    ref={cvBtnRef}
                    href={withBasePath("/cv.pdf")}
                    target="_blank"
                    rel="noreferrer"
                    className="group/btn relative inline-flex h-11 min-w-[180px] items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-6 text-sm font-medium text-white transition-all duration-300 hover:border-neon-cyan/50 hover:shadow-[0_0_15px_rgba(55,244,255,0.1)]"
                >
                  <div
                      className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"
                      style={{
                        background: `radial-gradient(100px circle at var(--mouse-x) var(--mouse-y), rgba(55, 244, 255, 0.15), transparent 40%)`
                      }}
                  />
                  <div className="relative z-10 flex items-center justify-center gap-2">
                  <span>
                    {lang === "ru" ? "Скачать CV" : "Download CV"}
                  </span>
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            <div className="hero-portrait relative mx-auto hidden w-full max-w-[360px] lg:col-span-5 lg:block xl:max-w-[400px]">
              <div className="hero-portrait-shell relative mx-auto aspect-[3/4] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-neon-cyan/10">
                <Image
                    src={withBasePath("/yaroslav1.jpg")}
                    alt={`${personal.name} portrait`}
                    fill
                    sizes="(max-width: 1279px) 360px, 400px"
                    className="object-cover"
                    priority
                />
              </div>
            </div>
          </div>
        </div>

        <button
            aria-label="Scroll to about section"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="hero-scroll-cue absolute bottom-4 left-1/2 z-20 -translate-x-1/2 md:bottom-6"
        >
        <span className="mono-font inline-flex flex-col items-center text-[11px] uppercase tracking-[0.24em] text-silver/70">
          Scroll
          <span className="mt-2 h-8 w-px animate-pulseCue bg-gradient-to-b from-silver/70 to-transparent" />
        </span>
        </button>
      </section>
  );
}