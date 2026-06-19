// src/components/board/ViewTracker.tsx
"use client";

import { useEffect } from "react";

export default function ViewTracker({ boardId }: { boardId: string }) {
    useEffect(() => {
        fetch("/api/view-board", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ boardId }),
        }).catch(() => { }); // silent — never block the UI
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return null; // renders nothing
}