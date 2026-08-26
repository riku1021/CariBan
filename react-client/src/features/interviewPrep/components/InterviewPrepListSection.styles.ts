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

export const scroll = css({
  display: "flex",
  flexDirection: "column",
  gap: "sm",
  minHeight: "0",
  overflowY: "auto",
  paddingRight: "2px",
});

export const empty = css({
  margin: "0",
  fontSize: "sm",
  color: "text.sub",
});

export const group = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  minWidth: "0",
});

export const groupLabel = css({
  margin: "0",
  fontSize: "sm",
  fontWeight: "semibold",
  color: "text.main",
});

export const card = css({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 0.9fr) minmax(0, 1fr) auto",
  alignItems: "center",
  gap: "sm",
  minWidth: "0",
  padding: "sm",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  borderRadius: "xl",
  backgroundColor: "background.main",
  mdDown: {
    gridTemplateColumns: "1fr",
    alignItems: "start",
  },
});

export const companyCell = css({
  display: "flex",
  alignItems: "center",
  gap: "xs",
  minWidth: "0",
});

export const mark = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "lg",
    color: "white",
    fontSize: "xs",
    fontWeight: "bold",
    flexShrink: "0",
  },
  variants: {
    tone: {
      a: { backgroundColor: "brand.primary.main" },
      b: { backgroundColor: "calendar.saturday" },
      c: { backgroundColor: "status.success" },
      d: { backgroundColor: "brand.secondary.main" },
    },
  },
});

export const companyText = css({
  display: "flex",
  flexDirection: "column",
  gap: "1px",
  minWidth: "0",
});

export const companyName = css({
  margin: "0",
  fontSize: "sm",
  fontWeight: "semibold",
  color: "text.main",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const jobTitle = css({
  margin: "0",
  fontSize: "xs",
  color: "text.sub",
});

export const scheduleCell = css({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: "0",
});

export const phaseRow = css({
  display: "flex",
  alignItems: "center",
  gap: "xs",
  flexWrap: "wrap",
});

export const phaseBadge = cva({
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
    phase: {
      casual: {
        color: "brand.secondary.main",
        backgroundColor: "brand.secondary.light",
      },
      first: {
        color: "calendar.saturday",
        backgroundColor: "brand.primary.light",
      },
      second: {
        color: "brand.primary.main",
        backgroundColor: "brand.primary.light",
      },
      final: {
        color: "brand.primary.dark",
        backgroundColor: "brand.primary.light",
      },
    },
  },
});

export const scheduleTime = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  margin: "0",
  fontSize: "xs",
  color: "text.main",
});

export const countdown = css({
  margin: "0",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "status.warning",
});

export const prepCell = css({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: "0",
});

export const prepHeader = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "xs",
});

export const prepPercent = css({
  margin: "0",
  fontSize: "sm",
  fontWeight: "bold",
  color: "text.main",
  fontVariantNumeric: "tabular-nums",
});

export const prepTrack = css({
  width: "100%",
  height: "0.35rem",
  borderRadius: "full",
  backgroundColor: "border.primary",
  overflow: "hidden",
});

export const prepFill = css({
  height: "100%",
  borderRadius: "full",
  backgroundColor: "brand.primary.main",
});

export const checklistRow = css({
  display: "flex",
  alignItems: "center",
  gap: "sm",
  flexWrap: "wrap",
});

export const checklistItem = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  fontSize: "xs",
  color: "text.sub",
});

export const checklistOk = css({
  color: "status.success",
});

export const checklistNg = css({
  color: "text.placeholder",
});

export const missingCell = css({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: "0",
});

export const missingLabel = css({
  margin: "0",
  fontSize: "xs",
  color: "text.sub",
});

export const missingTags = css({
  display: "flex",
  alignItems: "center",
  gap: "2px",
  flexWrap: "wrap",
});

export const missingTag = css({
  display: "inline-flex",
  alignItems: "center",
  paddingInline: "xs",
  paddingBlock: "1px",
  borderRadius: "full",
  fontSize: "xs",
  fontWeight: "medium",
  color: "status.error",
  backgroundColor: { base: "#fde8ea", _dark: "rgba(220, 53, 69, 0.2)" },
});

export const missingEmpty = css({
  margin: "0",
  fontSize: "xs",
  color: "text.placeholder",
});

export const detailButton = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "2px",
  flexShrink: "0",
  paddingBlock: "xs",
  paddingInline: "sm",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "brand.primary.main",
  borderRadius: "full",
  backgroundColor: "background.sub",
  color: "brand.primary.main",
  fontSize: "xs",
  fontWeight: "semibold",
  cursor: "pointer",
  whiteSpace: "nowrap",
  textDecoration: "none",
  _hover: {
    backgroundColor: "brand.primary.light",
  },
});

export const moreButton = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "xs",
  alignSelf: "center",
  paddingBlock: "xs",
  paddingInline: "sm",
  borderWidth: "0",
  backgroundColor: "transparent",
  color: "text.sub",
  fontSize: "sm",
  fontWeight: "medium",
  cursor: "pointer",
  _hover: {
    color: "brand.primary.main",
  },
});
