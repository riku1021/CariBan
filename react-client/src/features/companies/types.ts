export const COMPANY_STATUSES = ["inProcess", "recruiting", "offer", "closed"] as const;

export type CompanyStatus = (typeof COMPANY_STATUSES)[number];

export const COMPANY_STATUS_LABELS: Record<CompanyStatus, string> = {
  inProcess: "選考中",
  recruiting: "募集中",
  offer: "内定",
  closed: "終了",
};

export const COMPANY_JOB_TYPES = [
  "backend",
  "frontend",
  "se",
  "business",
  "design",
  "product",
] as const;

export type CompanyJobType = (typeof COMPANY_JOB_TYPES)[number];

export const COMPANY_JOB_TYPE_LABELS: Record<CompanyJobType, string> = {
  backend: "バックエンド",
  frontend: "フロントエンド",
  se: "SE",
  business: "ビジネス",
  design: "デザイン",
  product: "プロダクト",
};

export type NextActionUrgency = "today" | "soon" | "later" | "none";

export type CompanyNextAction = {
  title: string;
  /** 一覧・残りバッジ用（例: あと1日 / 今日）。時刻は scheduleLabel 側 */
  dueLabel: string;
  /** 詳細の日時表示（例: 明日 19:30）。未設定時は dueLabel を使う */
  scheduleLabel: string | null;
  urgency: NextActionUrgency;
};

export type CompanyStage = {
  id: string;
  label: string;
};

export type CompanyItem = {
  id: string;
  shortName: string;
  legalName: string;
  initials: string;
  status: CompanyStatus;
  jobType: CompanyJobType;
  currentStage: string;
  stages: CompanyStage[];
  currentStageIndex: number;
  nextAction: CompanyNextAction | null;
  /** 未完了タスクがあるか（フィルター用） */
  hasOpenTask: boolean;
  applicationPath: string;
  appliedAt: string;
  memo: string;
  homepageUrl: string | null;
  mypageUrl: string | null;
};

export const COMPANY_FILTER_TABS = ["all", "inProcess", "recruiting", "offer", "closed"] as const;

export type CompanyFilterTab = (typeof COMPANY_FILTER_TABS)[number];

export const COMPANY_FILTER_TAB_LABELS: Record<CompanyFilterTab, string> = {
  all: "すべて",
  inProcess: "選考中",
  recruiting: "募集中",
  offer: "内定",
  closed: "終了",
};

export const COMPANY_TASK_FILTERS = ["all", "hasTask", "noTask"] as const;

export type CompanyTaskFilter = (typeof COMPANY_TASK_FILTERS)[number];

export const COMPANY_TASK_FILTER_LABELS: Record<CompanyTaskFilter, string> = {
  all: "タスク",
  hasTask: "タスクあり",
  noTask: "タスクなし",
};

export const COMPANY_SORT_ORDERS = ["updated", "name", "dueSoon"] as const;

export type CompanySortOrder = (typeof COMPANY_SORT_ORDERS)[number];

export const COMPANY_SORT_ORDER_LABELS: Record<CompanySortOrder, string> = {
  updated: "更新が新しい順",
  name: "企業名順",
  dueSoon: "次アクションが近い順",
};

export type CompanyListQuery = {
  search: string;
  tab: CompanyFilterTab;
  jobType: CompanyJobType | "all";
  status: CompanyStatus | "all";
  taskFilter: CompanyTaskFilter;
  sortOrder: CompanySortOrder;
};

export type CompanySummaryChange = {
  value: number;
  direction: "up" | "down" | "flat";
};

export type CompanySummary = {
  inProcessCount: number;
  inProcessChange: CompanySummaryChange;
  recruitingCount: number;
  recruitingChange: CompanySummaryChange;
  offerCount: number;
  offerChange: CompanySummaryChange;
  needsActionCount: number;
  needsActionChange: CompanySummaryChange;
};
