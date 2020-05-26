import axios from "axios";

export const axiosWithAuth = (token = "") => {
  return axios.create({
    headers: {
      Authorization: token,
    },
    baseURL: "https://devdeskqueue2backend.herokuapp.com",
  });
};
