// src/components/profile/AvatarSettings.tsx
// Drop this into your ProfileClient settings tab section.
// It's a self-contained component — import and place it anywhere in the settings form.

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Check } from "lucide-react";
import AvatarSelector from "@/components/shared/AvatarSelector";
import { AvatarType, resolveAvatar } from "@/lib/avatars";
import Image from "next/image";

interface AvatarSettingsProps {
    currentAvatarType: AvatarType | null;
    googleAvatarUrl: string | null;
    username: string;
    /** Called after a successful save so parent can refresh profile state */
    onSaved: (newAvatarType: AvatarType | null) => void;
}

export default function AvatarSettings({
    currentAvatarType,
    googleAvatarUrl,
    username,
    onSaved,
}: AvatarSettingsProps) {
    const [selected, setSelected] = useState<AvatarType | null>(currentAvatarType);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");

    const isDirty = selected !== currentAvatarType;
    const resolvedAvatar = resolveAvatar(selected, googleAvatarUrl);

    async function handleSave() {
        setSaving(true);
        setError("");
        setSaved(false);

        const res = await fetch("/api/update-profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ avatar_type: selected }),
        });

        const data = await res.json();
        setSaving(false);

        if (!res.ok) {
            setError(data.error || "Failed to save.");
            return;
        }

        setSaved(true);
        onSaved(selected);
        setTimeout(() => setSaved(false), 2500);
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                {/* Live preview */}
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-border/30 flex-shrink-0">
                    {resolvedAvatar ? (
                        <Image
                            src={resolvedAvatar}
                            alt={username}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-black text-lg font-bold">
                            {username.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <div>
                    <p className="font-ui text-sm text-text-primary font-medium">
                        Profile avatar
                    </p>
                    <p className="font-ui text-xs text-text-muted mt-0.5">
                        Shown on your era page, boards, and explore
                    </p>
                </div>
            </div>

            <AvatarSelector
                selected={selected}
                onChange={setSelected}
                googleAvatarUrl={googleAvatarUrl}
                showGoogleOption={!!googleAvatarUrl}
            />

            {error && (
                <p className="font-ui text-xs text-red-400">{error}</p>
            )}

            {isDirty && (
                <motion.button
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-ui font-semibold text-sm disabled:opacity-50 hover:opacity-90 transition-opacity"
                >
                    {saving ? (
                        <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Saving…
                        </>
                    ) : saved ? (
                        <>
                            <Check className="w-3.5 h-3.5" />
                            Saved
                        </>
                    ) : (
                        "Save avatar"
                    )}
                </motion.button>
            )}
        </div>
    );
}