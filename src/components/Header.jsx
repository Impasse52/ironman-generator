import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        Ironman Generator
      </h1>
      <h1 className={styles.gametitle}>
        Rivals of Aether II
      </h1>
    </header>
  );
}
