"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/LanguageContext";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export default function ContactSection() {
  const { content, lang } = useLanguage();
  const contact = content.contact;
  const sectionRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const [copied, setCopied] = useState(false);

  const copyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return undefined;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: sectionRef.current, start: "top 72%", end: "bottom 35%", toggleActions: "play none none none", once: true } })
          .fromTo(".contact-title", { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.85 })
          .fromTo(".contact-copy", { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, "-=0.5")
          .fromTo(".contact-card", { y: 38, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.14, duration: 0.7 }, "-=0.38");
    }, sectionRef);

    const cards = Array.from(sectionRef.current.querySelectorAll(".magnetic-button"));
    const listeners = cards.map((card) => {
      const move = (event) => {
        const rect = card.getBoundingClientRect();
        const offsetX = event.clientX - rect.left - rect.width / 2;
        const offsetY = event.clientY - rect.top - rect.height / 2;
        gsap.to(card, { x: offsetX * 0.12, y: offsetY * 0.14, duration: 0.35, ease: "power2.out" });
      };
      const leave = () => gsap.to(card, { x: 0, y: 0, duration: 0.45, ease: "power3.out" });
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      return () => { card.removeEventListener("mousemove", move); card.removeEventListener("mouseleave", leave); };
    });

    return () => { listeners.forEach((cleanup) => cleanup()); ctx.revert(); };
  }, [reducedMotion]);

  return (
      <section id="contact" data-section ref={sectionRef} className="relative overflow-hidden pb-20 pt-28 md:pb-24 md:pt-36">
        <div className="section-shell relative z-10">
          <p className="label-chip inline-flex items-center leading-none">{lang === "ru" ? "Раздел 07 / Контакты" : "Section 07 / Contact"}</p>
          <h2 className="contact-title display-font text-balance mt-7 max-w-4xl py-2 text-[clamp(2rem,4.8vw,4.2rem)] font-semibold leading-[1.25] text-white">{contact.headline}</h2>
          <p className="contact-copy mt-6 max-w-2xl text-base leading-relaxed text-silver/80 md:text-lg">{contact.statement}</p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {contact.methods.map((method) => {
              const isEmail = method.label === "Email";
              const isSocial = ["Telegram", "LinkedIn", "GitHub"].includes(method.label);

              return (
                  <div key={method.label} className="contact-card magnetic-button surface-panel rounded-2xl border border-white/20 p-5">
                    <p className="mono-font text-[10px] uppercase tracking-[0.22em] text-silver/65">{method.label}</p>
                    {isEmail ? (
                        <button onClick={() => copyEmail(method.value)} className="mt-3 flex items-center gap-2 text-sm font-semibold text-white transition hover:text-neon-cyan">
                          {copied ? "Скопировано!" : method.value}
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                        </button>
                    ) : isSocial ? (
                        <a href={method.href} target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-2 text-sm font-semibold text-white transition hover:text-neon-cyan">
                          {method.label === "GitHub" && <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>}
                          {method.label === "Telegram" && <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>}
                          {method.label === "LinkedIn" && <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
                          {method.value}
                        </a>
                    ) : (
                        <a href={method.href} className="mt-3 block text-sm font-semibold text-white hover:text-neon-cyan">{method.value}</a>
                    )}
                  </div>
              );
            })}
          </div>
        </div>
      </section>
  );
}