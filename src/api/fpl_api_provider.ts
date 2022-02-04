import axios from "axios";

export const base_url = "http://localhost:8010/proxy";

export const getGameData = async () => {
  const response = await axios.get(`${base_url}/bootstrap-static/`);
  return response.data;
};

export const getAllFixtures = async () => {
  const response = await axios.get(`${base_url}/fixtures/`);
  return response.data;
};

export const getGameweekFixtures = async (gameweek: string) => {
  const response = await axios.get(`${base_url}/fixtures/?event=${gameweek}`);
  return response.data;
};

export const getGameweekData = async (gameweek: string) => {
  const response = await axios.get(`${base_url}/event/${gameweek}/live/`);
  return response.data;
};

export const getTeamData = async (teamId: string) => {
  const response = await axios.get(`${base_url}/entry/${teamId}`);
  return response.data;
};

export const getTeamHistory = async (teamId: string) => {
  const response = await axios.get(`${base_url}/entry/${teamId}/history/`);
  return response.data;
};

export const getTeamTransfers = async (teamId: string) => {
  const response = await axios.get(`${base_url}/entry/${teamId}/transfers/`);
  return response.data;
};

export const getTeamPicksForGameweek = async (teamId: string, gameweek: string) => {
  const response = await axios.get(`${base_url}/entry/${teamId}/event/${gameweek}/picks/`);
  return response.data;
};

export const getLeagueData = async (leagueId: string) => {
  const response = await axios.get(`${base_url}/leagues-classic/${leagueId}/standings/`);
  return response.data;
};

export const getLeagueDataWithPage = async (leagueId: string, page: string) => {
  const response = await axios.get(
    `${base_url}/leagues-classic/${leagueId}/standings/?page_standings=${page}`
  );
  return response.data;
};

export const getPlayerData = async (playerId: string) => {
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
