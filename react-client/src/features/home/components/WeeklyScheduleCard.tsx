import { WEEKDAYS } from "../calendarUtils";
import type { WeeklyDaySchedule } from "../types";
import * as layout from "./HomePage.styles";
import * as styles from "./WeeklyScheduleCard.styles";

const WEEKLY_KINDS = ["task", "interview", "deadline"] as const;

type WeeklyKind = (typeof WEEKLY_KINDS)[number];

const KIND_LABELS: Record<WeeklyKind, string> = {
  task: "タスク",
  interview: "面接",
  deadline: "締切",
};

type WeeklyScheduleCardProps = {
  days: WeeklyDaySchedule[];
  todayDate: string;
};

function parseDate(date: string): { day: number; weekday: string; monthDay: string } {
  const parsed = new Date(`${date}T00:00:00`);
  return {
    day: parsed.getDate(),
    weekday: WEEKDAYS[parsed.getDay()] ?? "",
    monthDay: `${parsed.getMonth() + 1}/${parsed.getDate()}`,
  };
}

function weekRangeLabel(days: WeeklyDaySchedule[]): string {
  const first = days[0];
  const last = days[days.length - 1];
  if (!first || !last) {
    return "";
  }
  return `${parseDate(first.date).monthDay} 〜 ${parseDate(last.date).monthDay}`;
}

function activityParts(day: WeeklyDaySchedule): Array<{ kind: WeeklyKind; count: number }> {
  return [
    { kind: "task" as const, count: day.taskCount },
    { kind: "interview" as const, count: day.interviewCount },
    { kind: "deadline" as const, count: day.deadlineCount },
  ].filter((part) => part.count > 0);
}

function totalCount(day: WeeklyDaySchedule): number {
  return day.taskCount + day.interviewCount + day.deadlineCount;
}

function rowLabel(
  monthDay: string,
  weekday: string,
  isToday: boolean,
  parts: Array<{ kind: WeeklyKind; count: number }>,
  total: number
): string {
  const summary =
    parts.length > 0
      ? parts.map((part) => `${KIND_LABELS[part.kind]}${part.count}`).join(" ")
      : "予定なし";
  const today = isToday ? " 今日" : "";
  return `${monthDay} ${weekday}${today} ${summary} 合計${total}件`;
}

export function WeeklyScheduleCard({ days, todayDate }: WeeklyScheduleCardProps) {
  return (
    <section className={layout.card}>
      <div className={styles.header}>
        <div className={styles.headerRow}>
          <h2 className={layout.cardTitle}>今週の予定</h2>
          <p className={styles.range}>{weekRangeLabel(days)}</p>
        </div>
        <div className={styles.legend}>
          {WEEKLY_KINDS.map((kind) => (
            <span key={kind} className={styles.legendItem}>
              <span className={styles.legendSwatch({ kind })} />
              {KIND_LABELS[kind]}
            </span>
          ))}
        </div>
      </div>
      <ul className={styles.list}>
        {days.map((day) => {
          const { day: dayNumber, weekday, monthDay } = parseDate(day.date);
          const isToday = day.date === todayDate;
          const parts = activityParts(day);
          const total = totalCount(day);

          return (
            <li
              key={day.date}
              className={styles.item}
              aria-label={rowLabel(monthDay, weekday, isToday, parts, total)}
            >
              <div className={styles.dateBadge({ today: isToday })}>
                <span className={styles.dayNumber}>{dayNumber}</span>
                <span className={styles.weekday}>{weekday}</span>
              </div>
              {parts.length > 0 ? (
                <div className={styles.barTrack} aria-hidden="true">
                  {parts.map((part) => (
                    <span
                      key={part.kind}
                      className={styles.barSegment({ kind: part.kind })}
                      style={{ flexGrow: part.count }}
                    />
                  ))}
                </div>
              ) : (
                <p className={styles.empty}>予定なし</p>
              )}
              <p className={styles.total}>{total}件</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
