import { Gameweek, Team } from "types";
import { Player } from "types/player";

// Getting a player by their id
export function GetPlayerById(playerId: number, players: Player[]): Player {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return players.find((player) => player.id === playerId)!;
}

// Getting a team by their id
export function getTeamById(teamId: number, teams: Team[]): Team {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return teams.find((team) => team.id === teamId)!;
}

// Adding commas to large numbers
// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
export function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Formatting date to desired format
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

// Adding delay before next function call
export async function delay(ms: number | undefined): Promise<void> {
  await new Promise((res) => setTimeout(res, ms));
}
