# ⚙️ Project Configuration

The application has been bootstrapped using `Vite`.

The following tools are used:

#### ESLint

ESLint enforces coding standards and identifies potential issues, ensuring your codebase maintains high quality and consistency throughout development.

[ESLint Configuration](../.eslintrc.json)

#### Prettier

Prettier automatically formats your code to a uniform style, eliminating formatting debates within your team and maintaining a clean and consistent codebase.

[Prettier Configuration](../.prettierrc)

###

#### Husky

Husky's pre-commit and pre-push hooks ensure that code passes linting, testing, and formatting checks before being committed or pushed, maintaining a high level of code quality.
Husky is configured with Lint-Staged to run on staged changes.

[Husky Configuration](../.husky\pre-commit)

#### Lint-Staged

Lint-Staged enhances code quality by running code analysis tools, such as ESLint and Prettier, on the files that are staged for commit. 

```json
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx}": [
      "eslint --fix --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
      "prettier --write"
    ]
  }
```

[Lint-Staged Configuration](../package.json)

#### Absolute imports

Absolute imports should always be configured and used because it makes it easier to move files around and avoid messy import paths such as `../../../Component`.

Configuration:

```json
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    }
  }
```

[Paths Configuration](../tsconfig.json)
