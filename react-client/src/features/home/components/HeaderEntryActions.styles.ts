import { css } from "@/styled-system/css";

/** Header の iconButton と同じ色・高さ・影。ラベル用に幅だけ広げる */
export const iconButton = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "xs",
  height: "10",
  paddingInline: "sm",
  paddingBlock: "0",
  borderRadius: "full",
  backgroundColor: "background.sub",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  boxShadow: "0 2px 8px {colors.shadow.primary}",
  color: "icon.primary",
  fontSize: "sm",
  fontWeight: "medium",
  whiteSpace: "nowrap",
  textDecoration: "none",
  flexShrink: 0,
  cursor: "pointer",
});

export const icon = css({
  width: "5",
  height: "5",
});
