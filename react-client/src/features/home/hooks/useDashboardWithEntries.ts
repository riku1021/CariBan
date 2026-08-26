import { useAtomValue } from "jotai";
import { useMemo } from "react";

import {
  addedCalendarEventsAtom,
  addedCompaniesAtom,
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
  const addedCompanies = useAtomValue(addedCompaniesAtom);

  const data = useMemo(() => {
    if (!query.data) {
      return undefined;
    }
    return mergeDashboardEntries({
      data: query.data,
      addedTasks,
      addedSelections,
      addedCalendarEvents,
      addedCompanies,
    });
  }, [query.data, addedTasks, addedSelections, addedCalendarEvents, addedCompanies]);

  return {
    ...query,
    data,
  };
}
