import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new NextResponse("Missing url param", { status: 400 });
  }

  // Only allow Unsplash images for security
  const allowed = [
    "images.unsplash.com",
    "plus.unsplash.com",
  ];

  try {
    const parsed = new URL(url);
    if (!allowed.some((domain) => parsed.hostname.endsWith(domain))) {
      return new NextResponse("Domain not allowed", { status: 403 });
    }
  } catch {
    return new NextResponse("Invalid url", { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        // Pretend to be a browser so Unsplash serves the image
        "User-Agent": "Mozilla/5.0 (compatible; EraBoard/1.0)",
      },
    });

    if (!res.ok) {
      return new NextResponse("Image fetch failed", { status: res.status });
    }

    const buffer = await res.arrayBuffer();
    const contentType = res.headers.get("content-type") ?? "image/jpeg";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        // Cache for 1 hour — images don't change
        "Cache-Control": "public, max-age=3600, immutable",
        // Allow canvas to use this image
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("[proxy-image] Error:", err);
    return new NextResponse("Proxy failed", { status: 500 });
  }
}