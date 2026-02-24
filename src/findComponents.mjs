import { filterFilesNot } from "./filterFiles.mjs";
import { findFiles } from "./findFiles.mjs";
import { searchFiles } from "./searchFiles.mjs";

/**
 * Finds component exports within a folder's subfolders and returns an nested arrays of paths and component exports
 * @param {string} inputPath
 * @returns {[path: string, matches: string[]]}
 */
export function findComponents(inputPath, ignorePatterns, isPascalCase) {
  return searchFiles(
    filterFilesNot(findFiles(inputPath), ignorePatterns),
    isPascalCase
      ? /(export default function|export const|export default|export declare const) ([A-Z][a-zA-Z]+)/g
      : /(export default function|export const|export default|export declare const) ([a-zA-Z]+)/g,
    2,
  );
}
