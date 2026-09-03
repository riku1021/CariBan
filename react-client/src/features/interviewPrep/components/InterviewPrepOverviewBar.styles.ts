import { css, cva } from "@/styled-system/css";

export const bar = css({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "sm",
  minWidth: "0",
  padding: "sm",
  backgroundColor: "background.sub",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  borderRadius: "2xl",
  boxShadow: "0 2px 8px {colors.shadow.primary}",
  lg: {
    gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr) minmax(12rem, 1fr)",
    alignItems: "center",
  },
});

export const companyBlock = css({
  display: "flex",
  alignItems: "center",
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
});

export const companyName = css({
  margin: "0",
  fontSize: "base",
  fontWeight: "bold",
  color: "text.main",
  lineHeight: "tight",
});

export const titleLine = css({
  display: "flex",
  alignItems: "center",
  gap: "xs",
  flexWrap: "wrap",
  minWidth: "0",
});

export const phaseBadge = css({
  display: "inline-flex",
  alignItems: "center",
  paddingInline: "xs",
  paddingBlock: "1px",
  borderRadius: "full",
  backgroundColor: "brand.primary.light",
  color: "brand.primary.main",
  fontSize: "xs",
  fontWeight: "semibold",
  flexShrink: "0",
});

export const jobLine = css({
  margin: "0",
  fontSize: "sm",
  color: "text.sub",
});

export const scheduleBlock = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  minWidth: "0",
  padding: "xs",
  borderRadius: "xl",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  backgroundColor: "background.main",
  lg: {
    justifySelf: "center",
    width: "100%",
    maxWidth: "16rem",
  },
});

export const scheduleRow = css({
  display: "flex",
  alignItems: "center",
  gap: "xs",
  flexWrap: "wrap",
});

export const scheduleLabel = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  margin: "0",
  fontSize: "sm",
  fontWeight: "bold",
  color: "text.main",
});

export const scheduleIcon = css({
  color: "brand.primary.main",
  flexShrink: "0",
});

export const countdownBadge = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "2px",
    paddingInline: "xs",
    paddingBlock: "1px",
    borderRadius: "full",
    borderWidth: "1px",
    borderStyle: "solid",
    fontSize: "xs",
    fontWeight: "semibold",
    flexShrink: "0",
  },
  variants: {
    tone: {
      remain: {
        borderColor: "status.warning",
        color: "status.warning",
        backgroundColor: "background.sub",
      },
      overdue: {
        borderColor: "status.warning",
        color: "status.warning",
        backgroundColor: "background.sub",
      },
    },
  },
});

export const formatLine = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  margin: "0",
  fontSize: "sm",
  color: "text.sub",
});

export const formatIcon = css({
  color: "text.sub",
  flexShrink: "0",
});

export const interviewersBlock = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
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
  margin: "0",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "text.sub",
});

export const interviewersIcon = css({
  color: "brand.primary.main",
});

export const interviewersList = css({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
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
    fontSize: "sm",
    flexShrink: "0",
  },
  variants: {
    tone: {
      hr: { color: "brand.primary.main" },
      field: { color: "text.sub" },
    },
  },
});

export const interviewerName = css({
  margin: "0",
  fontSize: "sm",
  color: "text.main",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});
