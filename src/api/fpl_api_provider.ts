import axios from "axios";
import { PlayerSummary } from "types/player_summary";
import { Team } from "types/team";

export const base_url = "http://localhost:8010/proxy";

export const getGameData = async () => {
  const response = await axios.get(`${base_url}/bootstrap-static/`);
  return response.data;
};

export const getAllFixtures = async () => {
  const response = await axios.get(`${base_url}/fixtures/`);
  return response.data;
};

export const getGameweekFixtures = async (gameweek: number) => {
  const response = await axios.get(`${base_url}/fixtures/?event=${gameweek}`);
  return response.data;
};

export const getGameweekData = async (gameweek: number) => {
  const response = await axios.get(`${base_url}/event/${gameweek}/live/`);
  return response.data;
};

export const getTeamData = async (teamId: number | undefined): Promise<Team> => {
  const response = await axios.get(`${base_url}/entry/${teamId}/`);
  return response.data;
};

export const getTeamHistory = async (teamId: number) => {
  const response = await axios.get(`${base_url}/entry/${teamId}/history/`);
  return response.data;
};

export const getTeamTransfers = async (teamId: number) => {
  const response = await axios.get(`${base_url}/entry/${teamId}/transfers/`);
  return response.data;
};

export const getTeamPicksForGameweek = async (teamId: number, gameweek: number) => {
  const response = await axios.get(`${base_url}/entry/${teamId}/event/${gameweek}/picks/`);
  return response.data;
};

export const getLeagueData = async (leagueId: number) => {
  const response = await axios.get(`${base_url}/leagues-classic/${leagueId}/standings/`);
  return response.data;
};

export const getLeagueDataWithPage = async (leagueId: number, page: number) => {
  const response = await axios.get(
    `${base_url}/leagues-classic/${leagueId}/standings/?page_standings=${page}`
  );
  return response.data;
};

export const getPlayerData = async (playerId: number): Promise<PlayerSummary> => {
  const response = await axios.get(`${base_url}/element-summary/${playerId}/`);
  return response.data;
};

export const getRegions = async () => {
  const response = await axios.get(`${base_url}/regions/`);
  return response.data;
};

export const getBestLeagues = async () => {
  const response = await axios.get(`${base_url}/stats/best-classic-private-leagues/`);
  return response.data;
};
