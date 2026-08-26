import { css, cva } from "@/styled-system/css";

export const panel = css({
  display: "flex",
  flexDirection: "column",
  gap: "sm",
  minWidth: "0",
  minHeight: "0",
  height: "100%",
  overflow: "hidden",
  padding: "sm",
  backgroundColor: "background.sub",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  borderRadius: "2xl",
  boxShadow: "0 2px 8px {colors.shadow.primary}",
});

export const tabs = css({
  display: "flex",
  alignItems: "center",
  gap: "sm",
  flexShrink: "0",
  overflowX: "auto",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "border.primary",
});

export const tab = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "2px",
    flexShrink: "0",
    paddingBlock: "xs",
    paddingInline: "2px",
    borderWidth: "0",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: "transparent",
    backgroundColor: "transparent",
    color: "text.sub",
    fontSize: "sm",
    fontWeight: "medium",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  variants: {
    active: {
      true: {
        color: "brand.primary.main",
        borderBottomColor: "brand.primary.main",
        fontWeight: "semibold",
      },
      false: {},
    },
    emphasis: {
      true: {
        fontWeight: "semibold",
      },
      false: {},
    },
  },
});

export const tabCount = cva({
  base: {
    fontSize: "xs",
    fontVariantNumeric: "tabular-nums",
  },
  variants: {
    emphasis: {
      true: {
        color: "brand.primary.main",
        fontWeight: "bold",
      },
      false: {},
    },
  },
});

export const banner = cva({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "sm",
    flexShrink: "0",
    padding: "xs",
    borderRadius: "xl",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "border.primary",
    backgroundColor: "background.main",
    color: "text.main",
    fontSize: "xs",
  },
  variants: {
    emphasis: {
      true: {
        borderLeftWidth: "3px",
        borderLeftColor: "brand.primary.main",
      },
      false: {},
    },
  },
});

export const bannerLead = css({
  display: "flex",
  alignItems: "center",
  gap: "xs",
  minWidth: "0",
});

export const bannerIcon = css({
  color: "brand.primary.main",
  flexShrink: "0",
});

export const bannerDone = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  flexShrink: "0",
  color: "status.success",
  fontWeight: "semibold",
});

export const list = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  minHeight: "0",
  overflowY: "auto",
  flex: "1",
});

export const item = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "xs",
    padding: "sm",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "border.primary",
    borderRadius: "xl",
    backgroundColor: "background.main",
  },
  variants: {
    open: {
      true: {
        borderColor: "brand.primary.main",
      },
      false: {},
    },
    emphasis: {
      true: {
        borderLeftWidth: "3px",
        borderLeftColor: "brand.primary.main",
      },
      false: {},
    },
  },
});

export const itemHeader = css({
  display: "grid",
  gridTemplateColumns: "auto minmax(0, 1fr) auto auto",
  alignItems: "center",
  gap: "sm",
  width: "100%",
  padding: "0",
  borderWidth: "0",
  backgroundColor: "transparent",
  textAlign: "left",
  cursor: "pointer",
  mdDown: {
    gridTemplateColumns: "auto minmax(0, 1fr) auto",
  },
});

export const index = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.75rem",
    height: "1.75rem",
    borderRadius: "full",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "brand.primary.main",
    backgroundColor: "background.main",
    color: "brand.primary.main",
    fontSize: "xs",
    fontWeight: "bold",
    flexShrink: "0",
  },
  variants: {
    emphasis: {
      true: {
        backgroundColor: "brand.primary.main",
        color: "white",
        borderColor: "brand.primary.main",
      },
      false: {},
    },
  },
});

export const itemBody = css({
  display: "flex",
  flexDirection: "column",
  gap: "1px",
  minWidth: "0",
});

export const titleRow = css({
  display: "flex",
  alignItems: "center",
  gap: "xs",
  minWidth: "0",
  flexWrap: "wrap",
});

export const itemTitle = css({
  margin: "0",
  fontSize: "sm",
  fontWeight: "semibold",
  color: "text.main",
});

export const specificBadge = css({
  display: "inline-flex",
  alignItems: "center",
  flexShrink: "0",
  paddingInline: "xs",
  paddingBlock: "1px",
  borderRadius: "full",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "brand.primary.main",
  color: "brand.primary.main",
  fontSize: "xs",
  fontWeight: "semibold",
  lineHeight: "tight",
});
export const itemSnippet = css({
  margin: "0",
  fontSize: "xs",
  color: "text.sub",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const itemMeta = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "1px",
  flexShrink: "0",
});

export const statusBadge = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    paddingInline: "xs",
    paddingBlock: "1px",
    borderRadius: "full",
    fontSize: "xs",
    fontWeight: "semibold",
  },
  variants: {
    status: {
      ready: {
        color: "status.success",
        backgroundColor: { base: "#e8f6ec", _dark: "rgba(40, 167, 69, 0.2)" },
      },
      draft: {
        color: "status.warning",
        backgroundColor: { base: "#fff8e6", _dark: "rgba(255, 193, 7, 0.2)" },
      },
      empty: {
        color: "text.sub",
        backgroundColor: "background.sub",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "border.primary",
      },
    },
  },
});

export const updated = css({
  margin: "0",
  fontSize: "xs",
  color: "text.placeholder",
});

export const itemActions = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  flexShrink: "0",
});

export const itemAction = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.75rem",
  height: "1.75rem",
  borderWidth: "0",
  borderRadius: "full",
  backgroundColor: "transparent",
  color: "text.sub",
  cursor: "pointer",
  _hover: {
    color: "brand.primary.main",
    backgroundColor: "brand.primary.light",
  },
});

export const chevron = cva({
  base: {
    transition: "transform 0.15s ease",
  },
  variants: {
    open: {
      true: { transform: "rotate(180deg)" },
      false: { transform: "rotate(0deg)" },
    },
  },
});

export const itemContent = css({
  margin: "0",
  paddingTop: "xs",
  borderTopWidth: "1px",
  borderTopStyle: "solid",
  borderTopColor: "border.primary",
  fontSize: "sm",
  color: "text.main",
  lineHeight: "relaxed",
  whiteSpace: "pre-wrap",
});

export const memoBox = css({
  flex: "1",
  minHeight: "0",
  overflowY: "auto",
  padding: "sm",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  borderRadius: "xl",
  backgroundColor: "background.main",
});

export const memoText = css({
  margin: "0",
  fontSize: "sm",
  color: "text.main",
  lineHeight: "relaxed",
  whiteSpace: "pre-wrap",
});

export const addButton = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "xs",
  alignSelf: "stretch",
  flexShrink: "0",
  paddingBlock: "xs",
  borderWidth: "1px",
  borderStyle: "dashed",
  borderColor: "brand.primary.main",
  borderRadius: "full",
  backgroundColor: "transparent",
  color: "brand.primary.main",
  fontSize: "sm",
  fontWeight: "semibold",
  cursor: "pointer",
  _hover: {
    backgroundColor: "brand.primary.light",
  },
});
