import { readFileContent } from "./readFileContent.mjs";
import { searchFileContent } from "./searchFileContent.mjs";
import { findFiles } from "./findFiles.mjs";
import { filterFilesNot } from "./filterFiles.mjs";

export function findDependentsInTargetPaths(
  componentObjectArray,
  targetPaths,
  ignorePatterns,
) {
  return targetPaths.reduce(targetPathReducer, componentObjectArray);
  /**
   * Finds dependents in each target path and creates a single object to represent them
   * @param {*} accumulator
   * @param {*} currentTargetPath
   * @returns
   */
  function targetPathReducer(componentObjectArray, currentTargetPath) {
    return componentObjectArray.reduce(componentObjectArrayReducer, {
      currentTargetPath,
      componentObjectArray: [],
    }).componentObjectArray;
  }
  /**
   * Traverses componentObjectArray and checks for its exports in all relevant files in the current target path
   * @param {*} componentObject
   * @returns
   */
  function componentObjectArrayReducer(acc, componentObject) {
    const { matches, filePath, dependents } = componentObject;
    const { currentTargetPath } = acc;
    const targetFilelist = filterFilesNot(
      findFiles(currentTargetPath),
      ignorePatterns,
    );
    const { dependentsArray } = targetFilelist.reduce(targetFileListReducer, {
      matches,
      dependentsArray: [],
    });
    acc.componentObjectArray.push({
      matches,
      filePath,
      dependents:
        dependents !== undefined
          ? [...dependents, ...dependentsArray]
          : dependentsArray,
    });
    return acc;
  }
  /**
   * For each target file, check against all match items and add details to dependents array if matches are found
   * @param {*} acc
   * @param {*} curr
   * @returns
   */
  function targetFileListReducer(acc, currentFilePath) {
    const content = readFileContent(currentFilePath);
    const dependentsCandidates = acc.matches
      .flatMap((searchTerm) =>
        searchFileContent(
          content,
          new RegExp(
            `import[^'"a-zA-Z]*${searchTerm}[^a-zA-Z]([^'"]+["']){2}`,
            "g",
          ),
        ),
      )
      .filter((currentArray) => currentArray.length > 0);
    if (dependentsCandidates && dependentsCandidates.length > 0) {
      acc.dependentsArray.push({
        filePath: currentFilePath,
        matches: dependentsCandidates,
      });
    }
    return acc;
  }
}
