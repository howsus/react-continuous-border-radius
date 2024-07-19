import type { Ref, MutableRefObject } from "react";

export function forkRef<T>(...refs: Ref<T>[]) {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        // eslint-disable-next-line no-param-reassign
        (ref as MutableRefObject<T | null>).current = node;
      }
    });
  };
}
