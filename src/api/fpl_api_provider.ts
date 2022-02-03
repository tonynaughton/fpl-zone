import axios from "axios";

const base_url = "http://localhost:8010/proxy/";

const getAllFixtures = async () => {
  return axios({
    method: "get",
    url: `${base_url}fixtures/`,
  });
};

export const ApiProvider = {
  getAllFixtures,
};
