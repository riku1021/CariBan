import { createFileRoute } from "@tanstack/react-router";
import type { FC } from "react";

const Partner: FC = () => {
  return <>Partner</>;
};

export const Route = createFileRoute("/partner/")({
  staticData: { title: "パートナー" },
  component: Partner,
});

export default Partner;
