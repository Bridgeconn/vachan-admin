import { createReadStream } from "fs";
import { post } from "axios";
const csv = require("csv-parser");
import { log } from "./util.js";
import { baseUrl } from "./util.js";

export function addCommentary(token, file, metadata) {
  let results = [];
  createReadStream(metadata)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      if (!results || results.length === 0) {
        log.error("No Commentary Metadata in ", metadata);
        return;
      }
    });
  const commentary = [];
  return createReadStream(file)
    .pipe(csv())
    .on("data", (data) => commentary.push(data))
    .on("end", () => {
      const data = results[0];
      console.log(data);
      data.commentary = commentary;
      post(`${baseUrl}/sources/commentary`, data, token)
        .then((response) => {
          log.info("Commentary added :", JSON.stringify(response.data));
        })
        .catch((error) => {
          log.error("Server Response :", JSON.stringify(error));
        });
    });
}
