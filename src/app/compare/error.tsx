"use client";
import PageError from "@/components/shared/PageError";
import { ArrowLeftRight } from "lucide-react";

export default function CompareError({ error, reset }: { error: Error; reset: () => void }) {
    return <PageError error={error} reset={reset} icon={ArrowLeftRight} title="Comparison failed" description="Couldn't fetch one or both users. Check the usernames and try again." />;
}