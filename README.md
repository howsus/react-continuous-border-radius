<div align="center">
  <a href="https://github.com/howsus/react-continuous-border-radius">
    <img src="https://github.com/howsus/react-continuous-border-radius/raw/main/preview.png" alt="Logo" width="150" height="133">
  </a>

  <h3 align="center">React Continuous Border Radius</h3>

  <p align="center">
    Smooth corners for your react app
    <br />
    <a href="https://github.com/howsus/react-continuous-border-radius/issues/new?labels=bug&template=bug-report.md">Report Bug</a>
    ·
    <a href="https://github.com/howsus/react-continuous-border-radius/issues/new?labels=enhancement&template=feature-request.md">Request Feature</a>
  </p>
</div>

## About the project

`react-continuous-border-radius` is a React library that allows adding smooth, continuous border radius to HTML elements.

## Getting started

### Installation

Install the latest version of `react-continuous-border-radius` by running the command below:

```sh
npm install react-continuous-border-radius
```

Include the CSS file:

```js
import "react-continuous-border-radius/style.css";
```

Or, alternatively, include the following in your CSS:

```css
[data-rcbr-border] {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
}
```

### Usage

#### Higher-Order Component (HOC)

You can use `continuousBorderRadius` to wrap your desired elements:

```js
import { continuousBorderRadius } from "react-continuous-border-radius";

const Button = continuousBorderRadius("button");

<Button className="rounded-xl">My squircle button</Button>;
```

#### Wrapping Component

Alternatively, you can use the Wrapping Component:

```js
import { ContinuousBorderRadius } from "react-continuous-border-radius";

<ContinuousBorderRadius component="button" className="rounded-xl">
  My squircle button
</ContinuousBorderRadius>;
```

## Modes

The library supports two modes for handling border radius:

- Dynamic (default mode): Uses ResizeObserver and MutationObserver to observe changes in width, height, and border radius, ensuring continuous border radius updates.
- Static: Calculates the width, height, and border radius on mount and does not update them dynamically. This mode can be useful for static elements that do not change dimensions or styles after being rendered.

To set the desired mode:

```js
// For HOC
continuousBorderRadius(MyStaticComponent, {
  mode: "static",
});

// For Wrapping Component
<ContinuousBorderRadius component={MyStaticComponent} mode="static" />;
```

## License

This project is licensed under the MIT License.
