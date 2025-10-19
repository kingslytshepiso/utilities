/**
 * ForgotPassword Screen Tests
 * Tests for password reset screen functionality
 */

import ForgotPasswordScreen from "@/app/auth/forgot-password";
import { useAuth } from "@/contexts/auth-context";
import { fireEvent, render, waitFor } from "@/test-utils";
import { router } from "expo-router";
import React from "react";

// Mock dependencies
jest.mock("@/contexts/auth-context");
jest.mock("expo-router", () => ({
  router: {
    back: jest.fn(),
  },
}));

// Mock hooks
jest.mock("@/hooks/use-responsive-auth", () => ({
  useAuthInputSize: () => "medium",
  useAuthSpacing: () => ({ padding: 24, gap: 16, logoSize: 64 }),
  useAuthLayout: () => "standard",
  useAuthFormWidth: () => 480,
}));

describe("ForgotPasswordScreen", () => {
  const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      session: null,
      authState: "unauthenticated",
      error: null,
      signUp: jest.fn(),
      signIn: jest.fn(),
      signInWithOAuth: jest.fn(),
      signOut: jest.fn(),
      resetPassword: jest.fn().mockResolvedValue(undefined),
      updatePassword: jest.fn(),
      updateProfile: jest.fn(),
      refreshSession: jest.fn(),
      clearError: jest.fn(),
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("rendering", () => {
    it("should render forgot password form", () => {
      const { getByText, getByTestId } = render(<ForgotPasswordScreen />);

      expect(getByText("Forgot Password")).toBeTruthy();
      expect(getByTestId("forgot-password-email-input")).toBeTruthy();
      expect(getByTestId("forgot-password-submit-button")).toBeTruthy();
    });

    it("should render back to login link", () => {
      const { getByText } = render(<ForgotPasswordScreen />);
      expect(getByText("Remember your password?")).toBeTruthy();
      expect(getByText("Back to Sign In")).toBeTruthy();
    });

    it("should render info text", () => {
      const { getByText } = render(<ForgotPasswordScreen />);
      expect(getByText(/You will receive an email/)).toBeTruthy();
    });
  });

  describe("form validation", () => {
    it("should show error for empty email", async () => {
      const { getByTestId, findByText } = render(<ForgotPasswordScreen />);

      const submitButton = getByTestId("forgot-password-submit-button");
      fireEvent.press(submitButton);

      const errorMessage = await findByText("Email is required");
      expect(errorMessage).toBeTruthy();
    });

    it("should show error for invalid email format", async () => {
      const { getByTestId, findByText } = render(<ForgotPasswordScreen />);

      const emailInput = getByTestId("forgot-password-email-input");
      fireEvent.changeText(emailInput, "invalid-email");

      const submitButton = getByTestId("forgot-password-submit-button");
      fireEvent.press(submitButton);

      const errorMessage = await findByText("Invalid email format");
      expect(errorMessage).toBeTruthy();
    });
  });

  describe("form submission", () => {
    it("should call resetPassword with valid email", async () => {
      const resetPassword = jest.fn().mockResolvedValue(undefined);
      mockUseAuth.mockReturnValue({
        ...mockUseAuth(),
        resetPassword,
      });

      const { getByTestId } = render(<ForgotPasswordScreen />);

      const emailInput = getByTestId("forgot-password-email-input");
      fireEvent.changeText(emailInput, "test@example.com");

      const submitButton = getByTestId("forgot-password-submit-button");
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(resetPassword).toHaveBeenCalledWith({
          email: "test@example.com",
        });
      });
    });

    it("should show success message on successful reset", async () => {
      const resetPassword = jest.fn().mockResolvedValue(undefined);
      mockUseAuth.mockReturnValue({
        ...mockUseAuth(),
        resetPassword,
      });

      const { getByTestId, getByText } = render(<ForgotPasswordScreen />);

      const emailInput = getByTestId("forgot-password-email-input");
      fireEvent.changeText(emailInput, "test@example.com");

      const submitButton = getByTestId("forgot-password-submit-button");
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(getByText(/Password reset email sent/)).toBeTruthy();
      });
    });

    it("should navigate back after successful reset", async () => {
      const resetPassword = jest.fn().mockResolvedValue(undefined);
      mockUseAuth.mockReturnValue({
        ...mockUseAuth(),
        resetPassword,
      });

      const { getByTestId } = render(<ForgotPasswordScreen />);

      const emailInput = getByTestId("forgot-password-email-input");
      fireEvent.changeText(emailInput, "test@example.com");

      const submitButton = getByTestId("forgot-password-submit-button");
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(resetPassword).toHaveBeenCalled();
      });

      // Fast-forward timer
      jest.advanceTimersByTime(3000);

      await waitFor(() => {
        expect(router.back).toHaveBeenCalled();
      });
    });
  });

  describe("navigation", () => {
    it("should navigate back to login when back button is pressed", () => {
      const { getByText } = render(<ForgotPasswordScreen />);

      const backButton = getByText("Back to Sign In");
      fireEvent.press(backButton);

      expect(router.back).toHaveBeenCalled();
    });
  });

  describe("error handling", () => {
    it("should display error from context", () => {
      mockUseAuth.mockReturnValue({
        ...mockUseAuth(),
        error: "Email not found",
      });

      const { getByText } = render(<ForgotPasswordScreen />);

      expect(getByText("Email not found")).toBeTruthy();
    });
  });
});
