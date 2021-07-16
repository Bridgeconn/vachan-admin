import { log } from "./util.js";

export function login(argv) {
  const path = require("path").join(__dirname, "../.env");
  if (argv.c) {
    var fs = require("fs");
    var config = fs.createWriteStream(path);
    config.write(`BASE_URL=${argv.c[0]}\n`);
    config.write(`ADMIN_EMAIL=${argv.c[1]}\n`);
    config.write(`ADMIN_PASS=${argv.c[2]}\n`);
    log.info("Added Vachan Engine Configuration");
  } else {
    require("dotenv").config({ path: path });
    console.log("Vachan Engine Configuration:-");
    console.log(`baseUrl = ${process.env.BASE_URL}`);
    console.log(`email = ${process.env.ADMIN_EMAIL}`);
    console.log(`pass = ${process.env.ADMIN_PASS}`);
  }
}
