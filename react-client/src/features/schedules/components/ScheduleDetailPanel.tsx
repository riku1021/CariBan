import {
  FaCalendarAlt,
  FaCheck,
  FaClock,
  FaEdit,
  FaHourglassHalf,
  FaMapMarkerAlt,
  FaTag,
} from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";

import {
  detailStartTone,
  durationMinutes,
  formatCountdown,
  formatDetailStart,
  formatDurationMinutes,
  formatTimeRange,
} from "../scheduleDate";
import { SCHEDULE_KIND_LABELS, type ScheduleItem } from "../types";
import * as styles from "./ScheduleDetailPanel.styles";
import * as listStyles from "./ScheduleListSection.styles";

type ScheduleDetailPanelProps = {
  schedule: ScheduleItem | null;
  now: Date;
  onComplete: (scheduleId: string) => void;
};

function statusTone(
  schedule: ScheduleItem,
  now: Date
): { tone: "open" | "overdue" | "done"; label: string } {
  if (schedule.completed) {
    return { tone: "done", label: "完了" };
  }
  if (detailStartTone(schedule.startsAt, now, false) === "overdue") {
    return { tone: "overdue", label: "期限切れ" };
  }
  return { tone: "open", label: "未実施" };
}

export function ScheduleDetailPanel({ schedule, now, onComplete }: ScheduleDetailPanelProps) {
  if (!schedule) {
    return (
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>予定詳細</h2>
        <p className={styles.empty}>予定を選択してください</p>
      </section>
    );
  }

  const startTone = detailStartTone(schedule.startsAt, now, schedule.completed);
  const status = statusTone(schedule, now);

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.cardTitle}>予定詳細</h2>
        <span className={styles.statusBadge({ tone: status.tone })}>{status.label}</span>
      </div>

      <div className={styles.heading}>
        <div className={styles.chipRow}>
          <span className={listStyles.kindTag({ kind: schedule.kind })}>
            {SCHEDULE_KIND_LABELS[schedule.kind]}
          </span>
        </div>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{schedule.title}</h3>
          <p className={styles.companyBeside}>
            <span className={styles.companyMark} aria-hidden="true">
              {schedule.companyName.slice(0, 1)}
            </span>
            <span className={styles.companyName}>{schedule.companyName}</span>
          </p>
        </div>
        {schedule.selectionStage ? (
          <p className={styles.companyStage}>選考: {schedule.selectionStage}</p>
        ) : null}
      </div>

      <div className={styles.body}>
        <div className={styles.metaGrid}>
          <div className={styles.metaCard}>
            <p className={styles.metaLabel}>
              <FaCalendarAlt className={styles.metaIcon} aria-hidden="true" />
              開始
            </p>
            <p className={styles.metaValue({ tone: startTone })}>
              {formatDetailStart(schedule.startsAt, now)}
            </p>
            <p className={styles.metaHint}>{formatCountdown(schedule.startsAt, now)}</p>
          </div>
          <div className={styles.metaCard}>
            <p className={styles.metaLabel}>
              <FaClock className={styles.metaIcon} aria-hidden="true" />
              時間帯
            </p>
            <p className={styles.metaValue()}>
              {formatTimeRange(schedule.startsAt, schedule.endsAt)}
            </p>
            <p className={styles.metaHint}>開始〜終了</p>
          </div>
          <div className={styles.metaCard}>
            <p className={styles.metaLabel}>
              <FaHourglassHalf className={styles.metaIcon} aria-hidden="true" />
              所要時間
            </p>
            <p className={styles.metaValue()}>
              {formatDurationMinutes(durationMinutes(schedule.startsAt, schedule.endsAt))}
            </p>
            <p className={styles.metaHint}>枠の長さ</p>
          </div>
          <div className={styles.metaCard}>
            <p className={styles.metaLabel}>
              {schedule.location ? (
                <FaMapMarkerAlt className={styles.metaIcon} aria-hidden="true" />
              ) : (
                <FaTag className={styles.metaIcon} aria-hidden="true" />
              )}
              {schedule.location ? "場所" : "種別"}
            </p>
            <p className={styles.metaValue()}>
              {schedule.location ?? SCHEDULE_KIND_LABELS[schedule.kind]}
            </p>
            <p className={styles.metaHint}>{schedule.location ? "実施場所" : "予定の分類"}</p>
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
            onClick={() => onComplete(schedule.id)}
            disabled={schedule.completed}
          >
            <FaCheck aria-hidden="true" />
            {schedule.completed ? "完了済み" : "完了にする"}
          </button>
        </div>
      </div>
    </section>
  );
}
