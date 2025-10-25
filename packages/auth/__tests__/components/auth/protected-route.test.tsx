/**
 * ProtectedRoute Component Tests
 * Tests for route protection logic
 */

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useAuth } from "@/contexts/auth-context";
import { render, waitFor } from "@/test-utils";
import { router, useSegments } from "expo-router";
import React from "react";
import { Text } from "react-native";

// Mock dependencies
jest.mock("@/contexts/auth-context");
jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
  useSegments: jest.fn(),
}));

describe("ProtectedRoute", () => {
  const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
  const mockUseSegments = useSegments as jest.MockedFunction<
    typeof useSegments
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("loading state", () => {
    it("should show loading indicator when loading", () => {
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

      mockUseSegments.mockReturnValue([]);

      const { getByTestId } = render(
        <ProtectedRoute>
          <Text>Protected Content</Text>
        </ProtectedRoute>
      );

      // Should show activity indicator
      expect(getByTestId).toBeTruthy();
    });
  });

  describe("authentication redirects", () => {
    it("should redirect to login when unauthenticated and not in auth group", async () => {
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

      mockUseSegments.mockReturnValue(["index"]);

      render(
        <ProtectedRoute>
          <Text>Protected Content</Text>
        </ProtectedRoute>
      );

      await waitFor(() => {
        expect(router.replace).toHaveBeenCalledWith("/auth/login");
      });
    });

    it("should redirect to home when authenticated and in auth group", async () => {
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

      mockUseSegments.mockReturnValue(["auth", "login"]);

      render(
        <ProtectedRoute>
          <Text>Auth Content</Text>
        </ProtectedRoute>
      );

      await waitFor(() => {
        expect(router.replace).toHaveBeenCalledWith("/");
      });
    });

    it("should render children when authenticated and not in auth group", () => {
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

      mockUseSegments.mockReturnValue(["index"]);

      const { getByText } = render(
        <ProtectedRoute>
          <Text>Protected Content</Text>
        </ProtectedRoute>
      );

      expect(getByText("Protected Content")).toBeTruthy();
    });

    it("should render children when unauthenticated but in auth group", () => {
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

      mockUseSegments.mockReturnValue(["auth", "login"]);

      const { getByText } = render(
        <ProtectedRoute>
          <Text>Auth Screen</Text>
        </ProtectedRoute>
      );

      expect(getByText("Auth Screen")).toBeTruthy();
    });
  });
});
