import { calendarDayDiff, formatGroupDateHeading, prepPercent } from "./interviewPrepDate";
import type {
  InterviewPrepFilterTab,
  InterviewPrepGroup,
  InterviewPrepItem,
  InterviewPrepListQuery,
  InterviewPrepSortOrder,
  InterviewPrepSummary,
} from "./types";

export function isInsufficient(item: InterviewPrepItem): boolean {
  return !item.completed && item.missingItems.length > 0;
}

export function sortInterviewPreps(
  items: InterviewPrepItem[],
  order: InterviewPrepSortOrder
): InterviewPrepItem[] {
  return [...items].sort((left, right) => {
    if (order === "prepLow") {
      return prepPercent(left) - prepPercent(right);
    }
    const leftAt = left.scheduledAt ?? "9999-12-31T23:59:59";
    const rightAt = right.scheduledAt ?? "9999-12-31T23:59:59";
    if (order === "soonest") {
      return leftAt.localeCompare(rightAt);
    }
    return rightAt.localeCompare(leftAt);
  });
}

function matchesTab(item: InterviewPrepItem, tab: InterviewPrepFilterTab, now: Date): boolean {
  if (tab === "all") {
    return true;
  }
  if (tab === "insufficient") {
    return isInsufficient(item);
  }
  if (tab === "completed") {
    return item.completed;
  }
  if (tab === "undecided") {
    return !item.completed && item.scheduledAt === null;
  }
  if (item.completed || item.scheduledAt === null) {
    return false;
  }
  const diff = calendarDayDiff(item.scheduledAt, now);
  if (tab === "today") {
    return diff === 0;
  }
  if (tab === "tomorrow") {
    return diff === 1;
  }
  return diff >= 0 && diff <= 6;
}

export function filterInterviewPreps(
  items: InterviewPrepItem[],
  query: InterviewPrepListQuery,
  now: Date
): InterviewPrepItem[] {
  const keyword = query.search.trim().toLowerCase();
  return items.filter((item) => {
    if (
      keyword !== "" &&
      !item.companyName.toLowerCase().includes(keyword) &&
      !item.jobTitle.toLowerCase().includes(keyword)
    ) {
      return false;
    }
    if (query.jobType !== "all" && item.jobType !== query.jobType) {
      return false;
    }
    if (query.phase !== "all" && item.phase !== query.phase) {
      return false;
    }
    return matchesTab(item, query.tab, now);
  });
}

export function groupInterviewPreps(items: InterviewPrepItem[], now: Date): InterviewPrepGroup[] {
  const completed: InterviewPrepItem[] = [];
  const undecided: InterviewPrepItem[] = [];
  const byDate = new Map<string, InterviewPrepItem[]>();

  for (const item of items) {
    if (item.completed) {
      completed.push(item);
      continue;
    }
    if (item.scheduledAt === null) {
      undecided.push(item);
      continue;
    }
    const key = item.scheduledAt.slice(0, 10);
    const bucket = byDate.get(key);
    if (bucket) {
      bucket.push(item);
    } else {
      byDate.set(key, [item]);
    }
  }

  const dateKeys = [...byDate.keys()].sort((left, right) => left.localeCompare(right));
  const groups: InterviewPrepGroup[] = dateKeys.map((key) => {
    const groupItems = byDate.get(key) ?? [];
    const scheduledAt = groupItems[0]?.scheduledAt ?? `${key}T00:00:00`;
    return {
      id: key,
      label: formatGroupDateHeading(scheduledAt, now),
      items: groupItems,
    };
  });

  if (undecided.length > 0) {
    groups.push({ id: "undecided", label: "日時未定", items: undecided });
  }
  if (completed.length > 0) {
    groups.push({ id: "completed", label: "完了", items: completed });
  }
  return groups;
}

export function summarizeInterviewPreps(
  items: InterviewPrepItem[],
  now: Date
): InterviewPrepSummary {
  let todayCount = 0;
  let tomorrowCount = 0;
  let within7Count = 0;
  let insufficientCount = 0;

  for (const item of items) {
    if (isInsufficient(item)) {
      insufficientCount += 1;
    }
    if (item.completed || item.scheduledAt === null) {
      continue;
    }
    const diff = calendarDayDiff(item.scheduledAt, now);
    if (diff === 0) {
      todayCount += 1;
    }
    if (diff === 1) {
      tomorrowCount += 1;
    }
    if (diff >= 0 && diff <= 6) {
      within7Count += 1;
    }
  }

  return { todayCount, tomorrowCount, within7Count, insufficientCount };
}

export function summarizeTabCounts(
  items: InterviewPrepItem[],
  now: Date
): Record<InterviewPrepFilterTab, number> {
  return {
    all: items.length,
    today: items.filter((item) => matchesTab(item, "today", now)).length,
    tomorrow: items.filter((item) => matchesTab(item, "tomorrow", now)).length,
    within7: items.filter((item) => matchesTab(item, "within7", now)).length,
    insufficient: items.filter((item) => matchesTab(item, "insufficient", now)).length,
    completed: items.filter((item) => matchesTab(item, "completed", now)).length,
    undecided: items.filter((item) => matchesTab(item, "undecided", now)).length,
  };
}
