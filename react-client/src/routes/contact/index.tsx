import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/features/contact";

export const Route = createFileRoute("/contact/")({
  staticData: { title: "お問い合わせ" },
  component: ContactPage,
});
