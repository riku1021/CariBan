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
  tableLayout: "fixed",
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
  width: "17.5rem",
});

export const stageHeadCell = css({
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

export const companyCell = css({
  paddingBlock: "xs",
  paddingInline: "xs",
  verticalAlign: "middle",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "border.secondary",
  width: "17.5rem",
});

export const stageCell = css({
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

export const companyText = css({
  display: "flex",
  flexDirection: "column",
  gap: "1px",
  minWidth: "0",
});

export const companyName = css({
  margin: "0",
  color: "text.main",
  whiteSpace: "nowrap",
});

export const jobTitle = css({
  margin: "0",
  fontSize: "xs",
  color: "text.sub",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const stepper = css({
  position: "relative",
  minWidth: "22rem",
  width: "100%",
});

export const rail = css({
  position: "absolute",
  top: "5px",
  left: "6px",
  right: "6px",
  height: "2px",
  pointerEvents: "none",
});

export const railBase = css({
  position: "absolute",
  inset: "0",
  backgroundColor: "border.primary",
});

export const railFill = css({
  position: "absolute",
  top: "0",
  left: "0",
  bottom: "0",
  backgroundColor: "brand.primary.main",
});

export const steps = css({
  position: "relative",
  display: "flex",
  alignItems: "flex-start",
  width: "100%",
});

export const step = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    minWidth: "0",
    position: "relative",
    zIndex: "default",
  },
  variants: {
    align: {
      start: { alignItems: "flex-start" },
      center: { alignItems: "center" },
      end: { alignItems: "flex-end" },
    },
  },
  defaultVariants: {
    align: "center",
  },
});

export const stepDot = cva({
  base: {
    width: "12px",
    height: "12px",
    borderRadius: "full",
    flexShrink: "0",
    borderWidth: "2px",
    borderStyle: "solid",
    backgroundColor: "background.sub",
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
  whiteSpace: "nowrap",
});
