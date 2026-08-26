import { createFileRoute } from "@tanstack/react-router";
import { CompaniesPage } from "@/features/companies";

export const Route = createFileRoute("/companies/")({
  staticData: { title: "企業一覧" },
  component: CompaniesPage,
});
