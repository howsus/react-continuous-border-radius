import type { Config } from "release-it";

export default {
  git: {
    requireBranch: "main",
    commitMessage: "chore: release v${version}",
  },
  hooks: {
    "before:init": ["git pull", "yarn lint", "yarn build"],
    "after:bump": "npx auto-changelog -p",
  },
  github: {
    release: true,
  },
  npm: {
    publish: true,
  },
} satisfies Config;
