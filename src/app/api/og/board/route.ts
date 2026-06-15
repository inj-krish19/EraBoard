import { ImageResponse } from "next/og";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const boardId = searchParams.get("id");

  // Fallback data if no board found
  let eraName      = "Find Your Era";
  let bio          = "discover your current aesthetic era";
  let aestheticName = "EraBoard";
  let colors: string[] = ["#c084fc", "#a855f7", "#67e8f9", "#f0abfc", "#fda4af"];
  let heroImage: string | null = null;
  let images: string[] = [];

  if (boardId) {
    try {
      const cookieStore = await cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
          process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)!,
        {
          cookies: {
            getAll: () => cookieStore.getAll(),
            setAll: () => {},
          },
        }
      );

      const { data } = await supabase
        .from("boards")
        .select("era_name, bio, aesthetic_name, colors, images")
        .eq("board_id", boardId)
        .single();

      if (data) {
        eraName       = data.era_name;
        bio           = data.bio;
        aestheticName = data.aesthetic_name;
        colors        = data.colors ?? colors;
        images        = data.images ?? [];
        heroImage     = images[0] ?? null;
      }
    } catch (err) {
      console.error("[og/board] Error:", err);
    }
  }

  const primary = colors[0] ?? "#c084fc";
  const accent  = colors[2] ?? "#67e8f9";
  const gridImages = images.slice(1, 5);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#0a0a0f",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Left side — hero image */}
        <div
          style={{
            width: "460px",
            height: "630px",
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {heroImage ? (
            <img
              src={heroImage}
              width={460}
              height={630}
              alt=""
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: `linear-gradient(135deg, ${primary}30, ${accent}20)`,
              }}
            />
          )}
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, transparent 60%, #0a0a0f 100%)",
            }}
          />
        </div>

        {/* Right side — content */}
        <div
          style={{
            flex: 1,
            padding: "50px 60px 50px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Top — logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={`${process.env.NEXT_PUBLIC_APP_URL}/icon.svg`}
              width={32}
              height={32}
              alt="EraBoard"
              style={{ borderRadius: "8px" }}
            />
            <span style={{ color: "#5a5470", fontSize: "16px", fontWeight: 600 }}>
              EraBoard
            </span>
          </div>

          {/* Middle — era info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Aesthetic badge */}
            <div
              style={{
                display: "inline-flex",
                padding: "6px 16px",
                borderRadius: "999px",
                background: `${primary}15`,
                border: `1px solid ${primary}35`,
                color: primary,
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                width: "fit-content",
              }}
            >
              {aestheticName}
            </div>

            {/* Era name */}
            <div
              style={{
                fontSize: "52px",
                fontWeight: 800,
                lineHeight: 1.05,
                background: `linear-gradient(135deg, ${primary}, ${accent})`,
                backgroundClip: "text",
                color: "transparent",
                fontFamily: "serif",
              }}
            >
              {eraName}
            </div>

            {/* Bio */}
            <div
              style={{
                fontSize: "20px",
                color: "#a09ab8",
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {bio}
            </div>

            {/* Mini image grid */}
            {gridImages.length > 0 && (
              <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                {gridImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    width={64}
                    height={64}
                    alt=""
                    style={{ borderRadius: "10px", objectFit: "cover" }}
                  />
                ))}
              </div>
            )}

            {/* Color palette */}
            <div style={{ display: "flex", gap: "8px" }}>
              {colors.slice(0, 5).map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: c,
                    border: "1.5px solid rgba(255,255,255,0.1)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bottom — CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 20px",
              borderRadius: "999px",
              background: `${primary}12`,
              border: `1px solid ${primary}25`,
              width: "fit-content",
            }}
          >
            <span style={{ color: primary, fontSize: "15px", fontWeight: 600 }}>
              ✦ find your era at eraboard
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}