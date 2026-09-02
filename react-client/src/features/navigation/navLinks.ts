import {
  FaBuilding as Building,
  FaCalendarAlt as Calendar,
  FaClipboardList as ClipboardList,
  FaComments as Comments,
  FaTasks as Tasks,
} from "react-icons/fa";
import { IoHome as Home } from "react-icons/io5";
import { VscAccount as Account } from "react-icons/vsc";

import type { NavLink } from "./types";

/**
 * アプリケーション全体で使用するナビゲーションリンクの定義
 */
export const navLinks: NavLink[] = [
  {
    to: "/",
    label: "ホーム",
    icon: Home,
  },
  {
    to: "/companies",
    label: "企業一覧",
    icon: Building,
  },
  {
    to: "/selections",
    label: "選考管理",
    icon: ClipboardList,
  },
  {
    to: "/tasks",
    label: "タスク一覧",
    icon: Tasks,
  },
  {
    to: "/interview-prep",
    label: "面接準備",
    icon: Comments,
  },
  {
    to: "/schedules",
    label: "予定一覧",
    icon: Calendar,
  },
  {
    to: "/profile",
    label: "プロフィール",
    icon: Account,
  },
];

/**
 * パス名から対応するナビゲーションリンクを取得する。
 * 完全一致を優先し、ネストされたルートは最長のプレフィックスでマッチする。
 */
export function getNavLinkByPath(pathname: string): NavLink | undefined {
  const exactMatch = navLinks.find((link) => link.to === pathname);
  if (exactMatch) {
    return exactMatch;
  }

  return navLinks
    .filter((link) => link.to !== "/" && pathname.startsWith(`${link.to}/`))
    .sort((a, b) => b.to.length - a.to.length)[0];
}
