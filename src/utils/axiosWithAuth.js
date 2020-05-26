import axios from "axios";

export const axiosWithAuth = (token = "") => {
  return axios.create({
    headers: {
      Authorization: token,
    },
    baseURL:
      "https://cors-anywhere.herokuapp.com/https://devdeskqueue2backend.herokuapp.com",
  });
};