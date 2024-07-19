/* eslint-disable react/require-default-props */

"use client";

import {
  createElement,
  forwardRef,
  useId,
  type ReactNode,
  type ElementType,
  type ComponentProps,
  type ComponentRef,
  type ComponentPropsWithoutRef,
} from "react";

import { forkRef } from "./utils/fork-ref";
import {
  useContinuousBorderRadius,
  type Modes,
} from "./hooks/use-continuous-border-radius";

export interface ContinuousBorderRadiusProps {
  mode?: Modes;
  outerStrokeWidth?: number;
  innerStrokeWidth?: number;
}

export type PolymorphicComponent<E extends ElementType> = {
  component: E;
};

export const ContinuousBorderRadius = forwardRef(
  <E extends ElementType>(
    {
      component,
      innerStrokeWidth = 6,
      outerStrokeWidth = 3,
      children,
      style,
      mode = "dynamic",
      ...props
    }: PolymorphicComponent<E> &
      Omit<ComponentPropsWithoutRef<E>, keyof PolymorphicComponent<E>> &
      ContinuousBorderRadiusProps,
    ref: ComponentRef<E>,
  ) => {
    const id = useId();

    const [reference, { path, width, height }] =
      useContinuousBorderRadius<never>(mode);

    return createElement(
      component,
      {
        ...props,
        ref: forkRef(reference, ref as never),
        style: {
          ...style,
          position: "relative",
          clipPath: `url(#${id}-rcbr-clip-path)`,
        },
      },
      children,
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        data-rcbr-border="true"
      >
        <defs>
          <clipPath id={`${id}-rcbr-clip-path`}>
            <path id={`${id}-rcbr-shape`} d={path} />
          </clipPath>
        </defs>
        <g>
          <use
            href={`#${id}-rcbr-shape`}
            strokeWidth={innerStrokeWidth}
            fill="none"
            data-rcbr-inner-border
          />
          <use
            href={`#${id}-rcbr-shape`}
            strokeWidth={outerStrokeWidth}
            fill="none"
            data-rcbr-outer-border
          />
        </g>
      </svg>,
    );
  },
) as <E extends ElementType>(
  props: PolymorphicComponent<E> &
    Omit<ComponentPropsWithoutRef<E>, keyof PolymorphicComponent<E>> &
    ContinuousBorderRadiusProps,
) => ReactNode | null;

export const continuousBorderRadius = <E extends ElementType>(
  component: E,
  params: ContinuousBorderRadiusProps = {},
) => {
  const displayName =
    typeof component === "string"
      ? component
      : component.displayName || component.name || "Component";

  const ContinuousBorderRadiusComponent = forwardRef<
    ComponentRef<E>,
    ComponentProps<E>
  >((props, ref) => (
    <ContinuousBorderRadius<E>
      ref={ref as never}
      component={component}
      {...props}
      {...params}
    />
  ));

  ContinuousBorderRadiusComponent.displayName = `continiousBorderRadius(${displayName})`;

  return ContinuousBorderRadiusComponent;
};
