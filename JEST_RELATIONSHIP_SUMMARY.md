# Jest Configuration Relationship Summary

## How Root Jest Config Relates to Package Tests

### Quick Answer

**All packages reference the root Jest configuration** via their test scripts:
```bash
jest --config=../../jest.config.js
```

This means:
- ✅ One central config controls all test behavior
- ✅ All packages use the same mocks and setup
- ✅ Tests from any package can run tests from all packages

---

## Detailed Flow

### 1. Package Test Scripts

**Every package** (basic, auth, full) has test scripts that point to root config:

```json
// packages/basic/package.json
{
  "scripts": {
    "test": "jest --config=../../jest.config.js"
  }
}
```

When you run `npm test` from any package directory, Jest loads the root `jest.config.js`.

### 2. Root `jest.config.js` Controls Everything

The root config defines:

| Setting | What It Does |
|---------|-------------|
| `rootDir` | Set to monorepo root (`__dirname`) |
| `roots` | Array of directories to search for tests:<br>- `packages/basic`<br>- `packages/auth`<br>- `packages/full`<br>- `packages/shared/core/src`<br>- `packages/shared/auth/src` |
| `setupFilesAfterEnv` | Points to root `jest.setup.js` |
| `moduleNameMapper` | Maps import paths (`@/`, `@utilities/*`) to actual files |
| `preset` | Uses `jest-expo` for Expo/React Native support |

### 3. Root `jest.setup.js` Composes Setup

The root setup file layers setup files:

```
Root jest.setup.js
  ↓ requires
packages/shared/jest.setup.js (shared mocks)
  ↓ adds
Root-specific mocks (theme context)
  ↓ adds
Polyfills (structuredClone, console filters)
```

**Setup execution order:**
1. `packages/shared/jest.setup.js` loads:
   - Mocks Expo modules (`expo-router`, `expo-constants`, `expo-secure-store`)
   - Mocks React Native modules (`react-native`, `@react-navigation`)
   - Mocks Supabase client
   - Mocks gesture handlers, safe area, screens

2. Root `jest.setup.js` adds:
   - Theme context mock (simplified for testing)
   - `structuredClone` polyfill
   - Console error filtering

### 4. Test Discovery

When Jest runs, it finds tests in **all** root directories:

```
Running from packages/basic:
  ✅ packages/basic/**/*.test.*
  ✅ packages/auth/**/*.test.*        ← Also discovers these!
  ✅ packages/full/**/*.test.*        ← Also discovers these!
  ✅ packages/shared/core/src/**/*.test.*  ← Also discovers these!
  ✅ packages/shared/auth/src/**/*.test.*  ← Also discovers these!
```

This means running `npm test` from `packages/basic` also runs:
- Tests for `packages/basic` (expected)
- Tests for `packages/shared/core` (shared component tests)

### 5. Path Resolution

The root config maps import paths so tests can resolve them:

```javascript
moduleNameMapper: {
  // For shared packages
  "^@/(.*)$": [
    "packages/shared/core/src/$1",
    "packages/shared/auth/src/$1",
  ],
  
  // For template packages importing shared code
  "^@utilities/shared-core/(.*)$": "packages/shared/core/src/$1",
  "^@utilities/shared-auth/(.*)$": "packages/shared/auth/src/$1",
}
```

---

## Visual Flow

```
User runs: cd packages/basic && npm test
         │
         ├─→ Executes: jest --config=../../jest.config.js
         │
         ├─→ Loads: root/jest.config.js
         │   ├─→ Finds roots: [basic, auth, full, shared/core/src, shared/auth/src]
         │   ├─→ Points to: root/jest.setup.js
         │   └─→ Maps paths: @/, @utilities/*
         │
         ├─→ Loads: root/jest.setup.js
         │   ├─→ Requires: packages/shared/jest.setup.js
         │   │   └─→ Mocks Expo, React Native, Supabase, etc.
         │   ├─→ Mocks: theme-context
         │   └─→ Adds: polyfills, console filters
         │
         └─→ Discovers & runs tests:
             ├─→ packages/basic/**/*.test.*
             ├─→ packages/auth/**/*.test.*
             ├─→ packages/full/**/*.test.*
             ├─→ packages/shared/core/src/**/*.test.*
             └─→ packages/shared/auth/src/**/*.test.*
```

---

## Key Relationships

### Root Config → Packages
- **One config, all packages**: Root `jest.config.js` is used by all packages
- **No local configs**: Packages don't have their own `jest.config.js`
- **Consistent behavior**: All packages get the same test environment

### Root Setup → Shared Setup
- **Composition pattern**: Root `jest.setup.js` requires `packages/shared/jest.setup.js`
- **Layered mocks**: Shared mocks load first, then root adds its own
- **Shared utilities**: All packages benefit from shared mocks

### Test Discovery
- **All roots searched**: Jest searches all directories in `roots` array
- **Shared tests run**: Running tests from one package also runs shared component tests
- **Consistent coverage**: Coverage includes shared components automatically

### Path Resolution
- **Centralized mapping**: All path aliases defined in root config
- **Works everywhere**: `@/` and `@utilities/*` resolve correctly in all tests
- **TypeScript aligned**: Jest paths match TypeScript paths

---

## Benefits

1. **Single Source of Truth**: Change mocks once, applies everywhere
2. **No Duplication**: No need to maintain Jest configs in each package
3. **Shared Test Coverage**: Running any package's tests also validates shared components
4. **Consistent Environment**: All tests run with identical mocks and setup
5. **Easy Maintenance**: Update root config to affect all packages

---

## Example: What Happens When You Run Tests

```bash
# From packages/basic
cd packages/basic
npm test
```

**Jest will:**
1. ✅ Load `../../jest.config.js` (root config)
2. ✅ Find all test files in all `roots` directories
3. ✅ Load `jest.setup.js` → loads `packages/shared/jest.setup.js`
4. ✅ Apply all mocks and setup
5. ✅ Run tests from:
   - `packages/basic/__tests__/`
   - `packages/shared/core/src/__tests__/`
   - `packages/shared/auth/src/__tests__/`
   - (and any other tests found in roots)

**All tests use the same:**
- ✅ Mocked Expo modules
- ✅ Mocked React Native modules
- ✅ Mocked Supabase client
- ✅ Theme context mock
- ✅ Path mappings
- ✅ Test environment

---

## Summary

The root `jest.config.js` and `jest.setup.js` are the **central nervous system** for all tests in the monorepo. Every package references them, ensuring consistent test behavior across all workspaces. There are no local Jest configs in packages—everything is centralized at the root.




