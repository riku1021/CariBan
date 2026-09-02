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

export const titleWithBack = css({
  display: "flex",
  alignItems: "center",
  gap: "sm",
  minWidth: "0",
  flex: "1",
});

export const backButton = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  paddingBlock: "xs",
  paddingInline: "sm",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "brand.primary.main",
  borderRadius: "full",
  backgroundColor: "background.sub",
  color: "brand.primary.main",
  fontSize: "xs",
  fontWeight: "semibold",
  textDecoration: "none",
  flexShrink: 0,
  cursor: "pointer",
  _hover: {
    backgroundColor: "brand.primary.light",
  },
});

export const backButtonIcon = css({
  width: "4",
  height: "4",
  flexShrink: 0,
});

export const titleRow = css({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "sm",
  minWidth: "0",
});

export const titleBlock = css({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: "0",
});

export const titleLine = css({
  display: "flex",
  alignItems: "center",
  gap: "xs",
  flexWrap: "wrap",
  minWidth: "0",
});

export const title = css({
  margin: "0",
  fontSize: "lg",
  fontWeight: "bold",
  color: "text.main",
  lineHeight: "tight",
});

export const phaseBadge = css({
  display: "inline-flex",
  alignItems: "center",
  paddingInline: "xs",
  paddingBlock: "1px",
  borderRadius: "full",
  backgroundColor: "brand.primary.light",
  color: "brand.primary.main",
  fontSize: "xs",
  fontWeight: "semibold",
});

export const jobLine = css({
  margin: "0",
  fontSize: "sm",
  color: "text.sub",
});

export const actions = css({
  display: "flex",
  alignItems: "center",
  gap: "xs",
  flexShrink: "0",
});

export const iconButton = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2rem",
  height: "2rem",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  borderRadius: "full",
  backgroundColor: "background.sub",
  color: "text.sub",
  cursor: "pointer",
  _hover: {
    color: "brand.primary.main",
    borderColor: "brand.primary.main",
  },
});

export const ghostButton = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  paddingBlock: "xs",
  paddingInline: "sm",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  borderRadius: "full",
  backgroundColor: "background.sub",
  color: "text.sub",
  fontSize: "xs",
  fontWeight: "semibold",
  cursor: "pointer",
  _hover: {
    color: "brand.primary.main",
    borderColor: "brand.primary.main",
  },
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
    gridTemplateColumns: "minmax(0, 1.7fr) minmax(18rem, 22rem)",
  },
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
