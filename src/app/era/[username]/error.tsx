"use client";
import PageError from "@/components/shared/PageError";
import { UserX } from "lucide-react";

export default function EraError({ error, reset }: { error: Error; reset: () => void }) {
    return <PageError error={error} reset={reset} icon={UserX} title="Era not found" description="This profile may not exist or has been removed." />;
}