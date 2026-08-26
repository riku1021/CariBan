import { css } from "@/styled-system/css";

export const row = css({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "sm",
  minHeight: "0",
  md: {
    gridTemplateColumns: "minmax(0, 1fr) 7.5rem",
  },
});

export const heroCard = css({
  position: "relative",
  borderLeftWidth: "3px",
  borderLeftStyle: "solid",
  borderLeftColor: "brand.primary.main",
  justifyContent: "center",
  paddingBlock: "xs",
  backgroundImage:
    "linear-gradient(135deg, {colors.background.sub} 0%, {colors.background.main} 140%)",
});

export const heroActions = css({
  position: "absolute",
  top: "xs",
  right: "sm",
});

export const identity = css({
  display: "flex",
  alignItems: "center",
  gap: "sm",
  minWidth: "0",
  flexWrap: "wrap",
});

export const avatarRing = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2.75rem",
  height: "2.75rem",
  flexShrink: "0",
  borderRadius: "full",
  padding: "2px",
  backgroundImage:
    "linear-gradient(145deg, {colors.brand.primary.main}, {colors.brand.primary.light})",
  boxShadow: "0 2px 8px {colors.shadow.primary}",
});

export const avatar = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  borderRadius: "full",
  backgroundColor: "background.sub",
  color: "brand.primary.main",
  fontSize: "base",
  fontWeight: "bold",
});

export const identityText = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minWidth: "0",
  flexShrink: "0",
});

export const name = css({
  margin: "0",
  fontSize: "xl",
  fontWeight: "bold",
  color: "text.main",
  lineHeight: "none",
  whiteSpace: "nowrap",
  letterSpacing: "tight",
});

export const bioPanel = css({
  display: "flex",
  flexDirection: "column",
  gap: "1px",
  flex: "1 1 0",
  minWidth: "0",
  paddingInlineStart: "sm",
  paddingBlock: "0",
  borderInlineStartWidth: "1px",
  borderInlineStartStyle: "solid",
  borderInlineStartColor: "border.primary",
  mdDown: {
    borderInlineStartWidth: "0",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: "border.primary",
    paddingInlineStart: "0",
    paddingTop: "xs",
    width: "100%",
  },
});

export const bioLabel = css({
  margin: "0",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "brand.primary.main",
  letterSpacing: "wide",
  lineHeight: "none",
});

export const bio = css({
  margin: "0",
  fontSize: "sm",
  color: "text.main",
  lineHeight: "snug",
});

export const completenessCard = css({
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  paddingInline: "xs",
  paddingBlock: "xs",
  gap: "1px",
  borderLeftWidth: "3px",
  borderLeftStyle: "solid",
  borderLeftColor: "brand.primary.main",
});

export const completenessTitle = css({
  margin: "0",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "text.main",
  lineHeight: "none",
});

export const chartWrap = css({
  position: "relative",
  width: "4.25rem",
  height: "4.25rem",
  flexShrink: "0",
  color: "brand.primary.main",
});

export const chart = css({
  display: "block",
  width: "100%",
  height: "100%",
});

export const chartTrack = css({
  stroke: "background.main",
});

export const chartFill = css({
  stroke: "currentColor",
});

export const percent = css({
  position: "absolute",
  inset: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0",
  fontSize: "sm",
  fontWeight: "bold",
  color: "text.main",
  lineHeight: "none",
  fontVariantNumeric: "tabular-nums",
  pointerEvents: "none",
});
