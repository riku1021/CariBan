import {
  FaBuilding as Building,
  FaClipboardList as ClipboardList,
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
    label: "タスク",
    icon: Tasks,
  },
  {
    to: "/profile",
    label: "プロフィール",
    icon: Account,
  },
];
