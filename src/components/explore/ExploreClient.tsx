// src/components/explore/ExploreClient.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, TrendingUp, Clock, X } from "lucide-react";
import BoardCard from "./BoardCard";
import AestheticFilter from "./AestheticFilter";
import { BlurIn } from "@/components/shared/Animations";

interface Board {
    board_id: string;
    aesthetic_name: string;
    era_name: string;
    bio: string;
    colors: string[];
    images: string[];
    tags: string[];
    created_at: string;
    view_count?: number;
    profiles?: {
        username?: string;
        display_name?: string;
        avatar_url?: string;
    } | null;
}

interface ExploreClientProps {
    initialBoards: Board[];
    initialTotal: number;
}

export default function ExploreClient({
    initialBoards,
    initialTotal,
}: ExploreClientProps) {
    const [boards, setBoards] = useState<Board[]>(initialBoards);
    const [total, setTotal] = useState(initialTotal);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(initialTotal > 18);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [aesthetic, setAesthetic] = useState("all");
    const [sort, setSort] = useState("popular");
    const [showFilters, setShowFilters] = useState(false);

    const loaderRef = useRef<HTMLDivElement>(null);
    const isFirstMount = useRef(true);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 400);
        return () => clearTimeout(timer);
    }, [search]);

    const fetchBoards = useCallback(
        async (pageNum: number, reset = false) => {
            if (pageNum === 1) setLoading(true);
            else setLoadingMore(true);

            try {
                const params = new URLSearchParams({
                    page: pageNum.toString(),
                    sort,
                    aesthetic,
                    search: debouncedSearch,
                });

                const res = await fetch(`/api/explore?${params}`);
                const data = await res.json();

                if (reset || pageNum === 1) {
                    setBoards(data.boards);
                } else {
                    setBoards((prev) => [...prev, ...data.boards]);
                }

                setTotal(data.total);
                setHasMore(data.hasMore);
                setPage(pageNum);
            } catch (err) {
                console.error("Failed to fetch boards:", err);
            } finally {
                setLoading(false);
                setLoadingMore(false);
            }
        },
        [sort, aesthetic, debouncedSearch]
    );

    // Refetch when filters change
    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }
        fetchBoards(1, true);
    }, [sort, aesthetic, debouncedSearch, fetchBoards]);

    // Infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
                    fetchBoards(page + 1);
                }
            },
            { threshold: 0.5 }
        );

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [hasMore, loadingMore, loading, page, fetchBoards]);

    const clearSearch = () => setSearch("");

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-8">
                <BlurIn>
                    <div className="mb-2 flex items-center gap-2">
                        <span className="text-xs tracking-widest uppercase text-purple-400/60 font-medium">
                            Community
                        </span>
                    </div>
                    <h1
                        className="text-4xl sm:text-5xl font-bold text-white mb-3"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        Explore{" "}
                        <span className="gradient-text">
                            Era Boards
                        </span>
                    </h1>
                    <p className="text-white/50 text-lg max-w-xl">
                        Discover the aesthetic identities of{" "}
                        <span className="text-white/80">{total.toLocaleString()}</span>{" "}
                        unique souls across every era imaginable.
                    </p>
                </BlurIn>

                {/* Search + Sort bar */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        <input
                            type="text"
                            placeholder="Search era names, bios…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-10 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all"
                        />
                        {search && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Sort toggle */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSort("popular")}
                            className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${sort === "popular"
                                ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                                : "bg-white/5 text-white/50 border border-white/10 hover:text-white/80"
                                }`}
                        >
                            <TrendingUp className="w-4 h-4" />
                            <span className="hidden sm:inline">Popular</span>
                        </button>
                        <button
                            onClick={() => setSort("newest")}
                            className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${sort === "newest"
                                ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                                : "bg-white/5 text-white/50 border border-white/10 hover:text-white/80"
                                }`}
                        >
                            <Clock className="w-4 h-4" />
                            <span className="hidden sm:inline">Newest</span>
                        </button>
                        <button
                            onClick={() => setShowFilters((v) => !v)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${showFilters || aesthetic !== "all"
                                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                                : "bg-white/5 text-white/50 border border-white/10 hover:text-white/80"
                                }`}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            <span className="hidden sm:inline">Filter</span>
                            {aesthetic !== "all" && (
                                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Aesthetic filter pills */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-4">
                                <AestheticFilter
                                    selected={aesthetic}
                                    onChange={setAesthetic}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Active filter tag */}
                {aesthetic !== "all" && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 flex items-center gap-2"
                    >
                        <span className="text-white/40 text-xs">Filtering by:</span>
                        <button
                            onClick={() => setAesthetic("all")}
                            className="flex items-center gap-1.5 text-xs bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-full px-3 py-1 hover:bg-cyan-500/20 transition-colors"
                        >
                            {aesthetic}
                            <X className="w-3 h-3" />
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Masonry Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
                {loading ? (
                    <MasonrySkeleton />
                ) : boards.length === 0 ? (
                    <EmptyState search={debouncedSearch} aesthetic={aesthetic} />
                ) : (
                    <>
                        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
                            {boards.map((board, i) => (
                                <BoardCard key={board.board_id} board={board} index={i} />
                            ))}
                        </div>

                        {/* Infinite scroll trigger */}
                        <div ref={loaderRef} className="mt-8 flex justify-center">
                            {loadingMore && (
                                <div className="flex items-center gap-3 text-white/40 text-sm">
                                    <div className="w-4 h-4 border-2 border-purple-500/40 border-t-purple-500 rounded-full animate-spin" />
                                    Loading more boards…
                                </div>
                            )}
                            {!hasMore && boards.length > 0 && (
                                <p className="text-white/20 text-sm">
                                    You&apos;ve seen all {total.toLocaleString()} boards ✨
                                </p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

function MasonrySkeleton() {
    return (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
                <div
                    key={i}
                    className="break-inside-avoid mb-4 glass rounded-2xl overflow-hidden animate-pulse"
                    style={{ height: i % 3 === 0 ? "320px" : i % 3 === 1 ? "280px" : "360px" }}
                >
                    <div className="h-full bg-white/3" />
                </div>
            ))}
        </div>
    );
}

function EmptyState({
    search,
    aesthetic,
}: {
    search: string;
    aesthetic: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
        >
            <div className="text-5xl mb-4">✨</div>
            <h3
                className="text-xl font-semibold text-white mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
            >
                No boards found
            </h3>
            <p className="text-white/40 text-sm max-w-sm">
                {search
                    ? `Nothing matches "${search}" yet. Be the first to claim this era.`
                    : aesthetic !== "all"
                        ? `No ${aesthetic} boards yet. Take the quiz and start the trend.`
                        : "No public boards yet. Take the quiz to create yours."}
            </p>
        </motion.div>
    );
}