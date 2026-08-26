/** ISO `YYYY-MM-DD` → 表示用 `M/D` */
export function toDateLabel(isoDate: string): string {
  const parts = isoDate.split("-");
  const month = parts[1];
  const day = parts[2];
  if (!month || !day) {
    return isoDate;
  }
  return `${Number(month)}/${Number(day)}`;
}
