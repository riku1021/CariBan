import { css } from "@/styled-system/css";

export const page = css({
  display: "grid",
  gridTemplateRows: "minmax(0, 1.15fr) auto minmax(0, 1fr)",
  gap: "sm",
  height: "100%",
  minHeight: "0",
  overflow: "hidden",
});

export const topRow = css({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "sm",
  minHeight: "0",
  lg: {
    gridTemplateColumns: "1.2fr 1fr 1fr",
  },
});

export const statRow = css({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "sm",
  md: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  lg: {
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  },
});

export const bottomRow = css({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "sm",
  minHeight: "0",
  lg: {
    gridTemplateColumns: "2.3fr 1.2fr",
  },
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
