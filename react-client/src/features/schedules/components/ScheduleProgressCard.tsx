import { FaCalendarAlt, FaClock } from "react-icons/fa";

import { formatDurationMinutes } from "../scheduleDate";
import type { ScheduleProgress } from "../types";
import * as styles from "./ScheduleProgressCard.styles";

type ScheduleProgressCardProps = {
  progress: ScheduleProgress;
};

export function ScheduleProgressCard({ progress }: ScheduleProgressCardProps) {
  const ratio = progress.todayTotal === 0 ? 0 : progress.todayCompleted / progress.todayTotal;
  const percent = Math.round(ratio * 100);

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>本日の残り予定</h2>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statIcon} aria-hidden="true">
            <FaCalendarAlt />
          </span>
          <div className={styles.statText}>
            <p className={styles.statValue}>{progress.remainingCount} 件</p>
            <p className={styles.statLabel}>未実施の予定</p>
          </div>
        </div>
        <div className={styles.stat}>
          <span className={styles.statIcon} aria-hidden="true">
            <FaClock />
          </span>
          <div className={styles.statText}>
            <p className={styles.statValue}>{formatDurationMinutes(progress.remainingMinutes)}</p>
            <p className={styles.statLabel}>残り枠時間</p>
          </div>
        </div>
      </div>
      <div className={styles.progressBlock}>
        <div className={styles.track} aria-hidden="true">
          <div className={styles.fill} style={{ width: `${percent}%` }} />
        </div>
        <div className={styles.progressFooter}>
          <p className={styles.progressLabel}>今日の進捗 {percent}%</p>
          <p className={styles.progressCount}>
            {progress.todayCompleted}件 / {progress.todayTotal}件
          </p>
        </div>
      </div>
    </section>
  );
}
