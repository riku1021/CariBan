import { FaSearch } from "react-icons/fa";

import * as styles from "./ScheduleToolbar.styles";

type ScheduleToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export function ScheduleToolbar({ search, onSearchChange }: ScheduleToolbarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.searchWrap}>
        <input
          className={styles.search}
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="タイトル・企業で検索"
          aria-label="予定を検索"
        />
        <span className={styles.searchIcon} aria-hidden="true">
          <FaSearch className={styles.searchIconGlyph} />
        </span>
      </div>
    </div>
  );
}
