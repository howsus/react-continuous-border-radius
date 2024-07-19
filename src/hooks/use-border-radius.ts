import { useLayoutEffect } from "react";
import { useStatefulObserver } from "./use-stateful-observer";
import { useStaticCalculation } from "./use-static-calculation";
import { getElementBorderRadiusParams } from "../utils/get-element-border-radius-params";
import { borderRadiusParamsObserver } from "../observers/border-radius-params-observer";

export function useBorderRadius<E extends Element = Element>(
  element: E | null,
  observe: boolean,
) {
  const staticValue = useStaticCalculation(
    getElementBorderRadiusParams,
    !observe ? element : null,
    getElementBorderRadiusParams,
  );

  const dynamicValue = useStatefulObserver(
    borderRadiusParamsObserver,
    observe ? element : null,
  );

  useLayoutEffect(() => {
    if (observe && element) {
      borderRadiusParamsObserver.setState(
        element,
        getElementBorderRadiusParams(element),
      );
    }
  }, [element, observe]);

  return observe ? dynamicValue : staticValue;
}
