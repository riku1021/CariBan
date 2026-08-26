import { css } from "@/styled-system/css";

/** Header の iconButton と同一見た目を維持 */
export const iconButton = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "10",
  height: "10",
  borderRadius: "full",
  backgroundColor: "background.sub",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  boxShadow: "0 2px 8px {colors.shadow.primary}",
  color: "icon.primary",
  textDecoration: "none",
  flexShrink: 0,
  cursor: "pointer",
  padding: "0",
});

export const icon = css({
  width: "5",
  height: "5",
});
