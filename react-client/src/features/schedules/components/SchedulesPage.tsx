import { useMemo, useState } from "react";

import { schedulesMock } from "../mocks/schedulesMock";
import {
  computeProgress,
  filterSchedules,
  groupSchedules,
  listCompanyNames,
  sortSchedules,
  summarizeSchedules,
  summarizeTabCounts,
} from "../scheduleQuery";
import type { ScheduleFilterTab, ScheduleItem, ScheduleKind, ScheduleSortOrder } from "../types";
import { ScheduleDetailPanel } from "./ScheduleDetailPanel";
import { ScheduleFilterBar } from "./ScheduleFilterBar";
import { ScheduleListSection } from "./ScheduleListSection";
import { ScheduleProgressCard } from "./ScheduleProgressCard";
import { ScheduleSummaryCards } from "./ScheduleSummaryCards";
import * as styles from "./SchedulesPage.styles";
import { ScheduleToolbar } from "./ScheduleToolbar";

function toggleComplete(
  schedules: ScheduleItem[],
  scheduleId: string,
  completed: boolean
): ScheduleItem[] {
  return schedules.map((schedule) =>
    schedule.id === scheduleId ? { ...schedule, completed } : schedule
  );
}

export function SchedulesPage() {
  const [now] = useState(() => new Date());
  const [schedules, setSchedules] = useState<ScheduleItem[]>(() => schedulesMock);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>("schedule-2");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<ScheduleFilterTab>("all");
  const [kind, setKind] = useState<ScheduleKind | "all">("all");
  const [companyName, setCompanyName] = useState<string | "all">("all");
  const [sortOrder, setSortOrder] = useState<ScheduleSortOrder>("startSoon");

  const summary = useMemo(() => summarizeSchedules(schedules, now), [schedules, now]);
  const tabCounts = useMemo(() => summarizeTabCounts(schedules, now), [schedules, now]);
  const progress = useMemo(() => computeProgress(schedules, now), [schedules, now]);
  const companyNames = useMemo(() => listCompanyNames(schedules), [schedules]);

  const visibleSchedules = useMemo(
    () =>
      sortSchedules(
        filterSchedules(schedules, { search, tab, kind, companyName, sortOrder }, now),
        sortOrder
      ),
    [schedules, search, tab, kind, companyName, sortOrder, now]
  );
  const groups = useMemo(() => groupSchedules(visibleSchedules, now), [visibleSchedules, now]);

  const selectedSchedule =
    schedules.find((schedule) => schedule.id === selectedScheduleId) ?? visibleSchedules[0] ?? null;

  const handleToggleComplete = (scheduleId: string) => {
    setSchedules((current) => {
      const target = current.find((schedule) => schedule.id === scheduleId);
      if (!target) {
        return current;
      }
      return toggleComplete(current, scheduleId, !target.completed);
    });
  };

  const handleComplete = (scheduleId: string) => {
    setSchedules((current) => toggleComplete(current, scheduleId, true));
  };

  return (
    <section className={styles.page}>
      <ScheduleToolbar search={search} onSearchChange={setSearch} />
      <ScheduleSummaryCards summary={summary} />
      <ScheduleFilterBar
        tab={tab}
        tabCounts={tabCounts}
        onTabChange={setTab}
        kind={kind}
        onKindChange={setKind}
        companyName={companyName}
        companyNames={companyNames}
        onCompanyChange={setCompanyName}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />
      <div className={styles.body}>
        <div className={styles.listPane}>
          <ScheduleListSection
            groups={groups}
            selectedScheduleId={selectedSchedule?.id ?? null}
            now={now}
            onSelect={setSelectedScheduleId}
            onToggleComplete={handleToggleComplete}
          />
        </div>
        <div className={styles.sidePane}>
          <ScheduleDetailPanel schedule={selectedSchedule} now={now} onComplete={handleComplete} />
          <ScheduleProgressCard progress={progress} />
        </div>
      </div>
    </section>
  );
}
