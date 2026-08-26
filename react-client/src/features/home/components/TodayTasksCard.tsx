import { useEffect, useRef, useState } from "react";

import { sortTodayTasks } from "../sort";
import type { TodayTask } from "../types";
import * as layout from "./HomePage.styles";
import * as styles from "./TodayTasksCard.styles";

type TodayTasksCardProps = {
  tasks: TodayTask[];
};

function countItemsBelow(list: HTMLElement): number {
  const bottom = list.getBoundingClientRect().bottom;
  let count = 0;
  for (const child of list.children) {
    if (!(child instanceof HTMLElement)) {
      continue;
    }
    if (child.getBoundingClientRect().top >= bottom - 1) {
      count += 1;
    }
  }
  return count;
}

export function TodayTasksCard({ tasks }: TodayTasksCardProps) {
  const sorted = sortTodayTasks(tasks);
  const completedCount = tasks.filter((task) => task.completed).length;
  const progressRatio = tasks.length === 0 ? 0 : completedCount / tasks.length;
  const listRef = useRef<HTMLUListElement>(null);
  const [remainingBelow, setRemainingBelow] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }

    const updateRemaining = () => {
      setRemainingBelow(countItemsBelow(list));
    };

    updateRemaining();
    list.addEventListener("scroll", updateRemaining, { passive: true });
    const resizeObserver = new ResizeObserver(updateRemaining);
    resizeObserver.observe(list);
    const mutationObserver = new MutationObserver(updateRemaining);
    mutationObserver.observe(list, { childList: true });

    return () => {
      list.removeEventListener("scroll", updateRemaining);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

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
      <div className={styles.listWrap}>
        <ul className={styles.list} ref={listRef}>
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
        {remainingBelow > 0 ? (
          <p className={styles.moreHint} aria-live="polite">
            あと{remainingBelow}件
          </p>
        ) : null}
      </div>
    </section>
  );
}
