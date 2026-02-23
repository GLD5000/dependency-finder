/**
 *
 * @param {string[]} array
 * @param {string[]} conditions
 * @returns
 */
export function filterFilesNot(array, conditions) {
  return array.filter(
    (item) => !conditions.some((condition) => item.indexOf(condition) > -1)
  )
}
