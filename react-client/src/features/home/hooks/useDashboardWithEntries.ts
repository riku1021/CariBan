import { useAtomValue } from "jotai";
import { useMemo } from "react";

import {
  addedCalendarEventsAtom,
  addedSelectionsAtom,
  addedTasksAtom,
} from "../atoms/entriesAtoms";
import { mergeDashboardEntries } from "../mergeDashboardEntries";
import { useDashboardQuery } from "./useDashboardQuery";

export function useDashboardWithEntries() {
  const query = useDashboardQuery();
  const addedTasks = useAtomValue(addedTasksAtom);
  const addedSelections = useAtomValue(addedSelectionsAtom);
  const addedCalendarEvents = useAtomValue(addedCalendarEventsAtom);

  const data = useMemo(() => {
    if (!query.data) {
      return undefined;
    }
    return mergeDashboardEntries({
      data: query.data,
      addedTasks,
      addedSelections,
      addedCalendarEvents,
    });
  }, [query.data, addedTasks, addedSelections, addedCalendarEvents]);

  return {
    ...query,
    data,
  };
}
