import { describe, expect, it } from "vitest";

import { mergeDashboardEntries } from "./mergeDashboardEntries";
import type { DashboardData } from "./types";

const baseData: DashboardData = {
  calendar: {
    year: 2025,
    month: 5,
    todayDate: "2025-05-14",
    days: [{ date: "2025-05-15", eventKinds: ["interview"] }],
  },
  todayTasks: [
    {
      id: "task-existing",
      title: "既存",
      companyName: "A",
      completed: false,
      time: null,
    },
  ],
  upcomingDeadlines: [],
  stats: {
    companiesInProcess: { value: 0, change: { value: 0, unit: "社" }, sparkline: [] },
    interviewsThisWeek: { value: 0, change: { value: 0, unit: "件" }, bars: [] },
    unfinishedTasks: { value: 0, change: { value: 0, unit: "件" }, completedRatio: 0 },
    offers: { value: 0, change: { value: 0, unit: "件" } },
  },
  companyProgress: [],
  upcomingSelections: [],
};

describe("mergeDashboardEntries", () => {
  it("追加タスクと予定を先頭にマージし、カレンダーへ kind を載せる", () => {
    const merged = mergeDashboardEntries({
      data: baseData,
      addedTasks: [
        {
          id: "task-new",
          title: "新規タスク",
          companyName: "B",
          completed: false,
          time: "12:00",
        },
      ],
      addedSelections: [
        {
          id: "sel-new",
          dateLabel: "5/16",
          timeRange: "10:00-11:00",
          title: "一次面接",
          companyName: "B",
          kind: "interview",
        },
      ],
      addedCalendarEvents: [{ date: "2025-05-16", kind: "interview" }],
      addedCompanies: [],
    });

    expect(merged.todayTasks[0]?.id).toBe("task-new");
    expect(merged.upcomingSelections[0]?.id).toBe("sel-new");
    expect(merged.calendar.days).toEqual(
      expect.arrayContaining([
        { date: "2025-05-15", eventKinds: ["interview"] },
        { date: "2025-05-16", eventKinds: ["interview"] },
      ])
    );
  });
});
