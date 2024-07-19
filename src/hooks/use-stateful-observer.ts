import { useCallback, useSyncExternalStore } from "react";
import { type StatefulObserver } from "../utils/create-stateful-observer";

export function useStatefulObserver<S extends Record<string, unknown>>(
  observer: StatefulObserver<S>,
  element?: Element | null,
) {
  const getSnapshot = useCallback(
    () => observer.getState(element),
    [observer, element],
  );

  const subscribe = useCallback(
    (callback: VoidFunction) => {
      if (!element) {
        return () => undefined;
      }

      return observer.subscribe(element, callback);
    },
    [element, observer],
  );

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
