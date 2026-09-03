import { SegmentedControl } from "@/components/SegmentedControl";

import { PREP_QA_VIEW_TAB_LABELS, PREP_QA_VIEW_TABS, type PrepQaViewTab } from "../types";
import * as styles from "./InterviewPrepQaFilterBar.styles";

type InterviewPrepQaFilterBarProps = {
  tab: PrepQaViewTab;
  tabCounts: Record<PrepQaViewTab, number>;
  onTabChange: (tab: PrepQaViewTab) => void;
};

export function InterviewPrepQaFilterBar({
  tab,
  tabCounts,
  onTabChange,
}: InterviewPrepQaFilterBarProps) {
  return (
    <div className={styles.bar}>
      <SegmentedControl
        value={tab}
        options={PREP_QA_VIEW_TABS.map((item) => ({
          value: item,
          label: (
            <>
              {PREP_QA_VIEW_TAB_LABELS[item]}
              <span className={styles.count}>{tabCounts[item]}</span>
            </>
          ),
        }))}
        onChange={onTabChange}
        aria-label="面接準備コンテンツの切り替え"
      />
    </div>
  );
}
