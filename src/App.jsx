import { useIronman } from './hooks/useIronman';
import Header from './components/Header';
import Controls from './components/Controls';
import Legend from './components/Legend';
import RoundBanner from './components/RoundBanner';
import FinishedBanner from './components/FinishedBanner';
import PlayerCard from './components/PlayerCard';
import styles from './App.module.css';

export default function App() {
  const {
    playerCount,
    setPlayerCount,
    players,
    generated,
    round,
    totalRounds,
    isDone,
    overallLeader,
    generate,
    reset,
    declareWinner,
    undoRound,
    renamePlayer,
    mode,
    setMode,
    teamsEnabled,
    toggleTeams,
    doublesEnabled,
    toggleDoubles,
    teamAssignments,
    swapTeamColor,
  } = useIronman();

  return (
    <div className={styles.app}>
      <Header 
        mode={mode}
        setMode={setMode}
      />

      <Controls
        playerCount={playerCount}
        setPlayerCount={setPlayerCount}
        onGenerate={generate}
        onReset={reset}
        generated={generated}
        teamsEnabled={teamsEnabled}
        toggleTeams={toggleTeams}
        doublesEnabled={doublesEnabled}
        toggleDoubles={toggleDoubles}
      />

      <Legend />

      {generated && !isDone && (
        <RoundBanner
          players={players}
          round={round}
          totalRounds={totalRounds}
          onDeclareWinner={declareWinner}
          onUndo={undoRound}
          doublesEnabled={doublesEnabled}
          teamAssignments={teamAssignments}
        />
      )}

      {isDone && overallLeader && (
        <FinishedBanner leader={overallLeader} />
      )}

      <div className={styles.grid}>
        {players.map((player, pi) => (
          <PlayerCard
            key={pi}
            player={player}
            playerIndex={pi}
            round={round}
            totalRounds={totalRounds}
            generated={generated}
            onRename={renamePlayer}
            doublesEnabled={doublesEnabled}
            teamAssignments={teamAssignments}
            onSwapTeam={swapTeamColor}
          />
        ))}
      </div>
    </div>
  );
}
