import { css } from "@/styled-system/css";

export const header = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "sm",
  paddingInline: "sm",
  paddingTop: "sm",
  paddingBottom: "0",
  boxSizing: "border-box",
  height: "calc(60px + {spacing.sm})",
  backgroundColor: "background.main",
  position: "relative",
  zIndex: "header",
  minWidth: "0",
  gridArea: "header",
});

export const titleRow = css({
  display: "flex",
  alignItems: "center",
  gap: "sm",
  minWidth: "0",
  minHeight: "1.875rem",
});

export const backButton = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "2px",
  boxSizing: "border-box",
  height: "1.875rem",
  paddingBlock: "0",
  paddingInline: "sm",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "brand.primary.main",
  borderRadius: "full",
  backgroundColor: "background.sub",
  color: "brand.primary.main",
  fontSize: "xs",
  fontWeight: "semibold",
  lineHeight: "1",
  textDecoration: "none",
  flexShrink: 0,
  cursor: "pointer",
  _hover: {
    backgroundColor: "brand.primary.light",
  },
});

export const backButtonIcon = css({
  width: "0.875rem",
  height: "0.875rem",
  flexShrink: 0,
});

export const titleMain = css({
  display: "flex",
  alignItems: "center",
  gap: "xs",
  minWidth: "0",
  height: "1.875rem",
});

export const titleIconBox = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  fontSize: "3xl",
  lineHeight: "0",
});

export const titleIcon = css({
  width: "1em",
  height: "1em",
  flexShrink: 0,
  color: "text.main",
});

export const title = css({
  color: "text.main",
  fontSize: "3xl",
  fontWeight: "semibold",
  lineHeight: "1.875rem",
  margin: "0",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  minWidth: "0",
});

export const actions = css({
  display: "flex",
  alignItems: "center",
  gap: "sm",
  flexShrink: 0,
});

export const iconButton = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "10",
  height: "10",
  borderRadius: "full",
  backgroundColor: "background.sub",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  boxShadow: "0 2px 8px {colors.shadow.primary}",
  color: "icon.primary",
  textDecoration: "none",
  flexShrink: 0,
});

export const icon = css({
  width: "5",
  height: "5",
});
