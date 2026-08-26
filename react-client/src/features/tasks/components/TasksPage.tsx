import { useMemo, useState } from "react";

import { tasksMock } from "../mocks/tasksMock";
import {
  computeProgress,
  filterTasks,
  groupTasks,
  listCompanyNames,
  sortTasks,
  summarizeTabCounts,
  summarizeTasks,
} from "../taskQuery";
import type { TaskCategory, TaskFilterTab, TaskItem, TaskSortOrder } from "../types";
import { TaskDetailPanel } from "./TaskDetailPanel";
import { TaskFilterBar } from "./TaskFilterBar";
import { TaskListSection } from "./TaskListSection";
import { TaskProgressCard } from "./TaskProgressCard";
import { TaskSummaryCards } from "./TaskSummaryCards";
import * as styles from "./TasksPage.styles";
import { TaskToolbar } from "./TaskToolbar";

function toggleComplete(tasks: TaskItem[], taskId: string, completed: boolean): TaskItem[] {
  return tasks.map((task) => (task.id === taskId ? { ...task, completed } : task));
}

export function TasksPage() {
  const [now] = useState(() => new Date());
  const [tasks, setTasks] = useState<TaskItem[]>(() => tasksMock);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>("task-2");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<TaskFilterTab>("all");
  const [category, setCategory] = useState<TaskCategory | "all">("all");
  const [companyName, setCompanyName] = useState<string | "all">("all");
  const [sortOrder, setSortOrder] = useState<TaskSortOrder>("dueSoon");

  const summary = useMemo(() => summarizeTasks(tasks, now), [tasks, now]);
  const tabCounts = useMemo(() => summarizeTabCounts(tasks, now), [tasks, now]);
  const progress = useMemo(() => computeProgress(tasks, now), [tasks, now]);
  const companyNames = useMemo(() => listCompanyNames(tasks), [tasks]);

  const visibleTasks = useMemo(
    () =>
      sortTasks(
        filterTasks(tasks, { search, tab, category, companyName, sortOrder }, now),
        sortOrder
      ),
    [tasks, search, tab, category, companyName, sortOrder, now]
  );
  const groups = useMemo(() => groupTasks(visibleTasks, now), [visibleTasks, now]);

  const selectedTask = tasks.find((task) => task.id === selectedTaskId) ?? visibleTasks[0] ?? null;

  const handleToggleComplete = (taskId: string) => {
    setTasks((current) => {
      const target = current.find((task) => task.id === taskId);
      if (!target) {
        return current;
      }
      return toggleComplete(current, taskId, !target.completed);
    });
  };

  const handleComplete = (taskId: string) => {
    setTasks((current) => toggleComplete(current, taskId, true));
  };

  return (
    <section className={styles.page}>
      <TaskToolbar search={search} onSearchChange={setSearch} />
      <TaskSummaryCards summary={summary} />
      <TaskFilterBar
        tab={tab}
        tabCounts={tabCounts}
        onTabChange={setTab}
        category={category}
        onCategoryChange={setCategory}
        companyName={companyName}
        companyNames={companyNames}
        onCompanyChange={setCompanyName}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />
      <div className={styles.body}>
        <div className={styles.listPane}>
          <TaskListSection
            groups={groups}
            selectedTaskId={selectedTask?.id ?? null}
            now={now}
            onSelect={setSelectedTaskId}
            onToggleComplete={handleToggleComplete}
          />
        </div>
        <div className={styles.sidePane}>
          <TaskDetailPanel task={selectedTask} now={now} onComplete={handleComplete} />
          <TaskProgressCard progress={progress} />
        </div>
      </div>
    </section>
  );
}
