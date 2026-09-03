import { Link, useRouterState } from "@tanstack/react-router";
import { FaBell } from "react-icons/fa";
import { MdChevronLeft } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";

import { HeaderEntryActions } from "@/features/home";
import { getNavLinkByPath } from "@/features/navigation";

import * as styles from "./Header.styles";

export function Header() {
  const { title, headerBack, pathname } = useRouterState({
    select: (state) => {
      const matches = [...state.matches].reverse();
      return {
        title: matches.find((item) => item.staticData.title)?.staticData.title ?? "",
        headerBack: matches.find((item) => item.staticData.headerBack)?.staticData.headerBack,
        pathname: state.location.pathname,
      };
    },
  });

  const navLink = getNavLinkByPath(pathname);
  const TitleIcon = navLink?.icon;

  return (
    <header className={styles.header}>
      <div className={styles.titleRow}>
        {headerBack ? (
          <Link to={headerBack.to} className={styles.backButton}>
            <MdChevronLeft className={styles.backButtonIcon} aria-hidden="true" />
            {headerBack.label}
          </Link>
        ) : null}
        <div className={styles.titleMain}>
          {TitleIcon ? (
            <span className={styles.titleIconBox}>
              <TitleIcon className={styles.titleIcon} aria-hidden="true" />
            </span>
          ) : null}
          <p className={styles.title}>{title}</p>
        </div>
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
