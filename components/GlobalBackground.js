"use client";

export default function GlobalBackground() {
    return (
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[#06050d]">
            <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                    backgroundImage: `radial-gradient(#e9ecf8 1px, transparent 1px)`,
                    backgroundSize: '32px 32px',
                }}
            />
        </div>
    );
}