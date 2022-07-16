import axios from "axios";
import {
  BestLeague,
  Fixture,
  GameData,
  Gameweek,
  LeagueData,
  LeagueDataWithPage,
  PlayerSummary,
  Region,
  TeamData,
  TeamHistory,
  TeamPicks,
  Transfer
} from "types";

export const base_url = process.env.REACT_APP_ENVIRONMENT === "DEVELOPMENT"
  ? "http://localhost:8010/proxy/"
  : "/api/";

export const getGameData = async (): Promise<GameData> => {
  const response = await axios.get(`${base_url}bootstrap-static/`);

  return response.data;
};

export const getAllFixtures = async (): Promise<Fixture[]> => {
  const response = await axios.get(`${base_url}fixtures/`);

  return response.data;
};

export const getGameweekFixtures = async (gameweek: number): Promise<Fixture[]> => {
  const response = await axios.get(`${base_url}fixtures/?event=${gameweek}`);

  return response.data;
};

export const getGameweekData = async (gameweek: number): Promise<Gameweek> => {
  const response = await axios.get(`${base_url}event/${gameweek}/live/`);

  return response.data;
};

export const getTeamData = async (teamId: number | undefined): Promise<TeamData> => {
  const response = await axios.get(`${base_url}entry/${teamId}/`);

  return response.data;
};

export const getTeamHistory = async (teamId: number): Promise<TeamHistory> => {
  const response = await axios.get(`${base_url}entry/${teamId}/history/`);

  return response.data;
};

export const getTeamTransfers = async (teamId: number): Promise<Transfer[]> => {
  const response = await axios.get(`${base_url}entry/${teamId}/transfers/`);

  return response.data;
};

export const getTeamPicksForGameweek = async (
  gameweek: number,
  teamId?: number
): Promise<TeamPicks> => {
  if (!teamId) throw new Error("No FPL ID received");

  const response = await axios.get(`${base_url}entry/${teamId}/event/${gameweek}/picks/`);

  return response.data;
};

export const getLeagueData = async (leagueId: number): Promise<LeagueData> => {
  const response = await axios.get(`${base_url}leagues-classic/${leagueId}/standings/`);

  return response.data;
};

export const getLeagueDataWithPage = async (
  leagueId: number,
  page: number
): Promise<LeagueDataWithPage> => {
  const response = await axios.get(
    `${base_url}/leagues-classic/${leagueId}standings/?page_standings=${page}`
  );

  return response.data;
};

export const getPlayerData = async (playerId: number): Promise<PlayerSummary> => {
  const response = await axios.get(`${base_url}element-summary/${playerId}/`);

  return response.data;
};

export const getRegions = async (): Promise<Region> => {
  const response = await axios.get(`${base_url}regions/`);

  return response.data;
};

export const getBestLeagues = async (): Promise<BestLeague> => {
  const response = await axios.get(`${base_url}stats/best-classic-private-leagues/`);

  return response.data;
};
