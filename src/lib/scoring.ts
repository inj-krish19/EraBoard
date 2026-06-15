import { QUIZ_QUESTIONS, type QuizOption } from "./quiz-questions";
import { AESTHETICS, type AestheticProfile } from "./aesthetics-data";

export interface QuizAnswers {
  [questionId: string]: string; // questionId -> optionId
}

function getSelectedOptions(answers: QuizAnswers): QuizOption[] {
  return Object.entries(answers).map(([qId, optionId]) => {
    const question = QUIZ_QUESTIONS.find((q) => q.id === qId);
    return question?.options.find((o) => o.id === optionId);
  }).filter(Boolean) as QuizOption[];
}

export function scoreQuiz(answers: QuizAnswers): AestheticProfile {
  const selected = getSelectedOptions(answers);

  // Flatten all tags from selected options
  const allTags = selected.flatMap((o) => o.tags);

  // Score each aesthetic by how many of its keywords match selected tags
  const scores = AESTHETICS.map((aesthetic) => {
    let score = 0;
    for (const tag of allTags) {
      if (aesthetic.keywords.some((k) =>
        k.toLowerCase() === tag.toLowerCase()
      )) {
        score++;
      }
    }
    return { aesthetic, score };
  });

  // Sort by score descending
  scores.sort((a, b) => b.score - a.score);

  return scores[0].aesthetic;
}

export function getTopTags(answers: QuizAnswers): string[] {
  const selected = getSelectedOptions(answers);
  const tagCount: Record<string, number> = {};

  for (const option of selected) {
    for (const tag of option.tags) {
      tagCount[tag] = (tagCount[tag] ?? 0) + 1;
    }
  }

  return Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag);
}