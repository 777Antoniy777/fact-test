import axios from "axios";

const BASE_URL = "https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json";

const createAPI = () => {
  return axios.create({
    baseURL: BASE_URL,
    timeout: 5000
  });
};

export default createAPI;
