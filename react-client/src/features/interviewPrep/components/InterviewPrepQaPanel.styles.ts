import { css, cva } from "@/styled-system/css";

export const panel = css({
  display: "flex",
  flexDirection: "column",
  minWidth: "0",
  minHeight: "0",
  height: "100%",
  overflow: "hidden",
  backgroundColor: "background.sub",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  borderRadius: "2xl",
  boxShadow: "0 2px 8px {colors.shadow.primary}",
});

export const workspace = cva({
  base: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "minmax(12rem, 0.45fr) minmax(0, 1fr)",
    minHeight: "0",
    flex: "1",
    overflow: "hidden",
    lg: {
      gridTemplateColumns: "minmax(14rem, 18rem) minmax(0, 1fr)",
      gridTemplateRows: "1fr",
    },
  },
  variants: {
    memo: {
      true: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr",
      },
      false: {},
    },
  },
});

export const listPane = css({
  minWidth: "0",
  minHeight: "0",
  height: "100%",
  overflow: "hidden",
});

export const detailPane = css({
  minWidth: "0",
  minHeight: "0",
  height: "100%",
  overflow: "hidden",
  borderTopWidth: "1px",
  borderTopStyle: "solid",
  borderTopColor: "border.primary",
  lg: {
    borderTopWidth: "0",
  },
});
