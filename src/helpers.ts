import { Gameweek, Position, Team } from "types";
import { Player } from "types/player";

export const GAME_STATUS_VALUES = {
  GAME_UPDATING: "Game is updating..",
  SEASON_FINISHED: "The current FPL season has finished, check back next season!",
  GAME_OK: "GAME_OK"
};

// Getting a player by their id
export const GetPlayerById = (playerId: number, players: Player[]): Player => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return players.find((player) => player.id === playerId)!;
};

// Getting a team by their id
export const getTeamById = (teamId: number, teams: Team[]): Team => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return teams.find((team) => team.id === teamId)!;
};

// Getting a player by their id
export const getPositionById = (positionId: number, positions: Position[]): Position => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return positions.find((pos) => pos.id === positionId)!;
};

export const getPlayerImageUrl = (player?: Player): string => {
  if (!player) {
    return `${process.env.PUBLIC_URL}/assets/images/player-placeholder.png`;
  }

  const imgId = player.photo.replace(".jpg", "");

  return `https://resources.premierleague.com/premierleague/photos/players/110x140/p${imgId}.png`;
};

export const getNormalizedString = (input: string): string => {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036F]/g, "")
    .toUpperCase();
};

// Adding commas to large numbers
// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
export const numberWithCommas = (x: number): string => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Formatting date to desired format
export const formatDate = (kickOffDateTime: Date): string => {
  return (
    `${kickOffDateTime.toLocaleDateString(navigator.language, { day: "numeric", month: "short" })
    } ${
      kickOffDateTime.toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit" })}`
  );
};

/*
  The following function is used to check two things:

  1. If the the most recent gameweek deadline was was within the last 1.5 hours
    (If so, FPL data is innacurate as the game is being updated for approx 1.5 hours after
    each gameweek deadline)

  2. If there is no current gameweek then the season is finished - this must be
    relayed back to the user so they understand why data is unavailable
*/
export const checkGameStatus = (gameweeks: Gameweek[]): string => {
  const currentDateTime = new Date();

  const currentGameweek = gameweeks.find(gameweek => gameweek.is_current);
  const nextGameweek = gameweeks.find(gameweek => gameweek.is_next);

  if (!currentGameweek) {
    return GAME_STATUS_VALUES.SEASON_FINISHED;
  }

  /*
    Manually checking if next gamewek deadline has passed as there
    can sometimes be a delay in update of gameweek 'is_next' status
  */
  const relevantGameweek = !nextGameweek || new Date(nextGameweek.deadline_time) > currentDateTime
    ? currentGameweek
    : nextGameweek;

  const gameweekDeadline = new Date(relevantGameweek.deadline_time);
  const timeDifference = currentDateTime.getTime() - gameweekDeadline.getTime();

  // If current time is 1.5 hours (5400000 ms) since deadline, game will be updating
  if (timeDifference < 5400000) {
    return GAME_STATUS_VALUES.GAME_UPDATING;
  }

  return GAME_STATUS_VALUES.GAME_OK;
};

// Adding delay before next function call
export const delay = async (ms: number | undefined): Promise<void> => {
  await new Promise((res) => setTimeout(res, ms));
};
