import { css } from "@/styled-system/css";

export const bar = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "sm",
  minWidth: "0",
  flexWrap: "wrap",
});

export const count = css({
  fontVariantNumeric: "tabular-nums",
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
