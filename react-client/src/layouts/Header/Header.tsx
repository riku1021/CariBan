import { Link, useRouterState } from "@tanstack/react-router";
import { FaBell } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";

import { HeaderEntryActions } from "@/features/home";
import { getNavLinkByPath } from "@/features/navigation";

import * as styles from "./Header.styles";

export function Header() {
  const { title, pathname } = useRouterState({
    select: (state) => ({
      title:
        [...state.matches].reverse().find((item) => item.staticData.title)?.staticData.title ?? "",
      pathname: state.location.pathname,
    }),
  });

  const navLink = getNavLinkByPath(pathname);
  const TitleIcon = navLink?.icon;

  return (
    <header className={styles.header}>
      <div className={styles.titleRow}>
        {TitleIcon ? (
          <span className={styles.titleIconBox}>
            <TitleIcon className={styles.titleIcon} aria-hidden="true" />
          </span>
        ) : null}
        <p className={styles.title}>{title}</p>
      </div>
      <div className={styles.actions}>
        <HeaderEntryActions />
        <Link to="/alert" className={styles.iconButton} aria-label="通知">
          <FaBell className={styles.icon} />
        </Link>
        <Link to="/user" className={styles.iconButton} aria-label="アカウント">
          <VscAccount className={styles.icon} />
        </Link>
      </div>
    </header>
  );
}
