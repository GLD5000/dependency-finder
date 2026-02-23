import * as fs from 'fs'
/**
 *
 * @param {string} content
 * @param {string} path
 */
export function writeFile(content, path) {
  fs.writeFileSync(path, content)
}
