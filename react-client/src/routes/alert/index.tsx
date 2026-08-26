import { createFileRoute } from "@tanstack/react-router";
import { AlertPage } from "@/features/alert";

export const Route = createFileRoute("/alert/")({
  staticData: { title: "アラート" },
  component: AlertPage,
});
