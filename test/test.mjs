import { runDependencyFinder } from "../src/index.mjs";
import { answerStringQuestion } from "@gld5000-cli/readline";

const args = process.argv.slice(2);
const defaultSearchPattern = "./components/**/*.tsx";
const searchPattern =
  args[0] ||
  (await answerStringQuestion(
    "Where are your components?",
    defaultSearchPattern,
  ));

runDependencyFinder(searchPattern);
