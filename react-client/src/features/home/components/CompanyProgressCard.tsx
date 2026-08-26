import { sortCompanies } from "../sort";
import { type CompanyProgress, SELECTION_STAGES } from "../types";
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
              <th className={styles.headCell}>選考ステージ</th>
              <th className={styles.headCell}>最終更新</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((company) => (
              <tr key={company.id}>
                <td className={styles.cell}>
                  <div className={styles.company}>
                    <span className={styles.initials}>{company.initials}</span>
                    <p className={styles.companyName}>{company.name}</p>
                  </div>
                </td>
                <td className={styles.cell}>
                  <div className={styles.stepper}>
                    {SELECTION_STAGES.map((stage, index) => (
                      <div key={stage.id} className={styles.step}>
                        {index < SELECTION_STAGES.length - 1 ? (
                          <span
                            className={styles.stepLine({
                              filled: index < company.currentStageIndex,
                            })}
                          />
                        ) : null}
                        <span
                          className={styles.stepDot({
                            state: stepState(index, company.currentStageIndex),
                          })}
                        />
                        <span className={styles.stepLabel}>{stage.label}</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td className={styles.cell}>
                  <span className={styles.updated}>{company.lastUpdated}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
