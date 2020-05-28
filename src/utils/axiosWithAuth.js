import axios from "axios";

export const axiosWithAuth = (token = "") => {
  return axios.create({
    headers: {
      Authorization: token,
    },
    baseURL: "https://devdesk2lambda.herokuapp.com/",
  });
};
