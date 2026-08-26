import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { buildPaginationTokens } from "./buildPaginationTokens";
import * as styles from "./Pagination.styles";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const pageTokens = buildPaginationTokens(page, totalPages);
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <nav className={styles.root} aria-label="ページネーション">
      <button
        type="button"
        className={styles.navButton}
        onClick={() => onPageChange(page - 1)}
        disabled={!canGoPrev}
        aria-label="前のページ"
      >
        <MdChevronLeft className={styles.navIcon} aria-hidden="true" />
      </button>
      {pageTokens.map((token, index) =>
        token === "ellipsis" ? (
          <span
            key={`ellipsis-${String(pageTokens[index - 1])}-${String(pageTokens[index + 1])}`}
            className={styles.ellipsis}
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <button
            key={token}
            type="button"
            className={styles.pageButton({ active: token === page })}
            onClick={() => onPageChange(token)}
            aria-label={`${token}ページ目`}
            aria-current={token === page ? "page" : undefined}
          >
            {token}
          </button>
        )
      )}
      <button
        type="button"
        className={styles.navButton}
        onClick={() => onPageChange(page + 1)}
        disabled={!canGoNext}
        aria-label="次のページ"
      >
        <MdChevronRight className={styles.navIcon} aria-hidden="true" />
      </button>
    </nav>
  );
}
