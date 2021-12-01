import axios from "axios";
const baseURL = "https://api.vachanengine.org/v2/";
export const API = axios.create({ baseURL: baseURL, timeout: 45000 });
export const CancelToken = axios.CancelToken;
