import { FaClipboardList, FaClock } from "react-icons/fa";

import { formatEstimatedMinutes } from "../taskDate";
import type { TaskProgress } from "../types";
import * as styles from "./TaskProgressCard.styles";

type TaskProgressCardProps = {
  progress: TaskProgress;
};

export function TaskProgressCard({ progress }: TaskProgressCardProps) {
  const ratio = progress.todayTotal === 0 ? 0 : progress.todayCompleted / progress.todayTotal;
  const percent = Math.round(ratio * 100);

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>本日の残りタスク</h2>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statIcon} aria-hidden="true">
            <FaClipboardList />
          </span>
          <div className={styles.statText}>
            <p className={styles.statValue}>{progress.remainingCount} 件</p>
            <p className={styles.statLabel}>未完了のタスク</p>
          </div>
        </div>
        <div className={styles.stat}>
          <span className={styles.statIcon} aria-hidden="true">
            <FaClock />
          </span>
          <div className={styles.statText}>
            <p className={styles.statValue}>{formatEstimatedMinutes(progress.remainingMinutes)}</p>
            <p className={styles.statLabel}>残り目安時間</p>
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
