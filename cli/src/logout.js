import { log } from "./util.js";

export function logout(argv) {
  const path = require("path").join(__dirname, "../.env");
  var fs = require("fs");
  fs.truncate(path, 0, function () {
    log.info("Removed Vachan-Engine Configuration");
  });
}
