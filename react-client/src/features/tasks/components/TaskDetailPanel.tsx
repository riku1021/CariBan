import { FaCalendarAlt, FaCheck, FaClock, FaEdit, FaHourglassHalf, FaTag } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";

import {
  detailDueTone,
  formatCountdown,
  formatDetailDue,
  formatEstimatedMinutes,
} from "../taskDate";
import { TASK_CATEGORY_LABELS, TASK_PRIORITY_LABELS, type TaskItem } from "../types";
import * as styles from "./TaskDetailPanel.styles";
import * as listStyles from "./TaskListSection.styles";

type TaskDetailPanelProps = {
  task: TaskItem | null;
  now: Date;
  onComplete: (taskId: string) => void;
};

function statusTone(
  task: TaskItem,
  now: Date
): { tone: "open" | "overdue" | "done"; label: string } {
  if (task.completed) {
    return { tone: "done", label: "完了" };
  }
  if (detailDueTone(task.dueAt, now, false) === "overdue") {
    return { tone: "overdue", label: "期限切れ" };
  }
  return { tone: "open", label: "未完了" };
}

export function TaskDetailPanel({ task, now, onComplete }: TaskDetailPanelProps) {
  if (!task) {
    return (
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>タスク詳細</h2>
        <p className={styles.empty}>タスクを選択してください</p>
      </section>
    );
  }

  const dueTone = detailDueTone(task.dueAt, now, task.completed);
  const status = statusTone(task, now);

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.cardTitle}>タスク詳細</h2>
        <span className={styles.statusBadge({ tone: status.tone })}>{status.label}</span>
      </div>

      <div className={styles.heading}>
        <div className={styles.chipRow}>
          <span className={listStyles.categoryTag({ category: task.category })}>
            {TASK_CATEGORY_LABELS[task.category]}
          </span>
          <span className={styles.priorityChip({ priority: task.priority })}>
            {TASK_PRIORITY_LABELS[task.priority]}
          </span>
        </div>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{task.title}</h3>
          <p className={styles.companyBeside}>
            <span className={styles.companyMark} aria-hidden="true">
              {task.companyName.slice(0, 1)}
            </span>
            <span className={styles.companyName}>{task.companyName}</span>
          </p>
        </div>
        {task.selectionStage ? (
          <p className={styles.companyStage}>選考: {task.selectionStage}</p>
        ) : null}
      </div>

      <div className={styles.body}>
        <div className={styles.metaGrid}>
          <div className={styles.metaCard}>
            <p className={styles.metaLabel}>
              <FaCalendarAlt className={styles.metaIcon} aria-hidden="true" />
              期限
            </p>
            <p className={styles.metaValue({ tone: dueTone })}>
              {formatDetailDue(task.dueAt, now)}
            </p>
            <p className={styles.metaHint}>{formatCountdown(task.dueAt, now)}</p>
          </div>
          <div className={styles.metaCard}>
            <p className={styles.metaLabel}>
              <FaClock className={styles.metaIcon} aria-hidden="true" />
              目安時刻
            </p>
            <p className={styles.metaValue()}>{task.plannedTime ?? "未設定"}</p>
            <p className={styles.metaHint}>作業開始の目安</p>
          </div>
          <div className={styles.metaCard}>
            <p className={styles.metaLabel}>
              <FaHourglassHalf className={styles.metaIcon} aria-hidden="true" />
              所要時間
            </p>
            <p className={styles.metaValue()}>{formatEstimatedMinutes(task.estimatedMinutes)}</p>
            <p className={styles.metaHint}>完了までの目安</p>
          </div>
          <div className={styles.metaCard}>
            <p className={styles.metaLabel}>
              <FaTag className={styles.metaIcon} aria-hidden="true" />
              種別
            </p>
            <p className={styles.metaValue()}>{task.typeLabel}</p>
            <p className={styles.metaHint}>タスクの分類</p>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.companyLink}>
          企業ページを見る
          <MdOpenInNew aria-hidden="true" />
        </button>
        <div className={styles.actionRow}>
          <button type="button" className={styles.actionButton({ tone: "edit" })}>
            <FaEdit aria-hidden="true" />
            編集
          </button>
          <button
            type="button"
            className={styles.actionButton({ tone: "complete" })}
            onClick={() => onComplete(task.id)}
            disabled={task.completed}
          >
            <FaCheck aria-hidden="true" />
            {task.completed ? "完了済み" : "完了にする"}
          </button>
        </div>
      </div>
    </section>
  );
}
