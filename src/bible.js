import { get, post } from "axios";
import { log } from "./util.js";
const grammar = require("usfm-grammar");
const path = require("path");
const fs = require("fs");
import { baseUrl } from "./util.js";

export function addBible(folder) {
  //select sourceId to upload to
  let sourceId = -1;
  get(`${baseUrl}/bibles`).then((response) => {
    console.log("\nBible Source Languages in Vachan-Engine:-");
    response.data.forEach((data, index) => {
      console.log(`${index + 1}: ${data.language}`);
    });
    const readline = require("readline");
    const read = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    read.question("\nSelect Bible Source Language: ", function (language) {
      console.log("\nLanguage Versions:-");
      let versions = null;
      try {
        versions = response.data[language - 1].languageVersions;
      } catch (e) {
        log.error("Invalid Input");
        return read.close();
      }
      versions.forEach((data, index) => {
        console.log(
          `${index + 1}: ${data.version.longName} (sourceId: ${data.sourceId})`
        );
      });
      read.question("\nSelect Language Version: ", function (versionIndex) {
        try {
          const source = versions[versionIndex - 1];
          const language = source.language.name;
          const version = source.version.longName;
          const question = `Upload books to ${language} ${version} (Y/N)? `;
          read.question(question, function (proceed) {
            if (proceed && proceed.toLowerCase() === "y") {
              sourceId = source.sourceId;
              output.language = language;
              output.version = version;
              output.sourceId = sourceId;
              output.folder = folder;
            }
            read.close();
          });
        } catch (e) {
          log.error("Invalid Input");
          return read.close();
        }
      });
    });
    read.on("close", function () {
      console.log("");
      if (sourceId === -1) {
        log.info("Exiting!!!");
      } else {
        log.info("Uploading Books from ", folder, " to Selected Source");
        uploadBible(folder, sourceId);
      }
    });
  });
}
const output = {};
function uploadBible(folder, sourceId) {
  fs.readdir(folder, function (err, files) {
    if (err) {
      log.error("Unable to scan directory: " + err);
      return;
    }
    let [fCount, peCount, reqCount, resCount, sCount] = [0, 0, 0, 0, 0];
    let totalFiles = files.filter((file) =>
      [".usfm", ".sfm"].includes(path.extname(file.toLowerCase()))
    ).length;
    log.info(`${totalFiles} files found in folder`);
    //read all the files in the  folder
    files.forEach(function (file) {
      if ([".usfm", ".sfm"].includes(path.extname(file.toLowerCase()))) {
        fs.readFile(path.join(folder, file), "utf-8", (err, usfm) => {
          if (err) {
            return log.error("Unable to read file: " + file);
          }
          fCount++;
          //use usfm-grammar to parse each file
          const myUsfmParser = new grammar.USFMParser(usfm);
          let json = myUsfmParser.toJSON();
          if (json.ERROR) {
            peCount++;
            log.error("Parsing Error for: ", file, "\n", json.ERROR);
            if (totalFiles === fCount && reqCount === resCount)
              displayCount(fCount, peCount, reqCount, sCount);
          } else {
            //if success send post request to add bible book
            var data = {
              sourceId: sourceId,
              wholeUsfmText: usfm,
              parsedUsfmText: json,
            };
            reqCount++;
            post(`${baseUrl}/bibles/upload`, data)
              .then((response) => {
                //log server response - success or failure
                const { success, message } = response.data;
                if (success) {
                  sCount++;
                  return log.info(`Success: ${message}`);
                }
                log.info(`Book: ${json.book.bookCode}, File :`, file);
                log.info(`Success: ${success}, Message: ${message}`);
              })
              .catch((error) => {
                log.error("File Not Added :", file);
                log.error("Server Response :", JSON.stringify(error));
              })
              .finally(() => {
                resCount++;
                if (totalFiles === fCount && reqCount === resCount)
                  displayCount(totalFiles, peCount, reqCount, sCount);
              });
          }
        });
      }
    });
  });
}
//Display the output once all files processed
function displayCount(totalFiles, peCount, rCount, sCount) {
  log.info("###Finshed Uploading Bible");
  log.info("###OUTPUT###");
  log.info("Language: ", output.language);
  log.info("Version : ", output.version);
  log.info("SourceId: ", output.sourceId);
  log.info("Folder: ", output.folder);
  log.info(`Files Found: ${totalFiles}`);
  log.info(`Parsing Errors: ${peCount}`);
  log.info(`Requests Sent: ${rCount}`);
  log.info(`Successful Uploads: ${sCount}`);
}
