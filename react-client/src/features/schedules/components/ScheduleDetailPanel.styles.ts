import { css, cva } from "@/styled-system/css";

export const card = css({
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

export const header = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "sm",
  flexShrink: "0",
});

export const cardTitle = css({
  margin: "0",
  fontSize: "base",
  fontWeight: "semibold",
  color: "text.main",
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
    borderWidth: "1px",
    borderStyle: "solid",
    whiteSpace: "nowrap",
  },
  variants: {
    tone: {
      open: {
        color: "brand.primary.main",
        borderColor: "brand.primary.main",
        backgroundColor: "background.main",
      },
      overdue: {
        color: "status.error",
        borderColor: "status.error",
        backgroundColor: "background.main",
      },
      done: {
        color: "status.success",
        borderColor: "status.success",
        backgroundColor: "background.main",
      },
    },
  },
});

export const heading = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  minWidth: "0",
  flexShrink: "0",
});

export const chipRow = css({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "xs",
});

export const priorityChip = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    paddingInline: "xs",
    paddingBlock: "1px",
    borderRadius: "full",
    fontSize: "xs",
    fontWeight: "semibold",
    borderWidth: "1px",
    borderStyle: "solid",
    backgroundColor: "background.main",
  },
  variants: {
    priority: {
      high: { color: "brand.accent", borderColor: "brand.accent" },
      normal: { color: "text.sub", borderColor: "border.primary" },
      low: { color: "text.sub", borderColor: "border.primary" },
    },
  },
});

export const titleRow = css({
  display: "flex",
  alignItems: "baseline",
  gap: "sm",
  minWidth: "0",
  flexWrap: "wrap",
});

export const title = css({
  margin: "0",
  fontSize: "lg",
  fontWeight: "bold",
  color: "text.main",
  lineHeight: "tight",
  flexShrink: "0",
});

export const companyBeside = css({
  margin: "0",
  display: "inline-flex",
  alignItems: "center",
  gap: "xs",
  minWidth: "0",
  fontSize: "sm",
  fontWeight: "medium",
  color: "text.sub",
});

export const companyMark = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.25rem",
  height: "1.25rem",
  flexShrink: "0",
  borderRadius: "sm",
  backgroundColor: "background.main",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  color: "brand.primary.main",
  fontSize: "xs",
  fontWeight: "bold",
});

export const companyName = css({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const companyStage = css({
  margin: "0",
  fontSize: "xs",
  color: "text.sub",
});

export const body = css({
  display: "flex",
  flexDirection: "column",
  gap: "sm",
  flexShrink: "0",
  overflow: "hidden",
});

export const metaGrid = css({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "xs",
});

export const metaCard = css({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: "0",
  padding: "xs",
  borderRadius: "lg",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  backgroundColor: "background.main",
});

export const metaLabel = css({
  margin: "0",
  display: "flex",
  alignItems: "center",
  gap: "2px",
  fontSize: "xs",
  color: "text.sub",
});

export const metaIcon = css({
  width: "0.75rem",
  height: "0.75rem",
  color: "brand.primary.main",
  flexShrink: "0",
});

export const metaValue = cva({
  base: {
    margin: "0",
    fontSize: "sm",
    fontWeight: "semibold",
    color: "text.main",
    lineHeight: "tight",
  },
  variants: {
    tone: {
      overdue: { color: "status.error" },
      today: { color: "brand.accent" },
      later: { color: "text.main" },
    },
  },
});

export const metaHint = css({
  margin: "0",
  fontSize: "xs",
  color: "text.sub",
});

export const actions = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  flexShrink: "0",
  marginTop: "auto",
});

export const companyLink = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "xs",
  width: "100%",
  paddingBlock: "xs",
  paddingInline: "sm",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "brand.primary.main",
  borderRadius: "full",
  backgroundColor: "background.sub",
  color: "brand.primary.main",
  fontSize: "sm",
  fontWeight: "semibold",
  cursor: "pointer",
  _hover: {
    backgroundColor: "background.main",
  },
});

export const actionRow = css({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
  gap: "xs",
  width: "100%",
  minWidth: "0",
});

export const actionButton = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "xs",
    width: "100%",
    minWidth: "0",
    boxSizing: "border-box",
    paddingBlock: "xs",
    paddingInline: "sm",
    borderRadius: "full",
    fontSize: "sm",
    fontWeight: "semibold",
    cursor: "pointer",
    whiteSpace: "nowrap",
    _disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
  variants: {
    tone: {
      edit: {
        backgroundColor: "background.sub",
        color: "brand.primary.main",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "brand.primary.main",
        _hover: {
          backgroundColor: "background.main",
        },
      },
      complete: {
        backgroundColor: "brand.primary.main",
        color: "white",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "brand.primary.main",
        _hover: {
          backgroundColor: "brand.primary.dark",
        },
      },
    },
  },
});

export const empty = css({
  margin: "0",
  fontSize: "sm",
  color: "text.sub",
});
