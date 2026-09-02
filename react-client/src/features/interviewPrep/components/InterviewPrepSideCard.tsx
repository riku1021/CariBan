import { Link } from "@tanstack/react-router";
import {
  FaCalendarAlt,
  FaCheck,
  FaChevronRight,
  FaClock,
  FaEllipsisV,
  FaFlag,
  FaListUl,
  FaMagic,
  FaUserCircle,
  FaUserFriends,
  FaVideo,
} from "react-icons/fa";

import { SelectionStageStepper } from "@/components/SelectionStageStepper";

import { formatCountdown, formatScheduleLabel, prepPercent } from "../interviewPrepDate";
import {
  INTERVIEW_FORMAT_LABELS,
  INTERVIEW_PHASE_LABELS,
  type InterviewPrepDetail,
} from "../types";
import * as styles from "./InterviewPrepSideCard.styles";

type InterviewPrepSideCardProps = {
  detail: InterviewPrepDetail;
  now: Date;
};

function isOverdueCountdown(label: string): boolean {
  return label.includes("超過");
}

function isUrgentDue(dueLabel: string): boolean {
  return dueLabel.includes("今日") || dueLabel.includes("期限");
}

export function InterviewPrepSideCard({ detail, now }: InterviewPrepSideCardProps) {
  const percent = prepPercent(detail);
  const scheduleLabel = detail.scheduledAt
    ? formatScheduleLabel(detail.scheduledAt, now)
    : "日時未定";
  const countdown =
    detail.scheduledAt && !detail.completed ? formatCountdown(detail.scheduledAt, now) : null;
  const visibleMissing = detail.missingItems.slice(0, 3);
  const restMissing = detail.missingItems.length - visibleMissing.length;

  return (
    <aside className={styles.card}>
      <div className={styles.companyHeader}>
        <span className={styles.mark} aria-hidden="true">
          {detail.initials}
        </span>
        <div className={styles.companyText}>
          <p className={styles.companyName}>{detail.companyName}</p>
          <span className={styles.phaseBadge}>
            <span className={styles.phaseDot} aria-hidden="true" />
            {INTERVIEW_PHASE_LABELS[detail.phase]}
          </span>
        </div>
        <button type="button" className={styles.menuButton} aria-label="その他">
          <FaEllipsisV aria-hidden="true" />
        </button>
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FaMagic className={styles.sectionIcon} aria-hidden="true" />
          面接サマリー
        </h3>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryPrimary}>
            <span className={styles.tileLabelRow}>
              <FaCalendarAlt aria-hidden="true" />
              面接日時
            </span>
            <p className={styles.tileValue}>{scheduleLabel}</p>
            {countdown ? (
              <span
                className={isOverdueCountdown(countdown) ? styles.overdueBadge : styles.remainBadge}
              >
                <FaClock aria-hidden="true" />
                {countdown}
              </span>
            ) : null}
          </div>
          <div className={styles.summarySide}>
            <div className={styles.summaryTile}>
              <span className={styles.tileLabelRow}>
                <FaFlag aria-hidden="true" />
                面接フェーズ
              </span>
              <p className={styles.tileValueAccent}>{INTERVIEW_PHASE_LABELS[detail.phase]}</p>
            </div>
            <div className={styles.summaryTile}>
              <span className={styles.tileLabelRow}>
                <FaVideo aria-hidden="true" />
                面接形式
              </span>
              <p className={styles.tileValue}>{INTERVIEW_FORMAT_LABELS[detail.format]}</p>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.interviewersCard}>
        <span className={styles.interviewersLabel}>
          <FaUserFriends aria-hidden="true" />
          面接官
        </span>
        <ul className={styles.interviewersList}>
          {detail.interviewers.map((person, index) => (
            <li key={`${person.role}-${person.name}`} className={styles.interviewerRow}>
              <span
                className={styles.interviewerAvatar({ tone: index === 0 ? "hr" : "field" })}
                aria-hidden="true"
              >
                <FaUserCircle />
              </span>
              <p className={styles.interviewerName}>
                {person.role}：{person.name}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>選考フロー</h3>
        <SelectionStageStepper
          stages={detail.stages}
          currentStageIndex={detail.currentStageIndex}
        />
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>準備状況</h3>
        <div className={styles.prepRow}>
          <div className={styles.ringWrap}>
            <svg
              className={styles.ringSvg}
              viewBox="0 0 36 36"
              role="img"
              aria-label={`準備率 ${percent}%`}
            >
              <circle className={styles.ringTrack} cx="18" cy="18" r="15.5" />
              <circle
                className={styles.ringProgress}
                cx="18"
                cy="18"
                r="15.5"
                strokeDasharray={`${percent} ${100 - percent}`}
                pathLength="100"
              />
            </svg>
            <span className={styles.ringCenter} aria-hidden="true">
              {percent}%
            </span>
          </div>
          <div className={styles.prepBreakdown}>
            <div className={styles.prepLine}>
              <FaListUl className={styles.prepLineIcon} aria-hidden="true" />
              <span>共通質問</span>
              <span className={styles.prepCount}>
                {detail.commonDone}/{detail.commonTotal}
              </span>
              {detail.commonDone >= detail.commonTotal ? (
                <FaCheck className={styles.prepOk} aria-hidden="true" />
              ) : (
                <span />
              )}
            </div>
            <div className={styles.prepLine}>
              <FaListUl className={styles.prepLineIcon} aria-hidden="true" />
              <span>企業別質問</span>
              <span className={styles.prepCount}>
                {detail.companyDone}/{detail.companyTotal}
              </span>
              {detail.companyDone >= detail.companyTotal ? (
                <FaCheck className={styles.prepOk} aria-hidden="true" />
              ) : (
                <span />
              )}
            </div>
            <div className={styles.prepLine}>
              <FaCheck className={styles.prepLineIcon} aria-hidden="true" />
              <span>関連タスク</span>
              <span className={styles.prepCount}>
                {detail.taskDone}/{detail.taskTotal}
              </span>
              {detail.taskDone >= detail.taskTotal ? (
                <FaCheck className={styles.prepOk} aria-hidden="true" />
              ) : (
                <span />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>不足している項目</h3>
        {detail.missingItems.length === 0 ? (
          <div className={styles.missingOkCard}>
            <span className={styles.missingOkIcon} aria-hidden="true">
              <FaCheck />
            </span>
            <div className={styles.missingOkText}>
              <p className={styles.missingOkTitle}>不足なし</p>
              <p className={styles.missingOkBody}>すべて順調に準備が進んでいます！</p>
            </div>
          </div>
        ) : (
          <div className={styles.missingTags}>
            {visibleMissing.map((item) => (
              <span key={item} className={styles.missingTag}>
                {item}
              </span>
            ))}
            {restMissing > 0 ? <span className={styles.missingTag}>+{restMissing}</span> : null}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>関連タスク</h3>
        <ul className={styles.taskList}>
          {detail.relatedTasks.map((task) => {
            const urgent = !task.completed && isUrgentDue(task.dueLabel);
            return (
              <li key={task.id} className={styles.taskItem}>
                <span
                  className={styles.taskCheck({ completed: task.completed })}
                  aria-hidden="true"
                >
                  <FaCheck />
                </span>
                <div className={styles.taskBody}>
                  <p className={styles.taskTitle({ completed: task.completed })}>{task.title}</p>
                  <p className={styles.taskDue({ urgent })}>{task.dueLabel}</p>
                </div>
                {task.completed ? (
                  <span className={styles.taskBadge({ tone: "done" })}>完了</span>
                ) : (
                  <span className={styles.taskBadge({ tone: "due" })} aria-hidden="true">
                    <FaCalendarAlt />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
        <Link to="/tasks" className={styles.taskLink}>
          タスク一覧を開く
          <FaChevronRight aria-hidden="true" />
        </Link>
      </section>
    </aside>
  );
}
