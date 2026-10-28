"use client";

import { personal, siteMeta } from "@/data/resumeContent";
import { useLanguage } from "@/app/LanguageContext";
import { withBasePath } from "@/lib/assetPath";

export default function Footer() {
  const year = new Date().getFullYear();
  const { lang } = useLanguage();

  return (
      <footer className="relative border-t border-white/10 py-8">
        <div className="section-shell flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="mono-font text-[11px] uppercase tracking-[0.2em] text-silver/55">
            {siteMeta.footerTagline}
          </p>
          <div className="flex flex-col items-start gap-2 md:items-end">
            <p className="mono-font text-[11px] uppercase tracking-[0.2em] text-silver/45">
              © {year} {personal.name}
            </p>
            <a
                href={withBasePath("/cv.pdf")}
                target="_blank"
                rel="noreferrer"
                className="relative inline-flex items-center font-sans text-xs font-medium uppercase tracking-[0.15em] text-neon-cyan transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(55,244,255,0.8)] after:absolute after:-inset-4 after:z-10"
            >
              {lang === "ru" ? "Скачать CV" : "Download CV"}
            </a>
          </div>
        </div>
      </footer>
  );
}