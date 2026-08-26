import { css } from "@/styled-system/css";

export const modalOverlay = css({
  position: "fixed",
  inset: "0",
  backgroundColor: "background.overlay",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "modal",
  opacity: 0,
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

export const modalContent = css({
  backgroundColor: "background.sub",
  padding: "lg",
  borderRadius: "25px",
  boxShadow: "0 4px 6px {colors.shadow.primary}",
  maxWidth: "500px",
  width: "90%",
  position: "relative",
  opacity: 0,
  transform: "scale(0.9)",
  textAlign: "center",
  overflow: "hidden",
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

export const animationContainer = css({
  marginInline: "auto",
  marginBottom: "sm",
  display: "flex",
  justifyContent: "center",
  width: "7rem",
  height: "7rem",
});

export const modalTitle = css({
  fontSize: "1.5rem",
  fontWeight: "semibold",
  marginBottom: "xs",
  color: "text.main",
});

export const modalBody = css({
  fontSize: "1rem",
  color: "text.main",
});

export const progressBarContainer = css({
  position: "absolute",
  bottom: "0",
  left: "0",
  right: "0",
  height: "5px",
  overflow: "hidden",
});

export const progressBarStyle = css({
  position: "absolute",
  bottom: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "background.main",
  transformOrigin: "left",
  animationName: "alertProgressBar",
  animationTimingFunction: "linear",
  animationFillMode: "forwards",
});

export const modalFooter = css({
  marginTop: "sm",
});
