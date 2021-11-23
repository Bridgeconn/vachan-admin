#!/usr/bin/env node
require("yargs")
  .usage("Usage: $0 <command> [options]")
  .command("login", "Add/view vachan-engine config", {}, function (argv) {
    require = require("esm")(module);
    require("../src/login").login(argv);
  })
  .command("logout", "Remove vachan-engine config", {}, function (argv) {
    require = require("esm")(module);
    require("../src/logout").logout(argv);
  })
  .demandCommand(1)
  .example("$0 login -c apiUrl email pass", "#add vachan-engine configuration")
  .example("$0 login", "#view vachan-engine configuration")
  .example("$0 logout", "#remove vachan-engine configuration")
  .alias("c", "config")
  .nargs("c", 3)
  .describe("c", "Vachan-engine configuration")
  .help("h")
  .alias("h", "help")
  .strictCommands()
  .alias("v", "version").argv;
