import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuizAnswers } from "@/lib/scoring";

interface QuizStore {
  answers: QuizAnswers;
  currentQuestion: number;
  totalQuestions: number;
  isComplete: boolean;
  lastSavedAt: number | null; // timestamp
  setAnswer: (questionId: string, optionId: string) => void;
  nextQuestion: () => void;
  reset: () => void;
  hasProgress: () => boolean;
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      answers: {},
      currentQuestion: 0,
      totalQuestions: 10,
      isComplete: false,
      lastSavedAt: null,

      setAnswer: (questionId, optionId) => {
        set((state) => ({
          answers: { ...state.answers, [questionId]: optionId },
          lastSavedAt: Date.now(),
        }));
      },

      nextQuestion: () => {
        const { currentQuestion, totalQuestions } = get();
        if (currentQuestion < totalQuestions - 1) {
          set({ currentQuestion: currentQuestion + 1 });
        } else {
          set({ isComplete: true });
        }
      },

      reset: () =>
        set({
          answers: {},
          currentQuestion: 0,
          isComplete: false,
          lastSavedAt: null,
        }),

      // Returns true if user has answered at least 1 question
      // and quiz isn't complete and saved within last 24h
      hasProgress: () => {
        const { answers, isComplete, lastSavedAt } = get();
        if (isComplete) return false;
        if (!lastSavedAt) return false;
        const oneDayMs = 24 * 60 * 60 * 1000;
        if (Date.now() - lastSavedAt > oneDayMs) return false;
        return Object.keys(answers).length > 0;
      },
    }),
    {
      name: "eraboard-quiz", // localStorage key
      // Only persist these fields — don't persist isComplete across sessions
      partialize: (state) => ({
        answers: state.answers,
        currentQuestion: state.currentQuestion,
        lastSavedAt: state.lastSavedAt,
        isComplete: false, // always reset isComplete on reload
      }),
    }
  )
);