import { useLayoutEffect, useState } from "react";

export function useStaticCalculation<T>(
  calculate: (element: Element) => T,
  element: Element | null,
  defaultState: T | (() => T),
) {
  const [state, setState] = useState(defaultState);

  useLayoutEffect(() => {
    if (element) {
      setState(calculate(element));
    }
  }, [element, calculate]);

  return state;
}
