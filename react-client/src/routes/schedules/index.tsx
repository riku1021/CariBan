import { createFileRoute } from "@tanstack/react-router";
import { SchedulesPage } from "@/features/schedules";

export const Route = createFileRoute("/schedules/")({
  staticData: { title: "予定一覧" },
  component: SchedulesPage,
});
