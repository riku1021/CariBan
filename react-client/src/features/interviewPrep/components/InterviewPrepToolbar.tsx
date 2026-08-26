import { FaSearch } from "react-icons/fa";

import {
  INTERVIEW_JOB_TYPE_LABELS,
  INTERVIEW_JOB_TYPES,
  INTERVIEW_PHASE_LABELS,
  INTERVIEW_PHASES,
  INTERVIEW_PREP_SORT_ORDER_LABELS,
  INTERVIEW_PREP_SORT_ORDERS,
  type InterviewJobType,
  type InterviewPhase,
  type InterviewPrepSortOrder,
} from "../types";
import * as styles from "./InterviewPrepToolbar.styles";

type InterviewPrepToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  jobType: InterviewJobType | "all";
  onJobTypeChange: (value: InterviewJobType | "all") => void;
  phase: InterviewPhase | "all";
  onPhaseChange: (value: InterviewPhase | "all") => void;
  sortOrder: InterviewPrepSortOrder;
  onSortChange: (value: InterviewPrepSortOrder) => void;
};

export function InterviewPrepToolbar({
  search,
  onSearchChange,
  jobType,
  onJobTypeChange,
  phase,
  onPhaseChange,
  sortOrder,
  onSortChange,
}: InterviewPrepToolbarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.searchWrap}>
        <input
          className={styles.search}
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="企業名・職種で検索"
          aria-label="面接準備を検索"
        />
        <span className={styles.searchIcon} aria-hidden="true">
          <FaSearch className={styles.searchIconGlyph} />
        </span>
      </div>
      <div className={styles.selects}>
        <select
          className={styles.select}
          aria-label="職種"
          value={jobType}
          onChange={(event) => onJobTypeChange(event.target.value as InterviewJobType | "all")}
        >
          <option value="all">職種 すべて</option>
          {INTERVIEW_JOB_TYPES.map((item) => (
            <option key={item} value={item}>
              {INTERVIEW_JOB_TYPE_LABELS[item]}
            </option>
          ))}
        </select>
        <select
          className={styles.select}
          aria-label="選考フェーズ"
          value={phase}
          onChange={(event) => onPhaseChange(event.target.value as InterviewPhase | "all")}
        >
          <option value="all">選考フェーズ すべて</option>
          {INTERVIEW_PHASES.map((item) => (
            <option key={item} value={item}>
              {INTERVIEW_PHASE_LABELS[item]}
            </option>
          ))}
        </select>
        <select
          className={styles.select}
          aria-label="並び順"
          value={sortOrder}
          onChange={(event) => onSortChange(event.target.value as InterviewPrepSortOrder)}
        >
          {INTERVIEW_PREP_SORT_ORDERS.map((item) => (
            <option key={item} value={item}>
              {INTERVIEW_PREP_SORT_ORDER_LABELS[item]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
