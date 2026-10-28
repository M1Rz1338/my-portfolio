"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/app/LanguageContext";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function ProjectsSection() {
  const { content, lang } = useLanguage();
  const project = content.projects[0];
  const sectionRef = useRef(null);
  const githubBtnRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return undefined;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: sectionRef.current, start: "top 72%", toggleActions: "play none none none", once: true } })
          .fromTo(".projects-title", { y: 36, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 })
          .fromTo(".project-stage", { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, "-=0.3")
          .fromTo(".project-stage-item", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.4 }, "-=0.24");
    }, sectionRef);

    const btn = githubBtnRef.current;
    if (btn) {
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
        ctx.revert();
      };
    }

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
      <section id="projects" data-section ref={sectionRef} className="relative py-28 md:py-36">
        <div className="section-shell">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-silver/70">
              {lang === "ru" ? "Раздел 06 / Проекты" : "Section 06 / Projects"}
            </div>
            <h2 className="projects-title display-font text-balance text-[clamp(2rem,4.8vw,4.2rem)] font-semibold leading-[1.15]">{lang === "ru" ? "Практический опыт в backend-разработке" : "Practical experience in backend development"}</h2>
          </div>

          <article className="project-stage mt-14 grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="relative space-y-5 lg:col-span-6 lg:pr-4">
              <h3 className="project-stage-item display-font text-balance text-3xl font-semibold leading-tight text-white md:text-4xl">{project.title}</h3>
              <div className="project-stage-item space-y-4">
                <div className="space-y-1">
                  <p className="mono-font text-[10px] uppercase tracking-[0.18em] text-silver/55">{lang === "ru" ? "Описание" : "Concept"}</p>
                  <p className="text-base leading-relaxed text-silver/82">{project.concept}</p>
                </div>
                <div className="space-y-1">
                  <p className="mono-font text-[10px] uppercase tracking-[0.18em] text-silver/55">{lang === "ru" ? "Моя роль" : "Impact"}</p>
                  <p className="text-base leading-relaxed text-silver/82">{project.impact}</p>
                </div>
              </div>
              <div className="project-stage-item flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                    <span key={tag} className="mono-font border-b border-white/25 pb-1 text-[10px] uppercase tracking-[0.18em] text-silver/75">{tag}</span>
                ))}
              </div>

              <div className="project-stage-item flex flex-wrap items-center gap-3 perspective-[1000px]">
                <a
                    ref={githubBtnRef}
                    href="https://github.com/M1Rz1338"
                    target="_blank"
                    rel="noreferrer"
                    className="group/btn relative inline-flex h-11 min-w-[220px] items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-8 text-sm font-medium text-white transition-all duration-300 hover:border-neon-cyan/50 hover:shadow-[0_0_15px_rgba(55,244,255,0.1)] font-sans"
                >
                  <div
                      className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"
                      style={{
                        background: `radial-gradient(100px circle at var(--mouse-x) var(--mouse-y), rgba(55, 244, 255, 0.15), transparent 40%)`
                      }}
                  />
                  <span className="relative z-10 transition-transform duration-300 group-hover/btn:-translate-x-2">
                  {project.cta}
                </span>
                  <svg className="absolute right-6 z-10 h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover/btn:translate-x-0 group-hover/btn:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0f]">
                <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  <p className="ml-2 mono-font text-[10px] uppercase tracking-[0.2em] text-silver/50">terminal</p>
                </div>
                <div className="p-6 md:p-8">
                  <p className="mono-font text-sm leading-loose text-silver/70">
                    <span className="text-neon-cyan">$</span> stack info<br/>
                    {project.stack.map((tech) => (
                        <span key={tech} className="block pl-4">
                      <span className="text-neon-magenta">-</span> {tech}
                    </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
  );
}