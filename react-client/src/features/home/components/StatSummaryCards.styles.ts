import { css, cva } from "@/styled-system/css";

export const card = cva({
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "sm",
    minWidth: "0",
    paddingInline: "sm",
    paddingBlock: "xs",
    backgroundColor: "background.sub",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "border.primary",
    borderLeftWidth: "3px",
    borderRadius: "xl",
    boxShadow: "0 2px 8px {colors.shadow.primary}",
  },
  variants: {
    accent: {
      companies: { borderLeftColor: "brand.primary.main" },
      interviews: { borderLeftColor: "brand.secondary.main" },
      tasks: { borderLeftColor: "status.warning" },
      offers: { borderLeftColor: "brand.accent" },
    },
  },
});

export const body = css({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: "0",
  flexShrink: "0",
});

export const labelRow = css({
  display: "flex",
  alignItems: "center",
  gap: "xs",
  minWidth: "0",
});

export const iconBadge = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.25rem",
    height: "1.25rem",
    flexShrink: "0",
    borderRadius: "md",
    fontSize: "xs",
    backgroundColor: "background.main",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "border.primary",
  },
  variants: {
    accent: {
      companies: { color: "brand.primary.main" },
      interviews: { color: "brand.secondary.main" },
      tasks: { color: "status.warning" },
      offers: { color: "brand.accent" },
    },
  },
});

export const label = css({
  margin: "0",
  fontSize: "xs",
  fontWeight: "medium",
  color: "text.sub",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const valueRow = css({
  display: "flex",
  alignItems: "baseline",
  gap: "2px",
  minWidth: "0",
});

export const value = css({
  margin: "0",
  fontSize: "xl",
  fontWeight: "bold",
  lineHeight: "none",
  color: "text.main",
  fontVariantNumeric: "tabular-nums",
});

export const unit = css({
  fontSize: "sm",
  fontWeight: "semibold",
  color: "text.sub",
});

export const change = cva({
  base: {
    margin: "0",
    display: "inline-flex",
    alignItems: "center",
    width: "fit-content",
    fontSize: "xs",
    fontWeight: "semibold",
    paddingInline: "xs",
    paddingBlock: "1px",
    borderRadius: "full",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "border.primary",
    backgroundColor: "background.main",
    lineHeight: "tight",
    whiteSpace: "nowrap",
  },
  variants: {
    tone: {
      up: { color: "status.success", borderColor: "status.success" },
      down: { color: "status.error", borderColor: "status.error" },
      flat: { color: "text.sub" },
    },
  },
});

export const visual = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "center",
  gap: "2px",
  flex: "1",
  minWidth: "0",
  maxWidth: "9rem",
});

export const caption = css({
  margin: "0",
  fontSize: "xs",
  color: "text.sub",
  lineHeight: "none",
  whiteSpace: "nowrap",
});

export const chart = css({
  display: "block",
  width: "100%",
  height: "2.25rem",
  color: "brand.primary.main",
});

export const bars = css({
  display: "flex",
  alignItems: "flex-end",
  gap: "3px",
  width: "100%",
  height: "2.25rem",
  color: "brand.secondary.main",
});

export const bar = cva({
  base: {
    flex: "1",
    minWidth: "0",
    borderRadius: "full",
    backgroundColor: "currentColor",
    opacity: 0.45,
  },
  variants: {
    peak: {
      true: {
        opacity: 1,
      },
    },
  },
});

export const doughnutWrap = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  color: "status.warning",
});

export const doughnut = css({
  width: "2.5rem",
  height: "2.5rem",
});

export const doughnutLabel = css({
  fontSize: "9px",
  fontWeight: "bold",
  fill: "currentColor",
  color: "text.main",
});

export const medalWrap = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2.5rem",
  height: "2.5rem",
  borderRadius: "full",
  backgroundColor: "background.main",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "brand.accent",
  color: "brand.accent",
  fontSize: "lg",
  flexShrink: "0",
});
