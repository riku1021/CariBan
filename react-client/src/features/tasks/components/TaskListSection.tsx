import type { KeyboardEvent, MouseEvent } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import { CompletionCheckbox } from "@/components/CompletionCheckbox";

import { formatDueTime, formatEstimatedMinutes, formatRelativeDueLabel } from "../taskDate";
import { getTaskGroupId } from "../taskQuery";
import { TASK_CATEGORY_LABELS, type TaskGroup, type TaskItem } from "../types";
import * as styles from "./TaskListSection.styles";

type TaskListSectionProps = {
  groups: TaskGroup[];
  selectedTaskId: string | null;
  now: Date;
  onSelect: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
};

function dueTone(task: TaskItem, now: Date): "overdue" | "today" | "later" {
  const group = getTaskGroupId({ ...task, completed: false }, now);
  if (group === "overdue") {
    return "overdue";
  }
  if (group === "today") {
    return "today";
  }
  return "later";
}

function stopRowSelect(event: MouseEvent | KeyboardEvent) {
  event.stopPropagation();
}

export function TaskListSection({
  groups,
  selectedTaskId,
  now,
  onSelect,
  onToggleComplete,
}: TaskListSectionProps) {
  return (
    <section className={styles.panel}>
      {groups.length === 0 ? (
        <p className={styles.empty}>該当するタスクはありません</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col" className={styles.thCheck} aria-label="完了" />
                <th scope="col" className={styles.th}>
                  タスク
                </th>
                <th scope="col" className={styles.thCategory}>
                  種別
                </th>
                <th scope="col" className={styles.thDue}>
                  期限
                </th>
                <th scope="col" className={styles.thEstimate}>
                  目安
                </th>
                <th scope="col" className={styles.thMenu} aria-label="操作" />
              </tr>
            </thead>
            {groups.map((group) => (
              <tbody key={group.id}>
                <tr>
                  <th
                    scope="colgroup"
                    colSpan={6}
                    className={styles.groupHeader({ tone: group.id })}
                  >
                    <span className={styles.groupHeaderInner}>
                      <span className={styles.groupLabel}>{group.label}</span>
                      <span className={styles.groupCount({ tone: group.id })}>
                        {group.items.length}
                      </span>
                    </span>
                  </th>
                </tr>
                {group.items.map((task) => (
                  <tr
                    key={task.id}
                    className={styles.row({ selected: task.id === selectedTaskId })}
                    aria-selected={task.id === selectedTaskId}
                    tabIndex={0}
                    onClick={() => onSelect(task.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onSelect(task.id);
                      }
                    }}
                  >
                    <td
                      className={styles.tdCheck}
                      onClick={stopRowSelect}
                      onKeyDown={stopRowSelect}
                    >
                      <CompletionCheckbox
                        checked={task.completed}
                        onCheckedChange={() => onToggleComplete(task.id)}
                        aria-label={`${task.title}を${task.completed ? "未完了に戻す" : "完了にする"}`}
                      />
                    </td>
                    <td className={styles.td}>
                      <div className={styles.info}>
                        <span className={styles.companyMark} aria-hidden="true">
                          {task.companyName.slice(0, 1)}
                        </span>
                        <span className={styles.titles}>
                          <span className={styles.title({ completed: task.completed })}>
                            {task.title}
                          </span>
                          <span className={styles.company}>{task.companyName}</span>
                        </span>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.categoryTag({ category: task.category })}>
                        {TASK_CATEGORY_LABELS[task.category]}
                      </span>
                    </td>
                    <td className={styles.tdDue}>
                      <span className={styles.due}>
                        <span className={styles.dueLabel({ tone: dueTone(task, now) })}>
                          {formatRelativeDueLabel(task.dueAt, now)}
                        </span>
                        <span className={styles.dueTime}>{formatDueTime(task.dueAt)}</span>
                      </span>
                    </td>
                    <td className={styles.tdEstimate}>
                      {formatEstimatedMinutes(task.estimatedMinutes)}
                    </td>
                    <td className={styles.tdMenu} onClick={stopRowSelect} onKeyDown={stopRowSelect}>
                      <button type="button" className={styles.menuButton} aria-label="その他">
                        <BsThreeDotsVertical aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      )}
    </section>
  );
}
