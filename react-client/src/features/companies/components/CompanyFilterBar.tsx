import { SegmentedControl } from "@/components/SegmentedControl";

import {
  COMPANY_FILTER_TAB_LABELS,
  COMPANY_FILTER_TABS,
  COMPANY_JOB_TYPE_LABELS,
  COMPANY_JOB_TYPES,
  COMPANY_SORT_ORDER_LABELS,
  COMPANY_SORT_ORDERS,
  COMPANY_STATUS_LABELS,
  COMPANY_STATUSES,
  COMPANY_TASK_FILTER_LABELS,
  COMPANY_TASK_FILTERS,
  type CompanyFilterTab,
  type CompanyJobType,
  type CompanySortOrder,
  type CompanyStatus,
  type CompanyTaskFilter,
} from "../types";
import * as styles from "./CompanyFilterBar.styles";

type CompanyFilterBarProps = {
  tab: CompanyFilterTab;
  tabCounts: Record<CompanyFilterTab, number>;
  onTabChange: (tab: CompanyFilterTab) => void;
  jobType: CompanyJobType | "all";
  onJobTypeChange: (jobType: CompanyJobType | "all") => void;
  status: CompanyStatus | "all";
  onStatusChange: (status: CompanyStatus | "all") => void;
  taskFilter: CompanyTaskFilter;
  onTaskFilterChange: (taskFilter: CompanyTaskFilter) => void;
  sortOrder: CompanySortOrder;
  onSortChange: (sortOrder: CompanySortOrder) => void;
};

export function CompanyFilterBar({
  tab,
  tabCounts,
  onTabChange,
  jobType,
  onJobTypeChange,
  status,
  onStatusChange,
  taskFilter,
  onTaskFilterChange,
  sortOrder,
  onSortChange,
}: CompanyFilterBarProps) {
  return (
    <div className={styles.bar}>
      <SegmentedControl
        value={tab}
        options={COMPANY_FILTER_TABS.map((item) => ({
          value: item,
          label: (
            <>
              {COMPANY_FILTER_TAB_LABELS[item]}
              <span className={styles.count}>{tabCounts[item]}</span>
            </>
          ),
        }))}
        onChange={onTabChange}
        aria-label="企業の絞り込み"
      />
      <div className={styles.selects}>
        <select
          className={styles.select}
          aria-label="職種"
          value={jobType}
          onChange={(event) => onJobTypeChange(event.target.value as CompanyJobType | "all")}
        >
          <option value="all">職種</option>
          {COMPANY_JOB_TYPES.map((item) => (
            <option key={item} value={item}>
              {COMPANY_JOB_TYPE_LABELS[item]}
            </option>
          ))}
        </select>
        <select
          className={styles.select}
          aria-label="状況"
          value={status}
          onChange={(event) => onStatusChange(event.target.value as CompanyStatus | "all")}
        >
          <option value="all">状況</option>
          {COMPANY_STATUSES.map((item) => (
            <option key={item} value={item}>
              {COMPANY_STATUS_LABELS[item]}
            </option>
          ))}
        </select>
        <select
          className={styles.select}
          aria-label="タスク"
          value={taskFilter}
          onChange={(event) => onTaskFilterChange(event.target.value as CompanyTaskFilter)}
        >
          {COMPANY_TASK_FILTERS.map((item) => (
            <option key={item} value={item}>
              {COMPANY_TASK_FILTER_LABELS[item]}
            </option>
          ))}
        </select>
        <select
          className={styles.select}
          aria-label="並び順"
          value={sortOrder}
          onChange={(event) => onSortChange(event.target.value as CompanySortOrder)}
        >
          {COMPANY_SORT_ORDERS.map((item) => (
            <option key={item} value={item}>
              {COMPANY_SORT_ORDER_LABELS[item]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
