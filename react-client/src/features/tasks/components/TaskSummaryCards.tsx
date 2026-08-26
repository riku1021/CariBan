import type { ReactNode } from "react";
import { FaCheckCircle, FaClock, FaExclamationTriangle, FaTasks } from "react-icons/fa";

import { formatEstimatedMinutes } from "../taskDate";
import type { TaskSummary } from "../types";
import * as styles from "./TaskSummaryCards.styles";

type TaskSummaryCardsProps = {
  summary: TaskSummary;
};

type Accent = "today" | "impending" | "overdue" | "completed";

function SummaryCard({
  accent,
  label,
  value,
  unit,
  caption,
  icon,
}: {
  accent: Accent;
  label: string;
  value: number;
  unit: string;
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
          <span className={styles.unit}>{unit}</span>
        </div>
        <p className={styles.caption}>{caption}</p>
      </div>
    </section>
  );
}

export function TaskSummaryCards({ summary }: TaskSummaryCardsProps) {
  return (
    <div className={styles.row}>
      <SummaryCard
        accent="today"
        label="今日のタスク"
        value={summary.todayCount}
        unit="件"
        caption={`目安 ${formatEstimatedMinutes(summary.todayEstimatedMinutes)}`}
        icon={<FaTasks />}
      />
      <SummaryCard
        accent="impending"
        label="締切が近い"
        value={summary.impendingCount}
        unit="件"
        caption="24時間以内"
        icon={<FaClock />}
      />
      <SummaryCard
        accent="overdue"
        label="期限切れ"
        value={summary.overdueCount}
        unit="件"
        caption={summary.overdueCount > 0 ? "対応が必要です" : "なし"}
        icon={<FaExclamationTriangle />}
      />
      <SummaryCard
        accent="completed"
        label="完了"
        value={summary.completedCount}
        unit="件"
        caption={`今週 ${summary.completedThisWeekCount}件`}
        icon={<FaCheckCircle />}
      />
    </div>
  );
}
