import { css } from "@/styled-system/css";

export const container = css({
  padding: "lg",
  maxWidth: "800px",
  marginInline: "auto",
});

export const heading = css({
  color: "text.main",
  fontSize: "2xl",
  fontWeight: "bold",
  margin: "0",
});

export const buttonGroup = css({
  display: "flex",
  gap: "sm",
  marginTop: "lg",
  flexWrap: "wrap",
});

export const result = css({
  marginTop: "lg",
  padding: "sm",
  backgroundColor: "background.sub",
  borderRadius: "0.5rem",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  color: "text.main",
});
