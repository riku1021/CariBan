import {
  formatQuestionIndex,
  type ListedQuestion,
  sourceBadgeLabel,
} from "../interviewPrepQaUtils";
import {
  type InterviewPrepDetail,
  PREP_QUESTION_STATUS_LABELS,
  type PrepQaViewTab,
} from "../types";
import * as styles from "./InterviewPrepQuestionDetail.styles";

type InterviewPrepQuestionDetailProps = {
  detail: InterviewPrepDetail;
  tab: PrepQaViewTab;
  question: ListedQuestion | null;
  questionIndex: number | null;
};

export function InterviewPrepQuestionDetail({
  detail,
  tab,
  question,
  questionIndex,
}: InterviewPrepQuestionDetailProps) {
  const isMemoTab = tab === "assumed" || tab === "memo";

  if (isMemoTab) {
    return (
      <div className={styles.column}>
        <h2 className={styles.title}>{tab === "assumed" ? "想定質問メモ" : "面接メモ"}</h2>
        <div className={styles.memoBox}>
          <p className={styles.memoText}>{detail.memoBodies[tab] ?? "メモはまだありません。"}</p>
        </div>
      </div>
    );
  }

  if (!question || questionIndex === null) {
    return (
      <div className={styles.column}>
        <p className={styles.empty}>左の一覧から質問を選択してください</p>
      </div>
    );
  }

  const badgeLabel = sourceBadgeLabel(question.source);

  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <div className={styles.titleRow}>
            <span className={styles.indexBadge} aria-hidden="true">
              {formatQuestionIndex(questionIndex)}
            </span>
            <h2 className={styles.title}>{question.title}</h2>
            {badgeLabel ? <span className={styles.specificBadge}>{badgeLabel}</span> : null}
          </div>
        </div>
        <div className={styles.meta}>
          <span className={styles.statusBadge({ status: question.status })}>
            {PREP_QUESTION_STATUS_LABELS[question.status]}
          </span>
          <p className={styles.updated}>{question.updatedLabel}</p>
        </div>
      </div>

      <div className={styles.content}>
        {question.intent.trim() ? (
          <section className={styles.intentSection}>
            <h3 className={styles.intentTitle}>質問の意図</h3>
            <p className={styles.intentText}>{question.intent}</p>
          </section>
        ) : null}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>回答</h3>
          <p className={styles.body}>
            {question.body.trim() || "回答が未入力です。編集モードから内容を追加してください。"}
          </p>
        </section>
      </div>
    </div>
  );
}
