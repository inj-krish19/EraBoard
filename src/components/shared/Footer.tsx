import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-border/30 py-10 px-6">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-black" />
                    </div>
                    <span className="font-display text-sm font-semibold text-text-secondary">
                        EraBoard
                    </span>
                </Link>

                {/* Links */}
                <div className="flex items-center gap-6">
                    {["quiz", "about", "share"].map((link) => (
                        <Link
                            key={link}
                            href={`/${link}`}
                            className="font-ui text-xs text-text-muted hover:text-text-secondary transition-colors capitalize"
                        >
                            {link}
                        </Link>
                    ))}
                </div>

                {/* Credits */}
                <p className="font-ui text-xs text-text-muted">
                    made with ✦ for girls in their era
                </p>
            </div>
        </footer>
    );
}