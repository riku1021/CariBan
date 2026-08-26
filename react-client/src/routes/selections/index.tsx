import { createFileRoute } from "@tanstack/react-router";
import { SelectionsPage } from "@/features/selections";

export const Route = createFileRoute("/selections/")({
  staticData: { title: "選考管理" },
  component: SelectionsPage,
});
