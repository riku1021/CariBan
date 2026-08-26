import { css, cva } from "@/styled-system/css";

export const panel = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  minWidth: "0",
  minHeight: "0",
  height: "100%",
  overflow: "hidden",
  padding: "0",
  backgroundColor: "background.sub",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  borderRadius: "2xl",
  boxShadow: "0 2px 8px {colors.shadow.primary}",
});

export const tableWrap = css({
  flex: "1",
  minHeight: "0",
  overflow: "auto",
  width: "100%",
});

export const table = css({
  width: "100%",
  borderCollapse: "collapse",
  tableLayout: "fixed",
});

export const th = css({
  paddingBlock: "xs",
  paddingInline: "xs",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "text.sub",
  textAlign: "left",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "border.primary",
  whiteSpace: "nowrap",
});

export const thCheck = css({
  paddingBlock: "xs",
  paddingInline: "xs",
  paddingInlineStart: "sm",
  width: "2.75rem",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "border.primary",
});

export const thCategory = css({
  paddingBlock: "xs",
  paddingInline: "xs",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "text.sub",
  textAlign: "left",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "border.primary",
  whiteSpace: "nowrap",
  width: "6.5rem",
});

export const thDue = css({
  paddingBlock: "xs",
  paddingInline: "xs",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "text.sub",
  textAlign: "right",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "border.primary",
  whiteSpace: "nowrap",
  width: "5rem",
});

export const thEstimate = css({
  paddingBlock: "xs",
  paddingInline: "xs",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "text.sub",
  textAlign: "right",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "border.primary",
  whiteSpace: "nowrap",
  width: "5.5rem",
});

export const thMenu = css({
  paddingBlock: "xs",
  paddingInline: "xs",
  paddingInlineEnd: "sm",
  width: "2.75rem",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "border.primary",
});

export const groupHeader = cva({
  base: {
    paddingBlock: "xs",
    paddingInline: "sm",
    textAlign: "left",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: "border.primary",
    backgroundColor: "background.main",
    borderLeftWidth: "3px",
    borderLeftStyle: "solid",
    borderLeftColor: "border.primary",
  },
  variants: {
    tone: {
      overdue: {
        borderLeftColor: "status.error",
      },
      today: {
        borderLeftColor: "brand.primary.main",
      },
      tomorrow: {
        borderLeftColor: "border.primary",
      },
      thisWeek: {
        borderLeftColor: "border.primary",
      },
      later: {
        borderLeftColor: "border.primary",
      },
      completed: {
        borderLeftColor: "border.primary",
      },
    },
  },
  defaultVariants: {
    tone: "later",
  },
});

export const groupHeaderInner = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "xs",
});

export const groupLabel = css({
  fontSize: "xs",
  fontWeight: "semibold",
  color: "text.main",
  lineHeight: "tight",
});

export const groupCount = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "1.25rem",
    height: "1.25rem",
    paddingInline: "xs",
    borderRadius: "full",
    fontSize: "xs",
    fontWeight: "bold",
    lineHeight: "none",
    fontVariantNumeric: "tabular-nums",
    backgroundColor: "background.sub",
    color: "text.sub",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "border.primary",
  },
  variants: {
    tone: {
      overdue: {
        backgroundColor: "background.sub",
        color: "status.error",
        borderColor: "status.error",
      },
      today: {
        backgroundColor: "brand.primary.light",
        color: "brand.primary.main",
        borderColor: "brand.primary.main",
      },
      tomorrow: {},
      thisWeek: {},
      later: {},
      completed: {},
    },
  },
  defaultVariants: {
    tone: "later",
  },
});

export const row = cva({
  base: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: "border.primary",
    cursor: "pointer",
    _hover: {
      backgroundColor: "background.hover",
    },
  },
  variants: {
    selected: {
      true: {
        backgroundColor: "background.hover",
        boxShadow: "inset 3px 0 0 {colors.brand.primary.main}",
      },
    },
  },
});

export const td = css({
  paddingBlock: "xs",
  paddingInline: "xs",
  verticalAlign: "middle",
  minWidth: "0",
});

export const tdCheck = css({
  paddingBlock: "xs",
  paddingInline: "xs",
  paddingInlineStart: "sm",
  verticalAlign: "middle",
  width: "2.75rem",
});

export const tdDue = css({
  paddingBlock: "xs",
  paddingInline: "xs",
  verticalAlign: "middle",
  textAlign: "right",
});

export const tdEstimate = css({
  paddingBlock: "xs",
  paddingInline: "xs",
  verticalAlign: "middle",
  textAlign: "right",
  fontSize: "xs",
  color: "text.sub",
  whiteSpace: "nowrap",
  fontVariantNumeric: "tabular-nums",
});

export const tdMenu = css({
  paddingBlock: "xs",
  paddingInline: "xs",
  paddingInlineEnd: "sm",
  verticalAlign: "middle",
  width: "2.75rem",
  textAlign: "center",
});

export const info = css({
  display: "flex",
  alignItems: "center",
  gap: "xs",
  minWidth: "0",
});

export const companyMark = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.75rem",
  height: "1.75rem",
  flexShrink: "0",
  borderRadius: "md",
  backgroundColor: "background.main",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  color: "brand.primary.main",
  fontSize: "xs",
  fontWeight: "bold",
});

export const titles = css({
  display: "flex",
  flexDirection: "column",
  gap: "1px",
  minWidth: "0",
});

export const title = cva({
  base: {
    margin: "0",
    fontSize: "sm",
    fontWeight: "medium",
    color: "text.main",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  variants: {
    completed: {
      true: {
        color: "text.sub",
        textDecoration: "line-through",
      },
    },
  },
});

export const company = css({
  margin: "0",
  fontSize: "xs",
  color: "text.sub",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const categoryTag = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    flexShrink: "0",
    fontSize: "xs",
    fontWeight: "semibold",
    paddingInline: "xs",
    paddingBlock: "1px",
    borderRadius: "full",
    whiteSpace: "nowrap",
    lineHeight: "tight",
    color: "text.main",
    backgroundColor: "background.main",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "border.primary",
    borderLeftWidth: "3px",
  },
  variants: {
    category: {
      esDeadline: { borderLeftColor: "brand.accent" },
      webTest: { borderLeftColor: "status.warning" },
      interview: { borderLeftColor: "brand.primary.main" },
      memo: { borderLeftColor: "brand.secondary.main" },
    },
  },
});

export const due = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "1px",
});

export const dueLabel = cva({
  base: {
    margin: "0",
    fontSize: "xs",
    fontWeight: "semibold",
    whiteSpace: "nowrap",
  },
  variants: {
    tone: {
      overdue: { color: "status.error" },
      today: { color: "brand.primary.main" },
      later: { color: "text.sub" },
    },
  },
});

export const dueTime = css({
  margin: "0",
  fontSize: "xs",
  color: "text.sub",
  fontVariantNumeric: "tabular-nums",
});

export const menuButton = css({
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

export const empty = css({
  margin: "0",
  padding: "sm",
  fontSize: "sm",
  color: "text.sub",
});
