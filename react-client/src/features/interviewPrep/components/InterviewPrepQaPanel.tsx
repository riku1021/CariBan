import { useMemo, useState } from "react";
import { FaCheck, FaChevronDown, FaInfoCircle, FaPlus } from "react-icons/fa";

import {
  type InterviewPrepDetail,
  PREP_QA_LIST_TABS,
  PREP_QA_VIEW_TAB_LABELS,
  PREP_QA_VIEW_TABS,
  PREP_QUESTION_STATUS_LABELS,
  type PrepQaListTab,
  type PrepQaViewTab,
  type PrepQuestion,
} from "../types";
import * as styles from "./InterviewPrepQaPanel.styles";

type InterviewPrepQaPanelProps = {
  detail: InterviewPrepDetail;
};

type ListedQuestion = PrepQuestion & {
  source: PrepQaListTab;
};

function tabDoneCount(questions: readonly PrepQuestion[]): number {
  return questions.filter((item) => item.status === "ready").length;
}

function bannerText(tab: PrepQaViewTab): string {
  if (tab === "all") {
    return "共通・企業別・逆質問をまとめて確認できます。企業固有の項目はバッジで区別しています。";
  }
  if (tab === "common") {
    return "共通質問は、どの企業の面接でも使える回答です。一度準備すれば再利用できます。";
  }
  if (tab === "company") {
    return "企業別質問は、この企業固有の志望動機や事業理解を整理する欄です。";
  }
  if (tab === "reverse") {
    return "逆質問は面接後半で使う想定です。優先度の高いものから準備しましょう。";
  }
  return "";
}

function addLabel(tab: PrepQaViewTab): string {
  if (tab === "company") {
    return "企業別質問を追加";
  }
  if (tab === "reverse") {
    return "逆質問を追加";
  }
  return "項目を追加";
}

function isSpecificSource(source: PrepQaListTab): boolean {
  return source === "company" || source === "reverse";
}

function sourceBadgeLabel(source: PrepQaListTab): string | null {
  if (source === "company") {
    return "企業別";
  }
  if (source === "reverse") {
    return "逆質問";
  }
  return null;
}

function listQuestions(detail: InterviewPrepDetail, tab: PrepQaViewTab): ListedQuestion[] {
  if (tab === "all") {
    return PREP_QA_LIST_TABS.flatMap((source) =>
      detail.questions[source].map((question) => ({ ...question, source }))
    );
  }
  if (tab === "common" || tab === "company" || tab === "reverse") {
    return detail.questions[tab].map((question) => ({ ...question, source: tab }));
  }
  return [];
}

function viewTabCount(detail: InterviewPrepDetail, tab: PrepQaViewTab): number {
  if (tab === "all") {
    return PREP_QA_LIST_TABS.reduce((sum, source) => sum + detail.questions[source].length, 0);
  }
  return detail.questions[tab].length;
}

function viewTabDone(detail: InterviewPrepDetail, tab: PrepQaViewTab): number {
  if (tab === "all") {
    return PREP_QA_LIST_TABS.reduce(
      (sum, source) => sum + tabDoneCount(detail.questions[source]),
      0
    );
  }
  return tabDoneCount(detail.questions[tab]);
}

export function InterviewPrepQaPanel({ detail }: InterviewPrepQaPanelProps) {
  const [tab, setTab] = useState<PrepQaViewTab>("all");
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);
  const questions = useMemo(() => listQuestions(detail, tab), [detail, tab]);
  const isMemoTab = tab === "assumed" || tab === "memo";
  const readyCount = useMemo(() => tabDoneCount(questions), [questions]);

  const handleTabChange = (next: PrepQaViewTab) => {
    setTab(next);
    setOpenQuestionId(null);
  };

  const handleToggle = (questionId: string) => {
    setOpenQuestionId((current) => (current === questionId ? null : questionId));
  };

  return (
    <section className={styles.panel}>
      <div className={styles.tabs} role="tablist" aria-label="準備コンテンツ">
        {PREP_QA_VIEW_TABS.map((item) => {
          const count = viewTabCount(detail, item);
          const done = viewTabDone(detail, item);
          const showCount = item === "all" || item === "company" || item === "reverse";
          const tabEmphasis = item === "company" || item === "reverse";
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={tab === item}
              className={styles.tab({ active: tab === item, emphasis: tabEmphasis })}
              onClick={() => handleTabChange(item)}
            >
              {PREP_QA_VIEW_TAB_LABELS[item]}
              {showCount && count > 0 ? (
                <span className={styles.tabCount({ emphasis: tabEmphasis })}>
                  {done}/{count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {!isMemoTab && bannerText(tab) ? (
        <div className={styles.banner({ emphasis: tab === "company" || tab === "reverse" })}>
          <div className={styles.bannerLead}>
            <FaInfoCircle className={styles.bannerIcon} aria-hidden="true" />
            <p>{bannerText(tab)}</p>
          </div>
          {questions.length > 0 ? (
            <p className={styles.bannerDone}>
              準備完了 {readyCount} / {questions.length}
              {readyCount === questions.length ? <FaCheck aria-hidden="true" /> : null}
            </p>
          ) : null}
        </div>
      ) : null}

      {isMemoTab ? (
        <div className={styles.memoBox}>
          <p className={styles.memoText}>{detail.memoBodies[tab] ?? "メモはまだありません。"}</p>
        </div>
      ) : (
        <div className={styles.list}>
          {questions.length === 0 ? (
            <p className={styles.itemSnippet}>まだ項目がありません</p>
          ) : (
            questions.map((question, index) => {
              const open = openQuestionId === question.id;
              const emphasis = isSpecificSource(question.source);
              const badgeLabel = sourceBadgeLabel(question.source);
              return (
                <article key={question.id} className={styles.item({ open, emphasis })}>
                  <button
                    type="button"
                    className={styles.itemHeader}
                    aria-expanded={open}
                    onClick={() => handleToggle(question.id)}
                  >
                    <span className={styles.index({ emphasis })} aria-hidden="true">
                      {index + 1}
                    </span>
                    <div className={styles.itemBody}>
                      <div className={styles.titleRow}>
                        <p className={styles.itemTitle}>{question.title}</p>
                        {badgeLabel ? (
                          <span className={styles.specificBadge}>{badgeLabel}</span>
                        ) : null}
                      </div>
                      {!open ? (
                        <p className={styles.itemSnippet}>
                          {question.snippet || "回答が未入力です"}
                        </p>
                      ) : null}
                    </div>
                    <div className={styles.itemMeta}>
                      <span className={styles.statusBadge({ status: question.status })}>
                        {PREP_QUESTION_STATUS_LABELS[question.status]}
                      </span>
                      <p className={styles.updated}>{question.updatedLabel}</p>
                    </div>
                    <span className={styles.itemAction} aria-hidden="true">
                      <FaChevronDown className={styles.chevron({ open })} />
                    </span>
                  </button>
                  {open ? <p className={styles.itemContent}>{question.body}</p> : null}
                </article>
              );
            })
          )}
        </div>
      )}

      {!isMemoTab && (tab === "company" || tab === "reverse") ? (
        <button type="button" className={styles.addButton}>
          <FaPlus aria-hidden="true" />
          {addLabel(tab)}
        </button>
      ) : null}
    </section>
  );
}
