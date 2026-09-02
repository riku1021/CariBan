import { css, cva } from "@/styled-system/css";

export const card = css({
  display: "flex",
  flexDirection: "column",
  gap: "sm",
  minWidth: "0",
  minHeight: "0",
  height: "100%",
  overflowY: "auto",
  padding: "sm",
  backgroundColor: "background.sub",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  borderRadius: "2xl",
  boxShadow: "0 2px 8px {colors.shadow.primary}",
});

export const companyHeader = css({
  display: "flex",
  alignItems: "flex-start",
  gap: "xs",
  minWidth: "0",
});

export const mark = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2.5rem",
  height: "2.5rem",
  borderRadius: "lg",
  backgroundColor: "brand.primary.main",
  color: "white",
  fontSize: "xs",
  fontWeight: "bold",
  flexShrink: "0",
});

export const companyText = css({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: "0",
  flex: "1",
});

export const companyName = css({
  margin: "0",
  fontSize: "base",
  fontWeight: "bold",
  color: "text.main",
  lineHeight: "tight",
});

export const phaseBadge = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  width: "fit-content",
  paddingInline: "xs",
  paddingBlock: "1px",
  borderRadius: "full",
  backgroundColor: "brand.primary.light",
  color: "brand.primary.main",
  fontSize: "xs",
  fontWeight: "semibold",
});

export const phaseDot = css({
  width: "0.4rem",
  height: "0.4rem",
  borderRadius: "full",
  backgroundColor: "brand.primary.main",
  flexShrink: "0",
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

export const section = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  minWidth: "0",
});

export const sectionTitle = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  margin: "0",
  fontSize: "sm",
  fontWeight: "semibold",
  color: "text.main",
});

export const sectionIcon = css({
  color: "brand.primary.main",
  fontSize: "xs",
});

export const summaryGrid = css({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.35fr) minmax(0, 1fr)",
  gap: "xs",
  minWidth: "0",
});

export const summaryPrimary = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  minWidth: "0",
  padding: "xs",
  borderRadius: "xl",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "brand.primary.main",
  backgroundColor: "background.main",
  boxShadow: "0 0 0 1px {colors.brand.primary.light}, 0 4px 16px {colors.shadow.primary}",
});

export const summarySide = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  minWidth: "0",
});

export const summaryTile = css({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: "0",
  padding: "xs",
  borderRadius: "xl",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  backgroundColor: "background.main",
  flex: "1",
});

export const tileLabelRow = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  fontSize: "xs",
  color: "text.sub",
});

export const tileValue = css({
  margin: "0",
  fontSize: "sm",
  fontWeight: "bold",
  color: "text.main",
  lineHeight: "tight",
});

export const tileValueAccent = css({
  margin: "0",
  fontSize: "sm",
  fontWeight: "bold",
  color: "brand.primary.main",
  lineHeight: "tight",
});

export const overdueBadge = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  width: "fit-content",
  paddingInline: "xs",
  paddingBlock: "1px",
  borderRadius: "full",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "status.warning",
  color: "status.warning",
  fontSize: "xs",
  fontWeight: "semibold",
  backgroundColor: "background.sub",
});

export const remainBadge = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  width: "fit-content",
  paddingInline: "xs",
  paddingBlock: "1px",
  borderRadius: "full",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "brand.primary.main",
  color: "brand.primary.main",
  fontSize: "xs",
  fontWeight: "semibold",
  backgroundColor: "background.sub",
});

export const interviewersCard = css({
  display: "flex",
  alignItems: "flex-start",
  gap: "sm",
  minWidth: "0",
  padding: "xs",
  borderRadius: "xl",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  backgroundColor: "background.main",
});

export const interviewersLabel = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  flexShrink: "0",
  fontSize: "xs",
  color: "text.sub",
  fontWeight: "medium",
  paddingTop: "2px",
});

export const interviewersList = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  minWidth: "0",
  flex: "1",
  margin: "0",
  padding: "0",
  listStyle: "none",
});

export const interviewerRow = css({
  display: "flex",
  alignItems: "center",
  gap: "xs",
  minWidth: "0",
});

export const interviewerAvatar = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.35rem",
    height: "1.35rem",
    borderRadius: "full",
    fontSize: "0.65rem",
    flexShrink: "0",
  },
  variants: {
    tone: {
      hr: {
        backgroundColor: "brand.primary.light",
        color: "brand.primary.main",
      },
      field: {
        backgroundColor: { base: "#d8f5ef", _dark: "rgba(4, 221, 179, 0.2)" },
        color: "brand.secondary.main",
      },
    },
  },
});

