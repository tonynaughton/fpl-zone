import { Gameweek, Team } from "types";
import { Player } from "types/player";

export function GetPlayerById(playerId: number, players: Player[]): Player {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return players.find((player) => player.id === playerId)!;
}

export function getTeamById(teamId: number, teams: Team[]): Team {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return teams.find((team) => team.id === teamId)!;
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

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
export function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatDate(kickOffDateTime: Date): string {
  return (
    kickOffDateTime.toLocaleDateString(navigator.language, { day: "numeric", month: "short" }) +
    " " +
    kickOffDateTime.toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" })
  );
}

// FPL game gets temporarily suspended when it is updating (i.e. fetched data will be inaccurate).
// This update takes place at the beginning of each gameweek just after the deadline
// for approximately 1.5 hours.
export function checkGameUpdatingStatus(gameweeks: Gameweek[]): boolean {
  const currentDateTime = new Date();
  const currentGameweek = gameweeks.find((gameweek) => gameweek.is_current) as Gameweek;
  const nextGameweek = gameweeks.find((gameweek) => gameweek.is_next) as Gameweek;
  // Checking if next gamewek deadline has passed.
  // There can sometimes be a delay in update of gameweek is_next status.
  const relevantGameweek =
    new Date(nextGameweek.deadline_time) < currentDateTime ? nextGameweek : currentGameweek;
  const deadline = new Date(relevantGameweek.deadline_time);
  const timeDifference = currentDateTime.getTime() - deadline.getTime();
  // If current time is 1.5 hours (5400000 ms) since deadline, game will be updating
  if (timeDifference < 5400000) {
    return true;
  } else {
    return false;
  }
}

export async function delay(ms: number | undefined): Promise<void> {
  await new Promise((res) => setTimeout(res, ms));
}
