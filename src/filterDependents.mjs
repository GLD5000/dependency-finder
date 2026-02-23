export function filterNoDependents(componentObjectArray) {
  return componentObjectArray.filter(
    (componentObject) => componentObject.dependents.length === 0
  )
}

export function filterSomeDependents(componentObjectArray) {
  return componentObjectArray.filter(
    (componentObject) => componentObject.dependents.length > 0
  )
}
