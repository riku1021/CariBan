import { css } from "@/styled-system/css";

export const card = css({
  display: "flex",
  flexDirection: "column",
  gap: "sm",
  minWidth: "0",
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

export const stats = css({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "sm",
});

export const stat = css({
  display: "flex",
  alignItems: "center",
  gap: "xs",
  minWidth: "0",
});

export const statIcon = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2rem",
  height: "2rem",
  flexShrink: "0",
  borderRadius: "full",
  backgroundColor: "background.main",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  color: "brand.primary.main",
  fontSize: "sm",
});

export const statText = css({
  display: "flex",
  flexDirection: "column",
  gap: "1px",
  minWidth: "0",
});

export const statValue = css({
  margin: "0",
  fontSize: "base",
  fontWeight: "bold",
  color: "text.main",
  lineHeight: "tight",
  fontVariantNumeric: "tabular-nums",
});

export const statLabel = css({
  margin: "0",
  fontSize: "xs",
  color: "text.sub",
  whiteSpace: "nowrap",
});

export const progressBlock = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
});

export const track = css({
  width: "100%",
  height: "8px",
  borderRadius: "full",
  backgroundColor: "background.main",
  overflow: "hidden",
});

export const fill = css({
  height: "100%",
  borderRadius: "full",
  backgroundColor: "brand.primary.main",
});

export const progressFooter = css({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "sm",
});

export const progressLabel = css({
  margin: "0",
  fontSize: "xs",
  fontWeight: "medium",
  color: "text.sub",
});

export const progressCount = css({
  margin: "0",
  fontSize: "xs",
  color: "text.sub",
  fontVariantNumeric: "tabular-nums",
});
