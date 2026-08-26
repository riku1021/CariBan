import {
  TodayTasksCard,
  UpcomingDeadlinesCard,
  UpcomingSelectionsCard,
  useDashboardWithEntries,
} from "@/features/home";
import { extractApiErrorMessage } from "@/lib/api/extractApiErrorMessage";

import * as styles from "./SelectionsPage.styles";

export function SelectionsPage() {
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
      <TodayTasksCard tasks={data.todayTasks} />
      <UpcomingDeadlinesCard deadlines={data.upcomingDeadlines} />
      <UpcomingSelectionsCard selections={data.upcomingSelections} />
    </section>
  );
}
