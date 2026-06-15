import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

export function Footer() {
    return (
        <footer className="border-t border-border/30 py-10 px-6">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <Logo size="sm" />

                <div className="flex items-center gap-6">
                    {[
                        { label: "quiz", href: "/quiz" },
                        { label: "about", href: "/about" },
                    ].map(({ label, href }) => (
                        <Link
                            key={label}
                            href={href}
                            className="font-ui text-xs text-text-muted hover:text-text-secondary transition-colors capitalize"
                        >
                            {label}
                        </Link>
                    ))}
                </div>

                <p className="font-ui text-xs text-text-muted">
                    made with ✦ for girls in their era
                </p>
            </div>
        </footer>
    );
}