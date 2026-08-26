export type PaginationToken = number | "ellipsis";

/** ページ番号トークン（先頭・末尾・省略記号付き）を組み立てる */
export function buildPaginationTokens(current: number, total: number): PaginationToken[] {
  if (total <= 1) {
    return [1];
  }
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const nearStart = current <= 4;
  const nearEnd = current >= total - 3;

  if (nearStart) {
    return [1, 2, 3, 4, 5, "ellipsis", total];
  }
  if (nearEnd) {
    return [1, "ellipsis", total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}
