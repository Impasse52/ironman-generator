import { useState, useCallback } from 'react';
import { ROA2_CHARS, SSBM_CHARS, TEAM_COLORS } from '../data/characters';
import { shuffle } from '../utils/shuffle';

function makePlayers(count) {
  return Array.from({ length: count }, (_, i) => ({
    name: `Player ${i + 1}`,
    sequence: [],
    results: [], // 'win' | 'lose' | undefined per round index
  }));
}

export function useIronman() {
  const [playerCount, setPlayerCountState] = useState(2);
  const [players, setPlayers] = useState(() => makePlayers(2));
  const [generated, setGenerated] = useState(false);
  const [round, setRound] = useState(0);
  const [mode, setMode] = useState(0);
  const [teamsEnabled, setTeams] = useState(false);

  const [doublesEnabled, setDoublesEnabled] = useState(false);
  const [teamAssignments, setTeamAssignments] = useState([0, 0, 1, 1]); // index into TEAM_COLORS per player

  const toggleDoubles = useCallback(() => {
    setDoublesEnabled(prev => {
      const next = !prev;
      if (next) {
        setPlayerCountState(4);
        setPlayers(makePlayers(4));
      }
      setGenerated(false);
      setRound(0);
      return next;
    });
  }, []);

  const swapTeamColor = useCallback((pi) => {
    setTeamAssignments(prev => {
      const next = [...prev];
      next[pi] = next[pi] === 0 ? 1 : 0;
      return next;
    });
  }, []);

  let characters = ROA2_CHARS;

  if (mode == 0) { characters = ROA2_CHARS }
  else if (mode == 1) { characters = SSBM_CHARS }

  const toggleTeamsEnabled = useCallback(() => {
    setTeams(prev => !prev);
  }, []);

  const setPlayerCount = useCallback((n) => {
    setPlayerCountState(n);
    setPlayers(makePlayers(n));
    setGenerated(false);
    setRound(0);
    setDoublesEnabled(false);
  }, []);

  const generate = useCallback(() => {
    setPlayers((prev) =>
      prev.map((p) => ({ ...p, sequence: shuffle(characters), results: [] }))
    );
    setGenerated(true);
    setRound(0);
  }, [mode]);

  const reset = useCallback(() => {
    setPlayers((prev) =>
      prev.map((p) => ({ ...p, sequence: [], results: [] }))
    );
    setGenerated(false);
    setRound(0);
  }, []);

  const declareWinner = useCallback(
    (winnerIdx) => {
      setPlayers((prev) =>
        prev.map((p, pi) => {
          const results = [...p.results];
          if (doublesEnabled) {
            const winnerTeam = teamAssignments[winnerIdx];
            results[round] = teamAssignments[pi] === winnerTeam ? 'win' : 'lose';
          } else {
            results[round] = pi === winnerIdx ? 'win' : 'lose';
          }
          return { ...p, results };
        })
      );
      setRound((r) => r + 1);
    },
    [round, doublesEnabled, teamAssignments]
  );

  const undoRound = useCallback(() => {
    if (round <= 0) return;
    const prevRound = round - 1;
    setPlayers((prev) =>
      prev.map((p) => {
        const results = [...p.results];
        delete results[prevRound];
        return { ...p, results };
      })
    );
    setRound(prevRound);
  }, [round]);

  const renamePlayer = useCallback((pi, name) => {
    setPlayers((prev) =>
      prev.map((p, i) => (i === pi ? { ...p, name } : p))
    );
  }, []);

  const totalRounds = characters.length;
  const isDone = generated && round >= totalRounds;

  const overallLeader = isDone
    ? (() => {
      if (doublesEnabled) {
        const teamWins = [0, 0];
        players.forEach((p, pi) => {
          teamWins[teamAssignments[pi]] += p.results.filter(r => r === 'win').length;
        });
        const winningTeam = teamWins[0] >= teamWins[1] ? 0 : 1;
        const teamPlayers = players.filter((_, pi) => teamAssignments[pi] === winningTeam).map(p => p.name);
        return { name: teamPlayers.join(' & '), wins: Math.max(...teamWins) };
      }
      const wins = players.map((p) => p.results.filter((r) => r === 'win').length);
      const max = Math.max(...wins);
      return { name: players[wins.indexOf(max)].name, wins: max };
    })()
    : null;

  return {
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
    toggleTeamsEnabled,
    doublesEnabled,
    toggleDoubles,
    teamAssignments,
    swapTeamColor,
  };
}
