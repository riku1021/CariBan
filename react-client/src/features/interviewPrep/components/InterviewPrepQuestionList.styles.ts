import { css, cva } from "@/styled-system/css";

export const column = css({
  display: "grid",
  gridTemplateRows: "minmax(0, 1fr) auto",
  gap: "xs",
  minWidth: "0",
  minHeight: "0",
  height: "100%",
  overflow: "hidden",
  padding: "sm",
  borderRightWidth: "1px",
  borderRightStyle: "solid",
  borderRightColor: "border.primary",
});

export const list = css({
  display: "flex",
  flexDirection: "column",
  gap: "0",
  minHeight: "0",
  overflowY: "auto",
});

export const group = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
    minWidth: "0",
  },
  variants: {
    divided: {
      true: {
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "border.primary",
        paddingBottom: "xs",
        marginBottom: "xs",
      },
      false: {},
    },
  },
});

export const groupHeader = css({
  margin: "0",
  paddingBlock: "2px",
  paddingInline: "xs",
  fontSize: "xs",
  fontWeight: "bold",
  letterSpacing: "wider",
  color: "text.placeholder",
  textTransform: "uppercase",
});

export const row = cva({
  base: {
    display: "grid",
    gridTemplateColumns: "auto auto minmax(0, 1fr)",
    alignItems: "center",
    gap: "xs",
    width: "100%",
    paddingBlock: "2px",
    paddingInline: "xs",
    borderWidth: "0",
    borderRadius: "lg",
    backgroundColor: "transparent",
    textAlign: "left",
    cursor: "pointer",
  },
  variants: {
    selected: {
      true: {
        backgroundColor: "background.hover",
        boxShadow: "inset 3px 0 0 {colors.brand.primary.main}",
      },
      false: {},
    },
  },
});

export const statusIcon = cva({
  base: {
    width: "1rem",
    height: "1rem",
    flexShrink: "0",
  },
  variants: {
    status: {
      ready: { color: "status.success" },
      draft: { color: "status.warning" },
      empty: { color: "text.placeholder" },
    },
  },
});

export const index = css({
  fontSize: "xs",
  fontWeight: "bold",
  fontVariantNumeric: "tabular-nums",
  color: "text.sub",
  flexShrink: "0",
  minWidth: "1.25rem",
});

export const rowTitle = css({
  margin: "0",
  fontSize: "sm",
  fontWeight: "medium",
  color: "text.main",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const empty = css({
  margin: "0",
  padding: "sm",
  fontSize: "sm",
  color: "text.sub",
});

export const footer = css({
  width: "100%",
  minWidth: "0",
  paddingTop: "xs",
  borderTopWidth: "1px",
  borderTopStyle: "solid",
  borderTopColor: "border.primary",
  backgroundColor: "background.sub",
});

export const addButton = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "xs",
  width: "100%",
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
