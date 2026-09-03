import { FaCheckCircle, FaPlus, FaRegCircle } from "react-icons/fa";
import {
  addLabel,
  formatQuestionIndex,
  type ListedQuestion,
  type QuestionGroup,
  showsQuestionAddButton,
} from "../interviewPrepQaUtils";
import type { PrepQaViewTab } from "../types";
import * as styles from "./InterviewPrepQuestionList.styles";

type InterviewPrepQuestionListProps = {
  tab: PrepQaViewTab;
  groups: QuestionGroup[];
  selectedQuestionId: string | null;
  onSelect: (questionId: string) => void;
};

function StatusIcon({ status }: { status: ListedQuestion["status"] }) {
  if (status === "ready") {
    return <FaCheckCircle className={styles.statusIcon({ status })} aria-hidden="true" />;
  }
  return <FaRegCircle className={styles.statusIcon({ status })} aria-hidden="true" />;
}

export function InterviewPrepQuestionList({
  tab,
  groups,
  selectedQuestionId,
  onSelect,
}: InterviewPrepQuestionListProps) {
  let globalIndex = 0;

  return (
    <div className={styles.column}>
      <div className={styles.list}>
        {groups.length === 0 ? (
          <p className={styles.empty}>該当する質問はありません</p>
        ) : (
          groups.map((group, groupIndex) => (
            <div
              key={group.id}
              className={styles.group({ divided: groupIndex < groups.length - 1 })}
            >
              <p className={styles.groupHeader}>{group.label}</p>
              {group.items.map((question) => {
                const index = globalIndex;
                globalIndex += 1;
                return (
                  <button
                    key={question.id}
                    type="button"
                    className={styles.row({ selected: question.id === selectedQuestionId })}
                    onClick={() => onSelect(question.id)}
                  >
                    <StatusIcon status={question.status} />
                    <span className={styles.index} aria-hidden="true">
                      {formatQuestionIndex(index)}
                    </span>
                    <p className={styles.rowTitle}>{question.title}</p>
                  </button>
                );
              })}
            </div>
          ))
        )}
      </div>

      {showsQuestionAddButton(tab) ? (
        <div className={styles.footer}>
          <button type="button" className={styles.addButton}>
            <FaPlus aria-hidden="true" />
            {addLabel(tab)}
          </button>
        </div>
      ) : null}
    </div>
  );
}
