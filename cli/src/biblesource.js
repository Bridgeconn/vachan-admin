import { createReadStream } from "fs";
import { post } from "axios";
import { log } from "./util.js";
import { baseUrl } from "./util.js";
const csv = require("csv-parser");

export function addBibleSource(file) {
  return createReadStream(file)
    .pipe(csv())
    .on("data", (data) => {
      post(`${baseUrl}/sources/bibles`, data)
        .then((response) => {
          log.info("Source Added :", JSON.stringify(data));
          log.info("Server Response :", JSON.stringify(response.data));
        })
        .catch((error) => {
          log.error("Source Added :", JSON.stringify(data));
          log.error("Server Response :", JSON.stringify(error));
        });
    });
}
