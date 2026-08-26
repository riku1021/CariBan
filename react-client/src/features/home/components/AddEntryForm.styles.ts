import { css } from "@/styled-system/css";

export const form = css({
  display: "flex",
  flexDirection: "column",
  gap: "md",
});

export const field = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
});

export const label = css({
  color: "text.main",
  fontSize: "0.875rem",
  fontWeight: "medium",
});

export const hint = css({
  color: "text.sub",
  fontSize: "0.75rem",
  margin: "0",
});

const control = {
  display: "block",
  width: "100%",
  color: "text.main",
  backgroundColor: "background.sub",
  borderRadius: "25px",
  borderWidth: "1.5px",
  borderStyle: "solid",
  borderColor: "brand.primary.main",
  paddingBlock: "0.75rem",
  paddingInline: "1rem",
  fontSize: "1rem",
  lineHeight: "1.5",
  _focus: {
    outline: "none",
    borderWidth: "2px",
    borderColor: "brand.primary.dark",
  },
} as const;

export const input = css(control);

export const select = css({
  ...control,
  appearance: "none",
  backgroundImage:
    "linear-gradient(45deg, transparent 50%, {colors.text.sub} 50%), linear-gradient(135deg, {colors.text.sub} 50%, transparent 50%)",
  backgroundPosition:
    "calc(100% - 1.25rem) calc(50% - 0.2rem), calc(100% - 0.95rem) calc(50% - 0.2rem)",
  backgroundSize: "0.35rem 0.35rem, 0.35rem 0.35rem",
  backgroundRepeat: "no-repeat",
  paddingRight: "2.5rem",
});

export const timeRow = css({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "sm",
});

export const actions = css({
  display: "flex",
  justifyContent: "center",
  gap: "sm",
  marginTop: "xs",
});

export const statusMessage = css({
  color: "status.error",
  fontSize: "0.875rem",
  margin: "0",
});
