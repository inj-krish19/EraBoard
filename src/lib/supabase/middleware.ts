// This file is intentionally NOT imported by src/middleware.ts
// to avoid the @supabase/ssr edge runtime instantiation error.
//
// Session refresh is handled automatically by:
//   - server.ts  → in Server Components & Route Handlers
//   - client.ts  → in Client Components via AuthProvider
//
// If you need full Supabase middleware in the future, upgrade to
// @supabase/ssr >= 0.6.x which has stable edge runtime support.

export {};