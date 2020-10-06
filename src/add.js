import { log } from "./util.js";

export function add(token, argv) {
  log.info("### ADD OPERATION ###");
  log.info("Type: ", argv.t);
  switch (argv.t) {
    case "biblesource":
      require("./biblesource").addBibleSource(argv.f);
      break;
    case "bible":
      require("./bible").addBible(argv.f);
      break;
    case "commentary":
      console.log("Feature yet to be Added");
      break;
    case "dictionary":
      console.log("Feature yet to be Added");
      break;
    case "infographic":
      console.log("Feature yet to be Added");
      break;
    case "audiobible":
      console.log("Feature yet to be Added");
      break;
    case "video":
      console.log("Feature yet to be Added");
      break;
    case "bookname":
      require("./bookname").addBookName(token, argv.f);
      break;
    case "metadata":
      console.log("Feature yet to be Added");
      break;
    default:
      console.error(`"${argv.t}" is not a valid command!`);
      break;
  }
}
