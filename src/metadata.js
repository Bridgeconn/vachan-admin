import { createReadStream } from "fs";
import { get, put } from "axios";
const csv = require("csv-parser");
import { log } from "./util.js";
import { baseUrl } from "./util.js";
const readline = require("readline");

const metadata = [];
let sources = [];
let token = {};
const output = { sourceId: -1, choice: {}, name: "" };
export function addMetadata(t, file) {
  process.setMaxListeners(30);
  return createReadStream(file)
    .pipe(csv())
    .on("data", (data) => metadata.push(data))
    .on("end", () => {
      if (!metadata && metadata.length === 0) {
        log.error("No Metadata in ", file);
        return;
      }
      console.log(metadata.length, "Metadata Found");
      token = t;
      get(`${baseUrl}/sources`).then((response) => {
        response.data.forEach((data) => {
          sources.push({
            language: title(data.language.name),
            sourceId: data.source.id,
            version: data.version.code,
            display: `${data.language.name}: ${data.version.code} (SourceId: ${data.source.id})`,
          });
        });
        sources.sort(sortSources);
        addNext(-1);
      });
    });
}
function title(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function addNext(index) {
  index++;
  let cur = metadata[index];
  output.name = `${title(cur.language)}: ${cur.versionCode} (${cur.revision})`;
  console.log("\nBible Sources in Vachan-Engine:-");
  console.log("0: Skip");
  sources.forEach((data, index) => {
    console.log(`${index + 1}: `, data.display);
  });
  const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  read.question(`\nSelect for ${index + 1}) ${output.name}: `, function (
    selected
  ) {
    try {
      console.log("\nSelected:", selected || "None");
      if (selected == 0) return read.close();
      const display = sources[selected - 1].display;
      const question = `Add ${output.name} Metadata\nTo  ${display} Source (Y/N)? `;
      read.question(question, function (proceed) {
        if (proceed && proceed.toLowerCase() === "y") {
          output.choice = sources[selected - 1];
          output.sourceId = output.choice.sourceId;
        }
        return read.close();
      });
    } catch (e) {
      console.log("Invalid Input\n", e);
      return read.close();
    }
  });
  read.on("close", function () {
    if (output.sourceId !== -1) {
      log.info(`Inserting ${output.name} to ${output.choice.display}`);
      let data = { metadata: JSON.parse(metadata[index].metadata) };
      data.sourceId = output.sourceId;
      output.sourceId = -1;
      put(`${baseUrl}/sources/metadata`, data, token)
        .then((response) => {
          log.info("Metadata added :", JSON.stringify(response.data));
          if (index + 1 < metadata.length)
            setTimeout(() => addNext(index), 500);
        })
        .catch((error) => {
          log.error("Server Response: ", error);
        });
    } else {
      return addNext(index);
    }
  });
  read.on("SIGINT", () => {
    console.log("\nExiting!!!");
    process.exit(0);
  });
}

function sortSources(a, b) {
  var nameA = a.display.toLowerCase();
  var nameB = b.display.toLowerCase();
  return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
}
