#!/usr/bin/env node
require("yargs")
  .usage("Usage: $0 <command> [options]")
  .command("add", "Add given content to vachan-engine", {}, function (argv) {
    require = require("esm")(module);
    require("../src/auth")
      .getAuth(argv.t)
      .then(function (token) {
        if (token) require("../src/add").add(token, argv);
        else
          console.log(
            "Unable to generate Authentication Token, refer README.md for cofiguration steps"
          );
      });
  })
  .demandCommand(1)
  .example("$0 add -t bible -f hin", "#adds a bible")
  .alias("t", "type")
  .nargs("t", 1)
  .choices("t", [
    "biblesource",
    "bible",
    "commentary",
    "dictionary",
    "infographic",
    "audiobible",
    "video",
    "bookname",
    "metadata",
  ])
  .describe("t", "Specify the type of source to add")
  .alias("f", "file")
  .nargs("f", 1)
  .describe("f", "Specify the file or folder to get data from")
  .alias("m", "metadata")
  .nargs("m", 1)
  .describe("m", "Specify the metadata file for source")
  .demandOption(["t", "f"])
  .help("h")
  .alias("h", "help")
  .strictCommands()
  .alias("v", "version").argv;
