# Shared Workspace

This folder houses the shared packages that template apps depend on. The testing surface for those packages is located alongside the shared code so that the Jest configuration, mocks, and utilities are owned by the shared workspace.

## Testing Setup

- **Jest configuration**: `jest.config.js` at the repo root now centralizes the preset, module mappings, and coverage collection for every workspace. Template packages point their `test` scripts at `../../jest.config.js` so there is only one source of truth for the shared mocks and roots.
- **Jest setup**: `jest.setup.js` at the repo root requires `packages/shared/jest.setup.js`, which mocks Expo/React Native modules, Supabase, navigation, and also polyfills the shared theme context, `structuredClone`, and console guards so the entire monorepo gets consistent behavior.
- **Test utilities**: `packages/shared/test-utils.tsx` re-exports `@testing-library/react-native` wrapped by `PaperProvider` + `NavigationContainer` and exposes helpers such as `createMockUser`, `mockRouter`, `fillForm`, and `mockPlatform`.
- **Shared component tests**: `packages/shared/core/src/__tests__` contains the canonical tests for components like `AppHeader` and `ThemeProvider`. The root Jest config adds the shared packages to its `roots` list so running any template suite exercises those files.

## Running Shared Tests

1. `cd packages/basic` (or `packages/auth`)
2. `npm test` (uses `../shared/jest.config.js`)

Shared components live evergreen in the shared workspace, so you only need to run the template suite to validate both template-specific and shared behaviors.

