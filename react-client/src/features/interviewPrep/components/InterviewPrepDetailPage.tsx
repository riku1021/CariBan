import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { summarizePrepQaTabCounts } from "../interviewPrepQaUtils";
import { getInterviewPrepDetail } from "../mocks/interviewPrepDetailMock";
import type { PrepQaViewTab } from "../types";
import * as styles from "./InterviewPrepDetailPage.styles";
import { InterviewPrepOverviewBar } from "./InterviewPrepOverviewBar";
import { InterviewPrepQaFilterBar } from "./InterviewPrepQaFilterBar";
import { InterviewPrepQaPanel } from "./InterviewPrepQaPanel";
import { InterviewPrepSideCard } from "./InterviewPrepSideCard";

type InterviewPrepDetailPageProps = {
  prepId: string;
};

export function InterviewPrepDetailPage({ prepId }: InterviewPrepDetailPageProps) {
  const [now] = useState(() => new Date());
  const [tab, setTab] = useState<PrepQaViewTab>("all");
  const detail = useMemo(() => getInterviewPrepDetail(prepId), [prepId]);
  const tabCounts = useMemo(() => (detail ? summarizePrepQaTabCounts(detail) : null), [detail]);

  if (!detail) {
    return (
      <section className={styles.page}>
        <p className={styles.empty}>指定された面接準備が見つかりません</p>
        <div className={styles.emptyActions}>
          <Link to="/interview-prep" className={styles.primaryButton}>
            一覧に戻る
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <InterviewPrepOverviewBar detail={detail} now={now} />
      </header>

      <div className={styles.body}>
        <div className={styles.mainColumn}>
          {tabCounts ? (
            <InterviewPrepQaFilterBar tab={tab} tabCounts={tabCounts} onTabChange={setTab} />
          ) : null}
          <InterviewPrepQaPanel detail={detail} tab={tab} />
        </div>
        <InterviewPrepSideCard detail={detail} now={now} />
      </div>
    </section>
  );
}
