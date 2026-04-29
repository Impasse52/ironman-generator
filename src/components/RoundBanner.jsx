import { PLAYER_COLORS, TEAM_COLORS } from '../data/characters';
import styles from './RoundBanner.module.css';

export default function RoundBanner({ players, round, totalRounds, onDeclareWinner, onUndo, doublesEnabled, teamAssignments }) {
  const isDone = round >= totalRounds;

  if (isDone) return null;
  const buttons = doublesEnabled
    ? [0, 1].map((teamIdx) => {
        const col = TEAM_COLORS[teamIdx];
        const teamPlayers = players.filter((_, pi) => teamAssignments[pi] === teamIdx);
        // find first player index on this team to use as the winner signal
        const firstPi = teamAssignments.indexOf(teamIdx);
        const label = teamPlayers.map(p => p.name).join(' & ');
        return (
          <button
            key={teamIdx}
            className={styles.winnerBtn}
            style={{ background: col.bg, borderColor: col.border, color: col.text }}
            onClick={() => onDeclareWinner(firstPi)}
          >
            {label} Win
          </button>
        );
      })
    : players.map((p, pi) => {
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
      });

  return (
    <div className={styles.wrap}>
      <div className={styles.banner}>
        <div className={styles.title}>
          Round {round + 1} of {totalRounds} — Who won this match?
        </div>
        <div className={styles.matchup}>
          {/* existing matchup display unchanged */}
        </div>
        <div className={styles.buttons}>
          {buttons}
          {round > 0 && (
            <button className={styles.undoBtn} onClick={onUndo}>Undo</button>
          )}
        </div>
      </div>
    </div>
  );
}