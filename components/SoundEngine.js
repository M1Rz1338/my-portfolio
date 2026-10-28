"use client";

import { useEffect } from "react";

export default function SoundEngine() {
    useEffect(() => {
        let audioCtx = null;

        const initAudio = () => {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtx.state === "suspended") {
                audioCtx.resume();
            }
        };

        const playHover = () => {
            if (!audioCtx) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(800, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.012, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.05);
        };

        const handlePointerDown = () => initAudio();

        const handleMouseOver = (e) => {
            initAudio();
            const target = e.target.closest("a, button, .skill-pill");
            if (target && !target.hasAttribute("data-no-sound")) {
                playHover();
            }
        };

        document.addEventListener("pointerdown", handlePointerDown, { once: true });
        document.addEventListener("mouseover", handleMouseOver);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("mouseover", handleMouseOver);
            if (audioCtx) audioCtx.close();
        };
    }, []);

    return null;
}