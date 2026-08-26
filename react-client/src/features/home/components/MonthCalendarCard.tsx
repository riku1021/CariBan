import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import { WEEKDAYS } from "../calendarUtils";
import {
  CALENDAR_EVENT_KINDS,
  type CalendarEventKind,
  type DashboardCalendar,
  EVENT_KIND_LABELS,
} from "../types";
import { eventDot } from "./eventKind.styles";
import * as layout from "./HomePage.styles";
import * as styles from "./MonthCalendarCard.styles";

const GRID_CELL_COUNT = 42;

type MonthCalendarCardProps = {
  calendar: DashboardCalendar;
};

type CalendarCell = {
  date: string;
  day: number;
  kinds: CalendarEventKind[];
  outside: boolean;
  isToday: boolean;
  weekday: number;
};

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${pad(month)}-${pad(day)}`;
}

function parseIsoDate(isoDate: string): { year: number; month: number; day: number } {
  const [year = 0, month = 0, day = 0] = isoDate.split("-").map(Number);
  return { year, month, day };
}

function shiftMonth(year: number, month: number, delta: number): { year: number; month: number } {
  const next = new Date(year, month - 1 + delta, 1);
  return { year: next.getFullYear(), month: next.getMonth() + 1 };
}

function buildMonthCells(
  year: number,
  month: number,
  eventMap: Map<string, CalendarEventKind[]>,
  todayDate: string
): CalendarCell[] {
  const firstOfMonth = new Date(year, month - 1, 1);
  const gridStart = new Date(year, month - 1, 1 - firstOfMonth.getDay());
  const cells: CalendarCell[] = [];

  for (let index = 0; index < GRID_CELL_COUNT; index += 1) {
    const current = new Date(gridStart);
    current.setDate(gridStart.getDate() + index);
    const cellYear = current.getFullYear();
    const cellMonth = current.getMonth() + 1;
    const cellDay = current.getDate();
    const date = toDateKey(cellYear, cellMonth, cellDay);
    cells.push({
      date,
      day: cellDay,
      kinds: eventMap.get(date) ?? [],
      outside: cellYear !== year || cellMonth !== month,
      isToday: date === todayDate,
      weekday: current.getDay(),
    });
  }

  return cells;
}

function countMonthEvents(year: number, month: number, days: DashboardCalendar["days"]): number {
  const prefix = `${year}-${pad(month)}-`;
  return days.filter((item) => item.date.startsWith(prefix)).length;
}

export function MonthCalendarCard({ calendar }: MonthCalendarCardProps) {
  // TODO: API 化時は表示月 (viewYear/viewMonth) を queryKey に含め、月単位で取得する
  const today = parseIsoDate(calendar.todayDate);
  const [viewYear, setViewYear] = useState(calendar.year);
  const [viewMonth, setViewMonth] = useState(calendar.month);

  const eventMap = new Map(calendar.days.map((item) => [item.date, item.eventKinds]));
  const cells = buildMonthCells(viewYear, viewMonth, eventMap, calendar.todayDate);
  const eventCount = countMonthEvents(viewYear, viewMonth, calendar.days);
  const isViewingTodayMonth = viewYear === today.year && viewMonth === today.month;

  const goPrevMonth = () => {
    const next = shiftMonth(viewYear, viewMonth, -1);
    setViewYear(next.year);
    setViewMonth(next.month);
  };

  const goNextMonth = () => {
    const next = shiftMonth(viewYear, viewMonth, 1);
    setViewYear(next.year);
    setViewMonth(next.month);
  };

  const goToday = () => {
    setViewYear(today.year);
    setViewMonth(today.month);
  };

  return (
    <section className={layout.card}>
      <div className={styles.header}>
        <h2 className={layout.cardTitle}>今月の予定</h2>
        <p className={styles.summary}>{eventCount}件</p>
        <div className={styles.monthControls}>
          <button
            type="button"
            className={styles.navButton}
            onClick={goPrevMonth}
            aria-label="前の月へ"
          >
            <MdChevronLeft className={styles.navIcon} aria-hidden />
          </button>
          <p className={styles.monthLabel}>
            {viewYear}年{viewMonth}月
          </p>
          <button
            type="button"
            className={styles.navButton}
            onClick={goNextMonth}
            aria-label="次の月へ"
          >
            <MdChevronRight className={styles.navIcon} aria-hidden />
          </button>
        </div>
        <button
          type="button"
          className={styles.todayButton({ visible: !isViewingTodayMonth })}
          onClick={goToday}
          disabled={isViewingTodayMonth}
          tabIndex={isViewingTodayMonth ? -1 : undefined}
          aria-hidden={isViewingTodayMonth}
        >
          今日
        </button>
      </div>
      <div className={styles.weekRow}>
        {WEEKDAYS.map((label, index) => (
          <span
            key={label}
            className={styles.weekday({
              tone: index === 0 ? "sunday" : index === 6 ? "saturday" : "weekday",
            })}
          >
            {label}
          </span>
        ))}
      </div>
      <div className={styles.dayGrid}>
        {cells.map((cell) => (
          <div
            key={cell.date}
            className={styles.dayCell({
              outside: cell.outside,
              hasEvents: cell.kinds.length > 0 && !cell.outside,
              today: cell.isToday,
            })}
          >
            <span
              className={styles.dayNumber({
                today: cell.isToday,
                outside: cell.outside,
                weekend: cell.weekday === 0 ? "sunday" : cell.weekday === 6 ? "saturday" : "none",
              })}
            >
              {cell.day}
            </span>
            <span className={styles.dots}>
              {cell.kinds.slice(0, 3).map((kind) => (
                <span key={kind} className={eventDot({ kind })} />
              ))}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.legend}>
        {CALENDAR_EVENT_KINDS.map((kind) => (
          <span key={kind} className={styles.legendItem}>
            <span className={eventDot({ kind })} />
            {EVENT_KIND_LABELS[kind]}
          </span>
        ))}
      </div>
    </section>
  );
}
