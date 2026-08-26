import { describe, expect, it } from "vitest";

import { formatEstimatedMinutes, formatRelativeDueLabel } from "./taskDate";
import {
  atDay,
  computeProgress,
  filterTasks,
  getTaskGroupId,
  groupTasks,
  sortTasks,
  summarizeTasks,
} from "./taskQuery";
import type { TaskItem, TaskListQuery } from "./types";

const NOW = new Date(2026, 7, 26, 12, 0, 0);

function task(overrides: Partial<TaskItem> & Pick<TaskItem, "id">): TaskItem {
  return {
    title: "title",
    companyName: "Company",
    completed: false,
    category: "memo",
    dueAt: atDay(NOW, 0, 18, 0),
    plannedTime: "17:00",
    estimatedMinutes: 30,
    typeLabel: "メモ",
    priority: "normal",
    selectionStage: null,
    ...overrides,
  };
}

const defaultQuery: TaskListQuery = {
  search: "",
  tab: "all",
  category: "all",
  companyName: "all",
  sortOrder: "dueSoon",
};

describe("getTaskGroupId", () => {
  it("完了は completed、日付差でグループを分ける", () => {
    expect(getTaskGroupId(task({ id: "1", completed: true }), NOW)).toBe("completed");
    expect(getTaskGroupId(task({ id: "2", dueAt: atDay(NOW, -1, 10, 0) }), NOW)).toBe("overdue");
    expect(getTaskGroupId(task({ id: "3", dueAt: atDay(NOW, 0, 18, 0) }), NOW)).toBe("today");
    expect(getTaskGroupId(task({ id: "4", dueAt: atDay(NOW, 1, 10, 0) }), NOW)).toBe("tomorrow");
    expect(getTaskGroupId(task({ id: "5", dueAt: atDay(NOW, 3, 10, 0) }), NOW)).toBe("thisWeek");
    expect(getTaskGroupId(task({ id: "6", dueAt: atDay(NOW, 8, 10, 0) }), NOW)).toBe("later");
  });
});

describe("filterTasks", () => {
  const tasks = [
    task({ id: "today", title: "ES提出", companyName: "メルカリ", dueAt: atDay(NOW, 0, 15, 0) }),
    task({
      id: "overdue",
      title: "対策",
      companyName: "DeNA",
      category: "webTest",
      dueAt: atDay(NOW, -1, 18, 0),
    }),
    task({ id: "done", title: "メモ整理", completed: true, dueAt: atDay(NOW, 0, 12, 0) }),
  ];

  it("タブと検索語で絞り込む", () => {
    expect(
      filterTasks(tasks, { ...defaultQuery, tab: "today" }, NOW).map((item) => item.id)
    ).toEqual(["today"]);
    expect(
      filterTasks(tasks, { ...defaultQuery, tab: "overdue" }, NOW).map((item) => item.id)
    ).toEqual(["overdue"]);
    expect(
      filterTasks(tasks, { ...defaultQuery, search: "メルカ" }, NOW).map((item) => item.id)
    ).toEqual(["today"]);
  });
});

describe("groupTasks / sortTasks", () => {
  it("空グループを除いて日付順に並べる", () => {
    const tasks = [
      task({ id: "later", dueAt: atDay(NOW, 10, 10, 0) }),
      task({ id: "today-late", dueAt: atDay(NOW, 0, 19, 0) }),
      task({ id: "today-early", dueAt: atDay(NOW, 0, 15, 0) }),
    ];
    const sorted = sortTasks(tasks, "dueSoon");
    const groups = groupTasks(sorted, NOW);

    expect(groups.map((group) => group.id)).toEqual(["today", "later"]);
    expect(groups[0]?.items.map((item) => item.id)).toEqual(["today-early", "today-late"]);
  });
});

describe("summarizeTasks / computeProgress", () => {
  it("今日・期限切れ・完了件数を同一配列から算出する", () => {
    const tasks = [
      task({ id: "1", dueAt: atDay(NOW, 0, 18, 0), estimatedMinutes: 30 }),
      task({ id: "2", dueAt: atDay(NOW, 0, 15, 0), estimatedMinutes: 60 }),
      task({ id: "3", dueAt: atDay(NOW, -1, 18, 0) }),
      task({ id: "4", completed: true, dueAt: atDay(NOW, 0, 12, 0) }),
    ];

    expect(summarizeTasks(tasks, NOW)).toEqual({
      todayCount: 2,
      todayEstimatedMinutes: 90,
      impendingCount: 2,
      overdueCount: 1,
      completedCount: 1,
      completedThisWeekCount: 1,
    });
    expect(computeProgress(tasks, NOW)).toEqual({
      todayTotal: 3,
      todayCompleted: 1,
      remainingCount: 2,
      remainingMinutes: 90,
    });
  });
});

describe("formatRelativeDueLabel / formatEstimatedMinutes", () => {
  it("相対日と目安時間を日本語にする", () => {
    expect(formatRelativeDueLabel(atDay(NOW, 0, 18, 0), NOW)).toBe("今日");
    expect(formatRelativeDueLabel(atDay(NOW, 1, 10, 0), NOW)).toBe("明日");
    expect(formatRelativeDueLabel(atDay(NOW, 3, 10, 0), NOW)).toBe("あと3日");
    expect(formatEstimatedMinutes(30)).toBe("30分");
    expect(formatEstimatedMinutes(60)).toBe("1時間");
    expect(formatEstimatedMinutes(90)).toBe("1時間30分");
  });
});
