import { css } from "@/styled-system/css";

export const page = css({
  display: "grid",
  gridTemplateRows: "auto minmax(0, 1fr)",
  gap: "sm",
  height: "100%",
  minHeight: "0",
  overflow: "hidden",
});

export const header = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  minWidth: "0",
});

export const primaryButton = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  paddingBlock: "xs",
  paddingInline: "sm",
  borderWidth: "0",
  borderRadius: "full",
  backgroundColor: "brand.primary.main",
  color: "white",
  fontSize: "xs",
  fontWeight: "semibold",
  cursor: "pointer",
  textDecoration: "none",
  _hover: {
    backgroundColor: "brand.primary.dark",
  },
});

export const body = css({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "sm",
  minHeight: "0",
  height: "100%",
  lg: {
    gridTemplateColumns: "minmax(0, 1fr) minmax(18rem, 22rem)",
  },
});

export const mainColumn = css({
  display: "grid",
  gridTemplateRows: "auto minmax(0, 1fr)",
  gap: "xs",
  minWidth: "0",
  minHeight: "0",
  height: "100%",
  overflow: "hidden",
});

export const empty = css({
  margin: "0",
  fontSize: "sm",
  color: "text.sub",
});

export const emptyActions = css({
  display: "flex",
  gap: "xs",
  marginTop: "sm",
});
