import { css, cva } from "@/styled-system/css";

export const row = css({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "sm",
  minHeight: "0",
  md: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  lg: {
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  },
});

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
      inProcess: { borderLeftColor: "brand.primary.main" },
      recruiting: { borderLeftColor: "calendar.saturday" },
      offer: { borderLeftColor: "status.success" },
      needsAction: { borderLeftColor: "status.warning" },
    },
  },
});

export const body = css({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: "0",
});

export const labelRow = css({
  display: "flex",
  alignItems: "center",
  gap: "xs",
  minWidth: "0",
});

export const icon = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.25rem",
    height: "1.25rem",
    flexShrink: "0",
    fontSize: "xs",
  },
  variants: {
    accent: {
      inProcess: { color: "brand.primary.main" },
      recruiting: { color: "calendar.saturday" },
      offer: { color: "status.success" },
      needsAction: { color: "status.warning" },
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

export const caption = cva({
  base: {
    margin: "0",
    fontSize: "xs",
    fontWeight: "medium",
    whiteSpace: "nowrap",
  },
  variants: {
    direction: {
      up: { color: "status.success" },
      down: { color: "status.error" },
      flat: { color: "text.sub" },
    },
  },
});
