import _ from "lodash";
import { Player } from "types/player";
import { Position } from "types/position";

export function GetPlayerById(playerId: number, players: Player[]): Player {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return players.find((player) => player.id === playerId)!;
}

export function getTeamShirtColour(team_code: number): string | undefined {
  const teamColours = [
    { code: 3, team: "Arsenal", color: "#fe0002" },
    { code: 7, team: "Aston Villa", color: "#480025" },
    { code: 94, team: "Brentford", color: "#c61d23" },
    { code: 36, team: "Brighton", color: "#c61d23" },
    { code: 90, team: "Burnley", color: "#6a003a" },
    { code: 8, team: "Chelsea", color: "#0a4595" },
    { code: 31, team: "Crystal Palace", color: "#eb302e" },
    { code: 11, team: "Everton", color: "#00369c" },
    { code: 13, team: "Leeds", color: "#f5f5f5" },
    { code: 2, team: "Leicester City", color: "#273e8a" },
    { code: 14, team: "Liverpool", color: "#e31b23" },
    { code: 43, team: "Manchester City", color: "#6caee0" },
    { code: 1, team: "Manchester United", color: "#d81920" },
    { code: 4, team: "Newcastle United", color: "#383838" },
    { code: 45, team: "Norwich City", color: "#00a94f" },
    { code: 20, team: "Southampton", color: "#d71920" },
    { code: 6, team: "Tottenham", color: "#f5f5f5" },
    { code: 57, team: "Watford", color: "#ffee00" },
    { code: 21, team: "West Ham", color: "#7d2c3b" },
    { code: 39, team: "Wolves", color: "#f9a01b" },
  ];
  const result = teamColours.find((obj) => {
    return obj.code === team_code;
  });
  return result?.color;
}

// Helper function used to divide a squad of players into First XI and bench
export function selectLineup(
  squad: Player[][],
  positions: Position[]
): { firstXIPlayers: Player[][]; benchPlayers: Player[] } {
  const firstXIPlayers = squad.map((playerGroup, index) => {
    return playerGroup.splice(0, positions[index].squad_min_play);
  });

  const benchPlayers = _(squad).flatten().orderBy(["event_points"], ["desc"]).value();

  const addRemainingFirstXI = (playerGroup: Player[]): void => {
    let playerAdded = false;
    playerGroup.forEach((player, index) => {
      if (!playerAdded) {
        const pos = player.element_type;
        if (firstXIPlayers[pos - 1].length < positions[pos - 1].squad_max_play) {
          firstXIPlayers[pos - 1].push(player);
          playerGroup.splice(index, 1);
          playerAdded = true;
        }
      }
    });

    if (playerGroup.length > 4) {
      addRemainingFirstXI(playerGroup);
    }
  };

  addRemainingFirstXI(benchPlayers);

  return { firstXIPlayers, benchPlayers };
}
