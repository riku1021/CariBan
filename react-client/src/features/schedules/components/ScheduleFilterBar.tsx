import { SegmentedControl } from "@/components/SegmentedControl";

import {
  SCHEDULE_FILTER_TAB_LABELS,
  SCHEDULE_FILTER_TABS,
  SCHEDULE_KIND_LABELS,
  SCHEDULE_KINDS,
  SCHEDULE_SORT_ORDER_LABELS,
  SCHEDULE_SORT_ORDERS,
  type ScheduleFilterTab,
  type ScheduleKind,
  type ScheduleSortOrder,
} from "../types";
import * as styles from "./ScheduleFilterBar.styles";

type ScheduleFilterBarProps = {
  tab: ScheduleFilterTab;
  tabCounts: Record<ScheduleFilterTab, number>;
  onTabChange: (tab: ScheduleFilterTab) => void;
  kind: ScheduleKind | "all";
  onKindChange: (kind: ScheduleKind | "all") => void;
  companyName: string | "all";
  companyNames: string[];
  onCompanyChange: (companyName: string | "all") => void;
  sortOrder: ScheduleSortOrder;
  onSortChange: (sortOrder: ScheduleSortOrder) => void;
};

export function ScheduleFilterBar({
  tab,
  tabCounts,
  onTabChange,
  kind,
  onKindChange,
  companyName,
  companyNames,
  onCompanyChange,
  sortOrder,
  onSortChange,
}: ScheduleFilterBarProps) {
  return (
    <div className={styles.bar}>
      <SegmentedControl
        value={tab}
        options={SCHEDULE_FILTER_TABS.map((item) => ({
          value: item,
          label: (
            <>
              {SCHEDULE_FILTER_TAB_LABELS[item]}
              <span className={styles.count}>{tabCounts[item]}</span>
            </>
          ),
        }))}
        onChange={onTabChange}
        aria-label="予定の絞り込み"
      />
      <div className={styles.selects}>
        <select
          className={styles.select}
          aria-label="種別"
          value={kind}
          onChange={(event) => onKindChange(event.target.value as ScheduleKind | "all")}
        >
          <option value="all">種別</option>
          {SCHEDULE_KINDS.map((item) => (
            <option key={item} value={item}>
              {SCHEDULE_KIND_LABELS[item]}
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
          onChange={(event) => onSortChange(event.target.value as ScheduleSortOrder)}
        >
          {SCHEDULE_SORT_ORDERS.map((item) => (
            <option key={item} value={item}>
              {SCHEDULE_SORT_ORDER_LABELS[item]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
