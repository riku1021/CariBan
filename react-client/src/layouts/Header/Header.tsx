import { Link, useRouterState } from "@tanstack/react-router";
import { FaBell } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";

import * as styles from "./Header.styles";

export function Header() {
  const title = useRouterState({
    select: (state) => {
      const match = [...state.matches].reverse().find((item) => item.staticData.title);
      return match?.staticData.title ?? "";
    },
  });

  return (
    <header className={styles.header}>
      <p className={styles.title}>{title}</p>
      <div className={styles.actions}>
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
