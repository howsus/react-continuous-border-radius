import { createStatefulObserver } from "../utils/create-stateful-observer";
import { getElementBorderRadiusParams } from "../utils/get-element-border-radius-params";

const observedElements = new Set<Element>();

export const borderRadiusParamsObserver = createStatefulObserver({
  observer(setState) {
    return new MutationObserver((mutations) =>
      mutations.forEach((mutation) => {
        if (mutation.target instanceof Element) {
          setState(
            mutation.target,
            getElementBorderRadiusParams(mutation.target),
          );
        }
      }),
    );
  },
  observe(current, element) {
    current.observe(element, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });
    observedElements.add(element);
  },
  unobserve(current, element) {
    current?.disconnect();
    observedElements.delete(element);
    observedElements.forEach((restoreElement) =>
      this.observe(current, restoreElement),
    );
  },
  defaultState: getElementBorderRadiusParams(),
});
