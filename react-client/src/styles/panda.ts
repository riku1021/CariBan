import { globalCss } from "./bases/global";
import { colorTokens } from "./tokens/color";
import { conditions } from "./tokens/conditions";
import { keyframes } from "./tokens/keyframes";
import { breakpointTokens } from "./tokens/responsive";
import { spacingTokens } from "./tokens/spacing";
import { pandaTypographyTokens } from "./tokens/typography";
import { zIndexTokens } from "./tokens/zindex";

export { conditions, globalCss };

/**
 * `panda.config.ts` の `theme.extend` に渡す値。
 * トークンの定義は各ファイルを単一ソースにする。
 */
export const themeExtend = {
  breakpoints: breakpointTokens,
  keyframes,
  semanticTokens: {
    colors: colorTokens,
  },
  tokens: {
    ...pandaTypographyTokens,
    zIndex: zIndexTokens,
    spacing: spacingTokens,
  },
};
