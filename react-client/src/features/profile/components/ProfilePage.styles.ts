import { css } from "@/styled-system/css";

export const page = css({
  display: "grid",
  gridTemplateRows: "auto minmax(0, 1fr) minmax(0, 1.7fr)",
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

export const cardActions = css({
  display: "flex",
  alignItems: "center",
  gap: "2px",
  flexShrink: "0",
});

export const cardIconButton = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.75rem",
  height: "1.75rem",
  padding: "0",
  borderWidth: "0",
  borderRadius: "md",
  backgroundColor: "transparent",
  color: "text.sub",
  cursor: "pointer",
  flexShrink: "0",
  _hover: {
    color: "brand.primary.main",
    backgroundColor: "background.main",
  },
});

export const cardIcon = css({
  width: "1rem",
  height: "1rem",
});

export const cardBody = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  flex: "1",
  minHeight: "0",
  overflowY: "auto",
});

export const tag = css({
  display: "inline-flex",
  alignItems: "center",
  paddingInline: "xs",
  paddingBlock: "1px",
  borderRadius: "full",
  backgroundColor: "background.main",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  color: "brand.primary.main",
  fontSize: "xs",
  fontWeight: "medium",
  whiteSpace: "nowrap",
});

export const muted = css({
  margin: "0",
  fontSize: "xs",
  color: "text.sub",
});

export const bodyText = css({
  margin: "0",
  fontSize: "sm",
  color: "text.main",
  lineHeight: "relaxed",
});
