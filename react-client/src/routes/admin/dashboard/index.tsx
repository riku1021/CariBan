import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/dashboard/")({
  staticData: { title: "ダッシュボード" },
  component: Dashboard,
});

function Dashboard() {
  return <>admin/dashboard/</>;
}
