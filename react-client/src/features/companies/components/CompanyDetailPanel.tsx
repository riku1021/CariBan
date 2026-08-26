import {
  FaCalendarAlt,
  FaChartBar,
  FaCheck,
  FaChevronRight,
  FaClock,
  FaCode,
  FaEdit,
  FaExternalLinkAlt,
  FaGlobe,
  FaInfoCircle,
  FaPaperPlane,
  FaStickyNote,
  FaTimes,
  FaTrash,
  FaUser,
} from "react-icons/fa";

import { COMPANY_JOB_TYPE_LABELS, COMPANY_STATUS_LABELS, type CompanyItem } from "../types";
import * as styles from "./CompanyDetailPanel.styles";
import * as listStyles from "./CompanyListSection.styles";

type CompanyDetailPanelProps = {
  company: CompanyItem | null;
  onClose: () => void;
};

function stepState(index: number, currentIndex: number): "done" | "current" | "todo" {
  if (index < currentIndex) {
    return "done";
  }
  if (index === currentIndex) {
    return "current";
  }
  return "todo";
}

function railFillPercent(currentIndex: number, stageCount: number): number {
  if (stageCount <= 1) {
    return currentIndex >= 0 ? 100 : 0;
  }
  if (currentIndex <= 0) {
    return 0;
  }
  if (currentIndex >= stageCount - 1) {
    return 100;
  }
  return ((currentIndex + 0.5) / stageCount) * 100;
}

function stepAlign(index: number, stageCount: number): "start" | "center" | "end" {
  if (stageCount <= 1) {
    return "center";
  }
  if (index === 0) {
    return "start";
  }
  if (index === stageCount - 1) {
    return "end";
  }
  return "center";
}

export function CompanyDetailPanel({ company, onClose }: CompanyDetailPanelProps) {
  if (!company) {
    return (
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>企業詳細</h2>
        <p className={styles.empty}>企業を選択してください</p>
      </section>
    );
  }

  const stageCount = company.stages.length;
  const currentStageLabel =
    company.stages[company.currentStageIndex]?.label ?? company.currentStage;

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLead}>
          <span className={styles.companyMark} aria-hidden="true">
            {company.initials.slice(0, 2)}
          </span>
          <div className={styles.headerText}>
            <div className={styles.nameRow}>
              <h2 className={styles.cardTitle}>{company.shortName}</h2>
              <span className={listStyles.statusBadge({ status: company.status })}>
                {COMPANY_STATUS_LABELS[company.status]}
              </span>
            </div>
            <span className={styles.jobBadge}>
              <FaCode className={styles.jobIcon} aria-hidden="true" />
              {COMPANY_JOB_TYPE_LABELS[company.jobType]}
            </span>
          </div>
        </div>
        <button
          type="button"
          className={styles.closeButton}
          aria-label="詳細を閉じる"
          onClick={onClose}
        >
          <FaTimes aria-hidden="true" />
        </button>
      </div>

      <div className={styles.body}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <FaChartBar className={styles.sectionIcon} aria-hidden="true" />
            選考フェーズ
          </h3>
          <div className={styles.stepper}>
            <div className={styles.rail} aria-hidden="true">
              <span className={styles.railBase} />
              <span
                className={styles.railFill}
                style={{ width: `${railFillPercent(company.currentStageIndex, stageCount)}%` }}
              />
            </div>
            <div className={styles.steps}>
              {company.stages.map((stage, index) => {
                const state = stepState(index, company.currentStageIndex);
                return (
                  <div
                    key={stage.id}
                    className={styles.step({ align: stepAlign(index, stageCount) })}
                  >
                    <span className={styles.stepDot({ state })} aria-hidden="true">
                      {state === "done" ? <FaCheck /> : null}
                    </span>
                    <span className={styles.stepLabel}>{stage.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <p className={styles.currentStageBar}>
            現在の選考：
            <span className={styles.currentStageValue}>{currentStageLabel}</span>
          </p>
        </section>

        {company.nextAction ? (
          <div className={styles.nextActionCard}>
            <span className={styles.nextActionIcon} aria-hidden="true">
              <FaCalendarAlt />
            </span>
            <div className={styles.nextActionBody}>
              <p className={styles.nextActionLabel}>次のアクション</p>
              <p className={styles.nextActionTitle}>{company.nextAction.title}</p>
              <div className={styles.nextActionMeta}>
                <p className={styles.nextActionSchedule}>
                  <FaClock className={styles.nextActionClock} aria-hidden="true" />
                  {company.nextAction.scheduleLabel ?? company.nextAction.dueLabel}
                </p>
                <span className={styles.remainingBadge({ urgency: company.nextAction.urgency })}>
                  {company.nextAction.urgency === "today" ? "今日" : company.nextAction.dueLabel}
                </span>
              </div>
            </div>
            <button type="button" className={styles.taskLink}>
              タスクを見る
              <FaChevronRight aria-hidden="true" />
            </button>
          </div>
        ) : (
          <p className={styles.emptyNext}>次のアクションはありません</p>
        )}

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <FaInfoCircle className={styles.sectionIcon} aria-hidden="true" />
            応募情報
          </h3>
          <div className={styles.infoPanel}>
            <div className={styles.infoRow}>
              <FaPaperPlane className={styles.infoIcon} aria-hidden="true" />
              <p className={styles.infoLabel}>応募経路</p>
              <p className={styles.infoValue}>{company.applicationPath}</p>
            </div>
            <div className={styles.infoRow}>
              <FaCalendarAlt className={styles.infoIcon} aria-hidden="true" />
              <p className={styles.infoLabel}>応募日</p>
              <p className={styles.infoValue}>{company.appliedAt}</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <FaStickyNote className={styles.sectionIcon} aria-hidden="true" />
            メモ
          </h3>
          <div className={styles.memoPanel}>
            <p className={styles.memoBody}>{company.memo || "未記入"}</p>
          </div>
        </section>
      </div>

      <div className={styles.actions}>
        <div className={styles.linkButtons}>
          <button type="button" className={styles.linkButton} disabled={!company.homepageUrl}>
            <FaGlobe aria-hidden="true" />
            企業HP
            <FaExternalLinkAlt aria-hidden="true" />
          </button>
          <button type="button" className={styles.linkButton} disabled={!company.mypageUrl}>
            <FaUser aria-hidden="true" />
            マイページ
            <FaExternalLinkAlt aria-hidden="true" />
          </button>
        </div>
        <button type="button" className={styles.primaryButton}>
          企業詳細を見る
          <FaChevronRight aria-hidden="true" />
        </button>
        <div className={styles.outlineButtonRow}>
          <button type="button" className={styles.outlineButton({ tone: "edit" })}>
            <FaEdit aria-hidden="true" />
            編集
          </button>
          <button type="button" className={styles.outlineButton({ tone: "danger" })}>
            <FaTrash aria-hidden="true" />
            応募を終了する
          </button>
        </div>
      </div>
    </section>
  );
}
