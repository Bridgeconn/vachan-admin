import { createReadStream } from "fs";
import { post } from "axios";
const csv = require("csv-parser");
import { log } from "./util.js";
import { baseUrl } from "./util.js";

export function addVideo(token, file) {
  const videos = [];
  return createReadStream(file)
    .pipe(csv())
    .on("data", (data) => videos.push(data))
    .on("end", () => {
      const languages = videos.reduce((lang, book) => {
        let language = book.language;
        delete book.language;
        if (language in lang) {
          lang[language].push(book);
        } else {
          lang[language] = [book];
        }
        return lang;
      }, {});
      Object.keys(languages).forEach((key) => {
        const data = {
          language: key,
          videos: languages[key],
        };
        post(`${baseUrl}/sources/video`, data, token)
          .then((response) => {
            log.info(`Videos added for ${key}:`, JSON.stringify(response.data));
          })
          .catch((error) => {
            log.error("Server Response :", JSON.stringify(error));
          });
      });
    });
}
