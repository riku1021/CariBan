import type { ReactNode } from "react";
import { FaBriefcase, FaCheckCircle, FaComments, FaMedal } from "react-icons/fa";

import type { DashboardStats, StatChange } from "../types";
import * as styles from "./StatSummaryCards.styles";

type StatSummaryCardsProps = {
  stats: DashboardStats;
};

type Accent = "companies" | "interviews" | "tasks" | "offers";

function changeTone(value: number): "up" | "down" | "flat" {
  if (value > 0) {
    return "up";
  }
  if (value < 0) {
    return "down";
  }
  return "flat";
}

function formatChange(change: StatChange): string {
  if (change.value === 0) {
    return "±0 先週比";
  }
  const sign = change.value > 0 ? "+" : "";
  return `${sign}${change.value}${change.unit} 先週比`;
}

function Sparkline({ values }: { values: number[] }) {
  const width = 120;
  const height = 36;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const coords = values.map((value, index) => {
    const x = (index / (values.length - 1)) * width;
    const y = height - ((value - min) / span) * (height - 8) - 4;
    return { x, y };
  });
  const linePoints = coords.map((point) => `${point.x},${point.y}`).join(" ");
  const areaPoints = `0,${height} ${linePoints} ${width},${height}`;
  const last = coords[coords.length - 1];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={styles.chart}
      aria-hidden="true"
    >
      <polygon points={areaPoints} fill="currentColor" opacity="0.15" />
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={linePoints}
      />
      {last ? <circle cx={last.x} cy={last.y} r="2.5" fill="currentColor" /> : null}
    </svg>
  );
}

function BarChart({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  const peakIndex = values.reduce(
    (bestIndex, value, index, list) => (value >= (list[bestIndex] ?? 0) ? index : bestIndex),
    0
  );
  const barKeys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

  return (
    <div className={styles.bars} aria-hidden="true">
      {values.map((value, index) => {
        const key = barKeys[index] ?? `bar-${value}`;
        return (
          <span
            key={key}
            className={styles.bar({ peak: index === peakIndex })}
            style={{ height: `${Math.max((value / max) * 100, 16)}%` }}
          />
        );
      })}
    </div>
  );
}

function Doughnut({ ratio }: { ratio: number }) {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(ratio, 0), 1);
  const percent = Math.round(clamped * 100);

  return (
    <div className={styles.doughnutWrap}>
      <svg viewBox="0 0 40 40" className={styles.doughnut} aria-hidden="true">
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          opacity="0.2"
        />
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeDasharray={`${circumference * clamped} ${circumference}`}
          strokeLinecap="round"
          transform="rotate(-90 20 20)"
        />
        <text
          x="20"
          y="21"
          textAnchor="middle"
          dominantBaseline="middle"
          className={styles.doughnutLabel}
        >
          {percent}%
        </text>
      </svg>
    </div>
  );
}

function StatCard({
  accent,
  label,
  value,
  unit,
  change,
  icon,
  visual,
  caption,
}: {
  accent: Accent;
  label: string;
  value: number;
  unit: string;
  change: StatChange;
  icon: ReactNode;
  visual: ReactNode;
  caption?: string;
}) {
  return (
    <section className={styles.card({ accent })}>
      <div className={styles.body}>
        <div className={styles.labelRow}>
          <span className={styles.iconBadge({ accent })} aria-hidden="true">
            {icon}
          </span>
          <p className={styles.label}>{label}</p>
        </div>
        <div className={styles.valueRow}>
          <p className={styles.value}>{value}</p>
          <span className={styles.unit}>{unit}</span>
        </div>
        <p className={styles.change({ tone: changeTone(change.value) })}>{formatChange(change)}</p>
      </div>
      <div className={styles.visual}>
        {visual}
        {caption ? <p className={styles.caption}>{caption}</p> : null}
      </div>
    </section>
  );
}

export function StatSummaryCards({ stats }: StatSummaryCardsProps) {
  return (
    <>
      <StatCard
        accent="companies"
        label="選考中の企業"
        value={stats.companiesInProcess.value}
        unit="社"
        change={stats.companiesInProcess.change}
        icon={<FaBriefcase />}
        visual={<Sparkline values={stats.companiesInProcess.sparkline} />}
        caption="直近7日"
      />
      <StatCard
        accent="interviews"
        label="今週の面接"
        value={stats.interviewsThisWeek.value}
        unit="件"
        change={stats.interviewsThisWeek.change}
        icon={<FaComments />}
        visual={<BarChart values={stats.interviewsThisWeek.bars} />}
        caption="曜日別"
      />
      <StatCard
        accent="tasks"
        label="未完了タスク"
        value={stats.unfinishedTasks.value}
        unit="件"
        change={stats.unfinishedTasks.change}
        icon={<FaCheckCircle />}
        visual={<Doughnut ratio={stats.unfinishedTasks.completedRatio} />}
      />
      <StatCard
        accent="offers"
        label="内定"
        value={stats.offers.value}
        unit="件"
        change={stats.offers.change}
        icon={<FaMedal />}
        visual={
          <div className={styles.medalWrap} aria-hidden="true">
            <FaMedal />
          </div>
        }
      />
    </>
  );
}
