import { FaSearch } from "react-icons/fa";

import * as styles from "./TaskToolbar.styles";

type TaskToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export function TaskToolbar({ search, onSearchChange }: TaskToolbarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.searchWrap}>
        <input
          className={styles.search}
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="タイトル・企業・エージェントで検索"
          aria-label="タスクを検索"
        />
        <span className={styles.searchIcon} aria-hidden="true">
          <FaSearch className={styles.searchIconGlyph} />
        </span>
      </div>
    </div>
  );
}
