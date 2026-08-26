import { profileMock } from "../mocks/profileMock";
import { ProfileDetailsSection } from "./ProfileDetailsSection";
import { ProfileMaterialsSection } from "./ProfileMaterialsSection";
import * as styles from "./ProfilePage.styles";
import { ProfileSummarySection } from "./ProfileSummarySection";

export function ProfilePage() {
  const profile = profileMock;

  return (
    <section className={styles.page}>
      <ProfileSummarySection basic={profile.basic} completeness={profile.completeness} />
      <ProfileMaterialsSection materials={profile.materials} />
      <ProfileDetailsSection
        works={profile.works}
        languages={profile.languages}
        education={profile.education}
        educationCurrentIndex={profile.educationCurrentIndex}
        activities={profile.activities}
        certificates={profile.certificates}
        awards={profile.awards}
      />
    </section>
  );
}
