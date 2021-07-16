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
      require("./commentary").addCommentary(token, argv.f, argv.m);
      break;
    case "dictionary":
      require("./dictionary").addDictionary(token, argv.f, argv.m);
      break;
    case "infographic":
      require("./infographic").addInfographic(token, argv.f, argv.m);
      break;
    case "audiobible":
      require("./audiobible").addAudioBible(token, argv.f);
      break;
    case "video":
      require("./video").addVideo(token, argv.f);
      break;
    case "bookname":
      require("./bookname").addBookName(token, argv.f);
      break;
    case "metadata":
      require("./metadata").addMetadata(token, argv.f);
      break;
    default:
      console.error(`"${argv.t}" is not a valid type!`);
      break;
  }
}
