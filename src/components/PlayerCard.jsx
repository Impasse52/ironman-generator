import { PLAYER_COLORS, ROA2_CHARS, TEAM_COLORS } from '../data/characters';
import CharSlot from './CharSlot';
import styles from './PlayerCard.module.css';

export default function PlayerCard({ player, playerIndex, round, totalRounds, generated, onRename, doublesEnabled, teamAssignments, onSwapTeam }) {
  const col = doublesEnabled
    ? TEAM_COLORS[teamAssignments[playerIndex]]
    : PLAYER_COLORS[playerIndex];
  const wins = player.results.filter((r) => r === 'win').length;
  const pct = generated ? Math.round((wins / totalRounds) * 100) : 0;

  function getStatus(ci) {
    if (ci < round) return player.results[ci] === 'win' ? 'won' : 'lost';
    if (ci === round && round < totalRounds) return 'current';
    return 'pending';
  }

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <div
            className={styles.badge}
            style={{ background: col.bg, border: `1px solid ${col.border}`, color: col.text }}
          >
            {col.label}
          </div>
          <input
            className={styles.nameInput}
            style={{ color: col.text }}
            value={player.name}
            placeholder={`Player ${playerIndex + 1}`}
            onChange={(e) => onRename(playerIndex, e.target.value)}
          />
            {doublesEnabled && (
    <button
      onClick={() => onSwapTeam(playerIndex)}
      title="Swap team"
      style={{
        background: 'transparent',
        border: `1px solid ${col.border}`,
        color: col.text,
        borderRadius: '4px',
        padding: '2px 7px',
        cursor: 'pointer',
        fontSize: '11px',
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700,
        letterSpacing: '1px',
      }}
    >
      ⇄
    </button>
  )}
        </div>
        <div className={styles.scoreBox}>
          <div className={styles.scoreNums} style={{ color: col.text }}>
            {wins} <span className={styles.scoreDivider}>/</span> {totalRounds}
          </div>
          <div className={styles.scoreLabel}>wins — {pct}%</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className={styles.progressWrap}>
        <div className={styles.progressFill} style={{ width: `${pct}%`, background: col.border }} />
      </div>

      {/* Char grid */}
      {generated ? (
        <div className={styles.charGrid}>
          {player.sequence.map((char, ci) => (
            <CharSlot key={char.id} char={char} index={ci} status={getStatus(ci)} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>Press "Generate Sequences" to start</div>
      )}
    </div>
  );
}
