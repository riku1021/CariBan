import { css, cva } from "@/styled-system/css";

export const grid = css({
  display: "grid",
  gridTemplateColumns: "1fr",
  gridAutoRows: "minmax(0, 1fr)",
  gap: "sm",
  height: "100%",
  minHeight: "0",
  overflow: "hidden",
  md: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  lg: {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gridTemplateRows: "minmax(0, 1.45fr) minmax(0, 1fr)",
  },
});

export const list = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  margin: "0",
  padding: "0",
  listStyle: "none",
  flex: "1",
  minHeight: "0",
  overflowY: "auto",
});

export const workItem = css({
  display: "flex",
  gap: "sm",
  minWidth: "0",
});

export const thumb = css({
  width: "3rem",
  height: "3rem",
  flexShrink: "0",
  borderRadius: "lg",
  backgroundColor: "background.main",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
});

export const itemBody = css({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: "0",
});

export const itemTitle = css({
  margin: "0",
  fontSize: "sm",
  fontWeight: "semibold",
  color: "text.main",
  minWidth: "0",
});

export const tags = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "2px",
});

export const languageTableWrap = css({
  flex: "1",
  minHeight: "0",
  overflowY: "auto",
  width: "100%",
});

export const languageTable = css({
  width: "100%",
  borderCollapse: "collapse",
  tableLayout: "fixed",
});

export const languageTh = css({
  paddingBlock: "xs",
  paddingInline: "0",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "text.sub",
  textAlign: "left",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "border.primary",
});

export const languageThPeriod = css({
  paddingBlock: "xs",
  paddingInline: "0",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "text.sub",
  textAlign: "right",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "border.primary",
  width: "5.5rem",
});

export const languageTr = css({
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "border.primary",
  _last: {
    borderBottomWidth: "0",
  },
});

export const languageTd = css({
  paddingBlock: "xs",
  paddingInline: "0",
  paddingRight: "sm",
  verticalAlign: "middle",
  minWidth: "0",
});

export const languageTdPeriod = css({
  paddingBlock: "xs",
  paddingInline: "0",
  verticalAlign: "middle",
  fontSize: "sm",
  color: "text.sub",
  textAlign: "right",
  whiteSpace: "nowrap",
  fontVariantNumeric: "tabular-nums",
});

export const languageLead = css({
  display: "flex",
  alignItems: "center",
  gap: "xs",
  minWidth: "0",
});

export const languageBadge = cva({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.75rem",
    height: "1.75rem",
    flexShrink: "0",
    borderRadius: "lg",
    fontSize: "xs",
    fontWeight: "bold",
    letterSpacing: "tight",
  },
  variants: {
    tone: {
      primary: {
        backgroundColor: "brand.primary.light",
        color: "brand.primary.main",
      },
      secondary: {
        backgroundColor: "brand.secondary.light",
        color: "brand.secondary.main",
      },
      accent: {
        backgroundColor: "background.main",
        color: "brand.accent",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "brand.accent",
      },
      warning: {
        backgroundColor: "background.main",
        color: "status.warning",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "status.warning",
      },
    },
  },
  defaultVariants: {
    tone: "primary",
  },
});

export const languageName = css({
  fontSize: "sm",
  fontWeight: "semibold",
  color: "text.main",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const languageTags = css({
  display: "flex",
  flexWrap: "wrap",
  gap: "2px",
  minWidth: "0",
});

export const eduStepper = css({
  position: "relative",
  flex: "1",
  minHeight: "0",
  width: "100%",
  overflow: "hidden",
});

export const eduRail = css({
  position: "absolute",
  top: "6px",
  bottom: "6px",
  left: "5px",
  width: "2px",
  pointerEvents: "none",
});

export const eduRailBase = css({
  position: "absolute",
  inset: "0",
  backgroundColor: "border.primary",
});

export const eduRailFill = css({
  position: "absolute",
  top: "0",
  left: "0",
  right: "0",
  backgroundColor: "brand.primary.main",
});

export const eduSteps = css({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  minHeight: "0",
});

export const eduStep = cva({
  base: {
    display: "flex",
    flexDirection: "row",
    gap: "xs",
    flex: "1",
    minHeight: "0",
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

export const eduDot = cva({
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

export const eduLabel = css({
  display: "flex",
  alignItems: "baseline",
  gap: "sm",
  minWidth: "0",
});

export const eduPeriod = css({
  margin: "0",
  flexShrink: "0",
  fontSize: "xs",
  color: "text.sub",
  whiteSpace: "nowrap",
});

export const eduEvent = css({
  margin: "0",
  flexShrink: "0",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "brand.primary.main",
  whiteSpace: "nowrap",
});

export const recordList = css({
  display: "flex",
  flexDirection: "column",
  margin: "0",
  padding: "0",
  listStyle: "none",
  flex: "1",
  minHeight: "0",
  overflowY: "auto",
});

export const recordRow = css({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr) auto",
  alignItems: "center",
  gap: "sm",
  paddingBlock: "xs",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "border.primary",
  _last: {
    borderBottomWidth: "0",
  },
});

export const recordName = css({
  margin: "0",
  fontSize: "sm",
  fontWeight: "medium",
  color: "text.main",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const recordMeta = css({
  margin: "0",
  fontSize: "sm",
  color: "text.sub",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const recordDate = css({
  margin: "0",
  fontSize: "sm",
  color: "text.sub",
  textAlign: "right",
  whiteSpace: "nowrap",
  fontVariantNumeric: "tabular-nums",
});

export const awardLead = css({
  display: "flex",
  alignItems: "center",
  gap: "xs",
  minWidth: "0",
});

export const awardIcon = css({
  flexShrink: "0",
  color: "brand.primary.main",
  fontSize: "sm",
});
