import { css, cva } from "@/styled-system/css";

export const control = css({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.15rem",
  height: "1.15rem",
  flexShrink: "0",
  cursor: "pointer",
});

export const input = css({
  position: "absolute",
  inset: "0",
  zIndex: "1",
  width: "100%",
  height: "100%",
  margin: "0",
  opacity: "0",
  cursor: "pointer",
});

export const face = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "1.15rem",
    height: "1.15rem",
    borderRadius: "full",
    borderWidth: "2px",
    borderStyle: "solid",
    flexShrink: "0",
    fontSize: "xs",
    lineHeight: "none",
    pointerEvents: "none",
  },
  variants: {
    completed: {
      true: {
        borderColor: "brand.primary.main",
        backgroundColor: "brand.primary.main",
        color: "white",
      },
      false: {
        borderColor: "border.primary",
        backgroundColor: "background.sub",
        color: "transparent",
      },
    },
  },
  defaultVariants: {
    completed: false,
  },
});
