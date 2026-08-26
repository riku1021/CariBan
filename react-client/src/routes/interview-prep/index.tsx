import { createFileRoute } from "@tanstack/react-router";
import { InterviewPrepPage } from "@/features/interviewPrep";

export const Route = createFileRoute("/interview-prep/")({
  staticData: { title: "面接準備" },
  component: InterviewPrepPage,
});
