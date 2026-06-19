"use client";
import PageError from "@/components/shared/PageError";
import { ImageOff } from "lucide-react";

export default function ResultError({ error, reset }: { error: Error; reset: () => void }) {
    return <PageError error={error} reset={reset} icon={ImageOff} title="Couldn't load this board" description="This board may have been removed or made private." />;;
}