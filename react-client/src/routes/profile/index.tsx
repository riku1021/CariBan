import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/features/profile";

export const Route = createFileRoute("/profile/")({
  staticData: { title: "プロフィール" },
  component: ProfilePage,
});
