const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
import { get, post } from "axios";
import { stringify } from "querystring";
import { log } from "./util.js";

const baseUrl = process.env.BASE_URL;
const email = process.env.ADMIN_EMAIL;
const pass = process.env.ADMIN_PASS;

export function getAuth(type) {
  // read in api settings
  const errorMessage = checkConfig();
  if (errorMessage) {
    log.error("Config Error: ", errorMessage);
    return Promise.resolve();
  }
  //bible and bible source do not require authentication
  const skipAuth = ["biblesource", "bible"].includes(type);
  return skipAuth ? checkServerAlive() : getToken();
}
function checkConfig() {
  return !baseUrl
    ? "Base URL not set"
    : !email
    ? "Email not set"
    : !pass
    ? "Password not set"
    : "";
}
function checkServerAlive() {
  return get(baseUrl.split("v1")[0])
    .then(() => Promise.resolve({}))
    .catch(errorHandler);
}
function getToken() {
  return post(`${baseUrl}/auth`, stringify({ email: email, password: pass }))
    .then((response) => {
      if (response.data.success === false) {
        return log.error("Authentication Error: ", response.data.message);
      }
      return {
        headers: {
          Authorization: `Bearer ${response.data.accessToken}`,
        },
        maxBodyLength: 50000000, //50mb
        maxContentLength: 50000000, //50mb
      };
    })
    .catch(errorHandler);
}
function errorHandler(error) {
  if (error.response && error.response.status === 404) {
    log.error("Server Not Found at: ", baseUrl);
  } else if (error.request) {
    log.error("Server Error, check if server is running at: ", baseUrl);
  } else {
    console.log(error);
  }
  return Promise.resolve();
}
