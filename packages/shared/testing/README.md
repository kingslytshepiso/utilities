# Shared Testing Package

A comprehensive testing solution for React Native templates with shared utilities, mocks, and configurations.

## 🎯 **Purpose**

Eliminates test duplication across template packages by providing:

- **Shared test utilities** and helpers
- **Common mocks** for Expo and React Native modules
- **Unified Jest configuration** for all templates
- **Reusable test components** and patterns

## 📦 **Package Structure**

```
packages/shared/testing/
├── src/
│   ├── test-utils.tsx          # Custom render and test utilities
│   ├── tests/                  # Shared test files
│   │   ├── theme-context.test.tsx
│   │   └── app-header.test.tsx
│   └── index.ts               # Main exports
├── mocks/                     # Shared mocks
│   ├── expo-constants.js
│   ├── expo-router.js
│   ├── expo-secure-store.js
│   └── expo-web-browser.js
├── jest.config.js            # Shared Jest configuration
├── jest.setup.js             # Global test setup
└── package.json
```

## 🚀 **Usage in Template Packages**

### **1. Add Dependency**

```json
{
  "devDependencies": {
    "@utilities/shared-testing": "workspace:*"
  }
}
```

### **2. Use Shared Configuration**

```json
{
  "scripts": {
    "test": "jest --config=../../packages/shared/testing/jest.config.js",
    "test:watch": "jest --config=../../packages/shared/testing/jest.config.js --watch",
    "test:coverage": "jest --config=../../packages/shared/testing/jest.config.js --coverage"
  }
}
```

### **3. Import Test Utilities**

```typescript
import {
  render,
  screen,
  createMockUser,
  createSupabaseMock,
} from "@utilities/shared-testing";
```

## 🧪 **Test Utilities**

### **Custom Render Function**

```typescript
import { render } from "@utilities/shared-testing";

// Automatically wraps with PaperProvider and NavigationContainer
render(<MyComponent />);
```

### **Mock Utilities**

```typescript
import {
  createMockUser,
  createMockSession,
  createSupabaseMock,
  createStorageMock,
} from "@utilities/shared-testing";

// Create mock user
const mockUser = createMockUser({ email: "test@example.com" });

// Create mock session
const mockSession = createMockSession({ user: mockUser });

// Create Supabase mock
const supabaseMock = createSupabaseMock();
```

### **Form Testing Utilities**

```typescript
import { fillForm, submitForm } from "@utilities/shared-testing";

// Fill form fields
await fillForm(getByTestId, {
  email: "test@example.com",
  password: "password123",
});

// Submit form
await submitForm(getByTestId, "submit-button");
```

### **Platform Mocking**

```typescript
import { mockPlatform } from "@utilities/shared-testing";

// Mock iOS platform
mockPlatform("ios");

// Mock Android platform
mockPlatform("android");

// Mock Web platform
mockPlatform("web");
```

## 🔧 **Shared Mocks**

### **Expo Modules**

All Expo modules are automatically mocked:

- `expo-router` - Navigation and routing
- `expo-constants` - App configuration
- `expo-secure-store` - Secure storage
- `expo-web-browser` - OAuth browser

### **React Native Modules**

- `react-native-paper` - Material Design components
- `react-native-reanimated` - Animations
- `react-native-gesture-handler` - Gestures
- `react-native-safe-area-context` - Safe areas
- `react-native-screens` - Navigation screens

### **Third-Party Libraries**

- `@supabase/supabase-js` - Supabase client
- `@react-navigation/native` - Navigation

## 📋 **Test Patterns**

### **Component Testing**

```typescript
import { render, screen, fireEvent } from "@utilities/shared-testing";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
  it("should render correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello World")).toBeTruthy();
  });

  it("should handle user interaction", async () => {
    render(<MyComponent />);
    const button = screen.getByTestId("my-button");
    await fireEvent.press(button);
    expect(screen.getByText("Clicked!")).toBeTruthy();
  });
});
```

### **Context Testing**

```typescript
import { render, screen } from "@utilities/shared-testing";
import { ThemeProvider } from "@utilities/shared-core";

describe("ThemeProvider", () => {
  it("should provide theme context", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme-mode")).toHaveTextContent("light");
  });
});
```

