import { createReadStream } from "fs";
import { post } from "axios";
const csv = require("csv-parser");
import { log } from "./util.js";
import { baseUrl } from "./util.js";

export function addDictionary(token, file, metadata) {
  let results = [];
  createReadStream(metadata)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      if (!results || results.length === 0) {
        log.error("No Dictionary Metadata in ", metadata);
        return;
      }
    });
  const dictionary = [];
  return createReadStream(file)
    .pipe(csv())
    .on("data", (data) => dictionary.push(data))
    .on("end", () => {
      const data = results[0];
      console.log(data);
      data.dictionary = dictionary;
      post(`${baseUrl}/sources/dictionary`, data, token)
        .then((response) => {
          log.info("Dictionary added :", JSON.stringify(response.data));
        })
        .catch((error) => {
          log.error("Server Response :", JSON.stringify(error));
        });
    });
}
