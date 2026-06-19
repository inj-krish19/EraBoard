"use client";
import PageError from "@/components/shared/PageError";
import { LayoutGrid } from "lucide-react";

export default function ExploreError({ error, reset }: { error: Error; reset: () => void }) {
    return <PageError error={error} reset={reset} icon={LayoutGrid} title="Couldn't load the gallery" description="Something went wrong fetching boards. Try again." />;
}