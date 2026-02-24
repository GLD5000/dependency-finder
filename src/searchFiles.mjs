import { readFileContent } from "./readFileContent.mjs";
import { searchFileContent } from "./searchFileContent.mjs";

/**
 *
 * @param {string[]} filePathArray
 * @param {RegExp} searchPattern
 * @param {number} captureGroup
 * @returns {[path:string, matches: string[]]}
 */
export function searchFiles(filePathArray, searchPattern, captureGroup) {
  return filePathArray.reduce(searchReducer, []);

  function searchReducer(acc, curr) {
    const matches = searchFile(curr, searchPattern, captureGroup);
    matches && matches.length > 0 && acc.push({ filePath: curr, matches });
    return acc;
  }
}
/**
 *
 * @param {string} filePath
 * @param {RegExp} searchPattern
 * @param {number} captureGroup
 * @returns {string[]}
 */
function searchFile(filePath, searchPattern, captureGroup) {
  const content = readFileContent(filePath);
  return searchFileContent(content, searchPattern, captureGroup);
}
