"use client";

export function GlowBackground() {
    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {/* Top-left purple orb */}
            <div
                className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20 animate-glow-pulse"
                style={{
                    background:
                        "radial-gradient(circle, #a855f7 0%, #c084fc 30%, transparent 70%)",
                    filter: "blur(80px)",
                }}
            />
            {/* Top-right cyan orb */}
            <div
                className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full opacity-15 animate-glow-pulse"
                style={{
                    background:
                        "radial-gradient(circle, #67e8f9 0%, #22d3ee 30%, transparent 70%)",
                    filter: "blur(80px)",
                    animationDelay: "1.5s",
                }}
            />
            {/* Bottom-center warm orb */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-10"
                style={{
                    background:
                        "radial-gradient(circle, #f0abfc 0%, #c084fc 40%, transparent 70%)",
                    filter: "blur(100px)",
                }}
            />
        </div>
    );
}