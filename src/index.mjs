import { findComponents } from "./findComponents.mjs";
import { writeFile } from "./writeFile.mjs";
import {
  filterNoDependents,
  filterSomeDependents,
} from "./filterDependents.mjs";
import { findDependentsInTargetPaths } from "./findDependents.mjs";

/**
 *
 * @param {string} searchPattern
 * @param {string[]} targetPaths
 * @param {string[]} ignorePatterns
 */
export function runDependencyFinder(
  searchPattern,
  targetPaths,
  ignorePatterns,
) {
  // Get files with TSX exports
  const allDependents = findDependentsInTargetPaths(
    findComponents(searchPattern, ignorePatterns),
    targetPaths,
    ignorePatterns,
  );
  const noDependents = filterNoDependents(allDependents);
  const someDependents = filterSomeDependents(allDependents);
  const returnObject = {
    noDependents: { count: noDependents.length, results: noDependents },
    someDependents: { count: someDependents.length, results: someDependents },
  };
  writeFile(JSON.stringify(returnObject), "dependents-report.json");
}
