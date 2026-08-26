export const SCHEDULE_KINDS = [
  "esDeadline",
  "interview",
  "infoSession",
  "agent",
  "webTest",
] as const;

export type ScheduleKind = (typeof SCHEDULE_KINDS)[number];

export const SCHEDULE_KIND_LABELS: Record<ScheduleKind, string> = {
  esDeadline: "ES締切",
  interview: "面接",
  infoSession: "説明会",
  agent: "エージェント",
  webTest: "Webテスト",
};

export type ScheduleItem = {
  id: string;
  title: string;
  companyName: string;
  /** 実施済み */
  completed: boolean;
  kind: ScheduleKind;
  startsAt: string;
  endsAt: string;
  location: string | null;
  selectionStage: string | null;
};

export const SCHEDULE_FILTER_TABS = ["all", "today", "thisWeek", "overdue", "completed"] as const;

export type ScheduleFilterTab = (typeof SCHEDULE_FILTER_TABS)[number];

export const SCHEDULE_FILTER_TAB_LABELS: Record<ScheduleFilterTab, string> = {
  all: "すべて",
  today: "今日",
  thisWeek: "今週",
  overdue: "期限切れ",
  completed: "完了",
};

export const SCHEDULE_SORT_ORDERS = ["startSoon", "startLate", "duration"] as const;

export type ScheduleSortOrder = (typeof SCHEDULE_SORT_ORDERS)[number];

export const SCHEDULE_SORT_ORDER_LABELS: Record<ScheduleSortOrder, string> = {
  startSoon: "開始が近い順",
  startLate: "開始が遠い順",
  duration: "所要時間が短い順",
};

export const SCHEDULE_GROUP_IDS = [
  "overdue",
  "today",
  "tomorrow",
  "thisWeek",
  "later",
  "completed",
] as const;

export type ScheduleGroupId = (typeof SCHEDULE_GROUP_IDS)[number];

export const SCHEDULE_GROUP_LABELS: Record<ScheduleGroupId, string> = {
  overdue: "期限切れ",
  today: "今日",
  tomorrow: "明日",
  thisWeek: "今週",
  later: "来週以降",
  completed: "完了",
};

export type ScheduleGroup = {
  id: ScheduleGroupId;
  label: string;
  items: ScheduleItem[];
};

export type ScheduleListQuery = {
  search: string;
  tab: ScheduleFilterTab;
  kind: ScheduleKind | "all";
  companyName: string | "all";
  sortOrder: ScheduleSortOrder;
};

export type ScheduleSummary = {
  todayCount: number;
  todayDurationMinutes: number;
  impendingCount: number;
  overdueCount: number;
  completedCount: number;
  completedThisWeekCount: number;
};

export type ScheduleProgress = {
  todayTotal: number;
  todayCompleted: number;
  remainingCount: number;
  remainingMinutes: number;
};
