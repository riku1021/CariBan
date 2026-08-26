import { cva } from "@/styled-system/css";

/**
 * ステータスタグの配色方針（ライト / ダーク両対応）
 *
 * 調査根拠:
 * - WCAG 2.2 AA: 通常テキストは前景/背景 4.5:1 以上
 * - #ffc107 などの明るい色を文字色にすると、薄いピル背景ではほぼ読めない
 * - Primer / 設計系の定石: 文字はテーマ追従の本文色、意味色はアクセント（枠・ドット）に置く
 * - brand.primary.light はテーマ非対応のパステル固定なので、ピル背景に使わない
 */
export const eventDot = cva({
  base: {
    display: "inline-block",
    width: "6px",
    height: "6px",
    borderRadius: "full",
    flexShrink: "0",
  },
  variants: {
    kind: {
      esDeadline: { backgroundColor: "brand.accent" },
      interview: { backgroundColor: "brand.primary.main" },
      infoSession: { backgroundColor: "brand.secondary.main" },
      agent: { backgroundColor: "status.success" },
      webTest: { backgroundColor: "status.warning" },
    },
  },
});

const tagBase = {
  display: "inline-flex",
  alignItems: "center",
  flexShrink: "0",
  fontSize: "xs",
  fontWeight: "semibold",
  paddingInline: "xs",
  paddingBlock: "1px",
  borderRadius: "full",
  whiteSpace: "nowrap",
  lineHeight: "tight",
  color: "text.main",
  backgroundColor: "background.sub",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "border.primary",
  borderLeftWidth: "3px",
} as const;

export const eventTag = cva({
  base: tagBase,
  variants: {
    kind: {
      esDeadline: { borderLeftColor: "brand.accent" },
      interview: { borderLeftColor: "brand.primary.main" },
      infoSession: { borderLeftColor: "brand.secondary.main" },
      agent: { borderLeftColor: "status.success" },
      webTest: { borderLeftColor: "status.warning" },
    },
  },
});

export const urgencyTag = cva({
  base: tagBase,
  variants: {
    urgency: {
      tomorrow: { borderLeftColor: "brand.accent" },
      inTwoDays: { borderLeftColor: "status.warning" },
      inThreeDays: { borderLeftColor: "brand.primary.main" },
    },
  },
});
