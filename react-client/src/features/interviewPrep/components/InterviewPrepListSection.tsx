import { Link } from "@tanstack/react-router";
import {
  FaCheck,
  FaChevronDown,
  FaChevronRight,
  FaChevronUp,
  FaClock,
  FaMinus,
} from "react-icons/fa";

import { formatCountdown, formatScheduleLabel, prepPercent } from "../interviewPrepDate";
import {
  INTERVIEW_PHASE_LABELS,
  type InterviewPhase,
  type InterviewPrepGroup,
  type InterviewPrepItem,
} from "../types";
import * as styles from "./InterviewPrepListSection.styles";

type InterviewPrepListSectionProps = {
  groups: InterviewPrepGroup[];
  now: Date;
  expanded: boolean;
  onToggleExpanded: () => void;
  visibleLimit: number;
};

type MarkTone = "a" | "b" | "c" | "d";

function markTone(initials: string): MarkTone {
  const code = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
  const tones: MarkTone[] = ["a", "b", "c", "d"];
  return tones[code % tones.length] ?? "a";
}

function flattenItems(groups: InterviewPrepGroup[]): InterviewPrepItem[] {
  return groups.flatMap((group) => group.items);
}

function ChecklistStatus({ label, done, total }: { label: string; done: number; total: number }) {
  const complete = done >= total && total > 0;
  return (
    <span className={styles.checklistItem}>
      {label} {done}/{total}
      {complete ? (
        <FaCheck className={styles.checklistOk} aria-hidden="true" />
      ) : (
        <FaMinus className={styles.checklistNg} aria-hidden="true" />
      )}
    </span>
  );
}

function MissingItems({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <p className={styles.missingEmpty}>不足なし</p>;
  }
  const visible = items.slice(0, 2);
  const rest = items.length - visible.length;
  return (
    <div className={styles.missingTags}>
      {visible.map((item) => (
        <span key={item} className={styles.missingTag}>
          {item}
        </span>
      ))}
      {rest > 0 ? <span className={styles.missingTag}>+{rest}</span> : null}
    </div>
  );
}

function PrepCard({ item, now }: { item: InterviewPrepItem; now: Date }) {
  const percent = prepPercent(item);
  const phase = item.phase as InterviewPhase;

  return (
    <article className={styles.card}>
      <div className={styles.companyCell}>
        <span className={styles.mark({ tone: markTone(item.initials) })} aria-hidden="true">
          {item.initials}
        </span>
        <div className={styles.companyText}>
          <p className={styles.companyName}>{item.companyName}</p>
          <p className={styles.jobTitle}>{item.jobTitle}</p>
        </div>
      </div>

      <div className={styles.scheduleCell}>
        <div className={styles.phaseRow}>
          <span className={styles.phaseBadge({ phase })}>{INTERVIEW_PHASE_LABELS[phase]}</span>
          {item.scheduledAt ? (
            <p className={styles.scheduleTime}>
              <FaClock aria-hidden="true" />
              {formatScheduleLabel(item.scheduledAt, now)}
            </p>
          ) : (
            <p className={styles.scheduleTime}>日時未定</p>
          )}
        </div>
        {item.scheduledAt && !item.completed ? (
          <p className={styles.countdown}>{formatCountdown(item.scheduledAt, now)}</p>
        ) : null}
      </div>

      <div className={styles.prepCell}>
        <div className={styles.prepHeader}>
          <p className={styles.prepPercent}>{percent}%</p>
        </div>
        <div className={styles.prepTrack} aria-hidden="true">
          <div className={styles.prepFill} style={{ width: `${percent}%` }} />
        </div>
        <div className={styles.checklistRow}>
          <ChecklistStatus label="共通" done={item.commonDone} total={item.commonTotal} />
          <ChecklistStatus label="企業別" done={item.companyDone} total={item.companyTotal} />
        </div>
      </div>

      <div className={styles.missingCell}>
        <p className={styles.missingLabel}>不足している項目</p>
        <MissingItems items={item.missingItems} />
      </div>

      <Link
        to="/interview-prep/$prepId"
        params={{ prepId: item.id }}
        className={styles.detailButton}
      >
        詳細を見る
        <FaChevronRight aria-hidden="true" />
      </Link>
    </article>
  );
}

export function InterviewPrepListSection({
  groups,
  now,
  expanded,
  onToggleExpanded,
  visibleLimit,
}: InterviewPrepListSectionProps) {
  const allItems = flattenItems(groups);
  const totalCount = allItems.length;
  const limitedIds = new Set(
    expanded
      ? allItems.map((item) => item.id)
      : allItems.slice(0, visibleLimit).map((item) => item.id)
  );

  const visibleGroups = groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => limitedIds.has(item.id)),
    }))
    .filter((group) => group.items.length > 0);

  const canExpand = totalCount > visibleLimit;

  return (
    <section className={styles.panel}>
      {visibleGroups.length === 0 ? (
        <p className={styles.empty}>該当する面接準備はありません</p>
      ) : (
        <div className={styles.scroll}>
          {visibleGroups.map((group) => (
            <div key={group.id} className={styles.group}>
              <h3 className={styles.groupLabel}>{group.label}</h3>
              {group.items.map((item) => (
                <PrepCard key={item.id} item={item} now={now} />
              ))}
            </div>
          ))}
          {canExpand ? (
            <button type="button" className={styles.moreButton} onClick={onToggleExpanded}>
              {expanded ? "閉じる" : "さらに表示"}
              {expanded ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}
            </button>
          ) : null}
        </div>
      )}
    </section>
  );
}
