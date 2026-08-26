import { calendarDayDiff, durationMinutes, formatLocalIso, parseAt } from "./scheduleDate";
import {
  SCHEDULE_GROUP_IDS,
  SCHEDULE_GROUP_LABELS,
  type ScheduleFilterTab,
  type ScheduleGroup,
  type ScheduleGroupId,
  type ScheduleItem,
  type ScheduleListQuery,
  type ScheduleProgress,
  type ScheduleSortOrder,
  type ScheduleSummary,
} from "./types";

export function getScheduleGroupId(schedule: ScheduleItem, now: Date): ScheduleGroupId {
  if (schedule.completed) {
    return "completed";
  }
  const diff = calendarDayDiff(schedule.startsAt, now);
  if (diff < 0) {
    return "overdue";
  }
  if (diff === 0) {
    return "today";
  }
  if (diff === 1) {
    return "tomorrow";
  }
  if (diff <= 6) {
    return "thisWeek";
  }
  return "later";
}

export function sortSchedules(schedules: ScheduleItem[], order: ScheduleSortOrder): ScheduleItem[] {
  return [...schedules].sort((left, right) => {
    if (order === "startSoon") {
      return left.startsAt.localeCompare(right.startsAt);
    }
    if (order === "startLate") {
      return right.startsAt.localeCompare(left.startsAt);
    }
    return (
      durationMinutes(left.startsAt, left.endsAt) - durationMinutes(right.startsAt, right.endsAt)
    );
  });
}

function matchesTab(schedule: ScheduleItem, tab: ScheduleFilterTab, now: Date): boolean {
  const group = getScheduleGroupId(schedule, now);
  if (tab === "all") {
    return true;
  }
  if (tab === "today") {
    return group === "today";
  }
  if (tab === "thisWeek") {
    return group === "today" || group === "tomorrow" || group === "thisWeek";
  }
  if (tab === "overdue") {
    return group === "overdue";
  }
  return group === "completed";
}

export function filterSchedules(
  schedules: ScheduleItem[],
  query: ScheduleListQuery,
  now: Date
): ScheduleItem[] {
  const keyword = query.search.trim().toLowerCase();
  return schedules.filter((schedule) => {
    if (
      keyword !== "" &&
      !schedule.title.toLowerCase().includes(keyword) &&
      !schedule.companyName.toLowerCase().includes(keyword)
    ) {
      return false;
    }
    if (query.kind !== "all" && schedule.kind !== query.kind) {
      return false;
    }
    if (query.companyName !== "all" && schedule.companyName !== query.companyName) {
      return false;
    }
    return matchesTab(schedule, query.tab, now);
  });
}

export function groupSchedules(schedules: ScheduleItem[], now: Date): ScheduleGroup[] {
  const buckets = new Map<ScheduleGroupId, ScheduleItem[]>(
    SCHEDULE_GROUP_IDS.map((id) => [id, []])
  );
  for (const schedule of schedules) {
    const groupId = getScheduleGroupId(schedule, now);
    buckets.get(groupId)?.push(schedule);
  }
  return SCHEDULE_GROUP_IDS.flatMap((id) => {
    const items = buckets.get(id) ?? [];
    if (items.length === 0) {
      return [];
    }
    return [{ id, label: SCHEDULE_GROUP_LABELS[id], items }];
  });
}

export function summarizeSchedules(schedules: ScheduleItem[], now: Date): ScheduleSummary {
  const impendingUntil = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  let todayCount = 0;
  let todayDurationMinutes = 0;
  let impendingCount = 0;
  let overdueCount = 0;
  let completedCount = 0;
  let completedThisWeekCount = 0;

  for (const schedule of schedules) {
    const group = getScheduleGroupId(schedule, now);
    const dayDiff = calendarDayDiff(schedule.startsAt, now);
    if (schedule.completed) {
      completedCount += 1;
      if (dayDiff >= -6 && dayDiff <= 6) {
        completedThisWeekCount += 1;
      }
      continue;
    }
    if (group === "today") {
      todayCount += 1;
      todayDurationMinutes += durationMinutes(schedule.startsAt, schedule.endsAt);
    }
    if (group === "overdue") {
      overdueCount += 1;
    }
    const start = parseAt(schedule.startsAt);
    if (start >= now && start <= impendingUntil) {
      impendingCount += 1;
    }
  }

  return {
    todayCount,
    todayDurationMinutes,
    impendingCount,
    overdueCount,
    completedCount,
    completedThisWeekCount,
  };
}

export function summarizeTabCounts(
  schedules: ScheduleItem[],
  now: Date
): Record<ScheduleFilterTab, number> {
  return {
    all: schedules.length,
    today: schedules.filter((schedule) => getScheduleGroupId(schedule, now) === "today").length,
    thisWeek: schedules.filter((schedule) => {
      const group = getScheduleGroupId(schedule, now);
      return group === "today" || group === "tomorrow" || group === "thisWeek";
    }).length,
    overdue: schedules.filter((schedule) => getScheduleGroupId(schedule, now) === "overdue").length,
    completed: schedules.filter((schedule) => schedule.completed).length,
  };
}

export function computeProgress(schedules: ScheduleItem[], now: Date): ScheduleProgress {
  const todaySchedules = schedules.filter(
    (schedule) => calendarDayDiff(schedule.startsAt, now) === 0
  );
  const remaining = todaySchedules.filter((schedule) => !schedule.completed);
  return {
    todayTotal: todaySchedules.length,
    todayCompleted: todaySchedules.length - remaining.length,
    remainingCount: remaining.length,
    remainingMinutes: remaining.reduce(
      (sum, schedule) => sum + durationMinutes(schedule.startsAt, schedule.endsAt),
      0
    ),
  };
}

export function listCompanyNames(schedules: ScheduleItem[]): string[] {
  return [...new Set(schedules.map((schedule) => schedule.companyName))].sort((left, right) =>
    left.localeCompare(right, "ja")
  );
}

export function atDay(now: Date, dayOffset: number, hour: number, minute: number): string {
  const date = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + dayOffset,
    hour,
    minute,
    0
  );
  return formatLocalIso(date);
}
