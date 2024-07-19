const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.app.json");

module.exports = {
  extends: ["airbnb", "airbnb-typescript", "airbnb/hooks", "prettier"],
  rules: {
    "react/require-default-props": [
      "error",
      {
        classes: "defaultProps",
        functions: "defaultArguments",
      },
    ],
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
  ignorePatterns: [
    ".*.js",
    "node_modules/",
    "dist/",
    ".eslintrc.cjs",
    "vite.config.ts",
  ],
  parserOptions: {
    project,
  },
};
