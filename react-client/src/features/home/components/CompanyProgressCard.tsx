import { SelectionStageStepper } from "@/components/SelectionStageStepper";

import { sortCompanies } from "../sort";
import type { CompanyProgress } from "../types";
import * as styles from "./CompanyProgressCard.styles";
import * as layout from "./HomePage.styles";

type CompanyProgressCardProps = {
  companies: CompanyProgress[];
};

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
            {sorted.map((company) => (
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
                  <SelectionStageStepper
                    stages={company.stages}
                    currentStageIndex={company.currentStageIndex}
                    className={styles.stageStepper}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
