import * as styles from "./PlaceholderPage.styles";

type PlaceholderPageProps = {
  message?: string;
};

export function PlaceholderPage({ message = "このページは準備中です" }: PlaceholderPageProps) {
  return (
    <section className={styles.page}>
      <p className={styles.message}>{message}</p>
    </section>
  );
}
