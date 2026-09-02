import { css, cva } from "@/styled-system/css";

export const stepper = css({
  position: "relative",
  width: "100%",
});

export const rail = css({
  position: "absolute",
  top: "5px",
  left: "6px",
  right: "6px",
  height: "2px",
  pointerEvents: "none",
});

export const railBase = css({
  position: "absolute",
  inset: "0",
  backgroundColor: "border.primary",
});

export const railFill = css({
  position: "absolute",
  top: "0",
  left: "0",
  bottom: "0",
  backgroundColor: "brand.primary.main",
});

export const steps = css({
  position: "relative",
  display: "flex",
  alignItems: "flex-start",
  width: "100%",
});

export const step = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    minWidth: "0",
    position: "relative",
    zIndex: "default",
  },
  variants: {
    align: {
      start: { alignItems: "flex-start" },
      center: { alignItems: "center" },
      end: { alignItems: "flex-end" },
    },
  },
  defaultVariants: {
    align: "center",
  },
});

export const stepDot = cva({
  base: {
    width: "12px",
    height: "12px",
    borderRadius: "full",
    flexShrink: "0",
    borderWidth: "2px",
    borderStyle: "solid",
    backgroundColor: "background.sub",
  },
  variants: {
    state: {
      done: {
        backgroundColor: "brand.primary.main",
        borderColor: "brand.primary.main",
      },
      current: {
        backgroundColor: "background.sub",
        borderColor: "brand.primary.main",
      },
      todo: {
        backgroundColor: "background.sub",
        borderColor: "border.primary",
      },
    },
  },
});

export const stepLabel = css({
  marginTop: "2px",
  fontSize: "xs",
  color: "text.sub",
  whiteSpace: "nowrap",
});
