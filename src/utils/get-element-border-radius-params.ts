import { clamp } from "./clamp";

export function getElementBorderRadiusParams(element?: Element | null) {
  const style = element ? window.getComputedStyle(element) : undefined;

  return {
    borderSmoothing: clamp(
      parseFloat(style?.getPropertyValue("--border-smoothing") || "1"),
      0,
      1,
    ),
    preserveSmoothing: Boolean(
      style?.getPropertyValue("--preserve-smoothing") ?? "true",
    ),
    borderRadiusTopLeft: parseFloat(style?.borderTopLeftRadius ?? "0"),
    borderRadiusTopRight: parseFloat(style?.borderTopRightRadius ?? "0"),
    borderRadiusBottomLeft: parseFloat(style?.borderBottomLeftRadius ?? "0"),
    borderRadiusBottomRight: parseFloat(style?.borderBottomRightRadius ?? "0"),
  };
}
