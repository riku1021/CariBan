/**
 * html / body などの全体スタイル。
 * `css()` は使わない（styled-system は config から生成されるため）。
 */
export const globalCss = {
  html: {
    minHeight: "100%",
    backgroundColor: "background.main",
    color: "text.main",
  },
  body: {
    margin: "0",
    minHeight: "100vh",
    fontFamily: "sans",
    backgroundColor: "background.main",
    color: "text.main",
  },
  "#root": {
    minHeight: "100vh",
  },
  "html.enable-transitions": {
    transitionProperty: "background-color, color, border-color, box-shadow",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease",
  },
  "body.no-scroll": {
    overflow: "hidden",
  },
};
