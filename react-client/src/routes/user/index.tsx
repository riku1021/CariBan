import { createFileRoute } from "@tanstack/react-router";
import type { FC } from "react";

const User: FC = () => {
  return <>User</>;
};

export const Route = createFileRoute("/user/")({
  staticData: { title: "ユーザー" },
  component: User,
});

export default User;
