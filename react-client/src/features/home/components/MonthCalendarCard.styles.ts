import { css, cva } from "@/styled-system/css";

export const header = css({
  display: "flex",
  alignItems: "center",
  gap: "sm",
  flexShrink: "0",
  minWidth: "0",
  flexWrap: "wrap",
});

export const summary = css({
  margin: "0",
  fontSize: "xs",
  fontWeight: "medium",
  color: "text.sub",
  flexShrink: "0",
});

export const monthControls = css({
  display: "flex",
  alignItems: "center",
  gap: "2px",
  marginInlineStart: "auto",
  flexShrink: "0",
});

export const monthLabel = css({
  margin: "0",
  minWidth: "5.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  fontSize: "sm",
  fontWeight: "semibold",
  lineHeight: "none",
  color: "text.main",
  fontVariantNumeric: "tabular-nums",
});

export const navButton = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.75rem",
  height: "1.75rem",
  padding: "0",
  borderWidth: "0",
  borderStyle: "none",
  backgroundColor: "transparent",
  color: "text.main",
  cursor: "pointer",
  _hover: {
    color: "brand.primary.main",
  },
});

export const navIcon = css({
  display: "block",
  width: "1.25rem",
  height: "1.25rem",
  flexShrink: "0",
});

export const todayButton = cva({
  base: {
    margin: "0",
    paddingInline: "sm",
    paddingBlock: "1px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "brand.primary.main",
    borderRadius: "full",
    backgroundColor: "background.main",
    color: "brand.primary.main",
    fontSize: "xs",
    fontWeight: "semibold",
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: "0",
    _hover: {
      backgroundColor: "brand.primary.main",
      color: "white",
    },
  },
  variants: {
    visible: {
      true: {},
      false: {
        visibility: "hidden",
        pointerEvents: "none",
      },
    },
  },
  defaultVariants: {
    visible: true,
  },
});

export const weekRow = css({
  display: "grid",
  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
  textAlign: "center",
  fontSize: "xs",
  flexShrink: "0",
});

export const weekday = cva({
  base: {
    fontWeight: "medium",
  },
  variants: {
    tone: {
      sunday: { color: "brand.accent" },
      saturday: { color: "calendar.saturday" },
      weekday: { color: "text.sub" },
    },
  },
});

export const dayGrid = css({
  display: "grid",
  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
  gridTemplateRows: "repeat(6, minmax(0, 1fr))",
  gap: "2px",
  flex: "1",
  minHeight: "0",
});

export const dayCell = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "1px",
    minHeight: "0",
    minWidth: "0",
    paddingBlock: "2px",
    borderRadius: "md",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "transparent",
  },
  variants: {
    outside: {
      true: {
        opacity: 0.35,
      },
    },
    hasEvents: {
      true: {
        backgroundColor: "background.main",
        borderColor: "border.primary",
      },
    },
    today: {
      true: {
        borderColor: "brand.primary.main",
        backgroundColor: "background.main",
      },
    },
  },
});

export const dayNumber = cva({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.35rem",
    height: "1.35rem",
    fontSize: "xs",
    color: "text.main",
    borderRadius: "full",
    fontVariantNumeric: "tabular-nums",
  },
  variants: {
    today: {
      true: {
        backgroundColor: "brand.primary.main",
        color: "white",
        fontWeight: "semibold",
      },
    },
    outside: {
      true: {
        color: "text.sub",
      },
    },
    weekend: {
      sunday: { color: "brand.accent" },
      saturday: { color: "calendar.saturday" },
      none: {},
    },
  },
  compoundVariants: [
    {
      today: true,
      weekend: "sunday",
      css: { color: "white" },
    },
    {
      today: true,
      weekend: "saturday",
      css: { color: "white" },
    },
  ],
});

export const dots = css({
  display: "flex",
  gap: "2px",
  minHeight: "6px",
});

export const legend = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "xs",
  flexShrink: "0",
});

export const legendItem = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  fontSize: "xs",
  color: "text.sub",
});
