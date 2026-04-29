import styles from './Controls.module.css';

export default function Controls({ playerCount, setPlayerCount, onGenerate, onReset, generated, doublesEnabled, toggleDoubles }) {
  return (
    <div className={styles.controls}>
      <span className={styles.label}>Players:</span>
      {!doublesEnabled && [2, 3, 4].map((n) => (
        <button
          key={n}
          className={`${styles.countBtn} ${playerCount === n ? styles.active : ''}`}
          onClick={() => setPlayerCount(n)}
        >
          {n}
        </button>
      ))}
      <button
        className={`${styles.toggleBtn} ${doublesEnabled ? styles.toggleActive : ''}`}
        onClick={toggleDoubles}
      >
        2v2
      </button>
      <button className={styles.btnPrimary} onClick={onGenerate}>
        Generate Sequences
      </button>
      <button className={styles.btnSecondary} onClick={onReset}>
        Reset All
      </button>
    </div>
  );
}