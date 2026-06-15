"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Sparkles, RotateCcw } from "lucide-react";
import { useQuizStore } from "@/store/quiz-store";
import { QUIZ_QUESTIONS } from "@/lib/quiz-questions";
import { QuizOption } from "./QuizOption";
import { QuizProgress } from "./QuizProgress";

export function QuizContainer() {
    const router = useRouter();
    const {
        answers,
        currentQuestion,
        setAnswer,
        nextQuestion,
        reset,
        isComplete,
        hasProgress,
    } = useQuizStore();

    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [generating, setGenerating] = useState(false);
    const [loadingText, setLoadingText] = useState("reading your vibe...");
    const [showResumeBanner, setShowResumeBanner] = useState(false);
    const [mounted, setMounted] = useState(false);

    const question = QUIZ_QUESTIONS[currentQuestion];

    useEffect(() => {
        setMounted(true);
        if (hasProgress()) setShowResumeBanner(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setSelectedOption(answers[question?.id] ?? null);
    }, [currentQuestion, question?.id, answers]);

    useEffect(() => {
        if (!isComplete) return;

        async function generateAndSave() {
            setGenerating(true);

            const messages = [
                "reading your vibe...",
                "mapping your aesthetic...",
                "writing your era...",
                "crafting your moodboard...",
                "saving your era ✦",
            ];
            let i = 0;
            const interval = setInterval(() => {
                i = (i + 1) % messages.length;
                setLoadingText(messages[i]);
            }, 1200);

            try {
                // Step 1 — Call Gemini
                const res = await fetch("/api/generate-era", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ answers }),
                });

                if (!res.ok) throw new Error("Gemini failed");
                const result = await res.json();

                // Step 2 — Save to DB, get board_id back
                setLoadingText("saving your era ✦");
                const saveRes = await fetch("/api/save-board", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ result, answers }),
                });

                const saveData = await saveRes.json();

                if (!saveData.board_id) throw new Error("No board_id returned");

                // Step 3 — Store full result in sessionStorage for instant load
                // (avoids extra DB fetch on the result page)
                sessionStorage.setItem(
                    `era_result_${saveData.board_id}`,
                    JSON.stringify({ ...result, board_id: saveData.board_id })
                );

                // Step 4 — Redirect directly to the shareable URL
                reset(); // clear quiz state after successful save
                router.push(`/result/${saveData.board_id}`);

            } catch (err) {
                console.error("[QuizContainer] Error:", err);
                // Even on error, try to redirect to a fallback
                router.push("/quiz?error=generation-failed");
            } finally {
                clearInterval(interval);
            }
        }

        generateAndSave();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isComplete]);

    function handleSelect(optionId: string) {
        if (generating) return;
        setSelectedOption(optionId);
        setAnswer(question.id, optionId);
        setTimeout(() => nextQuestion(), 420);
    }

    function handleFreshStart() {
        reset();
        setShowResumeBanner(false);
    }

    // ── Loading screen ──
    if (generating || isComplete) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="relative w-24 h-24 mx-auto mb-8">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-accent"
                        />
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.p
                            key={loadingText}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="font-display text-2xl text-text-primary mb-2"
                        >
                            {loadingText}
                        </motion.p>
                    </AnimatePresence>
                    <p className="font-body text-text-muted text-sm">
                        your era is being crafted just for you
                    </p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-start px-4 pt-24 pb-12">
            <div className="w-full max-w-lg">

                {/* Resume banner */}
                <AnimatePresence>
                    {mounted && showResumeBanner && (
                        <motion.div
                            initial={{ opacity: 0, y: -12, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            exit={{ opacity: 0, y: -12, height: 0 }}
                            className="mb-6 p-4 rounded-2xl glass border border-primary/20 flex items-center justify-between gap-3"
                        >
                            <div>
                                <p className="font-ui text-sm text-text-primary font-medium">
                                    welcome back ✦
                                </p>
                                <p className="font-body text-xs text-text-muted">
                                    you were on question {currentQuestion + 1} — pick up where you left off
                                </p>
                            </div>
                            <button
                                onClick={handleFreshStart}
                                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/40 text-text-muted font-ui text-xs hover:text-text-secondary transition-colors"
                            >
                                <RotateCcw className="w-3 h-3" />
                                start fresh
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Progress */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    <QuizProgress current={currentQuestion} total={QUIZ_QUESTIONS.length} />
                </motion.div>

                {/* Question */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={question.id}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
                    >
                        <div className="mb-8 text-center">
                            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-2 leading-tight">
                                {question.question}
                            </h2>
                            {question.subtext && (
                                <p className="font-body text-text-muted text-sm">{question.subtext}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {question.options.map((option, i) => (
                                <QuizOption
                                    key={option.id}
                                    {...option}
                                    selected={selectedOption === option.id}
                                    onSelect={() => handleSelect(option.id)}
                                    index={i}
                                />
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center font-ui text-xs text-text-muted mt-6"
                >
                    tap to select · auto-advances ✦
                </motion.p>
            </div>
        </div>
    );
}