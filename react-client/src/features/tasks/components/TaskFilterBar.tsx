import { SegmentedControl } from "@/components/SegmentedControl";

import {
  TASK_CATEGORIES,
  TASK_CATEGORY_LABELS,
  TASK_FILTER_TAB_LABELS,
  TASK_FILTER_TABS,
  TASK_SORT_ORDER_LABELS,
  TASK_SORT_ORDERS,
  type TaskCategory,
  type TaskFilterTab,
  type TaskSortOrder,
} from "../types";
import * as styles from "./TaskFilterBar.styles";

type TaskFilterBarProps = {
  tab: TaskFilterTab;
  tabCounts: Record<TaskFilterTab, number>;
  onTabChange: (tab: TaskFilterTab) => void;
  category: TaskCategory | "all";
  onCategoryChange: (category: TaskCategory | "all") => void;
  companyName: string | "all";
  companyNames: string[];
  onCompanyChange: (companyName: string | "all") => void;
  sortOrder: TaskSortOrder;
  onSortChange: (sortOrder: TaskSortOrder) => void;
};

export function TaskFilterBar({
  tab,
  tabCounts,
  onTabChange,
  category,
  onCategoryChange,
  companyName,
  companyNames,
  onCompanyChange,
  sortOrder,
  onSortChange,
}: TaskFilterBarProps) {
  return (
    <div className={styles.bar}>
      <SegmentedControl
        value={tab}
        options={TASK_FILTER_TABS.map((item) => ({
          value: item,
          label: (
            <>
              {TASK_FILTER_TAB_LABELS[item]}
              <span className={styles.count}>{tabCounts[item]}</span>
            </>
          ),
        }))}
        onChange={onTabChange}
        aria-label="タスクの絞り込み"
      />
      <div className={styles.selects}>
        <select
          className={styles.select}
          aria-label="種別"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value as TaskCategory | "all")}
        >
          <option value="all">種別</option>
          {TASK_CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {TASK_CATEGORY_LABELS[item]}
            </option>
          ))}
        </select>
        <select
          className={styles.select}
          aria-label="企業"
          value={companyName}
          onChange={(event) => onCompanyChange(event.target.value)}
        >
          <option value="all">企業</option>
          {companyNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <select
          className={styles.select}
          aria-label="並び順"
          value={sortOrder}
          onChange={(event) => onSortChange(event.target.value as TaskSortOrder)}
        >
          {TASK_SORT_ORDERS.map((item) => (
            <option key={item} value={item}>
              {TASK_SORT_ORDER_LABELS[item]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
