import { css, cva } from "@/styled-system/css";

export const panel = css({
  display: "flex",
  flexDirection: "column",
  gap: "0",
  minWidth: "0",
  minHeight: "0",
  flex: "1",
  height: "100%",
  overflow: "hidden",
  padding: "0",
  backgroundColor: "background.sub",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  borderRadius: "2xl",
  boxShadow: "0 2px 8px {colors.shadow.primary}",
});

export const tableWrap = css({
  flex: "1",
  minHeight: "0",
  overflow: "auto",
  width: "100%",
});

export const table = css({
  width: "100%",
  borderCollapse: "collapse",
  tableLayout: "fixed",
});

export const th = css({
  paddingBlock: "sm",
  paddingInline: "xs",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "text.sub",
  textAlign: "left",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "border.primary",
  whiteSpace: "nowrap",
});

export const thCompany = css({
  paddingBlock: "sm",
  paddingInline: "xs",
  paddingInlineStart: "sm",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "text.sub",
  textAlign: "left",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "border.primary",
  whiteSpace: "nowrap",
  width: "32%",
});

export const thStatus = css({
  paddingBlock: "sm",
  paddingInline: "xs",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "text.sub",
  textAlign: "left",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "border.primary",
  whiteSpace: "nowrap",
  width: "6.5rem",
});

export const thJob = css({
  paddingBlock: "sm",
  paddingInline: "xs",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "text.sub",
  textAlign: "left",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "border.primary",
  whiteSpace: "nowrap",
  width: "7rem",
});

export const thLinks = css({
  paddingBlock: "sm",
  paddingInline: "xs",
  paddingInlineEnd: "sm",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "text.sub",
  textAlign: "right",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "border.primary",
  whiteSpace: "nowrap",
  width: "6.5rem",
});

export const row = css({
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: "border.primary",
  cursor: "pointer",
});

export const td = cva({
  base: {
    paddingBlock: "sm",
    paddingInline: "xs",
    verticalAlign: "middle",
    minWidth: "0",
    backgroundColor: "transparent",
  },
  variants: {
    selected: {
      true: {
        backgroundColor: "background.hover",
      },
    },
  },
});

export const tdCompany = cva({
  base: {
    paddingBlock: "sm",
    paddingInline: "xs",
    paddingInlineStart: "sm",
    verticalAlign: "middle",
    minWidth: "0",
    backgroundColor: "transparent",
    borderLeftWidth: "3px",
    borderLeftStyle: "solid",
    borderLeftColor: "transparent",
  },
  variants: {
    selected: {
      true: {
        backgroundColor: "background.hover",
        borderLeftColor: "brand.primary.main",
      },
    },
  },
});

export const tdLinks = cva({
  base: {
    paddingBlock: "sm",
    paddingInline: "xs",
    paddingInlineEnd: "sm",
    verticalAlign: "middle",
    textAlign: "right",
    backgroundColor: "transparent",
  },
  variants: {
    selected: {
      true: {
        backgroundColor: "background.hover",
      },
    },
  },
});

export const info = css({
  display: "flex",
  alignItems: "center",
  gap: "xs",
  minWidth: "0",
});

export const companyMark = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.75rem",
  height: "1.75rem",
  flexShrink: "0",
  borderRadius: "md",
  backgroundColor: "background.main",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  color: "brand.primary.main",
  fontSize: "xs",
  fontWeight: "bold",
});

export const shortName = css({
  margin: "0",
  fontSize: "sm",
  fontWeight: "semibold",
  color: "text.main",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  minWidth: "0",
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
    backgroundColor: "background.main",
  },
  variants: {
    status: {
      inProcess: {
        color: "brand.primary.main",
        borderColor: "brand.primary.main",
      },
      recruiting: {
        color: "calendar.saturday",
        borderColor: "calendar.saturday",
      },
      offer: {
        color: "status.success",
        borderColor: "status.success",
      },
      closed: {
        color: "text.sub",
        borderColor: "border.primary",
      },
    },
  },
});

export const jobBadge = css({
  display: "inline-flex",
  alignItems: "center",
  paddingInline: "xs",
  paddingBlock: "1px",
  borderRadius: "full",
  fontSize: "xs",
  fontWeight: "medium",
  color: "text.sub",
  backgroundColor: "background.main",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  whiteSpace: "nowrap",
});

export const actionCell = css({
  display: "flex",
  flexDirection: "column",
  gap: "1px",
  minWidth: "0",
});

export const actionTitle = css({
  margin: "0",
  fontSize: "sm",
  fontWeight: "medium",
  color: "text.main",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const actionDue = cva({
  base: {
    margin: "0",
    fontSize: "xs",
    fontWeight: "semibold",
    whiteSpace: "nowrap",
  },
  variants: {
    urgency: {
      today: { color: "status.error" },
      soon: { color: "status.warning" },
      later: { color: "text.sub" },
      none: { color: "text.sub" },
    },
  },
});

export const actionEmpty = css({
  margin: "0",
  fontSize: "xs",
  color: "text.sub",
});

export const linkRow = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "2px",
});

export const iconButton = css({
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
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
});

export const empty = css({
  margin: "0",
  padding: "sm",
  fontSize: "sm",
  color: "text.sub",
});

export const pagination = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "sm",
  flexWrap: "wrap",
  paddingInline: "sm",
  paddingBlock: "xs",
  borderTopWidth: "1px",
  borderTopStyle: "solid",
  borderTopColor: "border.primary",
  flexShrink: "0",
});

export const paginationMeta = css({
  margin: "0",
  fontSize: "xs",
  color: "text.sub",
  fontVariantNumeric: "tabular-nums",
});

export const pageSizeSelect = css({
  display: "block",
  color: "text.main",
  backgroundColor: "background.sub",
  borderRadius: "full",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  paddingBlock: "1px",
  paddingInline: "sm",
  fontSize: "xs",
  fontWeight: "medium",
  appearance: "none",
  backgroundImage:
    "linear-gradient(45deg, transparent 50%, {colors.text.sub} 50%), linear-gradient(135deg, {colors.text.sub} 50%, transparent 50%)",
  backgroundPosition:
    "calc(100% - 0.7rem) calc(50% - 0.15rem), calc(100% - 0.45rem) calc(50% - 0.15rem)",
  backgroundSize: "0.3rem 0.3rem, 0.3rem 0.3rem",
  backgroundRepeat: "no-repeat",
  paddingRight: "1.5rem",
  cursor: "pointer",
});
