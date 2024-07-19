export interface StatefulObserverParams<T, S extends Record<string, unknown>> {
  observer: (setState: (element: Element, state: S) => void) => T;
  observe: (observer: T, element: Element) => void;
  unobserve: (observer: T, element: Element) => void;
  defaultState: S;
}

export interface StatefulObserver<S extends Record<string, unknown>> {
  getState(element?: Element | null): S;
  subscribe(element: Element, listener: VoidFunction): () => void;
  unsubscribe(element: Element, listener: VoidFunction): void;
  setState(element: Element, nextState: S): void;
}

export function createStatefulObserver<T, S extends Record<string, unknown>>(
  params: StatefulObserverParams<T, S>,
): StatefulObserver<S> {
  let observer: T;

  const state = new WeakMap<Element, S>();
  const listeners = new WeakMap<Element, Set<VoidFunction>>();

  const handleStateChange = (element: Element, nextState: S) => {
    state.set(element, nextState);
    listeners.get(element)?.forEach((listener) => listener());
  };

  return {
    getState(element?: Element | null) {
      if (!element) {
        return params.defaultState;
      }

      return state.get(element) ?? params.defaultState;
    },
    subscribe(element: Element, listener: VoidFunction) {
      if (!observer) {
        observer = params.observer(handleStateChange);
      }

      params.observe(observer, element);

      if (listeners.has(element)) {
        listeners.get(element)?.add(listener);
      } else {
        listeners.set(element, new Set([listener]));
      }

      return () => this.unsubscribe(element, listener);
    },
    unsubscribe(element: Element, listener: VoidFunction) {
      listeners.get(element)?.delete(listener);
      params.unobserve(observer, element);
    },
    setState: handleStateChange,
  };
}
