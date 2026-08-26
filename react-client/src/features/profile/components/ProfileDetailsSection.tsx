import { FaTrophy } from "react-icons/fa";

import type {
  ProfileActivity,
  ProfileAward,
  ProfileCertificate,
  ProfileEducation,
  ProfileLanguage,
  ProfileWork,
} from "../types";
import { ProfileCardActions } from "./ProfileCardActions";
import * as styles from "./ProfileDetailsSection.styles";
import * as layout from "./ProfilePage.styles";

type ProfileDetailsSectionProps = {
  works: ProfileWork[];
  languages: ProfileLanguage[];
  education: ProfileEducation[];
  educationCurrentIndex: number;
  activities: ProfileActivity[];
  certificates: ProfileCertificate[];
  awards: ProfileAward[];
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

export function ProfileDetailsSection({
  works,
  languages,
  education,
  educationCurrentIndex,
  activities,
  certificates,
  awards,
}: ProfileDetailsSectionProps) {
  const educationCount = education.length;
  return (
    <div className={styles.grid}>
      <section className={layout.card}>
        <div className={layout.cardHeader}>
          <h2 className={layout.cardTitle}>作品一覧</h2>
          <ProfileCardActions />
        </div>
        <ul className={styles.list}>
          {works.map((work) => (
            <li key={work.id} className={styles.workItem}>
              <span className={styles.thumb} aria-hidden="true" />
              <div className={styles.itemBody}>
                <p className={styles.itemTitle}>{work.title}</p>
                <p className={layout.muted}>{work.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={layout.card}>
        <div className={layout.cardHeader}>
          <h2 className={layout.cardTitle}>プログラミング言語</h2>
          <ProfileCardActions />
        </div>
        <div className={styles.languageTableWrap}>
          <table className={styles.languageTable}>
            <thead>
              <tr>
                <th scope="col" className={styles.languageTh}>
                  言語
                </th>
                <th scope="col" className={styles.languageTh}>
                  用途
                </th>
                <th scope="col" className={styles.languageThPeriod}>
                  期間
                </th>
              </tr>
            </thead>
            <tbody>
              {languages.map((language) => (
                <tr key={language.id} className={styles.languageTr}>
                  <td className={styles.languageTd}>
                    <div className={styles.languageLead}>
                      <span
                        className={styles.languageBadge({ tone: language.tone })}
                        aria-hidden="true"
                      >
                        {language.name.slice(0, 2)}
                      </span>
                      <span className={styles.languageName}>{language.name}</span>
                    </div>
                  </td>
                  <td className={styles.languageTd}>
                    <div className={styles.languageTags}>
                      {language.contexts.map((context) => (
                        <span key={context} className={layout.tag}>
                          {context}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className={styles.languageTdPeriod}>{language.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={layout.card}>
        <div className={layout.cardHeader}>
          <h2 className={layout.cardTitle}>学歴</h2>
          <ProfileCardActions />
        </div>
        <div className={styles.eduStepper}>
          <div className={styles.eduRail} aria-hidden="true">
            <span className={styles.eduRailBase} />
            <span
              className={styles.eduRailFill}
              style={{ height: `${railFillPercent(educationCurrentIndex, educationCount)}%` }}
            />
          </div>
          <div className={styles.eduSteps}>
            {education.map((item, index) => (
              <div
                key={item.id}
                className={styles.eduStep({ align: stepAlign(index, educationCount) })}
              >
                <span
                  className={styles.eduDot({
                    state: stepState(index, educationCurrentIndex),
                  })}
                />
                <div className={styles.eduLabel}>
                  <p className={styles.eduPeriod}>{item.period}</p>
                  <p className={styles.itemTitle}>{item.title}</p>
                  <p className={styles.eduEvent}>{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={layout.card}>
        <div className={layout.cardHeader}>
          <h2 className={layout.cardTitle}>学外活動</h2>
          <ProfileCardActions />
        </div>
        <ul className={styles.recordList}>
          {activities.map((activity) => (
            <li key={activity.id} className={styles.recordRow}>
              <p className={styles.recordName}>{activity.title}</p>
              <span className={layout.tag}>{activity.tag}</span>
              <p className={styles.recordDate}>{activity.date}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={layout.card}>
        <div className={layout.cardHeader}>
          <h2 className={layout.cardTitle}>資格・免許・修了証</h2>
          <ProfileCardActions />
        </div>
        <ul className={styles.recordList}>
          {certificates.map((certificate) => (
            <li key={certificate.id} className={styles.recordRow}>
              <p className={styles.recordName}>{certificate.name}</p>
              <p className={styles.recordMeta}>{certificate.issuer}</p>
              <p className={styles.recordDate}>{certificate.date}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={layout.card}>
        <div className={layout.cardHeader}>
          <h2 className={layout.cardTitle}>賞罰</h2>
          <ProfileCardActions />
        </div>
        <ul className={styles.recordList}>
          {awards.map((award) => (
            <li key={award.id} className={styles.recordRow}>
              <div className={styles.awardLead}>
                <FaTrophy className={styles.awardIcon} aria-hidden="true" />
                <p className={styles.recordName}>{award.name}</p>
              </div>
              <p className={styles.recordMeta}>{award.category}</p>
              <p className={styles.recordDate}>{award.date}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
