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

export type TodayTask = {
  id: string;
  title: string;
  companyName: string;
  completed: boolean;
  time: string | null;
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
