import { css, cva } from "@/styled-system/css";

export const header = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
  flexShrink: "0",
});

export const headerRow = css({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "sm",
});

export const progressText = css({
  margin: "0",
  fontSize: "xs",
  fontWeight: "medium",
  color: "text.sub",
});

export const progressTrack = css({
  overflow: "hidden",
  width: "100%",
  height: "6px",
  backgroundColor: "background.main",
  borderRadius: "full",
});

export const progressFill = css({
  height: "100%",
  backgroundColor: "brand.primary.main",
  borderRadius: "full",
});

export const listWrap = css({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  flex: "1",
  minHeight: "0",
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

export const moreHint = css({
  position: "absolute",
  insetInline: "0",
  bottom: "0",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  paddingTop: "lg",
  paddingBottom: "xs",
  margin: "0",
  backgroundImage: "linear-gradient(to top, {colors.background.sub} 35%, transparent)",
  pointerEvents: "none",
  fontSize: "xs",
  fontWeight: "semibold",
  color: "text.sub",
  lineHeight: "none",
});

export const item = cva({
  base: {
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr) auto",
    alignItems: "center",
    gap: "sm",
    minWidth: "0",
    flexShrink: "0",
    paddingInline: "sm",
    paddingBlock: "xs",
    borderRadius: "lg",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "border.primary",
    backgroundColor: "background.main",
  },
  variants: {
    completed: {
      true: {
        opacity: 0.72,
      },
    },
  },
});

export const body = css({
  display: "flex",
  flexDirection: "column",
  gap: "1px",
  minWidth: "0",
});

export const company = css({
  margin: "0",
  fontSize: "xs",
  color: "text.sub",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const title = cva({
  base: {
    margin: "0",
    fontSize: "sm",
    fontWeight: "medium",
    color: "text.main",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  variants: {
    completed: {
      true: {
        color: "text.placeholder",
        textDecoration: "line-through",
      },
    },
  },
});

export const time = cva({
  base: {
    flexShrink: "0",
    fontSize: "xs",
    fontWeight: "semibold",
    paddingInline: "xs",
    paddingBlock: "1px",
    borderRadius: "full",
    whiteSpace: "nowrap",
    lineHeight: "tight",
  },
  variants: {
    tone: {
      pending: {
        color: "brand.primary.main",
        backgroundColor: "background.sub",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "border.primary",
      },
      done: {
        color: "status.success",
        backgroundColor: "background.sub",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "border.primary",
      },
    },
  },
});
