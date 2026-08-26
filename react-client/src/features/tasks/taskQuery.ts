import { calendarDayDiff, formatLocalIso, parseDueAt } from "./taskDate";
import {
  TASK_GROUP_IDS,
  TASK_GROUP_LABELS,
  type TaskFilterTab,
  type TaskGroup,
  type TaskGroupId,
  type TaskItem,
  type TaskListQuery,
  type TaskProgress,
  type TaskSortOrder,
  type TaskSummary,
} from "./types";

export function getTaskGroupId(task: TaskItem, now: Date): TaskGroupId {
  if (task.completed) {
    return "completed";
  }
  const diff = calendarDayDiff(task.dueAt, now);
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

export function sortTasks(tasks: TaskItem[], order: TaskSortOrder): TaskItem[] {
  return [...tasks].sort((left, right) => {
    if (order === "dueSoon") {
      return left.dueAt.localeCompare(right.dueAt);
    }
    if (order === "dueLate") {
      return right.dueAt.localeCompare(left.dueAt);
    }
    return left.estimatedMinutes - right.estimatedMinutes;
  });
}

function matchesTab(task: TaskItem, tab: TaskFilterTab, now: Date): boolean {
  const group = getTaskGroupId(task, now);
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

export function filterTasks(tasks: TaskItem[], query: TaskListQuery, now: Date): TaskItem[] {
  const keyword = query.search.trim().toLowerCase();
  return tasks.filter((task) => {
    if (
      keyword !== "" &&
      !task.title.toLowerCase().includes(keyword) &&
      !task.companyName.toLowerCase().includes(keyword)
    ) {
      return false;
    }
    if (query.category !== "all" && task.category !== query.category) {
      return false;
    }
    if (query.companyName !== "all" && task.companyName !== query.companyName) {
      return false;
    }
    return matchesTab(task, query.tab, now);
  });
}

export function groupTasks(tasks: TaskItem[], now: Date): TaskGroup[] {
  const buckets = new Map<TaskGroupId, TaskItem[]>(TASK_GROUP_IDS.map((id) => [id, []]));
  for (const task of tasks) {
    const groupId = getTaskGroupId(task, now);
    buckets.get(groupId)?.push(task);
  }
  return TASK_GROUP_IDS.flatMap((id) => {
    const items = buckets.get(id) ?? [];
    if (items.length === 0) {
      return [];
    }
    return [{ id, label: TASK_GROUP_LABELS[id], items }];
  });
}

export function summarizeTasks(tasks: TaskItem[], now: Date): TaskSummary {
  const impendingUntil = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  let todayCount = 0;
  let todayEstimatedMinutes = 0;
  let impendingCount = 0;
  let overdueCount = 0;
  let completedCount = 0;
  let completedThisWeekCount = 0;

  for (const task of tasks) {
    const group = getTaskGroupId(task, now);
    const dayDiff = calendarDayDiff(task.dueAt, now);
    if (task.completed) {
      completedCount += 1;
      if (dayDiff >= -6 && dayDiff <= 6) {
        completedThisWeekCount += 1;
      }
      continue;
    }
    if (group === "today") {
      todayCount += 1;
      todayEstimatedMinutes += task.estimatedMinutes;
    }
    if (group === "overdue") {
      overdueCount += 1;
    }
    const due = parseDueAt(task.dueAt);
    if (due >= now && due <= impendingUntil) {
      impendingCount += 1;
    }
  }

  return {
    todayCount,
    todayEstimatedMinutes,
    impendingCount,
    overdueCount,
    completedCount,
    completedThisWeekCount,
  };
}

export function summarizeTabCounts(tasks: TaskItem[], now: Date): Record<TaskFilterTab, number> {
  return {
    all: tasks.length,
    today: tasks.filter((task) => getTaskGroupId(task, now) === "today").length,
    thisWeek: tasks.filter((task) => {
      const group = getTaskGroupId(task, now);
      return group === "today" || group === "tomorrow" || group === "thisWeek";
    }).length,
    overdue: tasks.filter((task) => getTaskGroupId(task, now) === "overdue").length,
    completed: tasks.filter((task) => task.completed).length,
  };
}

export function computeProgress(tasks: TaskItem[], now: Date): TaskProgress {
  const todayTasks = tasks.filter((task) => calendarDayDiff(task.dueAt, now) === 0);
  const remaining = todayTasks.filter((task) => !task.completed);
  return {
    todayTotal: todayTasks.length,
    todayCompleted: todayTasks.length - remaining.length,
    remainingCount: remaining.length,
    remainingMinutes: remaining.reduce((sum, task) => sum + task.estimatedMinutes, 0),
  };
}

export function listCompanyNames(tasks: TaskItem[]): string[] {
  return [...new Set(tasks.map((task) => task.companyName))].sort((left, right) =>
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
