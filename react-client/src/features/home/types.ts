export const CALENDAR_EVENT_KINDS = [
  "esDeadline",
  "interview",
  "infoSession",
  "agent",
  "webTest",
] as const;

export type CalendarEventKind = (typeof CALENDAR_EVENT_KINDS)[number];

export const EVENT_KIND_LABELS: Record<CalendarEventKind, string> = {
  esDeadline: "ES締切",
  interview: "面接",
  infoSession: "説明会",
  agent: "エージェント",
  webTest: "Webテスト",
};

export const SELECTION_STAGES = [
  { id: "entry", label: "エントリー" },
  { id: "document", label: "書類" },
  { id: "webTest", label: "Webテスト" },
  { id: "interview", label: "面接" },
  { id: "offer", label: "内定" },
] as const;

export type SelectionStageId = (typeof SELECTION_STAGES)[number]["id"];

export type SelectionStage = {
  id: string;
  label: string;
};

export type CalendarDay = {
  date: string;
  eventKinds: CalendarEventKind[];
};

export type DashboardCalendar = {
  year: number;
  month: number;
  todayDate: string;
  days: CalendarDay[];
};

/**
 * タスク: 自分が完了する作業（提出・対策・作成など）。完了チェック対象。
 * 予定（CalendarEventKind）とは異なり、相手との確定枠ではなく ToDo。
 */
export const TASK_KINDS = ["submission", "webTestPrep", "esDraft", "other"] as const;

export type TaskKind = (typeof TASK_KINDS)[number];

export const TASK_KIND_LABELS: Record<TaskKind, string> = {
  submission: "提出物",
  webTestPrep: "Webテスト対策",
  esDraft: "ES作成",
  other: "その他",
};

export type TodayTask = {
  id: string;
  title: string;
  companyName: string;
  completed: boolean;
  time: string | null;
};

export type CreateTaskInput = {
  kind: TaskKind;
  title: string;
  dueDate: string;
  time: string | null;
  companyId: string | null;
  companyName: string;
  stageId: string | null;
};

/**
 * 予定: カレンダーに載る確定枠（面接・説明会・Webテスト実施・締切など）。
 * タスクとは異なり、日時レンジとイベント種別を持つ。
 */
export type CreateScheduleInput = {
  kind: CalendarEventKind;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  companyId: string;
  companyName: string;
  stageId: string | null;
};

export const COMPANY_JOB_TITLES = [
  "バックエンド",
  "フロントエンド",
  "SE",
  "ビジネス",
  "デザイン",
  "プロダクト",
] as const;

export type CompanyJobTitle = (typeof COMPANY_JOB_TITLES)[number];

export type CreateCompanyInput = {
  name: string;
  jobTitle: CompanyJobTitle;
  currentStageId: SelectionStageId;
  appliedDate: string;
};

export type CompanyOption = {
  id: string;
  name: string;
  stages: SelectionStage[];
};

export type DeadlineUrgency = "tomorrow" | "inTwoDays" | "inThreeDays";

export const DEADLINE_URGENCY_LABELS: Record<DeadlineUrgency, string> = {
  tomorrow: "明日",
  inTwoDays: "あと2日",
  inThreeDays: "あと3日",
};

export type UpcomingDeadline = {
  id: string;
  dateLabel: string;
  title: string;
  companyName: string;
  urgency: DeadlineUrgency;
};

export type StatChange = {
  value: number;
  unit: string;
};

export type DashboardStats = {
  companiesInProcess: {
    value: number;
    change: StatChange;
    sparkline: number[];
  };
  interviewsThisWeek: {
    value: number;
    change: StatChange;
    bars: number[];
  };
  unfinishedTasks: {
    value: number;
    change: StatChange;
    completedRatio: number;
  };
  offers: {
    value: number;
    change: StatChange;
  };
};

export type CompanyProgress = {
  id: string;
  name: string;
  initials: string;
  jobTitle: string;
  stages: SelectionStage[];
  currentStageIndex: number;
  lastUpdated: string;
};

export type UpcomingSelection = {
  id: string;
  dateLabel: string;
  timeRange: string;
  title: string;
  companyName: string;
  kind: CalendarEventKind;
};

export type DashboardData = {
  calendar: DashboardCalendar;
  todayTasks: TodayTask[];
  upcomingDeadlines: UpcomingDeadline[];
  stats: DashboardStats;
  companyProgress: CompanyProgress[];
  upcomingSelections: UpcomingSelection[];
};
