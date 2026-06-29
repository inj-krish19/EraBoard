// src/components/spotify/SpotifyConnect.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { Music2, Check, X, Loader2, Unlink } from "lucide-react";

// Inline Spotify logo SVG — no external dep needed
function SpotifyIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
    );
}

interface SpotifyConnectProps {
    isConnected: boolean;
    connectedAt?: string | null;
}

export default function SpotifyConnect({
    isConnected: initialConnected,
    connectedAt,
}: SpotifyConnectProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isConnected, setIsConnected] = useState(initialConnected);
    const [disconnecting, setDisconnecting] = useState(false);
    const [toast, setToast] = useState<"connected" | "denied" | "error" | null>(null);

    // Pick up ?spotify= param from OAuth redirect
    useEffect(() => {
        const status = searchParams.get("spotify");
        if (status === "connected") {
            setIsConnected(true);
            setToast("connected");
            router.replace("/profile?tab=settings");
        } else if (status === "denied") {
            setToast("denied");
            router.replace("/profile?tab=settings");
        } else if (status === "error") {
            setToast("error");
            router.replace("/profile?tab=settings");
        }
    }, [searchParams, router]);

    useEffect(() => {
        if (toast) {
            const t = setTimeout(() => setToast(null), 4000);
            return () => clearTimeout(t);
        }
    }, [toast]);

    async function handleDisconnect() {
        setDisconnecting(true);
        await fetch("/api/spotify/disconnect", { method: "POST" });
        setIsConnected(false);
        setDisconnecting(false);
    }

    const formattedDate = connectedAt
        ? new Date(connectedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : null;

    return (
        <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isConnected
                            ? "bg-[#1DB954]/15 border border-[#1DB954]/30"
                            : "bg-surface-elevated border border-border/30"
                            }`}
                    >
                        <SpotifyIcon
                            className={`w-5 h-5 ${isConnected ? "text-[#1DB954]" : "text-text-muted"}`}
                        />
                    </div>
                    <div>
                        <p className="font-ui text-sm text-text-primary font-medium">
                            Spotify
                        </p>
                        <p className="font-ui text-xs text-text-muted mt-0.5">
                            {isConnected
                                ? `Connected${formattedDate ? ` · ${formattedDate}` : ""}`
                                : "Refine your era with your listening history"}
                        </p>
                    </div>
                </div>

                {isConnected ? (
                    <button
                        onClick={handleDisconnect}
                        disabled={disconnecting}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-ui text-xs text-text-muted border border-border/30 hover:border-warm/30 hover:text-warm transition-all disabled:opacity-40"
                    >
                        {disconnecting ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                            <Unlink className="w-3.5 h-3.5" />
                        )}
                        Disconnect
                    </button>
                ) : (
                    <a
                        href="/api/spotify/auth"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-ui text-xs font-semibold text-black transition-all hover:opacity-90"
                        style={{ backgroundColor: "#1DB954" }}
                    >
                        <Music2 className="w-3.5 h-3.5" />
                        Connect
                    </a>
                )}
            </div>

            {/* What it does */}
            {!isConnected && (
                <p className="font-ui text-[11px] text-text-muted leading-relaxed pl-[52px]">
                    Analyzes your top artists, genres, and tracks to generate a deeper
                    aesthetic identity that blends your visual vibe with your sonic soul.
                </p>
            )}

            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl font-ui text-xs ${toast === "connected"
                            ? "bg-[#1DB954]/10 border border-[#1DB954]/25 text-[#1DB954]"
                            : "bg-warm/10 border border-warm/25 text-warm"
                            }`}
                    >
                        {toast === "connected" ? (
                            <><Check className="w-3.5 h-3.5" /> Spotify connected successfully</>
                        ) : toast === "denied" ? (
                            <><X className="w-3.5 h-3.5" /> Spotify access was denied</>
                        ) : (
                            <><X className="w-3.5 h-3.5" /> Something went wrong. Try again.</>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}