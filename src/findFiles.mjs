import * as fs from 'fs'

/**
 *
 * @param {string} pattern
 * @returns {string[]}
 */
export function findFiles(pattern) {
  return fs.globSync(pattern)
}
