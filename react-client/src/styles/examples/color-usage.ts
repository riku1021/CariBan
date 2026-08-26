import { css } from "@/styled-system/css";
import { token } from "@/styled-system/tokens";
/**
 * カラートークンの使用例
 * @description PandaCSSで実装したカラートークンの使用方法を示すサンプル
 */

// CSS関数を使用したスタイル定義例
export const exampleStyles = {
  // ブランドカラーの使用例
  primaryButton: css({
    backgroundColor: token("colors.brand.primary.main"),
    color: "white",
    border: "2px solid",
    borderColor: token("colors.brand.primary.dark"),
    "&:hover": {
      backgroundColor: token("colors.brand.primary.dark"),
    },
  }),

  secondaryButton: css({
    backgroundColor: token("colors.brand.secondary.main"),
    color: "white",
    "&:hover": {
      backgroundColor: token("colors.brand.secondary.dark"),
    },
  }),

  // テーマ対応カラーの使用例
  card: css({
    backgroundColor: token("colors.background.sub"),
    color: "text.main",
    border: "1px solid",
    borderColor: "border.primary",
    boxShadow: "0 2px 4px",
    boxShadowColor: "shadow.primary",
    "&:hover": {
      backgroundColor: token("colors.background.hover"),
    },
  }),

  // 状態カラーの使用例
  successMessage: css({
    backgroundColor: token("colors.status.success"),
    color: "white",
    padding: "1rem",
    borderRadius: "0.5rem",
  }),

  errorMessage: css({
    backgroundColor: token("colors.status.error"),
    color: "white",
    padding: "1rem",
    borderRadius: "0.5rem",
  }),

  // アイコンスタイル例
  icon: css({
    color: token("colors.icon.primary"),
    "&:disabled": {
      color: token("colors.icon.disabled"),
    },
  }),

  // テキストスタイル例
  heading: css({
    color: token("colors.text.main"),
    fontSize: "2xl",
    fontWeight: "bold",
  }),

  subtext: css({
    color: token("colors.text.sub"),
    fontSize: "sm",
  }),

  placeholder: css({
    color: token("colors.text.placeholder"),
    fontStyle: "italic",
  }),
};

// token関数を使用した値の取得例
export const colorValues = {
  // ブランドカラーの値を取得
  primaryColor: "colors.brand.primary.main",
  primaryLight: "colors.brand.primary.light",
  primaryDark: "colors.brand.primary.dark",

  // 状態カラーの値を取得
  successColor: "colors.status.success",
  warningColor: "colors.status.warning",
  errorColor: "colors.status.error",

  // テーマ対応カラーの値を取得
  textMain: "colors.text.main",
  backgroundMain: "colors.background.main",
  borderPrimary: "colors.border.primary",
};

// 動的スタイル生成の例
export const createButtonStyle = (variant: "primary" | "secondary" | "accent") => {
  const variantColors = {
    primary: {
      bg: token("colors.brand.primary.main"),
      hover: token("colors.brand.primary.dark"),
    },
    secondary: {
      bg: token("colors.brand.secondary.main"),
      hover: token("colors.brand.secondary.dark"),
    },
    accent: {
      bg: token("colors.brand.accent"),
      hover: token("colors.brand.accent"), // accentは単色なのでそのまま使用
    },
  };

  return css({
    backgroundColor: variantColors[variant].bg,
    color: "white",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: variantColors[variant].hover,
      transform: "translateY(-1px)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
    "&:disabled": {
      backgroundColor: token("colors.text.disabled"),
      cursor: "not-allowed",
      transform: "none",
    },
  });
};

// テーマ切り替えに対応したスタイル例
export const themeAwareStyles = {
  container: css({
    backgroundColor: token("colors.background.main"),
    color: "text.main",
    minHeight: "100vh",
    transition: "background-color 0.3s ease, color 0.3s ease",
  }),

  sidebar: css({
    backgroundColor: token("colors.background.sub"),
    borderRight: "1px solid",
    borderColor: "border.primary",
    padding: "1rem",
  }),

  overlay: css({
    backgroundColor: token("colors.background.overlay"),
    position: "fixed",
    inset: 0,
    zIndex: 50,
  }),
};
