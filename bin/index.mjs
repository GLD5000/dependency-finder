#!/usr/bin/env node

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

const defaultTargetPaths = "./components/**/*.tsx|./pages/**/*.tsx";
const targetPaths = `${
  args[1] ||
  (await answerStringQuestion(
    "Which folders should we check for imports (pipe-separated)?",
    defaultTargetPaths,
  ))
}`.split("|");

const defaultIgnorePatterns = ".test|.stories";
const ignorePatterns = `${
  args[2] ||
  (await answerStringQuestion(
    "Which filename patterns should be ignored (pipe-separated)?",
    defaultIgnorePatterns,
  ))
}`.split("|");
runDependencyFinder(searchPattern, targetPaths, ignorePatterns);
