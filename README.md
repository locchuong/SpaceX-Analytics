## 💻 Application Overview

The application is pretty simple. Users can create accounts and see analytics from the Open Notify API, which is an API that provides data about astronauts and the International Space Station.
The application is themed after the SpaceX website, hence the name SpaceX Analytics.

[Demo](https://spacex-analytics.web.app/)


## Get Started

To set up the app execute the following commands.

```bash
git clone https://github.com/locchuong/SpaceX-Analytics.git
cd SpaceX-Analytics
cp .env.example .env.development
cp .env.example .env.production
cp cypress.env.example.json cypress.env.json
npm install
```

### Configuring your Environment

To configure your environment, setup Firebase and set the API_URL.

Note: The API URL used in the [Live Site](https://spacex-analytics.web.app/) is the [Open Notify API](https://github.com/open-notify/Open-Notify-API) which is **NOT** HTTPS. Therefore, the API calls in the Live Site will fail.

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_API_URL=
```

### Scripts

##### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173/](http://localhost:5173/) to view it in the browser.

##### `npm run build`

Builds the app for production to the `dist` folder.\

##### `npm run lint:check`

This script uses ESLint to check your TypeScript and TypeScript React files for code style and potential issues. It enforces coding standards and reports any problems found in your code. The --max-warnings 0 flag ensures that even warnings are treated as errors.

##### `npm run lint:fix`

Similar to `lint:check`, this script also uses ESLint to check your TypeScript and TypeScript React files for code style and potential issues. However, it also attempts to automatically fix some of the reported issues by using the --fix flag.

##### `npm run preview`

This script is used to start a preview server with Vite, typically in development mode. It allows you to preview your application while making changes and testing features.

##### `npm run prettier:check`

This script checks your codebase for formatting issues using Prettier. It ensures that your code adheres to the defined code formatting rules and reports any deviations without modifying the code.

##### `npm run prettier:fix`

Similar to `prettier:check`, this script also checks your codebase for formatting issues using Prettier. However, it automatically fixes those issues and updates the code to conform to the defined code formatting rules.

##### `npm run prepare`

The `prepare` script is used to set up Git hooks using Husky. It runs `husky install`, which sets up hooks to enforce code quality and standards before commits are allowed. This is often used to ensure that linting and other checks are performed before code is committed to the repository.

##### `npm run test`

This script runs tests using Vitest, a testing framework for JavaScript and TypeScript. It's used to execute your test suite and report the results.

#### `npm run test:ui`

This script runs UI tests using Vitest with code coverage enabled. It's used for testing the user interface of your application.

##### `npm run coverage`

The `coverage` script uses Vitest to run tests and generate code coverage reports. It provides information about how much of your code is covered by tests.

#### `npm run cypress:open`

This script is used to open the Cypress Test Runner for end-to-end (E2E) testing. Cypress is a popular tool for testing web applications, and this script allows you to interactively run and debug your E2E tests using Cypress.

## Table Of Contents:

- [⚙️ Project Configuration](docs/project-configuration.md)
- [🗄️ Project Structure](docs/project-structure.md)
- [🧱 Styling](docs/styling.md)
- [🛣️ Routing](docs/routing.md)
- [📡 API Layer](docs/api-layer.md)
- [🗃️ State Management](docs/state-management.md)
- [🧪 Testing](docs/testing.md)
- [🌐 Deployment](docs/deployment.md)
