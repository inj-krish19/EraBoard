import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "EraBoard — Find Your Aesthetic Era";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "1200px",
                    height: "630px",
                    background: "linear-gradient(135deg, #1a0533 0%, #0a0a0f 50%, #001a2c 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "serif",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Purple glow orb top left */}
                <div
                    style={{
                        position: "absolute",
                        top: "-100px",
                        left: "-100px",
                        width: "500px",
                        height: "500px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
                        filter: "blur(60px)",
                    }}
                />
                {/* Cyan glow orb bottom right */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "-80px",
                        right: "-80px",
                        width: "400px",
                        height: "400px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(103,232,249,0.25) 0%, transparent 70%)",
                        filter: "blur(60px)",
                    }}
                />

                {/* Logo */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "32px",
                    }}
                >
                    <img
                        src={`${process.env.NEXT_PUBLIC_APP_URL}/icon.svg`}
                        width={48}
                        height={48}
                        alt="EraBoard"
                        style={{ borderRadius: "12px" }}
                    />
                    <span
                        style={{
                            fontSize: "32px",
                            fontWeight: 700,
                            color: "#f1f0ff",
                            letterSpacing: "-0.5px",
                        }}
                    >
                        EraBoard
                    </span>
                </div>

                {/* Headline */}
                <div
                    style={{
                        fontSize: "72px",
                        fontWeight: 800,
                        textAlign: "center",
                        lineHeight: 1.05,
                        marginBottom: "20px",
                        background: "linear-gradient(135deg, #c084fc, #67e8f9)",
                        backgroundClip: "text",
                        color: "transparent",
                        padding: "0 80px",
                    }}
                >
                    what's your current era?
                </div>

                {/* Subtext */}
                <div
                    style={{
                        fontSize: "24px",
                        color: "#a09ab8",
                        textAlign: "center",
                        fontFamily: "sans-serif",
                        fontWeight: 400,
                    }}
                >
                    10 visual questions · your aesthetic moodboard · shareable era card
                </div>

                {/* Bottom pill */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "40px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 20px",
                        borderRadius: "999px",
                        background: "rgba(192,132,252,0.1)",
                        border: "1px solid rgba(192,132,252,0.25)",
                    }}
                >
                    <span style={{ color: "#c084fc", fontSize: "14px", fontFamily: "sans-serif" }}>
                        eraboard · free · no sign up needed
                    </span>
                </div>
            </div>
        ),
        { ...size }
    );
}