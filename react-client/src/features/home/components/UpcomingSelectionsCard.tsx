import { splitDateLabel } from "../calendarUtils";
import { sortSelections } from "../sort";
import {
  CALENDAR_EVENT_KINDS,
  type CalendarEventKind,
  EVENT_KIND_LABELS,
  type UpcomingSelection,
} from "../types";
import { eventTag } from "./eventKind.styles";
import * as layout from "./HomePage.styles";
import * as styles from "./UpcomingSelectionsCard.styles";

type UpcomingSelectionsCardProps = {
  selections: UpcomingSelection[];
};

function countByKind(selections: UpcomingSelection[]): Record<CalendarEventKind, number> {
  const counts = Object.fromEntries(CALENDAR_EVENT_KINDS.map((kind) => [kind, 0])) as Record<
    CalendarEventKind,
    number
  >;
  for (const selection of selections) {
    counts[selection.kind] += 1;
  }
  return counts;
}

export function UpcomingSelectionsCard({ selections }: UpcomingSelectionsCardProps) {
  const sorted = sortSelections(selections);
  const counts = countByKind(selections);
  const interviewCount = counts.interview;

  return (
    <section className={layout.card}>
      <div className={styles.header}>
        <div className={styles.headerRow}>
          <h2 className={layout.cardTitle}>直近7日間の予定</h2>
          <p className={styles.summary}>
            {interviewCount > 0 ? `面接 ${interviewCount}件` : `${selections.length}件`}
          </p>
        </div>
        <div className={styles.kindBar} aria-hidden="true">
          {CALENDAR_EVENT_KINDS.map((kind) =>
            counts[kind] > 0 ? (
              <span
                key={kind}
                className={styles.kindSegment({ kind })}
                style={{ flexGrow: counts[kind] }}
              />
            ) : null
          )}
        </div>
      </div>
      <ul className={styles.list}>
        {sorted.map((selection) => {
          const { month, day } = splitDateLabel(selection.dateLabel);
          return (
            <li
              key={selection.id}
              className={styles.item}
              aria-label={`${selection.dateLabel} ${selection.timeRange} ${selection.title} ${selection.companyName} ${EVENT_KIND_LABELS[selection.kind]}`}
            >
              <div className={styles.dateBadge({ kind: selection.kind })}>
                <span className={styles.dateMonth}>{month}月</span>
                <span className={styles.dateDay}>{day}</span>
              </div>
              <div className={styles.body}>
                <p className={styles.title}>{selection.title}</p>
                <p className={styles.meta}>
                  {selection.timeRange} · {selection.companyName}
                </p>
              </div>
              <span className={eventTag({ kind: selection.kind })}>
                {EVENT_KIND_LABELS[selection.kind]}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
