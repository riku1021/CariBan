import { describe, expect, it } from "vitest";

import { splitDateLabel, WEEKDAYS } from "./calendarUtils";

describe("calendarUtils", () => {
  it("WEEKDAYS は日曜始まりの7曜日である", () => {
    expect(WEEKDAYS).toEqual(["日", "月", "火", "水", "木", "金", "土"]);
  });

  it("splitDateLabel は月と日を分割する", () => {
    expect(splitDateLabel("5/15")).toEqual({ month: "5", day: "15" });
  });
});
