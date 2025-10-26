import { NavigationContainer } from "@react-navigation/native";
import { render, RenderOptions } from "@testing-library/react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";

// Mock theme for testing
const mockTheme = {
  colors: {
    primary: "#6200ee",
    background: "#ffffff",
    surface: "#ffffff",
    text: "#000000",
  },
  fonts: {
    regular: {
      fontFamily: "System",
    },
  },
};

// Mock navigation theme
const mockNavigationTheme = {
  dark: false,
  colors: {
    primary: "#6200ee",
    background: "#ffffff",
    card: "#ffffff",
    text: "#000000",
    border: "#e0e0e0",
    notification: "#ff6b6b",
  },
};

// Custom render function with providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <PaperProvider theme={mockTheme}>
      <NavigationContainer theme={mockNavigationTheme}>
        {children}
      </NavigationContainer>
    </PaperProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from "@testing-library/react-native";
export { customRender as render };

// Auth-specific test utilities
export const createMockUser = (overrides = {}) => ({
  id: "test-user-id",
  email: "test@example.com",
  user_metadata: {
    full_name: "Test User",
  },
  ...overrides,
});

export const createMockSession = (overrides = {}) => ({
  access_token: "mock-access-token",
  refresh_token: "mock-refresh-token",
  expires_in: 3600,
  token_type: "bearer",
  user: createMockUser(),
  ...overrides,
});

// Navigation mock utilities
export const mockNavigate = jest.fn();
export const mockGoBack = jest.fn();
export const mockPush = jest.fn();
export const mockReplace = jest.fn();

export const mockRouter = {
  push: mockPush,
  replace: mockReplace,
  back: mockGoBack,
  navigate: mockNavigate,
  canGoBack: jest.fn(() => true),
};

// Platform mock utilities
export const mockPlatform = (platform: "ios" | "android" | "web") => {
  jest.doMock("react-native/Libraries/Utilities/Platform", () => ({
    OS: platform,
    select: (config: any) => config[platform] || config.default,
  }));
};

// Storage mock utilities
export const createStorageMock = () => {
  const storage: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => Promise.resolve(storage[key] || null)),
    setItem: jest.fn((key: string, value: string) => {
      storage[key] = value;
      return Promise.resolve();
    }),
    removeItem: jest.fn((key: string) => {
      delete storage[key];
      return Promise.resolve();
    }),
    clear: jest.fn(() => {
      Object.keys(storage).forEach((key) => delete storage[key]);
      return Promise.resolve();
    }),
  };
};

// Supabase mock utilities
export const createSupabaseMock = () => ({
  auth: {
    signUp: jest.fn(),
    signInWithPassword: jest.fn(),
    signOut: jest.fn(),
    getSession: jest.fn(),
    onAuthStateChange: jest.fn(),
    resetPasswordForEmail: jest.fn(),
  },
  from: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
  })),
});

// Form testing utilities
export const fillForm = async (
  getByTestId: any,
  formData: Record<string, string>
) => {
  for (const [field, value] of Object.entries(formData)) {
    const input = getByTestId(field);
    await input.typeText(value);
  }
};

export const submitForm = async (
  getByTestId: any,
  submitButtonTestId = "submit-button"
) => {
  const submitButton = getByTestId(submitButtonTestId);
  await submitButton.press();
};

// Wait utilities
export const waitFor = (callback: () => void, timeout = 1000) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const check = () => {
      try {
        callback();
        resolve(undefined);
      } catch (error) {
        if (Date.now() - startTime > timeout) {
          reject(error);
        } else {
          setTimeout(check, 10);
        }
      }
    };

    check();
  });
};

