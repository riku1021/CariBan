import { adjustLightness } from "../utils/color-utils";

/**
 * 色のトークン定義
 * @description PandaCSSのトークンシステムを使用したカラー定義
 */

// 基本カラー値の定義
const baseColors = {
  brand: {
    primary: "#ff6800",
    // primary: "#007bff",
    secondary: "#04ddb3",
    accent: "#f8313e",
  },
  status: {
    success: "#28a745",
    warning: "#ffc107",
    error: "#dc3545",
  },
  neutral: {
    white: "#ffffff",
    black: "#000000",
  },
} as const;

/**
 * PandaCSSのカラートークン定義
 * @description semantic.colorsに定義するカラートークン
 */
export const colorTokens = {
  // ブランドカラー
  brand: {
    primary: {
      main: { value: baseColors.brand.primary },
      dark: { value: adjustLightness(baseColors.brand.primary, -5) },
      light: { value: adjustLightness(baseColors.brand.primary, 48.5) },
    },
    secondary: {
      main: { value: baseColors.brand.secondary },
      dark: { value: adjustLightness(baseColors.brand.secondary, -5) },
      light: { value: adjustLightness(baseColors.brand.secondary, 48.5) },
    },
    accent: { value: baseColors.brand.accent },
  },

  // 状態カラー
  status: {
    success: { value: baseColors.status.success },
    warning: { value: baseColors.status.warning },
    error: { value: baseColors.status.error },
  },

  // 基本カラー
  white: { value: baseColors.neutral.white },
  black: { value: baseColors.neutral.black },

  // テキストカラー（セマンティックトークン）
  text: {
    main: {
      value: {
        base: "#444444",
        _dark: "#e0e0e0",
      },
    },
    sub: {
      value: {
        base: "#666666",
        _dark: "#e5e5e5",
      },
    },
    placeholder: {
      value: {
        base: "#a9a9a9",
        _dark: "#999999",
      },
    },
    disabled: {
      value: {
        base: "#333333",
        _dark: "#666666",
      },
    },
  },

  // 背景カラー（セマンティックトークン）
  background: {
    main: {
      value: {
        base: "#EAEAEA",
        _dark: "#222222",
      },
    },
    sub: {
      value: {
        base: baseColors.neutral.white,
        _dark: "#282828",
      },
    },
    hover: {
      value: {
        base: "rgba(0, 0, 0, 0.05)",
        _dark: "rgba(255, 255, 255, 0.1)",
      },
    },
    overlay: {
      value: {
        base: "rgba(0, 0, 0, 0.5)",
        _dark: "rgba(0, 0, 0, 0.7)",
      },
    },
  },

  // ボーダーカラー（セマンティックトークン）
  border: {
    primary: {
      value: {
        base: "#eeeeee",
        _dark: "#333333",
      },
    },
    secondary: {
      value: {
        base: "#f0f0f0",
        _dark: "#2a2a2a",
      },
    },
    focus: {
      value: baseColors.brand.primary,
    },
  },

  // シャドウカラー（セマンティックトークン）
  shadow: {
    primary: {
      value: {
        base: "rgba(0, 0, 0, 0.1)",
        _dark: "rgba(0, 0, 0, 0.3)",
      },
    },
    secondary: {
      value: {
        base: "rgba(0, 0, 0, 0.05)",
        _dark: "rgba(0, 0, 0, 0.2)",
      },
    },
  },

  // アイコンカラー（セマンティックトークン）
  icon: {
    primary: {
      value: {
        base: "#444444",
        _dark: "#f5f5f5",
      },
    },
    secondary: {
      value: {
        base: "#666666",
        _dark: "#e0e0e0",
      },
    },
    disabled: {
      value: {
        base: "#999999",
        _dark: "#666666",
      },
    },
  },
} as const;

// 型定義
export type ColorTokens = typeof colorTokens;
