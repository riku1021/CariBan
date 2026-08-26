export const INTERVIEW_JOB_TYPES = [
  "backend",
  "frontend",
  "se",
  "analytics",
  "data",
  "business",
] as const;

export type InterviewJobType = (typeof INTERVIEW_JOB_TYPES)[number];

export const INTERVIEW_JOB_TYPE_LABELS: Record<InterviewJobType, string> = {
  backend: "バックエンド",
  frontend: "フロントエンド",
  se: "SE",
  analytics: "Analytics SE",
  data: "データ",
  business: "ビジネス",
};

export const INTERVIEW_PHASES = ["casual", "first", "second", "final"] as const;

export type InterviewPhase = (typeof INTERVIEW_PHASES)[number];

export const INTERVIEW_PHASE_LABELS: Record<InterviewPhase, string> = {
  casual: "カジュアル面談",
  first: "一次面接",
  second: "二次面接",
  final: "最終面接",
};

export type InterviewPrepItem = {
  id: string;
  companyName: string;
  initials: string;
  jobTitle: string;
  jobType: InterviewJobType;
  phase: InterviewPhase;
  /** ISO ローカル日時。未定は null */
  scheduledAt: string | null;
  completed: boolean;
  commonDone: number;
  commonTotal: number;
  companyDone: number;
  companyTotal: number;
  missingItems: string[];
};

export const INTERVIEW_PREP_FILTER_TABS = [
  "all",
  "today",
  "tomorrow",
  "within7",
  "insufficient",
  "completed",
  "undecided",
] as const;

export type InterviewPrepFilterTab = (typeof INTERVIEW_PREP_FILTER_TABS)[number];

export const INTERVIEW_PREP_FILTER_TAB_LABELS: Record<InterviewPrepFilterTab, string> = {
  all: "すべて",
  today: "今日",
  tomorrow: "明日",
  within7: "7日以内",
  insufficient: "準備不足",
  completed: "完了",
  undecided: "日時未定",
};

export const INTERVIEW_PREP_SORT_ORDERS = ["soonest", "latest", "prepLow"] as const;

export type InterviewPrepSortOrder = (typeof INTERVIEW_PREP_SORT_ORDERS)[number];

export const INTERVIEW_PREP_SORT_ORDER_LABELS: Record<InterviewPrepSortOrder, string> = {
  soonest: "日時が近い順",
  latest: "日時が遠い順",
  prepLow: "準備率が低い順",
};

export type InterviewPrepGroup = {
  id: string;
  label: string;
  items: InterviewPrepItem[];
};

export type InterviewPrepListQuery = {
  search: string;
  tab: InterviewPrepFilterTab;
  jobType: InterviewJobType | "all";
  phase: InterviewPhase | "all";
  sortOrder: InterviewPrepSortOrder;
};

export type InterviewPrepSummary = {
  todayCount: number;
  tomorrowCount: number;
  within7Count: number;
  insufficientCount: number;
};

export const INTERVIEW_FORMATS = ["online", "offline"] as const;

export type InterviewFormat = (typeof INTERVIEW_FORMATS)[number];

export const INTERVIEW_FORMAT_LABELS: Record<InterviewFormat, string> = {
  online: "オンライン",
  offline: "対面",
};

export const PREP_QA_TABS = ["common", "company", "assumed", "reverse", "memo"] as const;

export type PrepQaTab = (typeof PREP_QA_TABS)[number];

export const PREP_QA_TAB_LABELS: Record<PrepQaTab, string> = {
  common: "共通質問",
  company: "企業別質問",
  assumed: "想定質問メモ",
  reverse: "逆質問",
  memo: "面接メモ",
};

/** 一覧表示用。メモ系以外の質問タブ */
export const PREP_QA_LIST_TABS = ["common", "company", "reverse"] as const;

export type PrepQaListTab = (typeof PREP_QA_LIST_TABS)[number];

export const PREP_QA_VIEW_TABS = ["all", ...PREP_QA_TABS] as const;

export type PrepQaViewTab = (typeof PREP_QA_VIEW_TABS)[number];

export const PREP_QA_VIEW_TAB_LABELS: Record<PrepQaViewTab, string> = {
  all: "すべての質問",
  ...PREP_QA_TAB_LABELS,
};

export type PrepQuestionStatus = "ready" | "draft" | "empty";

export const PREP_QUESTION_STATUS_LABELS: Record<PrepQuestionStatus, string> = {
  ready: "準備完了",
  draft: "下書き",
  empty: "未準備",
};

export type PrepQuestion = {
  id: string;
  title: string;
  /** 閉じたときの一行プレビュー */
  snippet: string;
  /** 展開時の本文 */
  body: string;
  status: PrepQuestionStatus;
  updatedLabel: string;
};

export type PrepRelatedTask = {
  id: string;
  title: string;
  completed: boolean;
  dueLabel: string;
};

export type PrepStage = {
  id: string;
  label: string;
};

export type InterviewPrepDetail = InterviewPrepItem & {
  format: InterviewFormat;
  interviewers: { role: string; name: string }[];
  stages: PrepStage[];
  currentStageIndex: number;
  taskDone: number;
  taskTotal: number;
  relatedTasks: PrepRelatedTask[];
  questions: Record<PrepQaTab, PrepQuestion[]>;
  memoBodies: Partial<Record<"assumed" | "memo", string>>;
};
