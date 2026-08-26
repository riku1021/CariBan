import { sortCompanies } from "../sort";
import type { CompanyProgress } from "../types";
import * as styles from "./CompanyProgressCard.styles";
import * as layout from "./HomePage.styles";

type CompanyProgressCardProps = {
  companies: CompanyProgress[];
};

function stepState(index: number, currentStageIndex: number): "done" | "current" | "todo" {
  if (index < currentStageIndex) {
    return "done";
  }
  if (index === currentStageIndex) {
    return "current";
  }
  return "todo";
}

function railFillPercent(currentStageIndex: number, stageCount: number): number {
  if (stageCount <= 1) {
    return currentStageIndex >= 0 ? 100 : 0;
  }
  if (currentStageIndex <= 0) {
    return 0;
  }
  if (currentStageIndex >= stageCount - 1) {
    return 100;
  }
  // flex:1 のセル中央にドットがあるため、等間隔 (i / (n-1)) ではなく (i + 0.5) / n
  return ((currentStageIndex + 0.5) / stageCount) * 100;
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

export function CompanyProgressCard({ companies }: CompanyProgressCardProps) {
  const sorted = sortCompanies(companies);

  return (
    <section className={layout.card}>
      <div className={styles.header}>
        <h2 className={layout.cardTitle}>企業別の進捗</h2>
        <p className={styles.summary}>{companies.length}社</p>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.headCell}>企業</th>
              <th className={styles.stageHeadCell}>選考ステージ</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((company) => {
              const stageCount = company.stages.length;
              return (
                <tr key={company.id}>
                  <td className={styles.companyCell}>
                    <div className={styles.company}>
                      <span className={styles.initials}>{company.initials}</span>
                      <div className={styles.companyText}>
                        <p className={styles.companyName}>{company.name}</p>
                        <p className={styles.jobTitle}>{company.jobTitle}</p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.stageCell}>
                    <div className={styles.stepper}>
                      <div className={styles.rail} aria-hidden="true">
                        <span className={styles.railBase} />
                        <span
                          className={styles.railFill}
                          style={{
                            width: `${railFillPercent(company.currentStageIndex, stageCount)}%`,
                          }}
                        />
                      </div>
                      <div className={styles.steps}>
                        {company.stages.map((stage, index) => (
                          <div
                            key={`${company.id}-${stage.id}`}
                            className={styles.step({ align: stepAlign(index, stageCount) })}
                          >
                            <span
                              className={styles.stepDot({
                                state: stepState(index, company.currentStageIndex),
                              })}
                            />
                            <span className={styles.stepLabel}>{stage.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
