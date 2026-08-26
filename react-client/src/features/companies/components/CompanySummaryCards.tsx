import type { ReactNode } from "react";
import { FaBullhorn, FaCheckCircle, FaExclamationTriangle, FaUserFriends } from "react-icons/fa";

import type { CompanySummary, CompanySummaryChange } from "../types";
import * as styles from "./CompanySummaryCards.styles";

type CompanySummaryCardsProps = {
  summary: CompanySummary;
};

type Accent = "inProcess" | "recruiting" | "offer" | "needsAction";

function formatChange(change: CompanySummaryChange): string {
  if (change.direction === "flat") {
    return "前回比 ±0社";
  }
  const sign = change.direction === "up" ? "+" : "-";
  const arrow = change.direction === "up" ? "↑" : "↓";
  return `前回比 ${sign}${change.value}社${arrow}`;
}

function SummaryCard({
  accent,
  label,
  value,
  change,
  icon,
}: {
  accent: Accent;
  label: string;
  value: number;
  change: CompanySummaryChange;
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
          <span className={styles.unit}>社</span>
        </div>
        <p className={styles.caption({ direction: change.direction })}>{formatChange(change)}</p>
      </div>
    </section>
  );
}

export function CompanySummaryCards({ summary }: CompanySummaryCardsProps) {
  return (
    <div className={styles.row}>
      <SummaryCard
        accent="inProcess"
        label="選考中"
        value={summary.inProcessCount}
        change={summary.inProcessChange}
        icon={<FaUserFriends />}
      />
      <SummaryCard
        accent="recruiting"
        label="募集中"
        value={summary.recruitingCount}
        change={summary.recruitingChange}
        icon={<FaBullhorn />}
      />
      <SummaryCard
        accent="offer"
        label="内定"
        value={summary.offerCount}
        change={summary.offerChange}
        icon={<FaCheckCircle />}
      />
      <SummaryCard
        accent="needsAction"
        label="要対応"
        value={summary.needsActionCount}
        change={summary.needsActionChange}
        icon={<FaExclamationTriangle />}
      />
    </div>
  );
}
