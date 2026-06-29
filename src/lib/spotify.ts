// src/lib/spotify.ts

const SPOTIFY_CLIENT_ID     = process.env.SPOTIFY_CLIENT_ID!;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const SPOTIFY_REDIRECT_URI  = `${process.env.NEXT_PUBLIC_APP_URL}/api/spotify/callback`;

// ── OAuth URL ─────────────────────────────────────────────────────────────────
export function getSpotifyAuthUrl(state: string): string {
  const scopes = [
    "user-top-read",
    "user-read-recently-played",
  ].join(" ");

  const params = new URLSearchParams({
    response_type: "code",
    client_id:     SPOTIFY_CLIENT_ID,
    scope:         scopes,
    redirect_uri:  SPOTIFY_REDIRECT_URI,
    state,
  });
  
  console.log({
  redirect_uri: SPOTIFY_REDIRECT_URI,
});

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

// ── Token exchange ────────────────────────────────────────────────────────────
export async function exchangeSpotifyCode(code: string): Promise<{
  access_token: string;
  refresh_token: string;
  expires_in: number;
} | null> {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type:   "authorization_code",
      code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
    }),
  });

  if (!res.ok) return null;
  return res.json();
}

// ── Refresh token ─────────────────────────────────────────────────────────────
export async function refreshSpotifyToken(refreshToken: string): Promise<string | null> {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type:    "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.access_token ?? null;
}

// ── Fetch top artists + tracks ─────────────────────────────────────────────────
export interface SpotifyProfile {
  topArtists: string[];
  topGenres:  string[];
  topTracks:  string[];
  mood:       string; // derived from genres
}

export async function fetchSpotifyProfile(accessToken: string): Promise<SpotifyProfile> {
  const headers = { Authorization: `Bearer ${accessToken}` };

  const [artistsRes, tracksRes] = await Promise.all([
    fetch("https://api.spotify.com/v1/me/top/artists?limit=20&time_range=medium_term", { headers }),
    fetch("https://api.spotify.com/v1/me/top/tracks?limit=20&time_range=medium_term",  { headers }),
  ]);

  const artistsData = artistsRes.ok ? await artistsRes.json() : { items: [] };
  const tracksData  = tracksRes.ok  ? await tracksRes.json()  : { items: [] };

  const topArtists: string[] = (artistsData.items ?? []).map((a: any) => a.name);

  // Flatten + deduplicate genres from top artists
  const genreSet = new Set<string>();
  (artistsData.items ?? []).forEach((a: any) =>
    (a.genres ?? []).forEach((g: string) => genreSet.add(g))
  );
  const topGenres = [...genreSet].slice(0, 15);

  const topTracks: string[] = (tracksData.items ?? []).map(
    (t: any) => `${t.name} by ${t.artists?.[0]?.name ?? "unknown"}`
  );

  // Derive a simple mood label from genres
  const mood = deriveMood(topGenres);

  return { topArtists, topGenres, topTracks, mood };
}

function deriveMood(genres: string[]): string {
  const joined = genres.join(" ").toLowerCase();
  if (/sad|emo|melanchol|grief|dark/.test(joined))     return "melancholic and introspective";
  if (/indie|dream|shoegaze|ambient/.test(joined))     return "dreamy and atmospheric";
  if (/pop|dance|electro|party|upbeat/.test(joined))   return "bright and energetic";
  if (/classical|jazz|acoustic|folk/.test(joined))     return "warm and nostalgic";
  if (/metal|punk|grunge|hardcore/.test(joined))       return "raw and rebellious";
  if (/r&b|soul|neo soul|bedroom/.test(joined))        return "sensual and soulful";
  return "eclectic and layered";
}

// ── Gemini refinement ─────────────────────────────────────────────────────────
export interface RefinedEra {
  refined_era_name:  string;
  refined_bio:       string;
  spotify_influence: string; // one sentence on how music shaped it
  playlist_vibe:     string; // what their playlist says about them
  affirmation:       string;
}

export async function refineEraWithSpotify(
  existingEra: {
    era_name:       string;
    aesthetic_name: string;
    bio:            string;
    tags:           string[];
  },
  spotify: SpotifyProfile
): Promise<RefinedEra> {
  const prompt = `You are an aesthetic identity AI. A user has a visual aesthetic era AND a Spotify listening profile. Combine both to create a deeper, more personal refined era identity.

VISUAL ERA (from quiz):
- Era name: ${existingEra.era_name}
- Aesthetic: ${existingEra.aesthetic_name}
- Bio: ${existingEra.bio}
- Tags: ${existingEra.tags.join(", ")}

SPOTIFY LISTENING PROFILE:
- Top artists: ${existingEra ? spotify.topArtists.slice(0, 10).join(", ") : "none"}
- Top genres: ${spotify.topGenres.slice(0, 10).join(", ")}
- Top tracks: ${spotify.topTracks.slice(0, 8).join(" | ")}
- Overall mood: ${spotify.mood}

Generate a refined era identity that merges the visual aesthetic with the musical soul. Respond ONLY with a valid JSON object, no markdown, no extra text:
{
  "refined_era_name": "poetic era name that blends visual + sonic identity (3-6 words)",
  "refined_bio": "2-3 sentence bio, first person, that captures both visual aesthetic and musical taste, deeply personal and atmospheric",
  "spotify_influence": "one sentence on how their music taste shapes or deepens their visual era",
  "playlist_vibe": "one evocative sentence about what their playlist says about who they are",
  "affirmation": "a short affirmation (under 12 words) that fits both the visual and sonic era"
}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.85, maxOutputTokens: 600 },
      }),
    }
  );

  if (!res.ok) throw new Error("Gemini request failed");

  const data = await res.json();
  const raw  = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  const clean = raw.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(clean) as RefinedEra;
  } catch {
    // Fallback if Gemini output is malformed
    return {
      refined_era_name:  existingEra.era_name,
      refined_bio:       existingEra.bio,
      spotify_influence: "Your music taste deepens your visual aesthetic in unexpected ways.",
      playlist_vibe:     "Your playlist is a portal to another dimension of yourself.",
      affirmation:       "You contain multitudes.",
    };
  }
}