### **Auth Testing**

```typescript
import { render, screen, createMockUser } from "@utilities/shared-testing";
import { AuthProvider } from "@utilities/shared-auth";

describe("AuthProvider", () => {
  it("should handle authentication", () => {
    const mockUser = createMockUser();
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    // Test auth functionality
  });
});
```

## 🎨 **Template-Specific Tests**

### **Basic Template**

```typescript
// packages/basic/__tests__/app.test.tsx
import { render, screen } from "@utilities/shared-testing";
import RootLayout from "../app/_layout";

describe("Basic Template", () => {
  it("should render without auth elements", () => {
    render(<RootLayout />);
    expect(screen.queryByTestId("auth-menu")).toBeNull();
  });
});
```

### **Auth Template**

```typescript
// packages/auth/__tests__/app.test.tsx
import { render, screen } from "@utilities/shared-testing";
import RootLayout from "../app/_layout";

describe("Auth Template", () => {
  it("should render with auth elements", () => {
    render(<RootLayout />);
    expect(screen.getByTestId("auth-menu")).toBeTruthy();
  });
});
```

## 🚀 **Running Tests**

### **All Templates**

```bash
# From root directory
npm run test
```

### **Specific Template**

```bash
# From template directory
cd packages/basic
npm test

cd packages/auth
npm test
```

### **With Coverage**

```bash
npm run test:coverage
```

### **Watch Mode**

```bash
npm run test:watch
```

## 📊 **Test Coverage**

The shared testing package provides comprehensive coverage for:

- **Core Components** - AppHeader, BottomNav, etc.
- **Theme System** - ThemeProvider, useTheme hook
- **Authentication** - AuthProvider, auth components
- **Navigation** - Router integration
- **Platform** - iOS, Android, Web compatibility

## 🔧 **Configuration**

### **Jest Configuration**

The shared Jest configuration includes:

- **Expo preset** for React Native compatibility
- **Transform ignore patterns** for node_modules
- **Module name mapping** for shared packages
- **Coverage collection** settings
- **Test environment** setup

### **Setup File**

The shared setup file provides:

- **Console silencing** for cleaner output
- **Module mocking** for Expo and React Native
- **Global test utilities**
- **Timeout configuration**

## 🐛 **Debugging Tests**

### **Run Specific Test**

```bash
npm test -- --testNamePattern="should render"
```

### **Run with Verbose Output**

```bash
npm test -- --verbose
```

### **Update Snapshots**

```bash
npm test -- --updateSnapshot
```

## 📝 **Adding New Tests**

### **1. Create Test File**

```typescript
// packages/basic/__tests__/my-component.test.tsx
import { render, screen } from "@utilities/shared-testing";
import { MyComponent } from "../components/MyComponent";

describe("MyComponent", () => {
  it("should work correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Expected Text")).toBeTruthy();
  });
});
```

### **2. Add to Shared Tests**

For tests that apply to all templates:

```typescript
// packages/shared/testing/src/tests/my-shared-component.test.tsx
import { render, screen } from "@utilities/shared-testing";
import { MySharedComponent } from "@utilities/shared-core";

describe("MySharedComponent", () => {
  it("should work in all templates", () => {
    render(<MySharedComponent />);
    expect(screen.getByText("Shared Text")).toBeTruthy();
  });
});
```

## ⚠️ **Known Limitations**

1. **Expo Winter Runtime** - Some tests may need additional configuration
2. **Native Modules** - Some Expo modules require manual mocking
3. **Deep Linking** - OAuth deep linking tested with mocks

## 🎯 **Benefits**

### **✅ Eliminates Test Duplication**

- **No more copied test files** across packages
- **Single source of truth** for test utilities
- **Easy maintenance** - update once, affects all templates

### **✅ Consistent Testing**

- **Unified test patterns** across all templates
- **Shared mocks** for common modules
- **Consistent configuration** for all packages

### **✅ Easy Development**

- **Simple imports** from shared testing package
- **Comprehensive utilities** for common test scenarios
- **Clear documentation** and examples

---

**Happy testing! 🧪**

This shared testing architecture eliminates duplication while providing comprehensive testing capabilities for all template packages.

