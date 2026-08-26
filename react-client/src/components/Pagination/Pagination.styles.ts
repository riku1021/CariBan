import { css, cva } from "@/styled-system/css";

export const root = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "xs",
});

export const navButton = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "1.75rem",
  height: "1.75rem",
  padding: "0",
  borderWidth: "0",
  borderRadius: "full",
  backgroundColor: "transparent",
  color: "text.main",
  cursor: "pointer",
  flexShrink: "0",
  _disabled: {
    color: "text.placeholder",
    cursor: "not-allowed",
  },
  _hover: {
    backgroundColor: "background.main",
    _disabled: {
      backgroundColor: "transparent",
    },
  },
});

export const navIcon = css({
  width: "1.25rem",
  height: "1.25rem",
});

export const ellipsis = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "1.75rem",
  height: "1.75rem",
  color: "text.sub",
  fontSize: "sm",
  fontWeight: "medium",
  userSelect: "none",
});

export const pageButton = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "1.75rem",
    height: "1.75rem",
    paddingInline: "xs",
    borderWidth: "0",
    borderRadius: "full",
    backgroundColor: "transparent",
    color: "text.main",
    fontSize: "sm",
    fontWeight: "medium",
    cursor: "pointer",
    fontVariantNumeric: "tabular-nums",
    _hover: {
      backgroundColor: "background.main",
    },
  },
  variants: {
    active: {
      true: {
        color: "white",
        backgroundColor: "brand.primary.main",
        fontWeight: "semibold",
        _hover: {
          backgroundColor: "brand.primary.main",
        },
      },
    },
  },
});
