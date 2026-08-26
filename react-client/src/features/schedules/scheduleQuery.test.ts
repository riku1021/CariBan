import { describe, expect, it } from "vitest";

import { formatDurationMinutes, formatRelativeDayLabel } from "./scheduleDate";
import {
  atDay,
  computeProgress,
  filterSchedules,
  getScheduleGroupId,
  groupSchedules,
  sortSchedules,
  summarizeSchedules,
} from "./scheduleQuery";
import type { ScheduleItem, ScheduleListQuery } from "./types";

const NOW = new Date(2026, 7, 26, 12, 0, 0);

function schedule(overrides: Partial<ScheduleItem> & Pick<ScheduleItem, "id">): ScheduleItem {
  return {
    title: "title",
    companyName: "Company",
    completed: false,
    kind: "interview",
    startsAt: atDay(NOW, 0, 14, 0),
    endsAt: atDay(NOW, 0, 15, 0),
    location: "オンライン",
    selectionStage: null,
    ...overrides,
  };
}

const defaultQuery: ScheduleListQuery = {
  search: "",
  tab: "all",
  kind: "all",
  companyName: "all",
  sortOrder: "startSoon",
};

describe("getScheduleGroupId", () => {
  it("完了は completed、日付差でグループを分ける", () => {
    expect(getScheduleGroupId(schedule({ id: "1", completed: true }), NOW)).toBe("completed");
    expect(getScheduleGroupId(schedule({ id: "2", startsAt: atDay(NOW, -1, 10, 0) }), NOW)).toBe(
      "overdue"
    );
    expect(getScheduleGroupId(schedule({ id: "3", startsAt: atDay(NOW, 0, 18, 0) }), NOW)).toBe(
      "today"
    );
    expect(getScheduleGroupId(schedule({ id: "4", startsAt: atDay(NOW, 1, 10, 0) }), NOW)).toBe(
      "tomorrow"
    );
    expect(getScheduleGroupId(schedule({ id: "5", startsAt: atDay(NOW, 3, 10, 0) }), NOW)).toBe(
      "thisWeek"
    );
    expect(getScheduleGroupId(schedule({ id: "6", startsAt: atDay(NOW, 8, 10, 0) }), NOW)).toBe(
      "later"
    );
  });
});

describe("filterSchedules", () => {
  const schedules = [
    schedule({
      id: "today",
      title: "一次面接",
      companyName: "メルカリ",
      startsAt: atDay(NOW, 0, 15, 0),
    }),
    schedule({
      id: "overdue",
      title: "説明会",
      companyName: "DeNA",
      kind: "infoSession",
      startsAt: atDay(NOW, -1, 18, 0),
    }),
    schedule({ id: "done", title: "Webテスト", completed: true, startsAt: atDay(NOW, 0, 9, 0) }),
  ];

  it("タブと検索語で絞り込む", () => {
    expect(
      filterSchedules(schedules, { ...defaultQuery, tab: "today" }, NOW).map((item) => item.id)
    ).toEqual(["today"]);
    expect(
      filterSchedules(schedules, { ...defaultQuery, tab: "overdue" }, NOW).map((item) => item.id)
    ).toEqual(["overdue"]);
    expect(
      filterSchedules(schedules, { ...defaultQuery, search: "メルカ" }, NOW).map((item) => item.id)
    ).toEqual(["today"]);
  });
});

describe("groupSchedules / sortSchedules", () => {
  it("空グループを除いて開始順に並べる", () => {
    const schedules = [
      schedule({ id: "later", startsAt: atDay(NOW, 8, 10, 0), endsAt: atDay(NOW, 8, 11, 0) }),
      schedule({ id: "today", startsAt: atDay(NOW, 0, 16, 0), endsAt: atDay(NOW, 0, 17, 0) }),
      schedule({ id: "overdue", startsAt: atDay(NOW, -1, 10, 0), endsAt: atDay(NOW, -1, 11, 0) }),
    ];
    expect(groupSchedules(schedules, NOW).map((group) => group.id)).toEqual([
      "overdue",
      "today",
      "later",
    ]);
    expect(sortSchedules(schedules, "startSoon").map((item) => item.id)).toEqual([
      "overdue",
      "today",
      "later",
    ]);
  });
});

describe("summarizeSchedules / computeProgress", () => {
  it("今日・期限切れ・完了の件数を集計する", () => {
    const schedules = [
      schedule({ id: "1", startsAt: atDay(NOW, 0, 14, 0), endsAt: atDay(NOW, 0, 15, 0) }),
      schedule({ id: "2", startsAt: atDay(NOW, -1, 10, 0), endsAt: atDay(NOW, -1, 11, 0) }),
      schedule({
        id: "3",
        completed: true,
        startsAt: atDay(NOW, 0, 9, 0),
        endsAt: atDay(NOW, 0, 10, 0),
      }),
    ];
    const summary = summarizeSchedules(schedules, NOW);
    expect(summary.todayCount).toBe(1);
    expect(summary.overdueCount).toBe(1);
    expect(summary.completedCount).toBe(1);
    expect(computeProgress(schedules, NOW).remainingCount).toBe(1);
  });
});

describe("format helpers", () => {
  it("相対日と所要時間を整形する", () => {
    expect(formatRelativeDayLabel(atDay(NOW, 0, 10, 0), NOW)).toBe("今日");
    expect(formatDurationMinutes(90)).toBe("1時間30分");
  });
});
