import { atom } from "jotai";

import type { CalendarEventKind, TodayTask, UpcomingSelection } from "../types";

export type AddedCalendarEvent = {
  date: string;
  kind: CalendarEventKind;
};

export const addedTasksAtom = atom<TodayTask[]>([]);

export const addedSelectionsAtom = atom<UpcomingSelection[]>([]);

export const addedCalendarEventsAtom = atom<AddedCalendarEvent[]>([]);
