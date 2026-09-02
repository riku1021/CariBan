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
  gap: "xs",
  minWidth: "0",
});

export const titleIconBox = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  flexShrink: 0,
});

export const titleIcon = css({
  fontSize: "3xl",
  width: "7",
  height: "auto",
  flexShrink: 0,
  color: "text.main",
});

export const title = css({
  color: "text.main",
  fontSize: "3xl",
  fontWeight: "semibold",
  lineHeight: "tight",
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
