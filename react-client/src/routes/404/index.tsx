import { createFileRoute } from "@tanstack/react-router";
import { NotFoundPage } from "@/features/notFound";

export const Route = createFileRoute("/404/")({
  staticData: { title: "404" },
  component: NotFoundPage,
});
