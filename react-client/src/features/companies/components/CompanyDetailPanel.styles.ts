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
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "sm",
  flexShrink: "0",
});

export const headerLead = css({
  display: "flex",
  alignItems: "flex-start",
  gap: "sm",
  minWidth: "0",
  flex: "1",
});

export const companyMark = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2.75rem",
  height: "2.75rem",
  flexShrink: "0",
  borderRadius: "full",
  backgroundColor: "brand.primary.main",
  color: "white",
  fontSize: "sm",
  fontWeight: "bold",
});

export const headerText = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  minWidth: "0",
});

export const nameRow = css({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "xs",
  minWidth: "0",
});

export const cardTitle = css({
  margin: "0",
  fontSize: "lg",
  fontWeight: "bold",
  color: "text.main",
  lineHeight: "tight",
});

export const jobBadge = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  width: "fit-content",
  paddingInline: "xs",
  paddingBlock: "1px",
  borderRadius: "full",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  backgroundColor: "background.main",
  color: "text.sub",
  fontSize: "xs",
  fontWeight: "medium",
});

export const jobIcon = css({
  width: "0.75rem",
  height: "0.75rem",
  color: "brand.primary.main",
  flexShrink: "0",
});

export const closeButton = css({
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

export const body = css({
  display: "flex",
  flexDirection: "column",
  gap: "sm",
  flex: "1",
  minHeight: "0",
  overflowY: "auto",
});

export const section = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  minWidth: "0",
});

export const sectionTitle = css({
  margin: "0",
  display: "inline-flex",
  alignItems: "center",
  gap: "xs",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "text.sub",
});

export const sectionIcon = css({
  width: "0.875rem",
  height: "0.875rem",
  color: "brand.primary.main",
  flexShrink: "0",
});

export const currentStageBar = css({
  margin: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "2px",
  paddingBlock: "xs",
  paddingInline: "sm",
  borderRadius: "full",
  backgroundColor: "background.main",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  fontSize: "xs",
  color: "text.sub",
});

export const currentStageValue = css({
  fontWeight: "semibold",
  color: "brand.primary.main",
});

export const nextActionCard = css({
  display: "flex",
  alignItems: "center",
  gap: "sm",
  padding: "sm",
  borderRadius: "xl",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "brand.primary.main",
  backgroundColor: "background.main",
});

export const nextActionIcon = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2.25rem",
  height: "2.25rem",
  flexShrink: "0",
  borderRadius: "md",
  backgroundColor: "brand.primary.main",
  color: "white",
  fontSize: "sm",
});

export const nextActionBody = css({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: "0",
  flex: "1",
});

export const nextActionLabel = css({
  margin: "0",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "brand.primary.main",
});

export const nextActionTitle = css({
  margin: "0",
  fontSize: "sm",
  fontWeight: "bold",
  color: "text.main",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const nextActionMeta = css({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "xs",
  minWidth: "0",
});

export const nextActionSchedule = css({
  margin: "0",
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  fontSize: "xs",
  color: "text.sub",
});

export const nextActionClock = css({
  width: "0.75rem",
  height: "0.75rem",
  flexShrink: "0",
});

export const remainingBadge = cva({
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
  },
  variants: {
    urgency: {
      today: {
        color: "brand.accent",
        borderColor: "brand.accent",
        backgroundColor: "background.sub",
      },
      soon: {
        color: "status.warning",
        borderColor: "status.warning",
        backgroundColor: "background.sub",
      },
      later: {
        color: "brand.primary.main",
        borderColor: "brand.primary.main",
        backgroundColor: "background.sub",
      },
      none: {
        color: "text.sub",
        borderColor: "border.primary",
        backgroundColor: "background.sub",
      },
    },
  },
});

export const taskLink = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  flexShrink: "0",
  paddingInline: "xs",
  paddingBlock: "1px",
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
});

export const infoPanel = css({
  display: "flex",
  flexDirection: "column",
  borderRadius: "lg",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  backgroundColor: "background.main",
  overflow: "hidden",
});

export const infoRow = css({
  display: "grid",
  gridTemplateColumns: "auto minmax(0, 1fr) auto",
  alignItems: "center",
  gap: "xs",
  paddingInline: "sm",
  paddingBlock: "xs",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "border.primary",
  _last: {
    borderBottomWidth: "0",
  },
});

export const infoIcon = css({
  width: "0.875rem",
  height: "0.875rem",
  color: "brand.primary.main",
  flexShrink: "0",
});

export const infoLabel = css({
  margin: "0",
  fontSize: "xs",
  color: "text.sub",
});

export const infoValue = css({
  margin: "0",
  fontSize: "sm",
  fontWeight: "semibold",
  color: "text.main",
});

export const memoPanel = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  padding: "sm",
  borderRadius: "lg",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  backgroundColor: "background.main",
});

export const memoBody = css({
  margin: "0",
  fontSize: "sm",
  color: "text.main",
  lineHeight: "relaxed",
});

export const actions = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  flexShrink: "0",
  marginTop: "auto",
});

export const linkButtons = css({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
  gap: "xs",
});

export const outlineButtonRow = css({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
  gap: "xs",
});

export const linkButton = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "2px",
  width: "100%",
  minWidth: "0",
  boxSizing: "border-box",
  paddingBlock: "xs",
  paddingInline: "xs",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  borderRadius: "full",
  backgroundColor: "background.main",
  color: "text.sub",
  fontSize: "xs",
  fontWeight: "semibold",
  cursor: "pointer",
  _hover: {
    color: "brand.primary.main",
    borderColor: "brand.primary.main",
  },
  _disabled: {
    opacity: 0.45,
    cursor: "not-allowed",
  },
});

export const primaryButton = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "xs",
  width: "100%",
  paddingBlock: "xs",
  paddingInline: "sm",
  borderWidth: "0",
  borderRadius: "full",
  backgroundColor: "brand.primary.main",
  color: "white",
  fontSize: "sm",
  fontWeight: "semibold",
  cursor: "pointer",
  _hover: {
    backgroundColor: "brand.primary.dark",
  },
});

export const outlineButton = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "xs",
    width: "100%",
    boxSizing: "border-box",
    paddingBlock: "xs",
    paddingInline: "sm",
    borderRadius: "full",
    fontSize: "sm",
    fontWeight: "semibold",
    cursor: "pointer",
    backgroundColor: "background.sub",
    borderWidth: "1px",
    borderStyle: "solid",
  },
  variants: {
    tone: {
      edit: {
        color: "brand.primary.main",
        borderColor: "brand.primary.main",
        _hover: {
          backgroundColor: "background.main",
        },
      },
      danger: {
        color: "status.error",
        borderColor: "status.error",
        _hover: {
          backgroundColor: "background.main",
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

export const emptyNext = css({
  margin: "0",
  padding: "sm",
  borderRadius: "xl",
  borderWidth: "1px",
  borderStyle: "dashed",
  borderColor: "border.primary",
  backgroundColor: "background.main",
  fontSize: "sm",
  color: "text.sub",
  textAlign: "center",
});
