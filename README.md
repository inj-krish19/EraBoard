# 🎨 EraBoard

> Discover your current era in 60 seconds.

**Live Demo:** https://eraboard.vercel.app/

EraBoard is a visual personality and aesthetic generator that transforms a short quiz into a personalized moodboard, aesthetic identity, color palette, era name, and shareable social card.

Think of it as:

> Pinterest + Spotify Wrapped + Personality Quiz

Users answer a series of fast, image-based questions and receive a beautifully designed board that captures their current vibe, mood, and life phase.

---

## ✨ Features

### 🧠 Visual Personality Quiz

Answer 8–12 fun, image-based questions such as:

- Pick the weather that matches your mood
- Which room feels like your brain right now?
- Your ideal Saturday looks like...
- Current relationship with sleep? 😴
- Pick a color living rent-free in your head

---

### 🎨 Personalized Aesthetic Identity

Get a unique aesthetic profile like:

- Dark Academia with Chaotic Energy
- Coastal Soft Girl
- Goblincore Intellectual
- Indie Dreamscape
- Midnight Minimalist
- Digital Nomad Noir

---

### 🖼️ AI-Generated Moodboard

Receive a curated visual board that represents your current era and personality.

Includes:

- Aesthetic imagery
- Visual vibe matching
- Lifestyle inspiration

---

### 🌈 Custom Color Palette

Every board includes a color palette generated from your responses.

Example:

```txt
#D4C2A8
#8E7B5A
#2D2A26
#C7B8A3
#F4EFE8
```

---

### 📝 Era Description

Get a personalized one-liner such as:

> Romanticizing everyday life while avoiding responsibilities.

or

> Quietly rebuilding while everyone thinks you're resting.

---

### 📅 Era Naming System

Automatically generates a unique era title:

- The Quiet Storm Era
- Main Character Recovery Arc
- Soft Rebellion Season
- The Reinvention Phase

---

### 📲 Shareable Results

Designed for screenshots and social sharing.

- Instagram Stories
- TikTok
- X (Twitter)
- Snapchat
- Discord

Every result is generated to be visually appealing and instantly shareable.

---

## 🚀 Why EraBoard?

Gen Z constantly explores identity through:

- aesthetics
- Pinterest boards
- playlists
- "eras"
- online self-expression

EraBoard turns that behavior into a fast, fun experience that users want to share with friends.

The goal:

> Create an "OMG this is literally me" moment.

---

## 🛠 Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn

### Backend

- Next.js API Routes

### Database

- Supabase

### Authentication (Optional)

- Clerk
- NextAuth

### Image Generation

- Canvas API
- html-to-image

### AI Layer (Optional)

- OpenAI
- Claude
- Gemini

Used for:

- Era naming
- Personality summaries
- Custom bios

### Deployment

- Vercel

---

## 🧩 Core Algorithm

Each answer contributes points to multiple aesthetic categories.

Example:

```txt
Rainy Weather
+3 Dark Academia
+2 Indie
+1 Dreamcore

Beach Sunset
+3 Coastal
+2 Soft Girl
```

At the end:

1. Scores are calculated
2. Top aesthetic is selected
3. Supporting traits are merged
4. Era name is generated
5. Moodboard is assembled
6. Share card is created

---

## 🔮 Future Features

### Spotify Integration

Analyze listening habits to refine results.

### Friend Group Aesthetic

Combine multiple results into one shared board.

### Era Timeline

Track aesthetic evolution over time.

### Monthly Check-Ins

Discover how your vibe changes every month.

### Public Profiles

```txt
eraboard.vercel.app/era/username
```

Share your aesthetic identity with others.

---

## 🎯 Vision

EraBoard is building a new form of self-expression.

Not another personality test.

Not another mood tracker.

A visual identity experience people actually want to share.

---

## Local Development

```bash
git clone https://github.com/inj-krish19/eraboard.git

cd eraboard

npm install

npm run dev
```

Open:

```txt
http://localhost:3000
```

---

## Contributing

Contributions, ideas, and feedback are welcome.

Feel free to open an issue or submit a pull request.

---

## License

MIT License

---

Built with ☕, aesthetics, and a slight identity crisis.
