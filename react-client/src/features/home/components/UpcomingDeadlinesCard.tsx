import { splitDateLabel } from "../calendarUtils";
import { sortDeadlines } from "../sort";
import { DEADLINE_URGENCY_LABELS, type DeadlineUrgency, type UpcomingDeadline } from "../types";
import { urgencyTag } from "./eventKind.styles";
import * as layout from "./HomePage.styles";
import * as styles from "./UpcomingDeadlinesCard.styles";

type UpcomingDeadlinesCardProps = {
  deadlines: UpcomingDeadline[];
};

function countByUrgency(deadlines: UpcomingDeadline[]): Record<DeadlineUrgency, number> {
  return {
    tomorrow: deadlines.filter((item) => item.urgency === "tomorrow").length,
    inTwoDays: deadlines.filter((item) => item.urgency === "inTwoDays").length,
    inThreeDays: deadlines.filter((item) => item.urgency === "inThreeDays").length,
  };
}

export function UpcomingDeadlinesCard({ deadlines }: UpcomingDeadlinesCardProps) {
  const sorted = sortDeadlines(deadlines);
  const counts = countByUrgency(deadlines);
  const tomorrowCount = counts.tomorrow;

  return (
    <section className={layout.card}>
      <div className={styles.header}>
        <div className={styles.headerRow}>
          <h2 className={layout.cardTitle}>3日以内の締切</h2>
          <p className={styles.summary}>
            {tomorrowCount > 0 ? `明日 ${tomorrowCount}件` : `${deadlines.length}件`}
          </p>
        </div>
        <div className={styles.urgencyBar} aria-hidden="true">
          {(Object.keys(counts) as DeadlineUrgency[]).map((urgency) =>
            counts[urgency] > 0 ? (
              <span
                key={urgency}
                className={styles.urgencySegment({ urgency })}
                style={{ flexGrow: counts[urgency] }}
              />
            ) : null
          )}
        </div>
      </div>
      <ul className={styles.list}>
        {sorted.map((deadline) => {
          const { month, day } = splitDateLabel(deadline.dateLabel);
          return (
            <li
              key={deadline.id}
              className={styles.item}
              aria-label={`${deadline.dateLabel} ${deadline.title} ${deadline.companyName} ${DEADLINE_URGENCY_LABELS[deadline.urgency]}`}
            >
              <div className={styles.dateBadge({ urgency: deadline.urgency })}>
                <span className={styles.dateMonth}>{month}月</span>
                <span className={styles.dateDay}>{day}</span>
              </div>
              <div className={styles.body}>
                <p className={styles.title}>{deadline.title}</p>
                <p className={styles.company}>{deadline.companyName}</p>
              </div>
              <span className={urgencyTag({ urgency: deadline.urgency })}>
                {DEADLINE_URGENCY_LABELS[deadline.urgency]}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
