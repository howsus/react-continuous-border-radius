import { useStatefulObserver } from "./use-stateful-observer";
import { useStaticCalculation } from "./use-static-calculation";
import { measureObserver } from "../observers/measure-observer";
import { getElementDimensions } from "../utils/get-element-dimensions";

export function useMeasure<E extends Element = Element>(
  element: E | null,
  observe: boolean,
) {
  const staticValue = useStaticCalculation(
    getElementDimensions,
    !observe ? element : null,
    getElementDimensions,
  );

  const dynamicValue = useStatefulObserver(
    measureObserver,
    observe ? element : null,
  );

  return observe ? dynamicValue : staticValue;
}
