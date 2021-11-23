import { createReadStream } from "fs";
import { post } from "axios";
const csv = require("csv-parser");
import { log } from "./util.js";
import { baseUrl } from "./util.js";

export function addBookName(token, file) {
  const bibleBooks = [];
  return createReadStream(file)
    .pipe(csv())
    .on("data", (data) => bibleBooks.push(data))
    .on("end", () => {
      const languages = bibleBooks.reduce((lang, book) => {
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
          bibleBookNames: languages[key],
        };
        post(`${baseUrl}/biblebooknames`, data, token)
          .then((response) => {
            log.info("Book Names Added for language: ", key);
            log.info("Server Response :", JSON.stringify(response.data));
          })
          .catch((error) => {
            log.error("Book Names :", JSON.stringify(data));
            log.error("Server Response :", JSON.stringify(error));
          });
      });
    });
}
