import {
  FaBell as Bell,
  FaEnvelope as Envelope,
  FaExclamationTriangle as ExclamationTriangle,
} from "react-icons/fa";
import { IoHome as Home } from "react-icons/io5";
import { MdAdminPanelSettings as AdminSettings } from "react-icons/md";
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
    to: "/user",
    label: "ユーザー",
    icon: Account,
  },
  {
    to: "/admin",
    label: "管理者",
    icon: AdminSettings,
  },
  {
    to: "/contact",
    label: "お問い合わせ",
    icon: Envelope,
  },
  {
    to: "/alert",
    label: "アラート",
    icon: Bell,
  },
  {
    to: "/404",
    label: "404",
    icon: ExclamationTriangle,
  },
];
