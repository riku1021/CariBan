import { cx } from "@/styled-system/css";

import type { ProfileBasic, ProfileCompleteness } from "../types";
import { ProfileCardActions } from "./ProfileCardActions";
import * as layout from "./ProfilePage.styles";
import * as styles from "./ProfileSummarySection.styles";

type ProfileSummarySectionProps = {
  basic: ProfileBasic;
  completeness: ProfileCompleteness;
};

const CHART_RADIUS = 36;
const CHART_CIRCUMFERENCE = 2 * Math.PI * CHART_RADIUS;

function CompletenessChart({ percent }: { percent: number }) {
  const clamped = Math.min(Math.max(percent, 0), 100) / 100;

  return (
    <div className={styles.chartWrap}>
      <svg viewBox="0 0 96 96" className={styles.chart} aria-hidden="true">
        <circle
          className={styles.chartTrack}
          cx="48"
          cy="48"
          r={CHART_RADIUS}
          fill="none"
          strokeWidth="10"
        />
        <circle
          className={styles.chartFill}
          cx="48"
          cy="48"
          r={CHART_RADIUS}
          fill="none"
          strokeWidth="10"
          strokeDasharray={`${CHART_CIRCUMFERENCE * clamped} ${CHART_CIRCUMFERENCE}`}
          strokeLinecap="round"
          transform="rotate(-90 48 48)"
        />
      </svg>
      <p className={styles.percent}>{percent}%</p>
    </div>
  );
}

export function ProfileSummarySection({ basic, completeness }: ProfileSummarySectionProps) {
  return (
    <div className={styles.row}>
      <section className={cx(layout.card, styles.heroCard)}>
        <div className={styles.heroActions}>
          <ProfileCardActions />
        </div>
        <div className={styles.identity}>
          <span className={styles.avatarRing} aria-hidden="true">
            <span className={styles.avatar}>{basic.initials}</span>
          </span>
          <div className={styles.identityText}>
            <h2 className={styles.name}>{basic.name}</h2>
            <div className={styles.metaRow}>
              <span className={styles.metaChip}>{basic.school}</span>
              <span className={styles.metaChip}>{basic.major}</span>
              <span className={styles.metaChipAccent}>{basic.graduation}</span>
            </div>
          </div>
          <div className={styles.bioPanel}>
            <p className={styles.bioLabel}>自己紹介</p>
            <p className={styles.bio}>{basic.bio}</p>
          </div>
        </div>
      </section>
      <section className={cx(layout.card, styles.completenessCard)}>
        <h2 className={styles.completenessTitle}>充実度</h2>
        <CompletenessChart percent={completeness.percent} />
      </section>
    </div>
  );
}
