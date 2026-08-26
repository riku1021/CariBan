import { extractApiErrorMessage } from "@/lib/api/extractApiErrorMessage";

import { useDashboardWithEntries } from "../hooks/useDashboardWithEntries";
import { CompanyProgressCard } from "./CompanyProgressCard";
import * as styles from "./HomePage.styles";
import { MonthCalendarCard } from "./MonthCalendarCard";
import { StatSummaryCards } from "./StatSummaryCards";
import { TodayTasksCard } from "./TodayTasksCard";
import { UpcomingDeadlinesCard } from "./UpcomingDeadlinesCard";
import { UpcomingSelectionsCard } from "./UpcomingSelectionsCard";

export function HomePage() {
  const { data, isPending, isError, error } = useDashboardWithEntries();

  if (isPending) {
    return (
      <section className={styles.page}>
        <p className={styles.statusText}>ダッシュボードを読み込んでいます...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={styles.page}>
        <p className={styles.statusText}>ダッシュボードを表示できません</p>
        <p className={styles.detailText}>{extractApiErrorMessage(error)}</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className={styles.page}>
        <p className={styles.statusText}>ダッシュボードを読み込んでいます...</p>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <div className={styles.topRow}>
        <MonthCalendarCard calendar={data.calendar} />
        <TodayTasksCard tasks={data.todayTasks} />
        <UpcomingDeadlinesCard deadlines={data.upcomingDeadlines} />
      </div>
      <div className={styles.statRow}>
        <StatSummaryCards stats={data.stats} />
      </div>
      <div className={styles.bottomRow}>
        <CompanyProgressCard companies={data.companyProgress} />
        <UpcomingSelectionsCard selections={data.upcomingSelections} />
      </div>
    </section>
  );
}
