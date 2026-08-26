import { css } from "@/styled-system/css";

export const page = css({
  display: "grid",
  gridTemplateRows: "auto auto auto minmax(0, 1fr)",
  gap: "sm",
  height: "100%",
  minHeight: "0",
  overflow: "hidden",
});

export const body = css({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "sm",
  minHeight: "0",
  height: "100%",
  lg: {
    gridTemplateColumns: "minmax(0, 1.65fr) minmax(20rem, 24rem)",
  },
});

export const listPane = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  minWidth: "0",
  minHeight: "0",
  height: "100%",
  overflow: "hidden",
});

export const sidePane = css({
  minWidth: "0",
  minHeight: "0",
  height: "100%",
  overflow: "hidden",
});
