/**
 * AuthGuard Component Tests
 * Tests for component-level authentication protection
 */

import { AuthGuard } from "@/components/auth/auth-guard";
import { useAuth } from "@/contexts/auth-context";
import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";
import { PaperProvider } from "react-native-paper";

// Mock dependencies
jest.mock("@/contexts/auth-context");
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider>{children}</PaperProvider>
);

describe("AuthGuard", () => {
  const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("authenticated state", () => {
    it("should render children when authenticated", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: {
          id: "user-123",
          email: "test@example.com",
        },
        session: {} as any,
        authState: "authenticated",
        error: null,
        signUp: jest.fn(),
        signIn: jest.fn(),
        signInWithOAuth: jest.fn(),
        signOut: jest.fn(),
        resetPassword: jest.fn(),
        updatePassword: jest.fn(),
        updateProfile: jest.fn(),
        refreshSession: jest.fn(),
        clearError: jest.fn(),
      });

      const { getByText } = render(
        <AuthGuard>
          <Text>Protected Content</Text>
        </AuthGuard>,
        { wrapper }
      );

      expect(getByText("Protected Content")).toBeTruthy();
    });
  });

  describe("unauthenticated state", () => {
    it("should show authentication required message when not authenticated", () => {
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
        resetPassword: jest.fn(),
        updatePassword: jest.fn(),
        updateProfile: jest.fn(),
        refreshSession: jest.fn(),
        clearError: jest.fn(),
      });

      const { getByText } = render(
        <AuthGuard>
          <Text>Protected Content</Text>
        </AuthGuard>,
        { wrapper }
      );

      expect(getByText("Authentication Required")).toBeTruthy();
      expect(getByText("Please sign in to access this content")).toBeTruthy();
    });

    it("should render fallback when provided and not authenticated", () => {
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
        resetPassword: jest.fn(),
        updatePassword: jest.fn(),
        updateProfile: jest.fn(),
        refreshSession: jest.fn(),
        clearError: jest.fn(),
      });

      const { getByText } = render(
        <AuthGuard fallback={<Text>Custom Fallback</Text>}>
          <Text>Protected Content</Text>
        </AuthGuard>,
        { wrapper }
      );

      expect(getByText("Custom Fallback")).toBeTruthy();
    });

    it("should show sign in button when not authenticated", () => {
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
        resetPassword: jest.fn(),
        updatePassword: jest.fn(),
        updateProfile: jest.fn(),
        refreshSession: jest.fn(),
        clearError: jest.fn(),
      });

      const { getByText } = render(
        <AuthGuard>
          <Text>Protected Content</Text>
        </AuthGuard>,
        { wrapper }
      );

      expect(getByText("Sign In")).toBeTruthy();
    });
  });

  describe("loading state", () => {
    it("should return null when loading", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
        user: null,
        session: null,
        authState: "loading",
        error: null,
        signUp: jest.fn(),
        signIn: jest.fn(),
        signInWithOAuth: jest.fn(),
        signOut: jest.fn(),
        resetPassword: jest.fn(),
        updatePassword: jest.fn(),
        updateProfile: jest.fn(),
        refreshSession: jest.fn(),
        clearError: jest.fn(),
      });

      const { queryByText } = render(
        <AuthGuard>
          <Text>Protected Content</Text>
        </AuthGuard>,
        { wrapper }
      );

      expect(queryByText("Protected Content")).toBeNull();
      expect(queryByText("Authentication Required")).toBeNull();
    });
  });
});
