"use client";
import PageError from "@/components/shared/PageError";
import { UserRound } from "lucide-react";

export default function ProfileError({ error, reset }: { error: Error; reset: () => void }) {
    return <PageError error={error} reset={reset} icon={UserRound} title="Couldn't load your profile" description="Something went wrong. Your boards are safe." />;
}