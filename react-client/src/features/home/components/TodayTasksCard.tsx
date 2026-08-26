import { sortTodayTasks } from "../sort";
import type { TodayTask } from "../types";
import * as layout from "./HomePage.styles";
import * as styles from "./TodayTasksCard.styles";

type TodayTasksCardProps = {
  tasks: TodayTask[];
};

export function TodayTasksCard({ tasks }: TodayTasksCardProps) {
  const sorted = sortTodayTasks(tasks);
  const completedCount = tasks.filter((task) => task.completed).length;
  const progressRatio = tasks.length === 0 ? 0 : completedCount / tasks.length;

  return (
    <section className={layout.card}>
      <div className={styles.header}>
        <div className={styles.headerRow}>
          <h2 className={layout.cardTitle}>今日やること</h2>
          <p className={styles.progressText}>
            {completedCount}/{tasks.length} 完了
          </p>
        </div>
        <div className={styles.progressTrack} aria-hidden="true">
          <div className={styles.progressFill} style={{ width: `${progressRatio * 100}%` }} />
        </div>
      </div>
      <ul className={styles.list}>
        {sorted.map((task) => (
          <li
            key={task.id}
            className={styles.item({ completed: task.completed })}
            aria-label={`${task.completed ? "完了" : "未完了"} ${task.companyName} ${task.title}${task.time ? ` ${task.time}` : ""}`}
          >
            <span className={styles.check({ completed: task.completed })} aria-hidden="true">
              ✓
            </span>
            <div className={styles.body}>
              <p className={styles.company}>{task.companyName}</p>
              <p className={styles.title({ completed: task.completed })}>{task.title}</p>
            </div>
            {task.completed ? (
              <span className={styles.time({ tone: "done" })}>完了</span>
            ) : (
              <span className={styles.time({ tone: "pending" })}>{task.time}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
