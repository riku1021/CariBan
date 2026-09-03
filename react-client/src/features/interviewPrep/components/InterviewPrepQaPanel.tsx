import { useEffect, useMemo, useState } from "react";
import { groupQuestions, listQuestions } from "../interviewPrepQaUtils";
import type { InterviewPrepDetail, PrepQaViewTab } from "../types";
import * as styles from "./InterviewPrepQaPanel.styles";
import { InterviewPrepQuestionDetail } from "./InterviewPrepQuestionDetail";
import { InterviewPrepQuestionList } from "./InterviewPrepQuestionList";

type InterviewPrepQaPanelProps = {
  detail: InterviewPrepDetail;
  tab: PrepQaViewTab;
};

export function InterviewPrepQaPanel({ detail, tab }: InterviewPrepQaPanelProps) {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  const questions = useMemo(() => listQuestions(detail, tab), [detail, tab]);
  const groups = useMemo(() => groupQuestions(questions, tab), [questions, tab]);
  const isMemoTab = tab === "assumed" || tab === "memo";

  const selectedQuestion = questions.find((question) => question.id === selectedQuestionId) ?? null;
  const questionIndex = selectedQuestion
    ? questions.findIndex((question) => question.id === selectedQuestion.id)
    : null;

  useEffect(() => {
    if (isMemoTab) {
      setSelectedQuestionId(null);
      return;
    }
    if (questions.length === 0) {
      setSelectedQuestionId(null);
      return;
    }
    const stillVisible = questions.some((question) => question.id === selectedQuestionId);
    if (!stillVisible) {
      setSelectedQuestionId(questions[0]?.id ?? null);
    }
  }, [questions, selectedQuestionId, isMemoTab]);

  return (
    <section className={styles.panel}>
      <div className={styles.workspace({ memo: isMemoTab })}>
        {isMemoTab ? null : (
          <div className={styles.listPane}>
            <InterviewPrepQuestionList
              tab={tab}
              groups={groups}
              selectedQuestionId={selectedQuestion?.id ?? null}
              onSelect={setSelectedQuestionId}
            />
          </div>
        )}
        <div className={styles.detailPane}>
          <InterviewPrepQuestionDetail
            detail={detail}
            tab={tab}
            question={selectedQuestion}
            questionIndex={questionIndex}
          />
        </div>
      </div>
    </section>
  );
}
