import { getSvgPath, type FigmaSquircleParams } from "figma-squircle";

const cache = new Map<string, string>();

function getCacheKey(params: FigmaSquircleParams) {
  return `${params.cornerSmoothing}:${params.preserveSmoothing}:${params.width}:${params.height}:${params.bottomRightCornerRadius}:${params.bottomLeftCornerRadius}:${params.topLeftCornerRadius}:${params.topRightCornerRadius}`;
}

export function getContinuousBorderRadiusPath(params: FigmaSquircleParams) {
  const key = getCacheKey(params);

  if (!cache.has(key)) {
    cache.set(key, getSvgPath(params));
  }

  return cache.get(key);
}
