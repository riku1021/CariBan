import { css } from "@/styled-system/css";

export const bar = css({
  display: "flex",
  alignItems: "center",
  gap: "sm",
  minWidth: "0",
});

export const searchWrap = css({
  position: "relative",
  display: "flex",
  alignItems: "center",
  flex: "1",
  minWidth: "0",
});

export const search = css({
  width: "100%",
  minWidth: "0",
  display: "block",
  color: "text.main",
  backgroundColor: "background.sub",
  borderRadius: "full",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  paddingBlock: "xs",
  paddingLeft: "sm",
  paddingRight: "2.5rem",
  fontSize: "sm",
  _focus: {
    outline: "none",
    borderColor: "brand.primary.main",
  },
});

export const searchIcon = css({
  position: "absolute",
  right: "0.35rem",
  top: "50%",
  transform: "translateY(-50%)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.75rem",
  height: "1.75rem",
  borderRadius: "full",
  backgroundColor: "brand.primary.main",
  color: "white",
  flexShrink: "0",
  pointerEvents: "none",
});

export const searchIconGlyph = css({
  width: "0.75rem",
  height: "0.75rem",
});
