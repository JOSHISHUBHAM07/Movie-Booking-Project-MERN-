import axios from "axios";

const omdb = axios.create({
  baseURL: "https://www.omdbapi.com/",
  timeout: 10000,
});

export default omdb;
