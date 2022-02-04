import axios from "axios";

const base_url = "http://localhost:8010/proxy";

export const getGameData = async () => {
  await axios.get(`${base_url}/bootstrap-static/`).then((response) => {
    // eslint-disable-next-line no-console
    console.log(response.data);
    return response.data;
  });
};

export const getAllFixtures = async () => {
  await axios.get(`${base_url}/fixtures/`).then((response) => {
    // eslint-disable-next-line no-console
    console.log(response.data);
    return response.data;
  });
};

export const getGameweekFixtures = async (gameweek: string) => {
  await axios.get(`${base_url}/fixtures/?event=${gameweek}`).then((response) => {
    // eslint-disable-next-line no-console
    console.log(response.data);
    return response.data;
  });
};

export const getGameweekData = async (gameweek: string) => {
  await axios.get(`${base_url}/event/${gameweek}/live/`).then((response) => {
    // eslint-disable-next-line no-console
    console.log(response.data);
    return response.data;
  });
};

export const getTeamData = async (teamId: string) => {
  await axios.get(`${base_url}/entry/${teamId}`).then((response) => {
    // eslint-disable-next-line no-console
    console.log(response.data);
    return response.data;
  });
};

export const getTeamHistory = async (teamId: string) => {
  await axios.get(`${base_url}/entry/${teamId}/history/`).then((response) => {
    // eslint-disable-next-line no-console
    console.log(response.data);
    return response.data;
  });
};

export const getTeamTransfers = async (teamId: string) => {
  await axios.get(`${base_url}/entry/${teamId}/transfers/`).then((response) => {
    // eslint-disable-next-line no-console
    console.log(response.data);
    return response.data;
  });
};

export const getTeamPicksForGameweek = async (teamId: string, gameweek: string) => {
  await axios.get(`${base_url}/entry/${teamId}/event/${gameweek}/picks/`).then((response) => {
    // eslint-disable-next-line no-console
    console.log(response.data);
    return response.data;
  });
};

export const getLeagueData = async (leagueId: string) => {
  await axios.get(`${base_url}/leagues-classic/${leagueId}/standings/`).then((response) => {
    // eslint-disable-next-line no-console
    console.log(response.data);
    return response.data;
  });
};

export const getLeagueDataWithPage = async (leagueId: string, page: string) => {
  await axios
    .get(`${base_url}/leagues-classic/${leagueId}/standings/?page_standings=${page}`)
    .then((response) => {
      // eslint-disable-next-line no-console
      console.log(response.data);
      return response.data;
    });
};

export const getPlayerData = async (leagueId: string) => {
  await axios.get(`${base_url}/leagues-classic/${leagueId}/standings/`).then((response) => {
    // eslint-disable-next-line no-console
    console.log(response.data);
    return response.data;
  });
};

export const getRegions = async () => {
  await axios.get(`${base_url}/regions/`).then((response) => {
    // eslint-disable-next-line no-console
    console.log(response.data);
    return response.data;
  });
};

export const getBestLeagues = async () => {
  await axios.get(`${base_url}/best-classic-private-leagues/`).then((response) => {
    // eslint-disable-next-line no-console
    console.log(response.data);
    return response.data;
  });
};
