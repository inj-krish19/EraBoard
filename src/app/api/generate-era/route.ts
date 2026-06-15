import { NextResponse } from "next/server";
import { getTopTags, scoreQuiz, type QuizAnswers } from "@/lib/scoring";
import { getAestheticById } from "@/lib/aesthetics-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const answers: QuizAnswers = body.answers;

    if (!answers || Object.keys(answers).length === 0) {
      return NextResponse.json({ error: "No answers provided" }, { status: 400 });
    }

    // Score locally first to get base aesthetic
    const aesthetic = scoreQuiz(answers);
    const topTags = getTopTags(answers);
    const profile = getAestheticById(aesthetic.id);

    // ── Gemini Prompt ──────────────────────────────────────────
    // Highly specific prompt engineered to return exactly what we need
    const prompt = `You are a Gen Z aesthetic personality expert. A girl just completed a visual personality quiz and her results show she belongs to the "${profile.name}" aesthetic.

Her top personality tags from the quiz are: ${topTags.join(", ")}.

Based on this, generate the following EXACTLY in valid JSON format with no markdown, no explanation, just pure JSON:

{
  "era_name": "A creative, poetic name for her current life era. Format: '[Adjective] [Noun] Era' or '[Poetic phrase] Era'. Examples: 'The Quiet Storm Era', 'The Becoming Era', 'Dark Pages & Candle Wax Era'. Make it feel personal, evocative, and Gen Z. Max 6 words.",
  "bio": "A one-liner bio that describes her vibe RIGHT NOW. Written in lowercase, second person (you/your). Witty, poetic, slightly dramatic in a good way. Should feel like something she'd put in her Instagram bio immediately. Max 12 words. Examples: 'romanticizing the chaos and calling it character development', 'main character energy with a villain era undertone'. Make it match the ${profile.name} aesthetic.",
  "affirmation": "A short, empowering sentence for her era. Lowercase, poetic, max 8 words. Example: 'your sensitivity is your greatest strength.'",
  "era_month": "The month and year this era started. Pick a recent month creatively. Format: 'since [Month] [Year]'. Example: 'since october 2024'."
}

RULES:
- Return ONLY valid JSON, no markdown fences, no extra text
- Keep everything lowercase except proper nouns
- Make it feel deeply personal and accurate to ${profile.name} aesthetic
- Gen Z girls should read this and feel seen
- era_name should be dramatic and shareable
- bio should hit so hard she screenshots it immediately`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          // generationConfig: {
          //   temperature: 0.9,      // high creativity
          //   topK: 40,
          //   topP: 0.95,
          //   maxOutputTokens: 512,
          // },
        }),
      }
    );

    if (!geminiRes.ok) {
      const err = await geminiRes.text();
      console.error("[Gemini] API error:", err);
      throw new Error("Gemini API failed");
    }

    const geminiData = await geminiRes.json();
    const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    // Clean and parse JSON — strip any accidental markdown fences
    const cleaned = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let generated = {
      era_name: `The ${profile.name} Era`,
      bio: profile.bio,
      affirmation: "this era belongs to you.",
      era_month: "since january 2025",
    };

    try {
      generated = JSON.parse(cleaned);
    } catch {
      console.warn("[Gemini] JSON parse failed, using fallback. Raw:", rawText);
    }

    // Return full board data
    return NextResponse.json({
      aesthetic_id: profile.id,
      aesthetic_name: profile.name,
      tagline: profile.tagline,
      era_name: generated.era_name,
      bio: generated.bio,
      affirmation: generated.affirmation,
      era_month: generated.era_month,
      colors: profile.colors,
      images: profile.images,
      tags: topTags,
      playlist: profile.playlist,
    });

  } catch (error) {
    console.error("[generate-era] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate era" },
      { status: 500 }
    );
  }
}