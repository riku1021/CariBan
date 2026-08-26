import { HealthStatus } from "@/features/health";

import * as styles from "./HomePage.styles";

export function HomePage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.heading}>CariBan</h1>
      <HealthStatus />
    </section>
  );
}
