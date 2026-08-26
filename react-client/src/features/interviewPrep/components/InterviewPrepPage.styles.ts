import { css } from "@/styled-system/css";

export const page = css({
  display: "grid",
  gridTemplateRows: "auto auto auto auto minmax(0, 1fr)",
  gap: "sm",
  height: "100%",
  minHeight: "0",
  overflow: "hidden",
});

export const header = css({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "sm",
  minWidth: "0",
});

export const headerText = css({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: "0",
});

export const subtitle = css({
  margin: "0",
  fontSize: "sm",
  color: "text.sub",
});

export const addButton = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "xs",
  flexShrink: "0",
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
