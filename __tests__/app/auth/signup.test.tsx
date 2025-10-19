/**
 * SignUp Screen Tests
 * Tests for signup screen functionality
 */

import SignUpScreen from "@/app/auth/signup";
import { useAuth } from "@/contexts/auth-context";
import { fireEvent, render, waitFor } from "@/test-utils";
import { router } from "expo-router";
import React from "react";

// Mock dependencies
jest.mock("@/contexts/auth-context");
jest.mock("expo-router", () => ({
  router: {
    back: jest.fn(),
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

describe("SignUpScreen", () => {
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
      signUp: jest.fn().mockResolvedValue(undefined),
      signIn: jest.fn(),
      signInWithOAuth: jest.fn(),
      signOut: jest.fn(),
      resetPassword: jest.fn(),
      updatePassword: jest.fn(),
      updateProfile: jest.fn(),
      refreshSession: jest.fn(),
      clearError: jest.fn(),
    });
  });

  describe("rendering", () => {
    it("should render signup form", () => {
      const { getAllByText, getByTestId } = render(<SignUpScreen />);

      expect(getAllByText("Create Account").length).toBeGreaterThan(0);
      expect(getByTestId("signup-name-input")).toBeTruthy();
      expect(getByTestId("signup-email-input")).toBeTruthy();
      expect(getByTestId("signup-password-input")).toBeTruthy();
      expect(getByTestId("signup-confirm-password-input")).toBeTruthy();
      expect(getByTestId("signup-submit-button")).toBeTruthy();
    });

    it("should render login link", () => {
      const { getByText } = render(<SignUpScreen />);
      expect(getByText("Already have an account?")).toBeTruthy();
      expect(getByText("Sign In")).toBeTruthy();
    });
  });

  describe("form validation", () => {
    it("should show error for empty name", async () => {
      const { getByTestId, findByText } = render(<SignUpScreen />);

      const submitButton = getByTestId("signup-submit-button");
      fireEvent.press(submitButton);

      const errorMessage = await findByText("Name is required");
      expect(errorMessage).toBeTruthy();
    });

    it("should show error for empty email", async () => {
      const { getByTestId, findByText } = render(<SignUpScreen />);

      const nameInput = getByTestId("signup-name-input");
      fireEvent.changeText(nameInput, "Test User");

      const submitButton = getByTestId("signup-submit-button");
      fireEvent.press(submitButton);

      const errorMessage = await findByText("Email is required");
      expect(errorMessage).toBeTruthy();
    });

    it("should show error for invalid email format", async () => {
      const { getByTestId, findByText } = render(<SignUpScreen />);

      const nameInput = getByTestId("signup-name-input");
      fireEvent.changeText(nameInput, "Test User");

      const emailInput = getByTestId("signup-email-input");
      fireEvent.changeText(emailInput, "invalid-email");

      const submitButton = getByTestId("signup-submit-button");
      fireEvent.press(submitButton);

      const errorMessage = await findByText("Invalid email format");
      expect(errorMessage).toBeTruthy();
    });

    it("should show error when passwords do not match", async () => {
      const { getByTestId, findByText } = render(<SignUpScreen />);

      const nameInput = getByTestId("signup-name-input");
      fireEvent.changeText(nameInput, "Test User");

      const emailInput = getByTestId("signup-email-input");
      fireEvent.changeText(emailInput, "test@example.com");

      const passwordInput = getByTestId("signup-password-input");
      fireEvent.changeText(passwordInput, "password123");

      const confirmPasswordInput = getByTestId("signup-confirm-password-input");
      fireEvent.changeText(confirmPasswordInput, "password456");

      const submitButton = getByTestId("signup-submit-button");
      fireEvent.press(submitButton);

      const errorMessage = await findByText("Passwords do not match");
      expect(errorMessage).toBeTruthy();
    });
  });

  describe("form submission", () => {
    it("should call signUp with valid data", async () => {
      const signUp = jest.fn().mockResolvedValue(undefined);
      mockUseAuth.mockReturnValue({
        ...mockUseAuth(),
        signUp,
      });

      const { getByTestId } = render(<SignUpScreen />);

      const nameInput = getByTestId("signup-name-input");
      fireEvent.changeText(nameInput, "Test User");

      const emailInput = getByTestId("signup-email-input");
      fireEvent.changeText(emailInput, "test@example.com");

      const passwordInput = getByTestId("signup-password-input");
      fireEvent.changeText(passwordInput, "password123");

      const confirmPasswordInput = getByTestId("signup-confirm-password-input");
      fireEvent.changeText(confirmPasswordInput, "password123");

      const submitButton = getByTestId("signup-submit-button");
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(signUp).toHaveBeenCalledWith({
          email: "test@example.com",
          password: "password123",
          name: "Test User",
        });
      });
    });

    it("should navigate to home on successful signup", async () => {
      const signUp = jest.fn().mockResolvedValue(undefined);
      mockUseAuth.mockReturnValue({
        ...mockUseAuth(),
        signUp,
      });

      const { getByTestId } = render(<SignUpScreen />);

      const nameInput = getByTestId("signup-name-input");
      fireEvent.changeText(nameInput, "Test User");

      const emailInput = getByTestId("signup-email-input");
      fireEvent.changeText(emailInput, "test@example.com");

      const passwordInput = getByTestId("signup-password-input");
      fireEvent.changeText(passwordInput, "password123");

      const confirmPasswordInput = getByTestId("signup-confirm-password-input");
      fireEvent.changeText(confirmPasswordInput, "password123");

      const submitButton = getByTestId("signup-submit-button");
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(router.replace).toHaveBeenCalledWith("/");
      });
    });
  });

  describe("navigation", () => {
    it("should navigate back to login when sign in link is pressed", () => {
      const { getByText } = render(<SignUpScreen />);

      const signInButton = getByText("Sign In");
      fireEvent.press(signInButton);

      expect(router.back).toHaveBeenCalled();
    });
  });

  describe("error handling", () => {
    it("should display error from context", () => {
      mockUseAuth.mockReturnValue({
        ...mockUseAuth(),
        error: "Email already exists",
      });

      const { getByText } = render(<SignUpScreen />);

      expect(getByText("Email already exists")).toBeTruthy();
    });
  });
});
