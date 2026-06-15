"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Link2, Check, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

interface ShareActionsProps {
    cardRef: React.RefObject<HTMLDivElement | null>;
    eraName: string;
    shareUrl?: string; // explicit URL — always correct, no window.location guessing
}

function proxyUrl(url: string): string {
    return `/api/proxy-image?url=${encodeURIComponent(url)}`;
}

async function withProxiedImages<T>(
    node: HTMLElement,
    callback: () => Promise<T>
): Promise<T> {
    const imgs = Array.from(node.querySelectorAll("img")) as HTMLImageElement[];
    const originals: string[] = [];

    await Promise.all(
        imgs.map((img, i) => {
            originals[i] = img.src;
            return new Promise<void>((resolve) => {
                img.crossOrigin = "anonymous";
                img.onload = () => resolve();
                img.onerror = () => resolve();
                img.src = proxyUrl(img.src);
            });
        })
    );

    try {
        return await callback();
    } finally {
        imgs.forEach((img, i) => { img.src = originals[i]; });
    }
}

export function ShareActions({ cardRef, eraName, shareUrl }: ShareActionsProps) {
    const router = useRouter();
    const [downloading, setDownloading] = useState(false);
    const [copied, setCopied] = useState(false);

    async function handleDownload() {
        const node = cardRef.current;
        if (!node) return;
        setDownloading(true);

        try {
            const { toPng } = await import("html-to-image");
            const width = node.scrollWidth;
            const height = node.scrollHeight;

            const dataUrl = await toPng(node, {
                cacheBust: true,
                width: 1000,
                height: 500
            });

            const link = document.createElement("a");
            link.download = `${eraName.replace(/\s+/g, "-").toLowerCase()}-eraboard.png`;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error("Download failed:", err);
            alert("Download failed — try right-clicking the card and saving the image.");
        } finally {
            setDownloading(false);
        }
    }

    function handleCopyLink() {
        const url = shareUrl ?? window.location.href;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    function handleRetake() {
        router.push("/quiz");
    }

    return (
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mx-auto">
            <motion.button
                onClick={handleDownload}
                disabled={downloading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-black font-ui font-semibold text-sm glow-strong hover:opacity-90 transition-opacity disabled:opacity-60"
            >
                <Download className="w-4 h-4" />
                {downloading ? "saving..." : "save card"}
            </motion.button>

            <motion.button
                onClick={handleCopyLink}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-border/60 glass text-text-secondary font-ui text-sm hover:border-primary/30 hover:text-text-primary transition-all"
            >
                {copied
                    ? <><Check className="w-4 h-4 text-primary" />copied!</>
                    : <><Link2 className="w-4 h-4" />copy link</>
                }
            </motion.button>

            <motion.button
                onClick={handleRetake}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="sm:w-auto w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-border/40 text-text-muted font-ui text-sm hover:text-text-secondary transition-colors"
            >
                <RotateCcw className="w-3.5 h-3.5" />
                retake
            </motion.button>
        </div>
    );
}