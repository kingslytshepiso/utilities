# Authentication Unit Tests

## 📋 Test Structure

Complete unit test suite for the authentication system covering:

- ✅ **Storage Adapter** - Platform-specific storage (SecureStore/localStorage)
- ✅ **Configuration** - Auth config and validation
- ✅ **Provider** - Supabase authentication provider
- ✅ **Context & Hooks** - Auth context and responsive hooks
- ✅ **Components** - UI components (input, button, guards)
- ✅ **Screens** - Authentication screens (login, signup, forgot-password)

## 🚀 Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run auth-specific tests only
npm run test:auth
```

## 📂 Test Files

### Core Logic Tests

```
__tests__/
├── lib/
│   └── auth/
│       ├── storage.test.ts           # Storage adapter tests
│       └── supabase-provider.test.ts # Provider implementation tests
├── config/
│   └── auth.config.test.ts           # Configuration tests
├── contexts/
│   └── auth-context.test.tsx         # Auth context tests
└── hooks/
    └── use-responsive-auth.test.ts   # Responsive hooks tests
```

### Component Tests

```
__tests__/
└── components/
    └── auth/
        ├── auth-input.test.tsx       # Input component tests
        ├── auth-button.test.tsx      # Button component tests
        ├── protected-route.test.tsx  # Route protection tests
        └── auth-guard.test.tsx       # Component guard tests
```

### Screen Tests

```
__tests__/
└── app/
    └── auth/
        ├── login.test.tsx            # Login screen tests
        ├── signup.test.tsx           # Signup screen tests
        └── forgot-password.test.tsx  # Password reset tests
```

## 🧪 Test Coverage

### Storage Adapter (`storage.test.ts`)

- ✅ Platform detection (iOS, Android, Web)
- ✅ SecureStore integration on native
- ✅ localStorage integration on web
- ✅ Key prefixing (@auth:)
- ✅ Get/set/remove operations

### Auth Configuration (`auth.config.test.ts`)

- ✅ Configuration structure validation
- ✅ Supabase config presence
- ✅ Session settings
- ✅ OAuth settings
- ✅ Security settings
- ✅ Environment variable loading
- ✅ Config validation logic

### Supabase Provider (`supabase-provider.test.ts`)

- ✅ Initialization
- ✅ Sign up functionality
- ✅ Sign in functionality
- ✅ Sign out functionality
- ✅ Session retrieval
- ✅ Password reset
- ✅ Auth state change listener
- ✅ Error handling

### Auth Context (`auth-context.test.tsx`)

- ✅ Context provider setup
- ✅ Hook usage validation
- ✅ Session restoration
- ✅ Sign up flow
- ✅ Sign in flow
- ✅ Sign out flow
- ✅ Error handling
- ✅ Error clearing

### Responsive Hooks (`use-responsive-auth.test.ts`)

- ✅ Layout type calculation (compact/standard/wide/split)
- ✅ Form width calculation
- ✅ Input size determination
- ✅ Spacing values
- ✅ Social auth visibility

### Auth Components

- ✅ **AuthInput**: Rendering, validation, password toggle, keyboard config
- ✅ **AuthButton**: Modes, loading states, press handling, width
- ✅ **ProtectedRoute**: Loading states, redirect logic, auth checks
- ✅ **AuthGuard**: Authentication guards, fallbacks, redirects

### Auth Screens

- ✅ **Login**: Form rendering, validation, submission, navigation, OAuth
- ✅ **SignUp**: Form rendering, validation, password matching, submission
- ✅ **ForgotPassword**: Form rendering, validation, email sending, navigation

## 🛠️ Test Setup

### Jest Configuration (`jest.config.js`)

- Uses `jest-expo` preset for Expo compatibility
- Transform ignore patterns for node_modules
- Path aliases (`@/` → `<rootDir>/`)
- Coverage collection configuration

### Mocks (`__mocks__/`)

- `expo-secure-store` - Secure storage mock
- `expo-web-browser` - OAuth browser mock
- `expo-constants` - Environment config mock

### Setup File (`jest.setup.js`)

- Console silencing for cleaner test output
- Global test utilities

## 📊 Test Statistics

- **Total Test Files**: 12
- **Total Test Cases**: ~80+
- **Coverage Areas**:
  - Storage layer
  - Configuration
  - Authentication provider
  - State management
  - UI components
  - Screen logic

## 🔍 Testing Patterns

### Unit Tests

Testing individual functions and components in isolation:

```typescript
it("should validate email format", () => {
  const result = validateEmail("invalid");
  expect(result).toBe(false);
});
```

### Integration Tests

Testing component + context integration:

```typescript
it("should sign in user and update context", async () => {
  render(
    <AuthProvider>
      <LoginScreen />
    </AuthProvider>
  );
  // Test interactions
});
```

### Mocking Strategy

- **External modules**: Mocked in `__mocks__/`
- **Internal modules**: Mocked with `jest.mock()`
- **Navigation**: Mocked router calls
- **Platform**: Controlled via `Platform.OS`

## 🐛 Debugging Tests

### Run specific test file

```bash
npm test storage.test
```

### Run with verbose output

```bash
npm test -- --verbose
```

### Run single test

```bash
npm test -- --testNamePattern="should validate email"
```

### Update snapshots

```bash
npm test -- --updateSnapshot
```

## ⚠️ Known Limitations

Due to Expo's new architecture (Winter runtime), some tests may require additional configuration:

1. **Expo Metro Integration** - Tests run in Node environment, not Metro
2. **Native Modules** - Some Expo modules may need manual mocking
3. **Deep Linking** - OAuth deep linking tested with mocks

## 📝 Adding New Tests

### 1. Create test file

```typescript
// __tests__/your-feature.test.ts
import { yourFunction } from "@/path/to/function";

describe("YourFeature", () => {
  it("should do something", () => {
    expect(yourFunction()).toBe(expected);
  });
});
```

### 2. Run the test

```bash
npm test your-feature
```

### 3. Check coverage

```bash
npm run test:coverage
```

## 🎯 Best Practices

1. **Arrange-Act-Assert** pattern
2. **One assertion per test** (when possible)
3. **Descriptive test names**
4. **Mock external dependencies**
5. **Clean up after tests** (beforeEach/afterEach)
6. **Test error cases**
7. **Test edge cases**
8. **Use TypeScript** for type safety

## 🔗 Resources

- [Jest Documentation](https://jestjs.io/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Jest Expo](https://docs.expo.dev/develop/unit-testing/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Status:** ✅ Test suite created | **Framework:** Jest + RTL | **Coverage:** 80+ test cases
