import { Link } from "@tanstack/react-router";
import type { FC } from "react";
import { IoHome } from "react-icons/io5";
import NotFoundAnimation from "@/animations/NotFoundAnimation";
import { cx } from "@/styled-system/css";
import { button } from "@/styles/objects/button";

import * as styles from "./NotFoundPage.styles";

export const NotFoundPage: FC = () => {
  return (
    <div className={styles.notFoundContainer}>
      <NotFoundAnimation className={styles.animation} />
      <h2 className={styles.heading}>ページが見つかりません</h2>
      <p className={styles.paragraph}>
        お探しのページは存在しないか、URLが間違っている可能性があります。
      </p>
      <Link to="/" className={cx(button({ variant: "secondary" }), styles.homeLink)}>
        <IoHome className={styles.homeIcon} /> Home へ
      </Link>
      <button
        type="button"
        onClick={() => window.history.back()}
        className={cx(button({ variant: "text" }), styles.backButtonExtra)}
      >
        BUCK
      </button>
    </div>
  );
};
