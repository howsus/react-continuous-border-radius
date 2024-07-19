export function getElementDimensions(element?: Element | null) {
  return {
    width: element?.clientWidth ?? 0,
    height: element?.clientHeight ?? 0,
  };
}
