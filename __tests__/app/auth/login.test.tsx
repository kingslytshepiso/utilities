/**
 * Login Screen Tests
 * Tests for login screen functionality
 */

import LoginScreen from "@/app/auth/login";
import { useAuth } from "@/contexts/auth-context";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";
import { PaperProvider } from "react-native-paper";

// Mock dependencies
jest.mock("@/contexts/auth-context");
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

// Mock hooks
jest.mock("@/hooks/use-responsive-auth", () => ({
  useShouldShowSocialAuth: () => true,
  useAuthInputSize: () => "medium",
  useAuthSpacing: () => ({ padding: 24, gap: 16, logoSize: 64 }),
  useAuthLayout: () => "standard",
  useAuthFormWidth: () => 480,
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider>{children}</PaperProvider>
);

describe("LoginScreen", () => {
  const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      session: null,
      authState: "unauthenticated",
      error: null,
      signUp: jest.fn(),
      signIn: jest.fn().mockResolvedValue(undefined),
      signInWithOAuth: jest.fn().mockResolvedValue(undefined),
      signOut: jest.fn(),
      resetPassword: jest.fn(),
      updatePassword: jest.fn(),
      updateProfile: jest.fn(),
      refreshSession: jest.fn(),
      clearError: jest.fn(),
    });
  });

  describe("rendering", () => {
    it("should render login form", () => {
      const { getByText, getByTestId } = render(<LoginScreen />, { wrapper });

      expect(getByText("Welcome Back")).toBeTruthy();
      expect(getByTestId("login-email-input")).toBeTruthy();
      expect(getByTestId("login-password-input")).toBeTruthy();
      expect(getByTestId("login-submit-button")).toBeTruthy();
    });

    it("should render forgot password link", () => {
      const { getByText } = render(<LoginScreen />, { wrapper });
      expect(getByText("Forgot Password?")).toBeTruthy();
    });

    it("should render sign up link", () => {
      const { getByText } = render(<LoginScreen />, { wrapper });
      expect(getByText("Don't have an account?")).toBeTruthy();
      expect(getByText("Sign Up")).toBeTruthy();
    });
  });

  describe("form validation", () => {
    it("should show error for empty email", async () => {
      const { getByTestId, getByText } = render(<LoginScreen />, { wrapper });

      const submitButton = getByTestId("login-submit-button");
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(getByText("Email is required")).toBeTruthy();
      });
    });

    it("should show error for invalid email format", async () => {
      const { getByTestId, getByText } = render(<LoginScreen />, { wrapper });

      const emailInput = getByTestId("login-email-input");
      fireEvent.changeText(emailInput, "invalid-email");

      const submitButton = getByTestId("login-submit-button");
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(getByText("Invalid email format")).toBeTruthy();
      });
    });

    it("should show error for empty password", async () => {
      const { getByTestId, getByText } = render(<LoginScreen />, { wrapper });

      const emailInput = getByTestId("login-email-input");
      fireEvent.changeText(emailInput, "test@example.com");

      const submitButton = getByTestId("login-submit-button");
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(getByText("Password is required")).toBeTruthy();
      });
    });

    it("should show error for short password", async () => {
      const { getByTestId, getByText } = render(<LoginScreen />, { wrapper });

      const emailInput = getByTestId("login-email-input");
      fireEvent.changeText(emailInput, "test@example.com");

      const passwordInput = getByTestId("login-password-input");
      fireEvent.changeText(passwordInput, "12345");

      const submitButton = getByTestId("login-submit-button");
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(getByText(/Password must be at least/)).toBeTruthy();
      });
    });
  });

  describe("form submission", () => {
    it("should call signIn with valid credentials", async () => {
      const signIn = jest.fn().mockResolvedValue(undefined);
      mockUseAuth.mockReturnValue({
        ...mockUseAuth(),
        signIn,
      });

      const { getByTestId } = render(<LoginScreen />, { wrapper });

      const emailInput = getByTestId("login-email-input");
      fireEvent.changeText(emailInput, "test@example.com");

      const passwordInput = getByTestId("login-password-input");
      fireEvent.changeText(passwordInput, "password123");

      const submitButton = getByTestId("login-submit-button");
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(signIn).toHaveBeenCalledWith({
          email: "test@example.com",
          password: "password123",
        });
      });
    });

    it("should navigate to home on successful login", async () => {
      const signIn = jest.fn().mockResolvedValue(undefined);
      mockUseAuth.mockReturnValue({
        ...mockUseAuth(),
        signIn,
      });

      const { getByTestId } = render(<LoginScreen />, { wrapper });

      const emailInput = getByTestId("login-email-input");
      fireEvent.changeText(emailInput, "test@example.com");

      const passwordInput = getByTestId("login-password-input");
      fireEvent.changeText(passwordInput, "password123");

      const submitButton = getByTestId("login-submit-button");
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(router.replace).toHaveBeenCalledWith("/");
      });
    });

    it("should trim email before submission", async () => {
      const signIn = jest.fn().mockResolvedValue(undefined);
      mockUseAuth.mockReturnValue({
        ...mockUseAuth(),
        signIn,
      });

      const { getByTestId } = render(<LoginScreen />, { wrapper });

      const emailInput = getByTestId("login-email-input");
      fireEvent.changeText(emailInput, "  test@example.com  ");

      const passwordInput = getByTestId("login-password-input");
      fireEvent.changeText(passwordInput, "password123");

      const submitButton = getByTestId("login-submit-button");
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(signIn).toHaveBeenCalledWith({
          email: "test@example.com",
          password: "password123",
        });
      });
    });
  });

  describe("navigation", () => {
    it("should navigate to signup when sign up link is pressed", () => {
      const { getByText } = render(<LoginScreen />, { wrapper });

      const signUpButton = getByText("Sign Up");
      fireEvent.press(signUpButton);

      expect(router.push).toHaveBeenCalledWith("/auth/signup");
    });

    it("should navigate to forgot password when link is pressed", () => {
      const { getByText } = render(<LoginScreen />, { wrapper });

      const forgotPasswordButton = getByText("Forgot Password?");
      fireEvent.press(forgotPasswordButton);

      expect(router.push).toHaveBeenCalledWith("/auth/forgot-password");
    });
  });

  describe("OAuth login", () => {
    it("should call signInWithOAuth when OAuth button is pressed", async () => {
      const signInWithOAuth = jest.fn().mockResolvedValue(undefined);
      mockUseAuth.mockReturnValue({
        ...mockUseAuth(),
        signInWithOAuth,
      });

      const { getByText } = render(<LoginScreen />, { wrapper });

      // Find and press Google OAuth button
      const googleButton = getByText(/Continue with Google/);
      fireEvent.press(googleButton);

      await waitFor(() => {
        expect(signInWithOAuth).toHaveBeenCalledWith("google");
      });
    });
  });

  describe("error handling", () => {
    it("should display error from context", () => {
      mockUseAuth.mockReturnValue({
        ...mockUseAuth(),
        error: "Invalid credentials",
      });

      const { getByText } = render(<LoginScreen />, { wrapper });

      expect(getByText("Invalid credentials")).toBeTruthy();
    });

    it("should clear error when dismissed", () => {
      const clearError = jest.fn();
      mockUseAuth.mockReturnValue({
        ...mockUseAuth(),
        error: "Test error",
        clearError,
      });

      const { getByText } = render(<LoginScreen />, { wrapper });

      const dismissButton = getByText("Dismiss");
      fireEvent.press(dismissButton);

      expect(clearError).toHaveBeenCalled();
    });
  });
});
