import { css } from "@/styled-system/css";

export const overlay = css({
  position: "fixed",
  inset: "0",
  backgroundColor: "background.overlay",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "modal",
  opacity: 0,
  padding: "sm",
});

export const fadeIn = css({
  animationName: "fadeInOverlay",
  animationDuration: "0.3s",
  animationTimingFunction: "ease-out",
  animationFillMode: "forwards",
});

export const fadeOut = css({
  animationName: "fadeOutOverlay",
  animationDuration: "0.3s",
  animationTimingFunction: "ease-in",
  animationFillMode: "forwards",
});

export const panel = css({
  backgroundColor: "background.sub",
  padding: "lg",
  borderRadius: "25px",
  boxShadow: "0 4px 6px {colors.shadow.primary}",
  maxWidth: "520px",
  width: "100%",
  maxHeight: "90vh",
  overflowY: "auto",
  position: "relative",
  opacity: 0,
  transform: "scale(0.9)",
  textAlign: "left",
});

export const contentFadeIn = css({
  animationName: "fadeInContent",
  animationDuration: "0.3s",
  animationTimingFunction: "ease-out",
  animationFillMode: "forwards",
});

export const contentFadeOut = css({
  animationName: "fadeOutContent",
  animationDuration: "0.3s",
  animationTimingFunction: "ease-in",
  animationFillMode: "forwards",
});

export const closeIcon = css({
  fontSize: "3rem",
  position: "absolute",
  top: "0.5rem",
  right: "0.5rem",
  cursor: "pointer",
  background: "none",
  borderWidth: "0",
  padding: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "text.sub",
  lineHeight: "1",
  transitionProperty: "color",
  transitionDuration: "150ms",
  transitionTimingFunction: "ease",
  _hover: {
    color: "status.error",
  },
});

export const title = css({
  fontSize: "1.5rem",
  fontWeight: "semibold",
  marginBottom: "md",
  paddingRight: "2.5rem",
  color: "text.main",
});

export const body = css({
  color: "text.main",
});

export const footer = css({
  marginTop: "md",
});
