import Image from "next/image";
import Link from "next/link";

interface LogoProps {
    size?: "sm" | "md" | "lg";
    showText?: boolean;
    href?: string;
}

const SIZES = {
    sm: { icon: 24, text: "text-base" },
    md: { icon: 32, text: "text-lg" },
    lg: { icon: 48, text: "text-2xl" },
};

export function Logo({ size = "md", showText = true, href = "/" }: LogoProps) {
    const { icon, text } = SIZES[size];

    const content = (
        <span className="flex items-center gap-2 group">
            <Image
                src="/icon.svg"
                alt="EraBoard"
                width={icon}
                height={icon}
                className="flex-shrink-0"
                priority
            />
            {showText && (
                <span
                    className={`font-display font-semibold text-text-primary tracking-tight ${text}`}
                >
                    EraBoard
                </span>
            )}
        </span>
    );

    if (!href) return content;

    return (
        <Link href={href} className="hover:opacity-90 transition-opacity">
            {content}
        </Link>
    );
}

/* Standalone icon only — for favicons, small spaces */
export function LogoIcon({ size = 32 }: { size?: number }) {
    return (
        <Image
            src="/icon.svg"
            alt="EraBoard"
            width={size}
            height={size}
            priority
        />
    );
}