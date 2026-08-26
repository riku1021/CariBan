import { css, cva } from "@/styled-system/css";

export const drawer = css({
  gridArea: "drawer",
  boxSizing: "border-box",
  padding: "sm",
  height: "100%",
  minHeight: "0",
});

export const drawerCard = cva({
  base: {
    boxSizing: "border-box",
    width: "60px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "background.sub",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "border.primary",
    borderRadius: "4xl",
    boxShadow: "0 2px 8px {colors.shadow.primary}",
    overflow: "hidden",
    transitionProperty: "width, border-radius",
    transitionDuration: "normal",
    transitionTimingFunction: "ease",
    _hover: {
      width: "250px",
      borderRadius: "3xl",
    },
    _focusVisibleWithin: {
      width: "250px",
      borderRadius: "3xl",
    },
  },
  variants: {
    hoverLocked: {
      true: {
        width: "60px",
        borderRadius: "4xl",
        _hover: {
          width: "60px",
          borderRadius: "4xl",
        },
        _focusVisibleWithin: {
          width: "60px",
          borderRadius: "4xl",
        },
      },
    },
  },
});

export const logoLink = css({
  display: "flex",
  alignItems: "center",
  height: "60px",
  flexShrink: 0,
  textDecoration: "none",
  color: "text.main",
});

export const logoImageBox = css({
  width: "60px",
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

export const logoImage = css({
  height: "7",
  width: "auto",
});

export const logoText = css({
  display: "flex",
  alignItems: "center",
  whiteSpace: "nowrap",
  fontSize: "2xl",
  fontWeight: "semibold",
  lineHeight: "none",
});

export const logoAccent = css({
  color: "brand.primary.main",
});

export const navLinks = css({
  display: "flex",
  flexDirection: "column",
  flex: "1",
  overflowX: "hidden",
  overflowY: "auto",
});

export const navLink = css({
  color: "text.sub",
  textDecoration: "none",
  fontSize: "xl",
  display: "block",
  position: "relative",
  transitionProperty: "color",
  transitionDuration: "fast",
  transitionTimingFunction: "ease",
  _hover: {
    _before: {
      content: '""',
      position: "absolute",
      inset: "xs",
      borderRadius: "full",
      backgroundColor: "background.hover",
    },
  },
  _currentPage: {
    color: "white",
    _before: {
      content: '""',
      position: "absolute",
      inset: "xs",
      borderRadius: "full",
      backgroundColor: "brand.primary.main",
    },
    _hover: {
      _before: {
        backgroundColor: "brand.primary.main",
      },
    },
  },
});

export const navLinkContent = css({
  display: "flex",
  alignItems: "center",
  position: "relative",
  zIndex: "default",
});

export const navIconBox = css({
  width: "60px",
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  flexShrink: 0,
});

export const navIcon = css({
  fontSize: "2xl",
  width: "6",
  height: "auto",
});

export const navText = css({
  whiteSpace: "nowrap",
});

export const themeToggleContainer = css({
  width: "60px",
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});