export const interviewerName = css({
  margin: "0",
  fontSize: "xs",
  color: "text.main",
  fontWeight: "medium",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const prepRow = css({
  display: "flex",
  alignItems: "center",
  gap: "sm",
});

export const ringWrap = css({
  position: "relative",
  width: "4.75rem",
  height: "4.75rem",
  flexShrink: "0",
});

export const ringSvg = css({
  width: "100%",
  height: "100%",
  transform: "rotate(-90deg)",
});

export const ringTrack = css({
  fill: "none",
  stroke: "border.primary",
  strokeWidth: "3.5",
});

export const ringProgress = css({
  fill: "none",
  stroke: "brand.primary.main",
  strokeWidth: "3.5",
  strokeLinecap: "round",
});

export const ringCenter = css({
  position: "absolute",
  inset: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "sm",
  fontWeight: "bold",
  color: "text.main",
});

export const prepBreakdown = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  minWidth: "0",
  flex: "1",
});

export const prepLine = css({
  display: "grid",
  gridTemplateColumns: "auto minmax(0, 1fr) auto auto",
  alignItems: "center",
  gap: "xs",
  fontSize: "xs",
  color: "text.sub",
});

export const prepLineIcon = css({
  color: "text.placeholder",
  fontSize: "0.7rem",
});

export const prepCount = css({
  fontWeight: "semibold",
  color: "text.main",
  fontVariantNumeric: "tabular-nums",
});

export const prepOk = css({
  color: "status.success",
  fontSize: "0.7rem",
});

export const missingOkCard = css({
  display: "flex",
  alignItems: "flex-start",
  gap: "xs",
  padding: "xs",
  borderRadius: "xl",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: { base: "#b8e6c9", _dark: "rgba(40, 167, 69, 0.35)" },
  backgroundColor: { base: "#edf9f1", _dark: "rgba(40, 167, 69, 0.12)" },
});

export const missingOkIcon = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.35rem",
  height: "1.35rem",
  borderRadius: "full",
  backgroundColor: "status.success",
  color: "white",
  fontSize: "0.65rem",
  flexShrink: "0",
});

export const missingOkText = css({
  display: "flex",
  flexDirection: "column",
  gap: "1px",
  minWidth: "0",
});

export const missingOkTitle = css({
  margin: "0",
  fontSize: "sm",
  fontWeight: "semibold",
  color: "text.main",
});

export const missingOkBody = css({
  margin: "0",
  fontSize: "xs",
  color: "text.sub",
});

export const missingTags = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "2px",
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

export const taskList = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  margin: "0",
  padding: "0",
  listStyle: "none",
});

export const taskItem = css({
  display: "grid",
  gridTemplateColumns: "auto minmax(0, 1fr) auto",
  gap: "xs",
  alignItems: "center",
  paddingBlock: "2px",
});

export const taskCheck = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.1rem",
    height: "1.1rem",
    borderRadius: "full",
    borderWidth: "2px",
    borderStyle: "solid",
    fontSize: "0.55rem",
    flexShrink: "0",
  },
  variants: {
    completed: {
      true: {
        borderColor: "status.success",
        backgroundColor: "status.success",
        color: "white",
      },
      false: {
        borderColor: "border.primary",
        backgroundColor: "background.sub",
        color: "transparent",
      },
    },
  },
});

export const taskBody = css({
  display: "flex",
  flexDirection: "column",
  gap: "1px",
  minWidth: "0",
});

export const taskTitle = cva({
  base: {
    margin: "0",
    fontSize: "xs",
    fontWeight: "medium",
  },
  variants: {
    completed: {
      true: {
        color: "text.sub",
        textDecoration: "line-through",
      },
      false: {
        color: "text.main",
      },
    },
  },
});

export const taskDue = cva({
  base: {
    margin: "0",
    fontSize: "xs",
  },
  variants: {
    urgent: {
      true: {
        color: "status.warning",
        fontWeight: "semibold",
      },
      false: {
        color: "text.placeholder",
      },
    },
  },
});

export const taskBadge = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    paddingInline: "xs",
    paddingBlock: "1px",
    borderRadius: "full",
    fontSize: "xs",
    fontWeight: "semibold",
    whiteSpace: "nowrap",
    flexShrink: "0",
  },
  variants: {
    tone: {
      done: {
        color: "status.success",
        backgroundColor: { base: "#edf9f1", _dark: "rgba(40, 167, 69, 0.15)" },
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "status.success",
      },
      due: {
        color: "status.warning",
        backgroundColor: "transparent",
      },
    },
  },
});

export const taskLink = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  alignSelf: "center",
  margin: "0",
  marginTop: "2px",
  padding: "0",
  borderWidth: "0",
  backgroundColor: "transparent",
  color: "brand.primary.main",
  fontSize: "xs",
  fontWeight: "semibold",
  cursor: "pointer",
  textDecoration: "none",
  _hover: {
    textDecoration: "underline",
  },
});
