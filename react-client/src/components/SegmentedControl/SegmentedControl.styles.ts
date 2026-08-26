import { css, cva } from "@/styled-system/css";

export const root = css({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  minWidth: "0",
  padding: "2px",
  borderRadius: "full",
  backgroundColor: "background.sub",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  overflowX: "auto",
});

export const indicator = css({
  position: "absolute",
  top: "4px",
  left: "0",
  height: "calc(100% - 8px)",
  borderRadius: "full",
  backgroundColor: "brand.primary.main",
  pointerEvents: "none",
  zIndex: "0",
  transitionProperty: "transform, width",
  transitionDuration: "200ms",
  transitionTimingFunction: "ease",
});

export const item = cva({
  base: {
    position: "relative",
    zIndex: "1",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2px",
    margin: "0",
    paddingInline: "sm",
    paddingBlock: "xs",
    borderWidth: "0",
    borderRadius: "full",
    backgroundColor: "transparent",
    color: "text.sub",
    fontSize: "xs",
    fontWeight: "semibold",
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: "0",
    transitionProperty: "color",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease",
  },
  variants: {
    active: {
      true: {
        color: "white",
      },
    },
  },
});
