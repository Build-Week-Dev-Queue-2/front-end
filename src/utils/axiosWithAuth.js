import axios from "axios";

export const axiosWithAuth = () => {
  const token = sessionStorage.getItem("token");
  return axios.create({
    headers: {
      authorization: token,
    },
    baseURL: "https://devdesk2lambda.herokuapp.com/",
  });
};
