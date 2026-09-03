import { css, cva } from "@/styled-system/css";

export const column = css({
  display: "flex",
  flexDirection: "column",
  gap: "sm",
  minWidth: "0",
  minHeight: "0",
  height: "100%",
  overflow: "hidden",
  padding: "sm",
});

export const empty = css({
  margin: "0",
  fontSize: "sm",
  color: "text.sub",
});

export const header = css({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "sm",
  flexShrink: "0",
});

export const titleBlock = css({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: "0",
});

export const titleRow = css({
  display: "flex",
  alignItems: "center",
  gap: "xs",
  flexWrap: "wrap",
});

export const indexBadge = css({
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
  fontVariantNumeric: "tabular-nums",
  flexShrink: "0",
});

export const title = css({
  margin: "0",
  fontSize: "xl",
  fontWeight: "bold",
  color: "text.main",
  lineHeight: "tight",
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
});

export const meta = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "2px",
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

export const content = css({
  display: "flex",
  flexDirection: "column",
  gap: "sm",
  minHeight: "0",
  flex: "1",
  overflowY: "auto",
});

export const intentSection = css({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  flexShrink: "0",
});

export const intentTitle = css({
  margin: "0",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "brand.primary.main",
});

export const intentText = css({
  margin: "0",
  fontSize: "sm",
  color: "text.main",
  lineHeight: "relaxed",
});

export const section = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
});

export const sectionTitle = css({
  margin: "0",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "brand.primary.main",
});

export const body = css({
  margin: "0",
  padding: "sm",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  borderRadius: "xl",
  backgroundColor: "background.sub",
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
