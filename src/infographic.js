import { createReadStream } from "fs";
import { post } from "axios";
const csv = require("csv-parser");
import { log } from "./util.js";
import { baseUrl } from "./util.js";

export function addInfographic(token, file, metadata) {
  let results = [];
  createReadStream(metadata)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      if (!results || results.length === 0) {
        log.error("No Infographic Metadata in ", metadata);
        return;
      }
    });
  const infographics = [];
  return createReadStream(file)
    .pipe(csv())
    .on("data", (data) => infographics.push(data))
    .on("end", () => {
      const data = results[0];
      console.log(data);
      data.infographics = infographics;
      post(`${baseUrl}/sources/infographic`, data, token)
        .then((response) => {
          log.info("Infographics added :", JSON.stringify(response.data));
        })
        .catch((error) => {
          log.error("Server Response :", JSON.stringify(error));
        });
    });
}
