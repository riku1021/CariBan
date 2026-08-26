import type {
  CompanyProgress,
  DeadlineUrgency,
  TodayTask,
  UpcomingDeadline,
  UpcomingSelection,
} from "./types";

const URGENCY_ORDER: Record<DeadlineUrgency, number> = {
  tomorrow: 0,
  inTwoDays: 1,
  inThreeDays: 2,
};

export function sortTodayTasks(tasks: TodayTask[]): TodayTask[] {
  return [...tasks].sort((left, right) => {
    if (left.completed !== right.completed) {
      return left.completed ? 1 : -1;
    }
    return (left.time ?? "99:99").localeCompare(right.time ?? "99:99");
  });
}

export function sortDeadlines(deadlines: UpcomingDeadline[]): UpcomingDeadline[] {
  return [...deadlines].sort((left, right) => {
    const urgencyDiff = URGENCY_ORDER[left.urgency] - URGENCY_ORDER[right.urgency];
    if (urgencyDiff !== 0) {
      return urgencyDiff;
    }
    return compareMonthDay(left.dateLabel, right.dateLabel);
  });
}

export function sortCompanies(companies: CompanyProgress[]): CompanyProgress[] {
  return [...companies].sort((left, right) => {
    if (left.currentStageIndex !== right.currentStageIndex) {
      return right.currentStageIndex - left.currentStageIndex;
    }
    return compareMonthDay(right.lastUpdated, left.lastUpdated);
  });
}

export function sortSelections(selections: UpcomingSelection[]): UpcomingSelection[] {
  return [...selections].sort((left, right) => {
    const dateDiff = compareMonthDay(left.dateLabel, right.dateLabel);
    if (dateDiff !== 0) {
      return dateDiff;
    }
    return left.timeRange.localeCompare(right.timeRange);
  });
}

function compareMonthDay(left: string, right: string): number {
  return toMonthDayValue(left) - toMonthDayValue(right);
}

function toMonthDayValue(label: string): number {
  const [month, day] = label.split("/").map(Number);
  return month * 100 + day;
}
