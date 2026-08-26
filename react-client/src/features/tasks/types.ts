export const TASK_CATEGORIES = ["esDeadline", "webTest", "interview", "memo"] as const;

export type TaskCategory = (typeof TASK_CATEGORIES)[number];

export const TASK_CATEGORY_LABELS: Record<TaskCategory, string> = {
  esDeadline: "ES提出",
  webTest: "Webテスト",
  interview: "面接",
  memo: "メモ",
};

export type TaskPriority = "high" | "normal" | "low";

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  high: "優先度高",
  normal: "通常",
  low: "低",
};

export type TaskItem = {
  id: string;
  title: string;
  companyName: string;
  completed: boolean;
  category: TaskCategory;
  dueAt: string;
  /** 作業開始の目安時刻（HH:mm）。未設定は null */
  plannedTime: string | null;
  estimatedMinutes: number;
  typeLabel: string;
  priority: TaskPriority;
  /** 選考ステージ表示（例: 書類選考）。未設定は null */
  selectionStage: string | null;
};

export const TASK_FILTER_TABS = ["all", "today", "thisWeek", "overdue", "completed"] as const;

export type TaskFilterTab = (typeof TASK_FILTER_TABS)[number];

export const TASK_FILTER_TAB_LABELS: Record<TaskFilterTab, string> = {
  all: "すべて",
  today: "今日",
  thisWeek: "今週",
  overdue: "期限切れ",
  completed: "完了",
};

export const TASK_SORT_ORDERS = ["dueSoon", "dueLate", "estimated"] as const;

export type TaskSortOrder = (typeof TASK_SORT_ORDERS)[number];

export const TASK_SORT_ORDER_LABELS: Record<TaskSortOrder, string> = {
  dueSoon: "期限が近い順",
  dueLate: "期限が遠い順",
  estimated: "目安時間が短い順",
};

export const TASK_GROUP_IDS = [
  "overdue",
  "today",
  "tomorrow",
  "thisWeek",
  "later",
  "completed",
] as const;

export type TaskGroupId = (typeof TASK_GROUP_IDS)[number];

export const TASK_GROUP_LABELS: Record<TaskGroupId, string> = {
  overdue: "期限切れ",
  today: "今日",
  tomorrow: "明日",
  thisWeek: "今週",
  later: "来週以降",
  completed: "完了",
};

export type TaskGroup = {
  id: TaskGroupId;
  label: string;
  items: TaskItem[];
};

export type TaskListQuery = {
  search: string;
  tab: TaskFilterTab;
  category: TaskCategory | "all";
  companyName: string | "all";
  sortOrder: TaskSortOrder;
};

export type TaskSummary = {
  todayCount: number;
  todayEstimatedMinutes: number;
  impendingCount: number;
  overdueCount: number;
  completedCount: number;
  completedThisWeekCount: number;
};

export type TaskProgress = {
  todayTotal: number;
  todayCompleted: number;
  remainingCount: number;
  remainingMinutes: number;
};
