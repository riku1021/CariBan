import type { ReactNode } from "react";
import { FaCalendarAlt, FaClock, FaExclamationTriangle } from "react-icons/fa";

import type { InterviewPrepSummary } from "../types";
import * as styles from "./InterviewPrepSummaryCards.styles";

type InterviewPrepSummaryCardsProps = {
  summary: InterviewPrepSummary;
};

type Accent = "today" | "tomorrow" | "within7" | "insufficient";

function SummaryCard({
  accent,
  label,
  value,
  caption,
  icon,
}: {
  accent: Accent;
  label: string;
  value: number;
  caption: string;
  icon: ReactNode;
}) {
  return (
    <section className={styles.card({ accent })}>
      <div className={styles.body}>
        <div className={styles.labelRow}>
          <span className={styles.icon({ accent })} aria-hidden="true">
            {icon}
          </span>
          <p className={styles.label}>{label}</p>
        </div>
        <div className={styles.valueRow}>
          <p className={styles.value}>{value}</p>
          <span className={styles.unit}>件</span>
        </div>
        <p className={styles.caption}>{caption}</p>
      </div>
    </section>
  );
}

export function InterviewPrepSummaryCards({ summary }: InterviewPrepSummaryCardsProps) {
  return (
    <div className={styles.row}>
      <SummaryCard
        accent="today"
        label="今日の面接"
        value={summary.todayCount}
        caption={summary.todayCount > 0 ? "準備すべき面接があります" : "なし"}
        icon={<FaCalendarAlt />}
      />
      <SummaryCard
        accent="tomorrow"
        label="明日の面接"
        value={summary.tomorrowCount}
        caption={summary.tomorrowCount > 0 ? "準備すべき面接があります" : "なし"}
        icon={<FaCalendarAlt />}
      />
      <SummaryCard
        accent="within7"
        label="7日以内"
        value={summary.within7Count}
        caption="今後の面接予定です"
        icon={<FaClock />}
      />
      <SummaryCard
        accent="insufficient"
        label="準備不足"
        value={summary.insufficientCount}
        caption={summary.insufficientCount > 0 ? "準備が不十分な面接です" : "なし"}
        icon={<FaExclamationTriangle />}
      />
    </div>
  );
}
