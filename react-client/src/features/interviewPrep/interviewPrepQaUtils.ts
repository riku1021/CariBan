import {
  type InterviewPrepDetail,
  PREP_QA_LIST_TABS,
  PREP_QA_VIEW_TABS,
  PREP_QUESTION_CATEGORIES,
  PREP_QUESTION_CATEGORY_LABELS,
  type PrepQaListTab,
  type PrepQaViewTab,
  type PrepQuestion,
  type PrepQuestionCategory,
} from "./types";

export type ListedQuestion = PrepQuestion & {
  source: PrepQaListTab;
};

export type QuestionGroup = {
  id: PrepQuestionCategory;
  label: string;
  items: ListedQuestion[];
};

const VIEW_TAB_CATEGORIES: Partial<Record<PrepQaViewTab, readonly PrepQuestionCategory[]>> = {
  all: PREP_QUESTION_CATEGORIES,
  company: ["company"],
  reverse: ["reverse"],
};

export function tabDoneCount(questions: readonly PrepQuestion[]): number {
  return questions.filter((item) => item.status === "ready").length;
}

export function listQuestions(detail: InterviewPrepDetail, tab: PrepQaViewTab): ListedQuestion[] {
  if (tab === "all") {
    return PREP_QA_LIST_TABS.flatMap((source) =>
      detail.questions[source].map((question) => ({ ...question, source }))
    );
  }
  if (tab === "company" || tab === "reverse") {
    return detail.questions[tab].map((question) => ({ ...question, source: tab }));
  }
  return [];
}

export function groupQuestions(questions: ListedQuestion[], tab: PrepQaViewTab): QuestionGroup[] {
  const categories = VIEW_TAB_CATEGORIES[tab];
  if (!categories) {
    return [];
  }

  return categories
    .map((category) => ({
      id: category,
      label: PREP_QUESTION_CATEGORY_LABELS[category],
      items: questions.filter((question) => question.category === category),
    }))
    .filter((group) => group.items.length > 0);
}

export function viewTabCount(detail: InterviewPrepDetail, tab: PrepQaViewTab): number {
  if (tab === "all") {
    return PREP_QA_LIST_TABS.reduce((sum, source) => sum + detail.questions[source].length, 0);
  }
  if (tab === "company" || tab === "reverse") {
    return detail.questions[tab].length;
  }
  if (tab === "assumed" || tab === "memo") {
    const body = detail.memoBodies[tab];
    return body && body.trim().length > 0 ? 1 : 0;
  }
  return 0;
}

export function summarizePrepQaTabCounts(
  detail: InterviewPrepDetail
): Record<PrepQaViewTab, number> {
  return PREP_QA_VIEW_TABS.reduce(
    (counts, tab) => {
      counts[tab] = viewTabCount(detail, tab);
      return counts;
    },
    {} as Record<PrepQaViewTab, number>
  );
}

export function addLabel(tab: PrepQaViewTab): string {
  if (tab === "all") {
    return "質問を追加";
  }
  if (tab === "company") {
    return "企業別質問を追加";
  }
  if (tab === "reverse") {
    return "逆質問を追加";
  }
  return "項目を追加";
}

export function showsQuestionAddButton(tab: PrepQaViewTab): boolean {
  return tab === "all" || tab === "company" || tab === "reverse";
}

export function sourceBadgeLabel(source: PrepQaListTab): string | null {
  if (source === "company") {
    return "企業別";
  }
  if (source === "reverse") {
    return "逆質問";
  }
  return null;
}

export function formatQuestionIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}
