import { css, cva } from "@/styled-system/css";

export const header = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  flexShrink: "0",
});

export const headerRow = css({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "sm",
});

export const summary = css({
  margin: "0",
  fontSize: "xs",
  fontWeight: "medium",
  color: "text.sub",
});

export const urgencyBar = css({
  display: "flex",
  gap: "2px",
  overflow: "hidden",
  width: "100%",
  height: "6px",
  backgroundColor: "background.main",
  borderRadius: "full",
});

export const urgencySegment = cva({
  base: {
    height: "100%",
    minWidth: "4px",
    borderRadius: "full",
  },
  variants: {
    urgency: {
      tomorrow: { backgroundColor: "brand.accent" },
      inTwoDays: { backgroundColor: "status.warning" },
      inThreeDays: { backgroundColor: "brand.primary.main" },
    },
  },
});

export const list = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  margin: "0",
  padding: "0",
  listStyle: "none",
  flex: "1",
  minHeight: "0",
  overflowY: "auto",
});

export const item = css({
  display: "grid",
  gridTemplateColumns: "auto minmax(0, 1fr) auto",
  alignItems: "center",
  gap: "sm",
  minWidth: "0",
  flexShrink: "0",
  paddingInline: "sm",
  paddingBlock: "xs",
  borderRadius: "lg",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  backgroundColor: "background.main",
});

export const dateBadge = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "2.5rem",
    paddingInline: "xs",
    paddingBlock: "2px",
    borderRadius: "md",
    flexShrink: "0",
    lineHeight: "none",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "border.primary",
    backgroundColor: "background.sub",
  },
  variants: {
    urgency: {
      tomorrow: {
        borderColor: "brand.accent",
        color: "brand.accent",
      },
      inTwoDays: {
        borderColor: "status.warning",
        color: "text.main",
      },
      inThreeDays: {
        borderColor: "brand.primary.main",
        color: "brand.primary.main",
      },
    },
  },
});

export const dateMonth = css({
  fontSize: "xs",
  fontWeight: "medium",
  opacity: 0.75,
});

export const dateDay = css({
  fontSize: "lg",
  fontWeight: "bold",
  fontVariantNumeric: "tabular-nums",
});

export const body = css({
  display: "flex",
  flexDirection: "column",
  gap: "1px",
  minWidth: "0",
});

export const title = css({
  margin: "0",
  fontSize: "sm",
  fontWeight: "medium",
  color: "text.main",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const company = css({
  margin: "0",
  fontSize: "xs",
  color: "text.sub",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});
