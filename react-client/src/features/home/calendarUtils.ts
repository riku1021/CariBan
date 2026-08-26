export const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"] as const;

export function splitDateLabel(dateLabel: string): { month: string; day: string } {
  const [month = "", day = ""] = dateLabel.split("/");
  return { month, day };
}
