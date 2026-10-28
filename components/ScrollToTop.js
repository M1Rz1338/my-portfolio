"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const btnRef = useRef(null);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    useEffect(() => {
        const btn = btnRef.current;
        if (!btn || !isVisible) return;

        gsap.set(btn, { transformStyle: "preserve-3d", transformPerspective: 1000 });

        const move = (event) => {
            const rect = btn.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

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
    }, [isVisible]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!isVisible) return null;

    return (
        <button
            ref={btnRef}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="group/btn fixed bottom-6 right-6 z-[80] flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-[#06050d]/80 text-silver/80 backdrop-blur-md transition-colors duration-300 hover:border-white/60 hover:text-white md:bottom-10 md:right-10"
        >
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"
                style={{
                    background: `radial-gradient(80px circle at var(--mouse-x) var(--mouse-y), rgba(55, 244, 255, 0.2), transparent 40%)`
                }}
            />
            <svg className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover/btn:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
        </button>
    );
}