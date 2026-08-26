import { createFileRoute } from "@tanstack/react-router";
import type { FC } from "react";

const Admin: FC = () => {
  return <span>Admin</span>;
};

export const Route = createFileRoute("/admin/")({
  staticData: { title: "管理者" },
  component: Admin,
});

export default Admin;
