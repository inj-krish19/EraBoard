// src/components/shared/AvatarSelector.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import { AVATAR_OPTIONS, AvatarType } from "@/lib/avatars";

interface AvatarSelectorProps {
    selected: AvatarType | null;
    onChange: (type: AvatarType | null) => void;
    googleAvatarUrl?: string | null;
    /** If true, shows a "Use Google photo" option first */
    showGoogleOption?: boolean;
}

export default function AvatarSelector({
    selected,
    onChange,
    googleAvatarUrl,
    showGoogleOption = true,
}: AvatarSelectorProps) {
    return (
        <div className="space-y-3">
            <p className="font-ui text-xs text-text-muted uppercase tracking-wider">
                Choose your avatar
            </p>

            <div className="grid grid-cols-4 gap-3">
                {/* Google / default option */}
                {showGoogleOption && googleAvatarUrl && (
                    <motion.button
                        type="button"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0 }}
                        onClick={() => onChange(null)}
                        className="flex flex-col items-center gap-1.5 group"
                    >
                        <div
                            className={`
                relative w-14 h-14 rounded-2xl overflow-hidden transition-all duration-200
                ${selected === null
                                    ? "ring-2 ring-offset-2 ring-offset-[#0a0a0f] ring-primary scale-105"
                                    : "ring-1 ring-border/30 group-hover:ring-border/60"
                                }
              `}
                        >
                            <Image
                                src={googleAvatarUrl}
                                alt="Google avatar" width={100} height={100}
                                className="w-full h-full object-cover"
                            />
                            {selected === null && (
                                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                            )}
                        </div>
                        <span className="font-ui text-[9px] text-text-muted text-center leading-tight">
                            Google
                        </span>
                    </motion.button>
                )}

                {/* Era avatars */}
                {AVATAR_OPTIONS.map((avatar, i) => {
                    const isSelected = selected === avatar.id;
                    return (
                        <motion.button
                            key={avatar.id}
                            type="button"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.04 }}
                            onClick={() => onChange(avatar.id)}
                            className="flex flex-col items-center gap-1.5 group"
                            title={`${avatar.label} — ${avatar.description}`}
                        >
                            <div
                                className={`
                                    relative w-14 h-14 rounded-2xl overflow-hidden transition-all duration-200
                                    ${isSelected
                                        ? "scale-105"
                                        : "ring-1 ring-border/30 group-hover:ring-border/60 group-hover:scale-102"
                                    }
                                `}
                                style={
                                    isSelected
                                        ? {
                                            boxShadow: `0 0 0 2px #0a0a0f, 0 0 0 4px ${avatar.accent}`,
                                        }
                                        : {}
                                }
                            >
                                <Image
                                    src={avatar.path}
                                    alt={avatar.label}
                                    fill
                                    className="object-cover"
                                    sizes="56px"
                                />
                                {isSelected && (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center"
                                        style={{ backgroundColor: `${avatar.accent}30` }}
                                    >
                                        <Check className="w-4 h-4 text-white drop-shadow-sm" />
                                    </div>
                                )}
                            </div>
                            <span className="font-ui text-[9px] text-text-muted text-center leading-tight">
                                {avatar.label}
                            </span>
                        </motion.button>
                    );
                })}
            </div>

            {/* Selected description */}
            {selected && (
                <motion.p
                    key={selected}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-ui text-xs text-text-muted"
                >
                    {AVATAR_OPTIONS.find((a) => a.id === selected)?.aesthetic} ·{" "}
                    <span className="text-text-secondary">
                        {AVATAR_OPTIONS.find((a) => a.id === selected)?.description}
                    </span>
                </motion.p>
            )}
        </div>
    );
}