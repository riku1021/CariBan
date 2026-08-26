import { css } from "@/styled-system/css";

export const bar = css({
  display: "flex",
  alignItems: "center",
  gap: "sm",
  minWidth: "0",
  flexWrap: "wrap",
});

export const searchWrap = css({
  position: "relative",
  display: "flex",
  alignItems: "center",
  flex: "1",
  minWidth: "12rem",
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

export const selects = css({
  display: "flex",
  alignItems: "center",
  gap: "xs",
  flexShrink: "0",
});

export const select = css({
  display: "block",
  color: "text.main",
  backgroundColor: "background.sub",
  borderRadius: "full",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  paddingBlock: "xs",
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
