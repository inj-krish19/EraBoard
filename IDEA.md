# 🎨 Aesthetic Board Generator

---

### **The Core Idea**

You answer 8–12 fun, visual questions about your current mood, life phase, personality — and the app generates a **personalized moodboard** + **aesthetic identity** that feels _so accurate_ people immediately want to share it.

Think: "Pinterest meets personality quiz meets Spotify Wrapped."

---

### **The Use Case**

GenZ is constantly in a process of self-expression and identity exploration. They talk in "eras" (my villain era, my soft girl era, my that girl era). They build aesthetic Pinterest boards. They make "about me" pages. This app does all of that in **60 seconds** — automatically, beautifully.

---

### **User Flow**

```
Land on site → Take the quiz → Get your aesthetic board →
Save it / Share it → Come back next month when your "era" changes
```

**The Quiz (examples):**

- "Pick the weather that matches your current mood"
- "Which of these rooms feels like your brain right now?"
- "Your ideal Saturday is..." (with image options)
- "Current relationship with sleep?" 😂
- "Pick a color that's been living in your head"

All image-based, minimal text — fast and fun.

---

### **The Output (the magic part)**

A generated card/board that includes:

- 🎨 **Your aesthetic name** — "Dark Academia with Chaotic Energy" / "Coastal Soft Girl" / "Goblincore Intellectual"
- 🖼️ **Moodboard** — curated grid of ~9 images that match the vibe
- 🎵 **Playlist vibe** — genre/mood tags like "cigarettes after sex energy" or "hyperpop chaos"
- 🌈 **Your color palette** — 4–5 hex colors that represent your current era
- 📝 **One-liner bio** — "Currently romanticizing their life while avoiding responsibilities"
- 📅 **"Era name"** — e.g. _"The Quiet Storm Era — Q1 2026"_

---

### **Why They'll Share It**

This is the most important part — shareability is baked in by design:

- The output looks **visually stunning** — made to be screenshotted
- It feels **personal and accurate** — people tag friends saying "this is literally you"
- The **era naming** creates FOMO — friends want to see each other's
- It's **low effort to share** — one tap exports a clean image card
- It has **"omg this is so me" energy** — the highest sharing trigger for GenZ

---

### **Why It Will Survive & Grow**

| Factor                     | Why it works                                          |
| -------------------------- | ----------------------------------------------------- |
| **Reusability**            | Your era changes every few months — they come back    |
| **No login needed** to try | Zero friction entry                                   |
| **Shareable output**       | Built-in organic marketing                            |
| **Emotional resonance**    | Self-identity is deeply personal to GenZ              |
| **Low competition**        | No one has nailed this specific combo                 |
| **Expandable**             | Can add Spotify integration, friend comparisons, etc. |

---

### **Core Features (V1 — keep it scoped)**

1. **Quiz engine** — image-based questions, smooth animated transitions
2. **Aesthetic algorithm** — maps answers to aesthetic profiles (you define ~15–20 aesthetics)
3. **Board generator** — pulls curated images per aesthetic, assembles the card
4. **Export card** — download as image, share to Instagram stories natively
5. **"My Era" page** — shareable public link like `eraboard.vercel.app/era/username`

---

### **V2 Features (after traction)**

- Spotify integration — analyzes your listening to refine the aesthetic
- "Friend group aesthetic" — combine multiple people's results
- Monthly "era update" reminder
- Aesthetic evolution timeline — see how your vibe changed over time
- Community gallery — browse others' public boards

---

### **Tech Stack (Next.js)**

- **Frontend** — Next.js + Tailwind + Framer Motion (for smooth quiz animations)
- **Board generation** — Canvas API or a library like `html-to-image` for export
- **Image sourcing** — curated Unsplash collections per aesthetic category
- **AI layer (optional but powerful)** — use Claude API to generate the one-liner bio and era name dynamically
- **Auth** — Clerk or NextAuth (optional for V1)
- **Database** — Supabase (store boards, share links)

---

### **The One Thing That Makes It Boom**

The **shareable card has to look gorgeous.** If the output card is beautiful enough that people post it on their Instagram story without thinking twice — the app markets itself. Every share is an ad. That's the entire growth engine.

---

Want me to help you plan the **technical architecture**, design the **quiz question set**, or sketch out the **aesthetic categories and their mappings**? We can go deep on whichever part you want to tackle first.
