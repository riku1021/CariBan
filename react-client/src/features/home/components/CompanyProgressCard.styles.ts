import { css, cva } from "@/styled-system/css";

export const header = css({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "sm",
  flexShrink: "0",
});

export const summary = css({
  margin: "0",
  fontSize: "xs",
  fontWeight: "medium",
  color: "text.sub",
});

export const tableWrap = css({
  overflowX: "auto",
  overflowY: "auto",
  minHeight: "0",
  flex: "1",
});
export const table = css({
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "sm",
});

export const headCell = css({
  paddingBlock: "xs",
  paddingInline: "xs",
  textAlign: "left",
  fontWeight: "medium",
  color: "text.sub",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "border.primary",
  whiteSpace: "nowrap",
});

export const cell = css({
  paddingBlock: "xs",
  paddingInline: "xs",
  verticalAlign: "middle",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "border.secondary",
});

export const company = css({
  display: "flex",
  alignItems: "center",
  gap: "sm",
  minWidth: "0",
});

export const initials = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.5rem",
  height: "1.5rem",
  flexShrink: "0",
  borderRadius: "full",
  backgroundColor: "brand.primary.light",
  color: "brand.primary.main",
  fontSize: "xs",
  fontWeight: "semibold",
});

export const companyName = css({
  margin: "0",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "text.main",
});

export const stepper = css({
  display: "flex",
  alignItems: "flex-start",
  minWidth: "14rem",
});

export const step = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: "1",
  minWidth: "0",
  position: "relative",
});

export const stepLine = cva({
  base: {
    position: "absolute",
    top: "6px",
    left: "50%",
    width: "100%",
    height: "2px",
  },
  variants: {
    filled: {
      true: { backgroundColor: "brand.primary.main" },
      false: { backgroundColor: "border.primary" },
    },
  },
});

export const stepDot = cva({
  base: {
    width: "12px",
    height: "12px",
    borderRadius: "full",
    zIndex: "default",
    borderWidth: "2px",
    borderStyle: "solid",
  },
  variants: {
    state: {
      done: {
        backgroundColor: "brand.primary.main",
        borderColor: "brand.primary.main",
      },
      current: {
        backgroundColor: "background.sub",
        borderColor: "brand.primary.main",
      },
      todo: {
        backgroundColor: "background.sub",
        borderColor: "border.primary",
      },
    },
  },
});

export const stepLabel = css({
  marginTop: "2px",
  fontSize: "xs",
  color: "text.sub",
  textAlign: "center",
  whiteSpace: "nowrap",
});

export const updated = css({
  color: "text.sub",
  whiteSpace: "nowrap",
});
