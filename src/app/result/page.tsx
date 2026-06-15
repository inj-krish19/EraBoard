import { redirect } from "next/navigation";

// /result is no longer a valid page.
// All results live at /result/[boardId]
// Redirect anyone who lands here back to the quiz.
export default function ResultPage() {
    redirect("/quiz");
}