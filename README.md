**Project Overview**: This project is a TypeScript + React application scaffolded with Vite. It provides an XML / Email parsing UI that submits content to a backend parser and displays parsed JSON output or validation errors.

**Development & Build**: The project is developed with Vite for fast local development and production builds. Use the standard Vite scripts in `package.json` to run the dev server and build the production bundle.

**Folder Structure Highlights**:

- **`src/container`**: Contains higher-level pages / containers such as `EmailParser` which coordinate components and hooks.
- **`src/components`**: Reusable UI components (e.g., `Button`, `InputTextArea`, `OutputDisplay`, `ValidationDisplay`).

**Configuration & Environment**:

- API base URL and application key are stored in environment variables (in a `.env` file) and consumed via Vite environment variables (e.g., `VITE_API_BASE_URL`, `VITE_APP_KEY`). Do not commit secret keys to source control.

**HTTP Interceptors**:

- Axios interceptors are used to attach the application key header to outbound requests. Interceptors are registered/removed in a lifecycle-aware way to avoid leaking handlers across mounts.

**Custom Hook Usage**:

- A custom hook, `useEmailParser`, encapsulates the API call logic and parsing state (loading, success, parsed data, message).
- Another custom hook initializes the axios interceptors during app startup (the hook is invoked in `App.tsx`) so the interceptor is applied globally for API calls.

**Testing**:

- **End-to-End (E2E)**: Playwright is used for end-to-end tests. Tests are structured with helpers and a Page Object Model:

  - `e2e/utils`: sample data and helpers
  - `e2e/pages`: page objects that expose element locators and actions
  - `e2e/steps`: wrapper step classes built on top of page objects for reusability and clearer test flows

- **Unit Tests**: Unit tests are implemented for all components and hooks using Vitest and Testing Library. Tests cover rendering, interaction, and hook behavior; mocks are used for network calls.

If you want, I can:

- Add sample `.env.example` with the recommended variable names.
- Add short developer commands to this README (dev, build, test, e2e).

---

**Developer Commands**

- **Dev server**: Run the local dev server with Vite:

  ```powershell
  npm install
  npm run dev
  ```

- **Build production bundle**:

  ```powershell
  npm run build
  ```

- **Run unit tests** (Vitest):

  ```powershell
  npm run test:unit
  # or
  npx vitest run --reporter dot
  ```

- **Run E2E tests** (Playwright):

  ```powershell
  npm run test:e2e
  ```
