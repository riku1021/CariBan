/**
 * カラーユーティリティ関数
 * @description 色の調整や変換を行う関数群
 */

/**
 * 16進数カラーコードをRGBに変換
 * @param hex - 16進数カラーコード (#ffffff形式)
 * @returns RGB値の配列 [r, g, b]
 */
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}

/**
 * RGBをHSLに変換
 * @param r - 赤 (0-255)
 * @param g - 緑 (0-255)
 * @param b - 青 (0-255)
 * @returns HSL値の配列 [h, s, l]
 */
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

/**
 * HSLをRGBに変換
 * @param h - 色相 (0-360)
 * @param s - 彩度 (0-100)
 * @param l - 明度 (0-100)
 * @returns RGB値の配列 [r, g, b]
 */
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * RGBを16進数カラーコードに変換
 * @param r - 赤 (0-255)
 * @param g - 緑 (0-255)
 * @param b - 青 (0-255)
 * @returns 16進数カラーコード
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number): string => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * 色の明度を調整する
 * @param color - 16進数カラーコード
 * @param amount - 調整量 (-100 ~ 100)
 * @returns 調整後の16進数カラーコード
 */
export function adjustLightness(color: string, amount: number): string {
  const [r, g, b] = hexToRgb(color);
  const [h, s, l] = rgbToHsl(r, g, b);

  // 明度を調整（0-100の範囲に収める）
  const newL = Math.max(0, Math.min(100, l + amount));

  const [newR, newG, newB] = hslToRgb(h, s, newL);
  return rgbToHex(newR, newG, newB);
}

/**
 * 色の彩度を調整する
 * @param color - 16進数カラーコード
 * @param amount - 調整量 (-100 ~ 100)
 * @returns 調整後の16進数カラーコード
 */
export function adjustSaturation(color: string, amount: number): string {
  const [r, g, b] = hexToRgb(color);
  const [h, s, l] = rgbToHsl(r, g, b);

  // 彩度を調整（0-100の範囲に収める）
  const newS = Math.max(0, Math.min(100, s + amount));

  const [newR, newG, newB] = hslToRgb(h, newS, l);
  return rgbToHex(newR, newG, newB);
}

/**
 * 色相を調整する
 * @param color - 16進数カラーコード
 * @param amount - 調整量 (-360 ~ 360)
 * @returns 調整後の16進数カラーコード
 */
export function adjustHue(color: string, amount: number): string {
  const [r, g, b] = hexToRgb(color);
  const [h, s, l] = rgbToHsl(r, g, b);

  // 色相を調整（0-360の範囲で循環）
  let newH = (h + amount) % 360;
  if (newH < 0) newH += 360;

  const [newR, newG, newB] = hslToRgb(newH, s, l);
  return rgbToHex(newR, newG, newB);
}

/**
 * 色のシェード（暗い色）を作成する
 * @param color - 16進数カラーコード
 * @param amount - シェードの強さ (0-100)
 * @returns シェード後の16進数カラーコード
 */
export function createShade(color: string, amount: number): string {
  return adjustLightness(color, -amount);
}

/**
 * 色のティント（明るい色）を作成する
 * @param color - 16進数カラーコード
 * @param amount - ティントの強さ (0-100)
 * @returns ティント後の16進数カラーコード
 */
export function createTint(color: string, amount: number): string {
  return adjustLightness(color, amount);
}
