import axios from "axios";

const api = axios.create({
  baseURL: "https://abstradev-backend.herokuapp.com/",
});

export default api;

export const EndPoints = {
  transactions: "transactions",
};
