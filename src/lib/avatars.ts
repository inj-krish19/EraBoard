// src/lib/avatars.ts
// Central config — import this wherever you need avatar data

export type AvatarType =
  | "cottagecore"
  | "darkacademia"
  | "y2k"
  | "softgirl"
  | "ethereal"
  | "grunge"
  | "coquette";

export interface AvatarOption {
  id: AvatarType;
  label: string;
  aesthetic: string;
  path: string; // /public/avatars/
  accent: string; // color used in selection ring
  description: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  {
    id: "cottagecore",
    label: "Wildflower",
    aesthetic: "Cottagecore",
    path: "/avatars/avatar-cottagecore.png",
    accent: "#a3b18a",
    description: "Botanical, soft, nature-dwelling",
  },
  {
    id: "darkacademia",
    label: "The Scholar",
    aesthetic: "Dark Academia",
    path: "/avatars/avatar-darkacademia.png",
    accent: "#8b6f47",
    description: "Brooding, intellectual, candlelit",
  },
  {
    id: "y2k",
    label: "Glitch Girl",
    aesthetic: "Y2K",
    path: "/avatars/avatar-y2k.png",
    accent: "#f72585",
    description: "Bold, holographic, unbothered",
  },
  {
    id: "softgirl",
    label: "Cloud Baby",
    aesthetic: "Soft Girl",
    path: "/avatars/avatar-softgirl.png",
    accent: "#ffb3c6",
    description: "Sweet, blushy, kawaii-coded",
  },
  {
    id: "ethereal",
    label: "Moon Child",
    aesthetic: "Ethereal",
    path: "/avatars/avatar-ethereal.png",
    accent: "#c8b6ff",
    description: "Otherworldly, celestial, luminous",
  },
  {
    id: "grunge",
    label: "Static",
    aesthetic: "Grunge",
    path: "/avatars/avatar-grunge.png",
    accent: "#6c757d",
    description: "Edgy, raw, 90s underground",
  },
  {
    id: "coquette",
    label: "Ribbon Heart",
    aesthetic: "Coquette",
    path: "/avatars/avatar-coquette.png",
    accent: "#e8a0bf",
    description: "Romantic, delicate, femme",
  },
];

/**
 * Returns the resolved avatar URL for display.
 * Priority: custom era avatar > Google OAuth avatar > null (show initials)
 */
export function resolveAvatar(
  avatarType: AvatarType | null | undefined,
  googleAvatarUrl: string | null | undefined
): string | null {
  if (avatarType) {
    const option = AVATAR_OPTIONS.find((a) => a.id === avatarType);
    if (option) return option.path;
  }
  return googleAvatarUrl ?? null;
}