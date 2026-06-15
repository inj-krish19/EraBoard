export interface QuizOption {
  id: string;
  label: string;
  image: string;
  tags: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  subtext?: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "pick the room that lives in your head",
    subtext: "where do you feel most yourself?",
    options: [
      {
        id: "q1a",
        label: "library with candles",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
        tags: ["dark academia", "intellectual", "cozy", "moody"],
      },
      {
        id: "q1b",
        label: "pink bedroom chaos",
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80",
        tags: ["soft girl", "feminine", "playful", "warm"],
      },
      {
        id: "q1c",
        label: "minimalist studio",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80",
        tags: ["that girl", "clean", "disciplined", "neutral"],
      },
      {
        id: "q1d",
        label: "cottage in the woods",
        image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400&q=80",
        tags: ["cottagecore", "nature", "whimsical", "earthy"],
      },
    ],
  },
  {
    id: "q2",
    question: "what's your ideal saturday morning?",
    subtext: "be honest, no judgment here",
    options: [
      {
        id: "q2a",
        label: "reading with coffee",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
        tags: ["dark academia", "introspective", "quiet", "intellectual"],
      },
      {
        id: "q2b",
        label: "beach at golden hour",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
        tags: ["coastal", "free", "golden hour", "effortless"],
      },
      {
        id: "q2c",
        label: "5am workout & smoothie",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
        tags: ["that girl", "disciplined", "wellness", "ambitious"],
      },
      {
        id: "q2d",
        label: "thrifting with friends",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80",
        tags: ["indie", "vintage", "social", "creative"],
      },
    ],
  },
  {
    id: "q3",
    question: "choose your weather",
    subtext: "the one that matches your soul",
    options: [
      {
        id: "q3a",
        label: "overcast & rainy",
        image: "https://images.unsplash.com/photo-1428592953211-077101b2021b?w=400&q=80",
        tags: ["dark academia", "moody", "melancholic", "introspective"],
      },
      {
        id: "q3b",
        label: "golden sunset",
        image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
        tags: ["coastal", "soft girl", "romantic", "warm"],
      },
      {
        id: "q3c",
        label: "crisp autumn morning",
        image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&q=80",
        tags: ["cottagecore", "cozy", "nostalgic", "earthy"],
      },
      {
        id: "q3d",
        label: "city lights at night",
        image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80",
        tags: ["villain era", "ambitious", "mysterious", "dark"],
      },
    ],
  },
  {
    id: "q4",
    question: "your playlist right now sounds like",
    subtext: "close your eyes and pick",
    options: [
      {
        id: "q4a",
        label: "strings & sad piano",
        image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&q=80",
        tags: ["dark academia", "emotional", "poetic", "melancholic"],
      },
      {
        id: "q4b",
        label: "beachy indie pop",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
        tags: ["coastal", "indie", "carefree", "summery"],
      },
      {
        id: "q4c",
        label: "hyperpop & chaos",
        image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&q=80",
        tags: ["y2k", "chaotic", "fun", "loud"],
      },
      {
        id: "q4d",
        label: "soft acoustic at dusk",
        image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&q=80",
        tags: ["soft girl", "romantic", "cottagecore", "gentle"],
      },
    ],
  },
  {
    id: "q5",
    question: "pick your fit",
    subtext: "the one already in your closet",
    options: [
      {
        id: "q5a",
        label: "blazer, dark jeans, boots",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
        tags: ["dark academia", "villain era", "put-together", "classic"],
      },
      {
        id: "q5b",
        label: "linen, no shoes, tote bag",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80",
        tags: ["coastal", "effortless", "minimalist", "breezy"],
      },
      {
        id: "q5c",
        label: "floral dress & cardigan",
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80",
        tags: ["soft girl", "cottagecore", "feminine", "sweet"],
      },
      {
        id: "q5d",
        label: "oversized vintage tee",
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80",
        tags: ["indie", "y2k", "casual", "vintage"],
      },
    ],
  },
  {
    id: "q6",
    question: "what do you order?",
    subtext: "first thing that comes to mind",
    options: [
      {
        id: "q6a",
        label: "black coffee, no sugar",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80",
        tags: ["dark academia", "that girl", "disciplined", "intense"],
      },
      {
        id: "q6b",
        label: "matcha latte",
        image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&q=80",
        tags: ["that girl", "wellness", "aesthetic", "clean"],
      },
      {
        id: "q6c",
        label: "strawberry iced drink",
        image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80",
        tags: ["soft girl", "sweet", "cute", "playful"],
      },
      {
        id: "q6d",
        label: "herbal tea from a tin",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80",
        tags: ["cottagecore", "cozy", "wholesome", "earthy"],
      },
    ],
  },
  {
    id: "q7",
    question: "pick the place that calls to you",
    subtext: "you're already there in your head",
    options: [
      {
        id: "q7a",
        label: "old european city",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80",
        tags: ["dark academia", "romantic", "historical", "wanderlust"],
      },
      {
        id: "q7b",
        label: "mediterranean coast",
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=80",
        tags: ["coastal", "free", "sun-soaked", "effortless"],
      },
      {
        id: "q7c",
        label: "english countryside",
        image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&q=80",
        tags: ["cottagecore", "peaceful", "green", "nostalgic"],
      },
      {
        id: "q7d",
        label: "rooftop in a big city",
        image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80",
        tags: ["villain era", "ambitious", "powerful", "electric"],
      },
    ],
  },
  {
    id: "q8",
    question: "your notes app is full of",
    subtext: "scroll back and be honest",
    options: [
      {
        id: "q8a",
        label: "quotes & half-poems",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80",
        tags: ["dark academia", "poetic", "emotional", "introspective"],
      },
      {
        id: "q8b",
        label: "goals & vision boards",
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80",
        tags: ["that girl", "ambitious", "disciplined", "driven"],
      },
      {
        id: "q8c",
        label: "recipes & plant care",
        image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&q=80",
        tags: ["cottagecore", "nurturing", "domestic", "wholesome"],
      },
      {
        id: "q8d",
        label: "random thoughts at 2am",
        image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&q=80",
        tags: ["indie", "chaotic", "creative", "insomniac"],
      },
    ],
  },
  {
    id: "q9",
    question: "choose your color world",
    subtext: "which palette is currently your whole personality",
    options: [
      {
        id: "q9a",
        label: "deep burgundy & gold",
        image: "https://images.unsplash.com/photo-1685306313850-b0d82017d1cb?w=400&q=80",
        tags: ["dark academia", "luxurious", "moody", "rich"],
      },
      {
        id: "q9b",
        label: "blush & dusty rose",
        image: "https://images.unsplash.com/photo-1609931386751-940a91933d9c?w=400&q=80",
        tags: ["soft girl", "feminine", "dreamy", "gentle"],
      },
      {
        id: "q9c",
        label: "sage & warm cream",
        image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&q=80",
        tags: ["cottagecore", "coastal", "natural", "calm"],
      },
      {
        id: "q9d",
        label: "black & stark white",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
        tags: ["villain era", "that girl", "minimal", "sharp"],
      },
    ],
  },
  {
    id: "q10",
    question: "last one — pick your energy right now",
    subtext: "not who you want to be. who you actually are today.",
    options: [
      {
        id: "q10a",
        label: "quietly intense",
        image: "https://images.unsplash.com/photo-1772120848903-86e81b0ea91a?w=400&q=80",
        tags: ["dark academia", "villain era", "focused", "deep"],
      },
      {
        id: "q10b",
        label: "soft & in my feelings",
        image: "https://images.unsplash.com/photo-1502230831726-fe5549140034?w=400&q=80",
        tags: ["soft girl", "emotional", "tender", "romantic"],
      },
      {
        id: "q10c",
        label: "unbothered & glowing",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
        tags: ["coastal", "that girl", "confident", "radiant"],
      },
      {
        id: "q10d",
        label: "chaotic but make it cute",
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80",
        tags: ["y2k", "indie", "chaotic", "fun"],
      },
    ],
  },
];