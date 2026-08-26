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

export const range = css({
  margin: "0",
  fontSize: "xs",
  color: "text.sub",
});

export const legend = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "sm",
});

export const legendItem = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  fontSize: "xs",
  color: "text.sub",
});

export const legendSwatch = cva({
  base: {
    width: "8px",
    height: "8px",
    borderRadius: "full",
    flexShrink: "0",
  },
  variants: {
    kind: {
      task: { backgroundColor: "status.warning" },
      interview: { backgroundColor: "brand.primary.main" },
      deadline: { backgroundColor: "brand.accent" },
    },
  },
});

export const list = css({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  margin: "0",
  padding: "0",
  listStyle: "none",
  flex: "1",
  minHeight: "0",
  overflow: "hidden",
});

export const item = css({
  display: "grid",
  gridTemplateColumns: "auto minmax(0, 1fr) auto",
  alignItems: "center",
  gap: "xs",
  minWidth: "0",
  minHeight: "0",
  flex: "1",
  paddingInline: "xs",
});

export const dateBadge = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "1.75rem",
    paddingBlock: "1px",
    borderRadius: "sm",
    flexShrink: "0",
    lineHeight: "none",
  },
  variants: {
    today: {
      true: {
        width: "2rem",
        height: "2rem",
        borderRadius: "full",
        backgroundColor: "brand.primary.main",
        color: "white",
      },
      false: {
        backgroundColor: "transparent",
        color: "text.main",
      },
    },
  },
  defaultVariants: {
    today: false,
  },
});

export const dayNumber = css({
  fontSize: "sm",
  fontWeight: "bold",
  lineHeight: "none",
  fontVariantNumeric: "tabular-nums",
});

export const weekday = css({
  fontSize: "xs",
  fontWeight: "medium",
  lineHeight: "none",
  opacity: 0.7,
});

export const barTrack = css({
  display: "flex",
  gap: "2px",
  overflow: "hidden",
  width: "100%",
  height: "6px",
  backgroundColor: "background.main",
  borderRadius: "full",
});

export const barSegment = cva({
  base: {
    height: "100%",
    minWidth: "4px",
    borderRadius: "full",
  },
  variants: {
    kind: {
      task: { backgroundColor: "status.warning" },
      interview: { backgroundColor: "brand.primary.main" },
      deadline: { backgroundColor: "brand.accent" },
    },
  },
});

export const total = css({
  margin: "0",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "text.sub",
  whiteSpace: "nowrap",
});

export const empty = css({
  margin: "0",
  fontSize: "xs",
  color: "text.placeholder",
});
