/**
 *
 * @param {string} content
 * @param {RegExp} searchPattern
 * @param {*} captureGroup
 * @returns
 */
export function searchFileContent(content, searchPattern, captureGroup) {
  const matches = content.match(searchPattern)
  if (!matches) return []
  if (captureGroup) {
    return matches.map((matchString) =>
      matchString.replace(searchPattern, `$${captureGroup}`)
    )
  }
  return matches
}
