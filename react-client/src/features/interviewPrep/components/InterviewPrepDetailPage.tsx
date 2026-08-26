import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FaEdit, FaEllipsisH, FaShareAlt } from "react-icons/fa";

import { getInterviewPrepDetail } from "../mocks/interviewPrepDetailMock";
import { INTERVIEW_PHASE_LABELS } from "../types";
import * as styles from "./InterviewPrepDetailPage.styles";
import { InterviewPrepQaPanel } from "./InterviewPrepQaPanel";
import { InterviewPrepSideCard } from "./InterviewPrepSideCard";

type InterviewPrepDetailPageProps = {
  prepId: string;
};

export function InterviewPrepDetailPage({ prepId }: InterviewPrepDetailPageProps) {
  const [now] = useState(() => new Date());
  const detail = useMemo(() => getInterviewPrepDetail(prepId), [prepId]);

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

  const title = `${detail.companyName}（${INTERVIEW_PHASE_LABELS[detail.phase]}）`;

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <p className={styles.breadcrumb}>
          <Link to="/interview-prep" className={styles.breadcrumbLink}>
            面接準備一覧
          </Link>
          <span aria-hidden="true">/</span>
          <span className={styles.breadcrumbCurrent}>{title}</span>
        </p>
        <div className={styles.titleRow}>
          <div className={styles.titleBlock}>
            <div className={styles.titleLine}>
              <h1 className={styles.title}>{title}</h1>
              <span className={styles.phaseBadge}>{INTERVIEW_PHASE_LABELS[detail.phase]}</span>
            </div>
            <p className={styles.jobLine}>職種：{detail.jobTitle}</p>
          </div>
          <div className={styles.actions}>
            <button type="button" className={styles.iconButton} aria-label="その他">
              <FaEllipsisH aria-hidden="true" />
            </button>
            <button type="button" className={styles.ghostButton}>
              <FaShareAlt aria-hidden="true" />
              共有する
            </button>
            <button type="button" className={styles.primaryButton}>
              <FaEdit aria-hidden="true" />
              編集
            </button>
          </div>
        </div>
      </header>

      <div className={styles.body}>
        <InterviewPrepQaPanel detail={detail} />
        <InterviewPrepSideCard detail={detail} now={now} />
      </div>
    </section>
  );
}
