import type { KeyboardEvent, MouseEvent } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

import { CompletionCheckbox } from "@/components/CompletionCheckbox";

import {
  durationMinutes,
  formatClock,
  formatDurationMinutes,
  formatRelativeDayLabel,
} from "../scheduleDate";
import { getScheduleGroupId } from "../scheduleQuery";
import { SCHEDULE_KIND_LABELS, type ScheduleGroup, type ScheduleItem } from "../types";
import * as styles from "./ScheduleListSection.styles";

type ScheduleListSectionProps = {
  groups: ScheduleGroup[];
  selectedScheduleId: string | null;
  now: Date;
  onSelect: (scheduleId: string) => void;
  onToggleComplete: (scheduleId: string) => void;
};

function startTone(schedule: ScheduleItem, now: Date): "overdue" | "today" | "later" {
  const group = getScheduleGroupId({ ...schedule, completed: false }, now);
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

export function ScheduleListSection({
  groups,
  selectedScheduleId,
  now,
  onSelect,
  onToggleComplete,
}: ScheduleListSectionProps) {
  return (
    <section className={styles.panel}>
      {groups.length === 0 ? (
        <p className={styles.empty}>該当する予定はありません</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col" className={styles.thCheck} aria-label="完了" />
                <th scope="col" className={styles.th}>
                  予定
                </th>
                <th scope="col" className={styles.thCategory}>
                  種別
                </th>
                <th scope="col" className={styles.thDue}>
                  開始
                </th>
                <th scope="col" className={styles.thEstimate}>
                  時間
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
                {group.items.map((schedule) => (
                  <tr
                    key={schedule.id}
                    className={styles.row({ selected: schedule.id === selectedScheduleId })}
                    aria-selected={schedule.id === selectedScheduleId}
                    tabIndex={0}
                    onClick={() => onSelect(schedule.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onSelect(schedule.id);
                      }
                    }}
                  >
                    <td
                      className={styles.tdCheck}
                      onClick={stopRowSelect}
                      onKeyDown={stopRowSelect}
                    >
                      <CompletionCheckbox
                        checked={schedule.completed}
                        onCheckedChange={() => onToggleComplete(schedule.id)}
                        aria-label={`${schedule.title}を${schedule.completed ? "未完了に戻す" : "完了にする"}`}
                      />
                    </td>
                    <td className={styles.td}>
                      <div className={styles.info}>
                        <span className={styles.companyMark} aria-hidden="true">
                          {schedule.companyName.slice(0, 1)}
                        </span>
                        <span className={styles.titles}>
                          <span className={styles.title({ completed: schedule.completed })}>
                            {schedule.title}
                          </span>
                          <span className={styles.company}>{schedule.companyName}</span>
                        </span>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.kindTag({ kind: schedule.kind })}>
                        {SCHEDULE_KIND_LABELS[schedule.kind]}
                      </span>
                    </td>
                    <td className={styles.tdDue}>
                      <span className={styles.due}>
                        <span className={styles.dueLabel({ tone: startTone(schedule, now) })}>
                          {formatRelativeDayLabel(schedule.startsAt, now)}
                        </span>
                        <span className={styles.dueTime}>{formatClock(schedule.startsAt)}</span>
                      </span>
                    </td>
                    <td className={styles.tdEstimate}>
                      {formatDurationMinutes(durationMinutes(schedule.startsAt, schedule.endsAt))}
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
