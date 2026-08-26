import { css } from "@/styled-system/css";

export const section = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  minHeight: "0",
  height: "100%",
  overflow: "hidden",
});

export const grid = css({
  display: "grid",
  gridTemplateColumns: "1fr",
  gridAutoRows: "minmax(0, 1fr)",
  gap: "sm",
  flex: "1",
  minHeight: "0",
  md: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  lg: {
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  },
});

export const list = css({
  margin: "0",
  padding: "0",
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "xs",
});

export const listItem = css({
  display: "flex",
  gap: "xs",
  minWidth: "0",
});

export const listIndex = css({
  flexShrink: "0",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "brand.primary.main",
  fontVariantNumeric: "tabular-nums",
});

export const tags = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "2px",
});

export const outcome = css({
  margin: "0",
  fontSize: "xs",
  fontWeight: "medium",
  color: "text.main",
});

export const traitGroup = css({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export const traitLabel = css({
  margin: "0",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "text.sub",
});
