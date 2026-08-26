import type { AddedCalendarEvent } from "./atoms/entriesAtoms";
import type { DashboardCalendar, DashboardData, TodayTask, UpcomingSelection } from "./types";

function mergeCalendar(
  calendar: DashboardCalendar,
  events: AddedCalendarEvent[]
): DashboardCalendar {
  if (events.length === 0) {
    return calendar;
  }

  const daysByDate = new Map(calendar.days.map((day) => [day.date, [...day.eventKinds]]));

  for (const event of events) {
    const kinds = daysByDate.get(event.date) ?? [];
    if (!kinds.includes(event.kind)) {
      kinds.push(event.kind);
    }
    daysByDate.set(event.date, kinds);
  }

  return {
    ...calendar,
    days: [...daysByDate.entries()]
      .map(([date, eventKinds]) => ({ date, eventKinds }))
      .sort((a, b) => a.date.localeCompare(b.date)),
  };
}

type MergeDashboardEntriesParams = {
  data: DashboardData;
  addedTasks: TodayTask[];
  addedSelections: UpcomingSelection[];
  addedCalendarEvents: AddedCalendarEvent[];
};

export function mergeDashboardEntries({
  data,
  addedTasks,
  addedSelections,
  addedCalendarEvents,
}: MergeDashboardEntriesParams): DashboardData {
  return {
    ...data,
    todayTasks: [...addedTasks, ...data.todayTasks],
    upcomingSelections: [...addedSelections, ...data.upcomingSelections],
    calendar: mergeCalendar(data.calendar, addedCalendarEvents),
  };
}
