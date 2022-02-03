import axios from "axios";

const base_url = "http://localhost:8010/proxy";

export const generalGameData = async () => {
  await axios.get(`${base_url}/bootstrap-static/`).then((response) => {
    // eslint-disable-next-line no-console
    console.log(response.data);
  });
};

export const allFixtures = async () => {
  await axios.get(`${base_url}/fixtures/`).then((response) => {
    // eslint-disable-next-line no-console
    console.log(response.data);
  });
};

export const currentGameweekFixtures = async () => {
  await axios.get(`${base_url}/fixtures/?event=GW`).then((response) => {
    // eslint-disable-next-line no-console
    console.log(response.data);
  });
};

export const gameweekLiveData = async () => {
  await axios.get(`${base_url}/event/20/live/`).then((response) => {
    // eslint-disable-next-line no-console
    console.log(response.data);
  });
};
