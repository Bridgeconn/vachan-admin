const path = require("path");
export const log = require("simple-node-logger").createSimpleLogger(
  path.join(__dirname, "../vachan-admin.log")
);
require("dotenv").config({ path: path.join(__dirname, "../.env") });
export const baseUrl = process.env.BASE_URL;
