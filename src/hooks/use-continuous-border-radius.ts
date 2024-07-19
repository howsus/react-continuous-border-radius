import { useMemo, useState } from "react";
import { useMeasure } from "./use-measure";
import { useBorderRadius } from "./use-border-radius";
import { getContinuousBorderRadiusPath } from "../utils/get-continuous-border-radius-path";

export type Modes = "static" | "dynamic";

export function useContinuousBorderRadius<E extends Element = Element>(
  mode: Modes = "dynamic",
) {
  const [element, ref] = useState<E | null>(null);
  const bounds = useMeasure(element, mode === "dynamic");
  const params = useBorderRadius(element, mode === "dynamic");

  const path = useMemo(
    () =>
      getContinuousBorderRadiusPath({
        preserveSmoothing: params.preserveSmoothing,
        cornerSmoothing: params.borderSmoothing,
        width: bounds.width,
        height: bounds.height,
        bottomLeftCornerRadius: params.borderRadiusBottomLeft,
        bottomRightCornerRadius: params.borderRadiusBottomRight,
        topLeftCornerRadius: params.borderRadiusTopLeft,
        topRightCornerRadius: params.borderRadiusTopRight,
      }),
    [params, bounds],
  );

  return [ref, { path, width: bounds.width, height: bounds.height }] as const;
}
