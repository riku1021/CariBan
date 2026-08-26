import type { ProfileMaterial } from "../types";
import { ProfileCardActions } from "./ProfileCardActions";
import * as styles from "./ProfileMaterialsSection.styles";
import * as layout from "./ProfilePage.styles";

type ProfileMaterialsSectionProps = {
  materials: ProfileMaterial[];
};

function MaterialBody({ material }: { material: ProfileMaterial }) {
  if (material.kind === "text") {
    return <p className={layout.bodyText}>{material.body}</p>;
  }

  if (material.kind === "list") {
    return (
      <ol className={styles.list}>
        {material.items.map((item, index) => (
          <li key={item} className={styles.listItem}>
            <span className={styles.listIndex}>{String(index + 1).padStart(2, "0")}</span>
            <p className={layout.bodyText}>{item}</p>
          </li>
        ))}
      </ol>
    );
  }

  if (material.kind === "gakuchika") {
    return (
      <>
        <p className={layout.cardTitle}>{material.title}</p>
        <p className={layout.bodyText}>{material.body}</p>
        <p className={styles.outcome}>{material.outcome}</p>
        <div className={styles.tags}>
          {material.tags.map((tag) => (
            <span key={tag} className={layout.tag}>
              {tag}
            </span>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.traitGroup}>
        <p className={styles.traitLabel}>強み</p>
        <p className={layout.bodyText}>{material.strengths}</p>
      </div>
      <div className={styles.traitGroup}>
        <p className={styles.traitLabel}>弱み</p>
        <p className={layout.bodyText}>{material.weaknesses}</p>
      </div>
    </>
  );
}

export function ProfileMaterialsSection({ materials }: ProfileMaterialsSectionProps) {
  return (
    <div className={styles.section}>
      <h2 className={layout.cardTitle}>選考素材</h2>
      <div className={styles.grid}>
        {materials.map((material) => (
          <section key={material.id} className={layout.card}>
            <div className={layout.cardHeader}>
              <h3 className={layout.cardTitle}>{material.label}</h3>
              <ProfileCardActions showExpand />
            </div>
            <div className={layout.cardBody}>
              <MaterialBody material={material} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
