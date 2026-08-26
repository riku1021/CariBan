import { describe, expect, it } from "vitest";

import {
  filterInterviewPreps,
  summarizeInterviewPreps,
  summarizeTabCounts,
} from "./interviewPrepQuery";
import { interviewPrepsMock } from "./mocks/interviewPrepsMock";

describe("interviewPrepQuery", () => {
  const now = new Date();

  it("summarizes today / tomorrow / within7 / insufficient", () => {
    const summary = summarizeInterviewPreps(interviewPrepsMock, now);
    expect(summary.todayCount).toBe(2);
    expect(summary.tomorrowCount).toBe(1);
    expect(summary.within7Count).toBe(5);
    expect(summary.insufficientCount).toBe(3);
  });

  it("counts tabs", () => {
    const counts = summarizeTabCounts(interviewPrepsMock, now);
    expect(counts.all).toBe(11);
    expect(counts.today).toBe(2);
    expect(counts.tomorrow).toBe(1);
    expect(counts.completed).toBe(2);
    expect(counts.undecided).toBe(1);
  });

  it("filters by search keyword", () => {
    const result = filterInterviewPreps(
      interviewPrepsMock,
      {
        search: "smart",
        tab: "all",
        jobType: "all",
        phase: "all",
        sortOrder: "soonest",
      },
      now
    );
    expect(result).toHaveLength(1);
    expect(result[0]?.companyName).toContain("SmartHR");
  });
});
