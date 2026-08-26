import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { themeAtom } from "@/atoms/theme";

/**
 * `data-theme` を html 要素へ同期し、Panda CSS の light/dark 条件を有効化する。
 */
export const useThemeManager = () => {
  const theme = useAtomValue(themeAtom);

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (value: "light" | "dark") => {
      root.setAttribute("data-theme", value);
    };

    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      applyTheme(media.matches ? "dark" : "light");

      const onChange = (event: MediaQueryListEvent) => {
        applyTheme(event.matches ? "dark" : "light");
      };
      media.addEventListener("change", onChange);
      const frame = requestAnimationFrame(() => {
        root.classList.add("enable-transitions");
      });
      return () => {
        media.removeEventListener("change", onChange);
        cancelAnimationFrame(frame);
      };
    }

    applyTheme(theme);
    const frame = requestAnimationFrame(() => {
      root.classList.add("enable-transitions");
    });
    return () => cancelAnimationFrame(frame);
  }, [theme]);

  return { theme };
};
