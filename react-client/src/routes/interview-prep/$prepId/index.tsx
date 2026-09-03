import { createFileRoute } from "@tanstack/react-router";
import { InterviewPrepDetailPage } from "@/features/interviewPrep";

export const Route = createFileRoute("/interview-prep/$prepId/")({
  staticData: {
    title: "面接準備",
    headerBack: { to: "/interview-prep", label: "一覧に戻る" },
  },
  component: InterviewPrepDetailRoute,
});

function InterviewPrepDetailRoute() {
  const { prepId } = Route.useParams();
  return <InterviewPrepDetailPage prepId={prepId} />;
}
