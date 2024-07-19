import { createStatefulObserver } from "../utils/create-stateful-observer";
import { getElementDimensions } from "../utils/get-element-dimensions";

export const measureObserver = createStatefulObserver({
  observer: (setState) =>
    new ResizeObserver((entries) =>
      entries.forEach((entry) =>
        setState(entry.target, getElementDimensions(entry.target)),
      ),
    ),
  observe: (current, element) => current.observe(element),
  unobserve: (current, element) => current.unobserve(element),
  defaultState: getElementDimensions(),
});
