import * as fs from 'fs'

/**
 *
 * @param {string} filePath
 * @returns {string}
 */
export function readFileContent(filePath) {
  return fs.readFileSync(filePath, { encoding: 'utf8' })
}
