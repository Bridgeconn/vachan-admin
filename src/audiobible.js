import { createReadStream } from "fs";
import { get, post } from "axios";
const csv = require("csv-parser");
import { log } from "./util.js";
import { baseUrl } from "./util.js";

const audioBibles = [];
let token = {};
export function addAudioBible(t, file) {
  return createReadStream(file)
    .pipe(csv())
    .on("data", (data) => audioBibles.push(data))
    .on("end", () => {
      if (!audioBibles && audioBibles.length === 0) {
        log.error("No Audio Bibles in ", file);
        return;
      }
      token = t;
      add(0);
    });
}

function add(audioBibleIndex) {
  let sourceId = -1;
  get(`${baseUrl}/bibles`).then((response) => {
    let bibles = [];
    response.data.forEach((data) => {
      data.languageVersions.forEach((bible) => {
        bibles.push({
          language: bible.language.name,
          sourceId: bible.sourceId,
          version: bible.version.longName,
        });
      });
    });
    bibles.sort(sortBibles);
    console.log("\nBible Sources in Vachan-Engine:-");
    bibles.forEach((data, index) => {
      let bible = `${data.language}: ${data.version} (SourceId: ${data.sourceId})`;
      console.log(`${index + 1}: `, bible);
    });
    const readline = require("readline");
    const read = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    let name = audioBibles[audioBibleIndex].name;
    let choice = {};
    read.question(`\nSelect Source for ${name}: `, function (index) {
      try {
        choice = bibles[index - 1];
        const question = `Add ${name} audio bible to ${choice.language} ${choice.version} (Y/N)? `;
        read.question(question, function (proceed) {
          if (proceed && proceed.toLowerCase() === "y") {
            sourceId = choice.sourceId;
          }
          read.close();
        });
      } catch (e) {
        log.error("Invalid Input");
        return read.close();
      }
    });
    read.on("close", function () {
      if (sourceId !== -1) {
        let data = audioBibles[audioBibleIndex];
        log.info(
          `Inserting ${name} to ${choice.language}: ${choice.version} (SourceId: ${sourceId})`
        );
        data.sourceId = sourceId;
        post(`${baseUrl}/sources/audiobible`, data, token)
          .then((response) => {
            log.info("Audio bible added :", JSON.stringify(response.data));
            if (++audioBibleIndex < audioBibles.length) add(audioBibleIndex);
          })
          .catch((error) => {
            log.error("Server Response :", JSON.stringify(error));
          });
      }
    });
  });
}

function sortBibles(a, b) {
  var nameA = a.language.toLowerCase(); // ignore upper and lowercase
  var nameB = b.language.toLowerCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}
