import { createFileRoute } from "@tanstack/react-router";
import { TasksPage } from "@/features/tasks";

export const Route = createFileRoute("/tasks/")({
  staticData: { title: "タスク一覧" },
  component: TasksPage,
});
