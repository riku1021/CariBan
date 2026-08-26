import { describe, expect, it } from "vitest";

import { sortCompanies, sortDeadlines, sortSelections, sortTodayTasks } from "./sort";
import type { CompanyProgress, TodayTask, UpcomingDeadline, UpcomingSelection } from "./types";

describe("sortTodayTasks", () => {
  it("未完了を完了より前に並べ、未完了内は時刻昇順にする", () => {
    const tasks: TodayTask[] = [
      { id: "1", title: "a", companyName: "A", completed: true, time: null },
      { id: "2", title: "b", companyName: "B", completed: false, time: "21:00" },
      { id: "3", title: "c", companyName: "C", completed: false, time: "18:00" },
      { id: "4", title: "d", companyName: "D", completed: false, time: null },
    ];

    expect(sortTodayTasks(tasks).map((task) => task.id)).toEqual(["3", "2", "4", "1"]);
  });

  it("元配列を変更しない", () => {
    const tasks: TodayTask[] = [
      { id: "1", title: "a", companyName: "A", completed: true, time: null },
      { id: "2", title: "b", companyName: "B", completed: false, time: "10:00" },
    ];
    const original = [...tasks];

    sortTodayTasks(tasks);

    expect(tasks).toEqual(original);
  });
});

describe("sortDeadlines", () => {
  it("緊急度順、同緊急度なら日付昇順にする", () => {
    const deadlines: UpcomingDeadline[] = [
      {
        id: "1",
        dateLabel: "5/17",
        title: "a",
        companyName: "A",
        urgency: "inThreeDays",
      },
      {
        id: "2",
        dateLabel: "5/16",
        title: "b",
        companyName: "B",
        urgency: "inTwoDays",
      },
      {
        id: "3",
        dateLabel: "5/16",
        title: "c",
        companyName: "C",
        urgency: "tomorrow",
      },
      {
        id: "4",
        dateLabel: "5/15",
        title: "d",
        companyName: "D",
        urgency: "tomorrow",
      },
    ];

    expect(sortDeadlines(deadlines).map((item) => item.id)).toEqual(["4", "3", "2", "1"]);
  });
});

describe("sortCompanies", () => {
  it("ステージが進んでいる順、同ステージなら最終更新が新しい順にする", () => {
    const companies: CompanyProgress[] = [
      { id: "1", name: "A", initials: "A", currentStageIndex: 1, lastUpdated: "5/10" },
      { id: "2", name: "B", initials: "B", currentStageIndex: 3, lastUpdated: "5/01" },
      { id: "3", name: "C", initials: "C", currentStageIndex: 3, lastUpdated: "5/12" },
    ];

    expect(sortCompanies(companies).map((item) => item.id)).toEqual(["3", "2", "1"]);
  });
});

describe("sortSelections", () => {
  it("日付昇順、同日なら時刻昇順にする", () => {
    const selections: UpcomingSelection[] = [
      {
        id: "1",
        dateLabel: "5/16",
        timeRange: "13:00-14:00",
        title: "a",
        companyName: "A",
        kind: "webTest",
      },
      {
        id: "2",
        dateLabel: "5/15",
        timeRange: "16:00-17:00",
        title: "b",
        companyName: "B",
        kind: "interview",
      },
      {
        id: "3",
        dateLabel: "5/16",
        timeRange: "09:00-10:00",
        title: "c",
        companyName: "C",
        kind: "webTest",
      },
    ];

    expect(sortSelections(selections).map((item) => item.id)).toEqual(["2", "3", "1"]);
  });
});
