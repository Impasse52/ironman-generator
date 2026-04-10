import styles from './CharSlot.module.css';

// result: 'win' | 'lose' | undefined
// status: 'won' | 'lost' | 'current' | 'pending'
export default function CharSlot({ char, index, status }) {
  return (
    <div className={`${styles.slot} ${styles[status]}`}>
      <span className={styles.num}>{index + 1}</span>
      <div className={styles.inner}>
        {char.image ? (
          <img src={char.image} alt={char.name} className={styles.img} />
        ) : (
          <span className={styles.icon}><img src={char.icon} height="45px"></img></span>
        )}
        <span className={styles.name}>{char.name}</span>
      </div>
    </div>
  );
}
