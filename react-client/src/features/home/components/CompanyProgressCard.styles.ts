import { css } from "@/styled-system/css";

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

export const stageStepper = css({
  minWidth: "22rem",
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
