import { PLAYER_COLORS } from '../data/characters';
import styles from './RoundBanner.module.css';

export default function RoundBanner({ players, round, totalRounds, onDeclareWinner, onUndo }) {
  const isDone = round >= totalRounds;

  if (isDone) return null;

  return (
    <div className={styles.wrap}>
      <div className={styles.banner}>
        <div className={styles.title}>
          Round {round + 1} of {totalRounds} — Who won this match?
        </div>

        <div className={styles.matchup}>
          {players.map((p, pi) => {
            const col = PLAYER_COLORS[pi];
            const char = p.sequence[round];
            return (
              <span key={pi} className={styles.matchupEntry}>
                <span className={styles.matchupPlayer} style={{ color: col.text }}>
                  <img src={char?.icon} height="20px"></img> {p.name}
                </span>
                <span className={styles.matchupChar}>({char?.name})</span>
                {pi < players.length - 1 && (
                  <span className={styles.vs}>VS</span>
                )}
              </span>
            );
          })}
        </div>

        <div className={styles.buttons}>
          {players.map((p, pi) => {
            const col = PLAYER_COLORS[pi];
            return (
              <button
                key={pi}
                className={styles.winnerBtn}
                style={{ background: col.bg, borderColor: col.border, color: col.text }}
                onClick={() => onDeclareWinner(pi)}
              >
                {p.name} Wins
              </button>
            );
          })}
          {round > 0 && (
            <button className={styles.undoBtn} onClick={onUndo}>
              Undo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
