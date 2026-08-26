import { css } from "@/styled-system/css";

export const page = css({
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "minmax(0, 1fr)",
  gap: "sm",
  height: "100%",
  minHeight: "0",
  overflow: "hidden",
  lg: {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  },
});

export const statusText = css({
  margin: "0",
  fontWeight: "bold",
  color: "text.main",
});

export const detailText = css({
  margin: "0",
  fontSize: "sm",
  color: "text.sub",
});
