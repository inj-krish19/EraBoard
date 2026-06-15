export interface AestheticProfile {
  id: string;
  name: string;
  tagline: string;
  bio: string;
  colors: string[];
  tags: string[];
  images: string[];
  playlist: string;
  keywords: string[]; // used for scoring
}

export const AESTHETICS: AestheticProfile[] = [
  {
    id: "dark-academia",
    name: "Dark Academia",
    tagline: "romanticizing the suffering of reading too many books",
    bio: "you find beauty in melancholy and meaning in everything. coffee-stained pages, candlelight at midnight, the quiet joy of knowing things others don't.",
    colors: ["#2d1b4e", "#5c3d8f", "#8b6914", "#3d2b1f", "#c4a882"],
    tags: ["intellectual", "moody", "poetic", "mysterious", "romantic"],
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80",
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&q=80",
      "https://images.unsplash.com/photo-1428592953211-077101b2021b?w=400&q=80",
    ],
    playlist: "cigarettes after sex · lana del rey · iron & wine",
    keywords: ["dark academia", "intellectual", "moody", "melancholic", "poetic", "introspective"],
  },
  {
    id: "soft-girl",
    name: "Soft Girl Era",
    tagline: "main character energy with a pastel filter on everything",
    bio: "you lead with your heart and you're not sorry about it. everything is more beautiful when you slow down and feel it fully. tender is your superpower.",
    colors: ["#fce7f3", "#fbcfe8", "#f9a8d4", "#f472b6", "#fda4af"],
    tags: ["dreamy", "feminine", "romantic", "gentle", "tender"],
    images: [
      "https://images.unsplash.com/photo-1609931386751-940a91933d9c?w=400&q=80",
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&q=80",
      "https://images.unsplash.com/photo-1502230831726-fe5549140034?w=400&q=80",
      "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80",
    ],
    playlist: "olivia rodrigo · gracie abrams · mitski",
    keywords: ["soft girl", "feminine", "romantic", "sweet", "gentle", "dreamy", "emotional", "tender"],
  },
  {
    id: "coastal-granddaughter",
    name: "Coastal Granddaughter",
    tagline: "salt in the hair, sunsets in the feed, unbothered",
    bio: "effortless is your whole brand. you move through life like the tide — unhurried, inevitable, beautiful. sun on your face and nowhere to be.",
    colors: ["#ecfeff", "#a5f3fc", "#67e8f9", "#0891b2", "#164e63"],
    tags: ["effortless", "free", "sun-soaked", "breezy", "golden"],
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&q=80",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=400&q=80",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&q=80",
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&q=80",
    ],
    playlist: "tulum · lorde · haim",
    keywords: ["coastal", "free", "effortless", "breezy", "sun-soaked", "golden hour", "carefree"],
  },
  {
    id: "that-girl",
    name: "That Girl Era",
    tagline: "she's not a phase, she's a whole lifestyle upgrade",
    bio: "you decided to be the main character and you meant it. 5am starts, green drinks, journaling, and zero apologies for having standards that most people can't meet.",
    colors: ["#f0fdf4", "#dcfce7", "#86efac", "#16a34a", "#14532d"],
    tags: ["disciplined", "ambitious", "wellness", "driven", "radiant"],
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80",
      "https://images.unsplash.com/photo-1544043949-1b41f7fe4cec?w=400&q=80",
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
      "https://images.unsplash.com/photo-1502230831726-fe5549140034?w=400&q=80",
    ],
    playlist: "beyoncé · doja cat · sza",
    keywords: ["that girl", "disciplined", "ambitious", "wellness", "driven", "focused", "clean"],
  },
  {
    id: "cottagecore",
    name: "Cottagecore Era",
    tagline: "escaped to the countryside and never came back",
    bio: "you believe in slow mornings, homemade things, and the radical act of actually enjoying your life. the world is loud — your corner of it is a garden.",
    colors: ["#fef9c3", "#d9f99d", "#86efac", "#a3e635", "#65a30d"],
    tags: ["whimsical", "earthy", "cozy", "nurturing", "wholesome"],
    images: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400&q=80",
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&q=80",
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&q=80",
      "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&q=80",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80",
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80",
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&q=80",
      "https://images.unsplash.com/photo-1428592953211-077101b2021b?w=400&q=80",
    ],
    playlist: "cavetown · novo amor · sleeping at last",
    keywords: ["cottagecore", "nature", "whimsical", "earthy", "cozy", "wholesome", "domestic", "nurturing"],
  },
  {
    id: "villain-era",
    name: "Villain Era",
    tagline: "she stopped explaining herself and everything got better",
    bio: "you're done shrinking. done softening your edges for people who can't handle your full volume. this era? it's yours. no apologies, no explanations.",
    colors: ["#09090b", "#18181b", "#3f3f46", "#71717a", "#c084fc"],
    tags: ["powerful", "unbothered", "sharp", "mysterious", "unapologetic"],
    images: [
      "https://images.unsplash.com/photo-1772120848903-86e81b0ea91a?w=400&q=80",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
      "https://images.unsplash.com/photo-1685306313850-b0d82017d1cb?w=400&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&q=80",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80",
    ],
    playlist: "billie eilish · banks · lana del rey",
    keywords: ["villain era", "dark", "powerful", "mysterious", "ambitious", "electric", "sharp", "unapologetic"],
  },
];

// Fallback if scoring is inconclusive
export const DEFAULT_AESTHETIC = AESTHETICS[0];

export function getAestheticById(id: string): AestheticProfile {
  return AESTHETICS.find((a) => a.id === id) ?? DEFAULT_AESTHETIC;
}