import {
  FaCalendarAlt,
  FaClock,
  FaLaptop,
  FaMapMarkerAlt,
  FaUserCircle,
  FaUserFriends,
} from "react-icons/fa";

import { formatCountdown, formatScheduleLabel } from "../interviewPrepDate";
import {
  INTERVIEW_FORMAT_LABELS,
  INTERVIEW_PHASE_LABELS,
  type InterviewPrepDetail,
} from "../types";
import * as styles from "./InterviewPrepOverviewBar.styles";

type InterviewPrepOverviewBarProps = {
  detail: InterviewPrepDetail;
  now: Date;
};

function isOverdueCountdown(label: string): boolean {
  return label.includes("超過");
}

export function InterviewPrepOverviewBar({ detail, now }: InterviewPrepOverviewBarProps) {
  const scheduleLabel = detail.scheduledAt
    ? formatScheduleLabel(detail.scheduledAt, now)
    : "日時未定";
  const countdown =
    detail.scheduledAt && !detail.completed ? formatCountdown(detail.scheduledAt, now) : null;
  const FormatIcon = detail.format === "online" ? FaLaptop : FaMapMarkerAlt;

  return (
    <div className={styles.bar}>
      <div className={styles.companyBlock}>
        <span className={styles.mark} aria-hidden="true">
          {detail.initials}
        </span>
        <div className={styles.companyText}>
          <div className={styles.titleLine}>
            <h1 className={styles.companyName}>{detail.companyName}</h1>
            <span className={styles.phaseBadge}>{INTERVIEW_PHASE_LABELS[detail.phase]}</span>
          </div>
          <p className={styles.jobLine}>職種：{detail.jobTitle}</p>
        </div>
      </div>

      <div className={styles.scheduleBlock}>
        <div className={styles.scheduleRow}>
          <p className={styles.scheduleLabel}>
            <FaCalendarAlt className={styles.scheduleIcon} aria-hidden="true" />
            {scheduleLabel}
          </p>
          {countdown ? (
            <span
              className={styles.countdownBadge({
                tone: isOverdueCountdown(countdown) ? "overdue" : "remain",
              })}
            >
              <FaClock aria-hidden="true" />
              {countdown}
            </span>
          ) : null}
        </div>
        <p className={styles.formatLine}>
          <FormatIcon className={styles.formatIcon} aria-hidden="true" />
          {INTERVIEW_FORMAT_LABELS[detail.format]}
        </p>
      </div>

      <div className={styles.interviewersBlock}>
        <p className={styles.interviewersLabel}>
          <FaUserFriends className={styles.interviewersIcon} aria-hidden="true" />
          面接官
        </p>
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
    </div>
  );
}
