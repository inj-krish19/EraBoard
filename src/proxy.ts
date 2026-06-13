import { type NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  // We handle session refresh in server components/actions via server.ts
  // Middleware only does lightweight route protection using the cookie directly
  const { pathname } = request.nextUrl;

  const protectedPaths = ["/era", "/profile"];
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtected) {
    // Check for supabase auth cookie (either pkce or implicit flow)
    const hasSession =
      request.cookies.has("sb-access-token") ||
      [...request.cookies.getAll()].some((c) =>
        c.name.includes("auth-token")
      );

    if (!hasSession) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      url.searchParams.set("auth", "required");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};