import { SegmentedControl } from "@/components/SegmentedControl";

import {
  INTERVIEW_PREP_FILTER_TAB_LABELS,
  INTERVIEW_PREP_FILTER_TABS,
  type InterviewPrepFilterTab,
} from "../types";
import * as styles from "./InterviewPrepFilterBar.styles";

type InterviewPrepFilterBarProps = {
  tab: InterviewPrepFilterTab;
  tabCounts: Record<InterviewPrepFilterTab, number>;
  onTabChange: (tab: InterviewPrepFilterTab) => void;
};

export function InterviewPrepFilterBar({
  tab,
  tabCounts,
  onTabChange,
}: InterviewPrepFilterBarProps) {
  return (
    <div className={styles.bar}>
      <SegmentedControl
        value={tab}
        options={INTERVIEW_PREP_FILTER_TABS.map((item) => ({
          value: item,
          label: (
            <>
              {INTERVIEW_PREP_FILTER_TAB_LABELS[item]}
              <span className={styles.count}>{tabCounts[item]}</span>
            </>
          ),
        }))}
        onChange={onTabChange}
        aria-label="面接準備の絞り込み"
      />
    </div>
  );
}
