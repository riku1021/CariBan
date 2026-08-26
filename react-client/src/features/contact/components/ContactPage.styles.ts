import { css } from "@/styled-system/css";

export const contactContainer = css({
  display: "grid",
  placeItems: "center",
  width: "100%",
  height: "100%",
});

export const contentWrapper = css({
  width: "100%",
  maxWidth: "1000px",
  marginInline: "auto",
  padding: "0.75rem",
  borderRadius: "25px",
});

export const thankYouMessage = css({
  textAlign: "center",
  padding: "3rem",
  backgroundColor: "background.sub",
  borderRadius: "25px",
  marginTop: "lg",
  boxShadow: "0 4px 12px {colors.shadow.primary}",
});

export const thankYouHeading = css({
  color: "brand.secondary.main",
  marginBottom: "sm",
});

export const thankYouBody = css({
  color: "text.main",
  margin: "0",
});

export const contactForm = css({
  padding: "lg",
  backgroundColor: "background.sub",
  borderRadius: "25px",
  boxShadow: "0 4px 12px {colors.shadow.primary}",
});

export const formGroup = css({
  position: "relative",
  marginBottom: "md",
});

export const nameFields = css({
  display: "flex",
  gap: "sm",
  width: "100%",
  mdDown: {
    flexDirection: "column",
  },
});

export const nameField = css({
  position: "relative",
  flex: "1",
});

const floatingControl = {
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
  transitionProperty: "border, background-color",
  transitionDuration: "150ms",
  transitionTimingFunction: "ease",
  _focus: {
    outline: "none",
    borderWidth: "2px",
    borderColor: "brand.primary.dark",
  },
  _placeholder: {
    color: "transparent",
  },
  "&:not(:placeholder-shown)": {
    borderWidth: "2px",
    borderColor: "brand.primary.dark",
  },
  "&:is(:focus, :not(:placeholder-shown)) + label": {
    top: "0",
    fontSize: "0.8rem",
    transform: "translateY(-50%)",
    color: "brand.primary.main",
  },
  "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus": {
    boxShadow: "0 0 0 1000px {colors.background.sub} inset",
    WebkitTextFillColor: "{colors.text.sub}",
  },
};

export const floatingInput = css(floatingControl);

export const floatingTextarea = css({
  ...floatingControl,
  minHeight: "120px",
  resize: "vertical",
});

export const floatingLabel = css({
  color: "text.placeholder",
  position: "absolute",
  left: "20px",
  top: "50%",
  transform: "translateY(-50%)",
  transitionProperty: "top, font-size, transform, color",
  transitionDuration: "150ms",
  transitionTimingFunction: "ease",
  backgroundColor: "background.sub",
  paddingInline: "5px",
  pointerEvents: "none",
  borderRadius: "50px",
});

export const textareaLabel = css({
  top: "1.15rem",
  transform: "none",
});

export const submitButtonWrapper = css({
  textAlign: "center",
});

export const submitButton = css({
  paddingBlock: "0.75rem",
  paddingInline: "3rem",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "xs",
});

export const sendIcon = css({
  fontSize: "1rem",
});
