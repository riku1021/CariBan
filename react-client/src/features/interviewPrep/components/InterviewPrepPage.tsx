import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";

import {
  filterInterviewPreps,
  groupInterviewPreps,
  sortInterviewPreps,
  summarizeInterviewPreps,
  summarizeTabCounts,
} from "../interviewPrepQuery";
import { interviewPrepsMock } from "../mocks/interviewPrepsMock";
import type {
  InterviewJobType,
  InterviewPhase,
  InterviewPrepFilterTab,
  InterviewPrepSortOrder,
} from "../types";
import { InterviewPrepFilterBar } from "./InterviewPrepFilterBar";
import { InterviewPrepListSection } from "./InterviewPrepListSection";
import * as styles from "./InterviewPrepPage.styles";
import { InterviewPrepSummaryCards } from "./InterviewPrepSummaryCards";
import { InterviewPrepToolbar } from "./InterviewPrepToolbar";

const INITIAL_VISIBLE = 4;

export function InterviewPrepPage() {
  const [now] = useState(() => new Date());
  const [items] = useState(() => interviewPrepsMock);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<InterviewPrepFilterTab>("all");
  const [jobType, setJobType] = useState<InterviewJobType | "all">("all");
  const [phase, setPhase] = useState<InterviewPhase | "all">("all");
  const [sortOrder, setSortOrder] = useState<InterviewPrepSortOrder>("soonest");
  const [expanded, setExpanded] = useState(false);

  const summary = useMemo(() => summarizeInterviewPreps(items, now), [items, now]);
  const tabCounts = useMemo(() => summarizeTabCounts(items, now), [items, now]);

  const visibleItems = useMemo(
    () =>
      sortInterviewPreps(
        filterInterviewPreps(items, { search, tab, jobType, phase, sortOrder }, now),
        sortOrder
      ),
    [items, search, tab, jobType, phase, sortOrder, now]
  );
  const groups = useMemo(() => groupInterviewPreps(visibleItems, now), [visibleItems, now]);

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <p className={styles.subtitle}>面接予定と準備状況をまとめて確認できます</p>
        </div>
        <button type="button" className={styles.addButton}>
          <FaPlus aria-hidden="true" />
          面接準備を追加
        </button>
      </div>

      <InterviewPrepToolbar
        search={search}
        onSearchChange={setSearch}
        jobType={jobType}
        onJobTypeChange={setJobType}
        phase={phase}
        onPhaseChange={setPhase}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      <InterviewPrepSummaryCards summary={summary} />

      <InterviewPrepFilterBar tab={tab} tabCounts={tabCounts} onTabChange={setTab} />

      <InterviewPrepListSection
        groups={groups}
        now={now}
        expanded={expanded}
        onToggleExpanded={() => setExpanded((current) => !current)}
        visibleLimit={INITIAL_VISIBLE}
      />
    </section>
  );
}
