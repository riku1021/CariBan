import { FaSearch } from "react-icons/fa";

import * as styles from "./CompanyToolbar.styles";

type CompanyToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export function CompanyToolbar({ search, onSearchChange }: CompanyToolbarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.searchWrap}>
        <input
          className={styles.search}
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="企業名・職種で検索"
          aria-label="企業を検索"
        />
        <span className={styles.searchIcon} aria-hidden="true">
          <FaSearch className={styles.searchIconGlyph} />
        </span>
      </div>
    </div>
  );
}
