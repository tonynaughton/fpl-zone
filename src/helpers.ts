import { Position, Team } from "types";
import { Player } from "types/player";

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

export const getTeamCrestImageUrl = (teamCode: number): string => {
  return `https://resources.premierleague.com/premierleague/badges/70/t${teamCode}.png`;
};

export const getLocalImage = (url: string): string => {
  return `${process.env.PUBLIC_URL}/assets/images/${url}`;
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

// Adding delay before next function call
export const delay = async (ms: number | undefined): Promise<void> => {
  await new Promise((res) => setTimeout(res, ms));
};
