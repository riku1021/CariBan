import { css } from "@/styled-system/css";

export const page = css({
  display: "grid",
  gridTemplateRows: "auto auto auto minmax(0, 1fr)",
  gap: "sm",
  height: "100%",
  minHeight: "0",
  overflow: "hidden",
});

export const card = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  minWidth: "0",
  minHeight: "0",
  height: "100%",
  overflow: "hidden",
  padding: "sm",
  backgroundColor: "background.sub",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  borderRadius: "2xl",
  boxShadow: "0 2px 8px {colors.shadow.primary}",
});

export const cardTitle = css({
  margin: "0",
  fontSize: "base",
  fontWeight: "semibold",
  color: "text.main",
  flexShrink: "0",
});

export const cardHeader = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "sm",
  flexShrink: "0",
});

export const body = css({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "sm",
  minHeight: "0",
  height: "100%",
  lg: {
    gridTemplateColumns: "minmax(0, 1.7fr) minmax(18rem, 1fr)",
  },
});

export const listPane = css({
  minWidth: "0",
  minHeight: "0",
  height: "100%",
});

export const sidePane = css({
  display: "grid",
  gridTemplateRows: "minmax(0, 1fr) auto",
  gap: "xs",
  minWidth: "0",
  minHeight: "0",
  height: "100%",
});
