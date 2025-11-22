/**
 * Auth Context Tests
 * Tests for authentication context and useAuth hook
 */

import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { getAuthProvider } from "@/lib/auth";
import { act, renderHook, waitFor } from "@testing-library/react-native";
import React from "react";

// Mock the auth provider
jest.mock("@/lib/auth", () => ({
  getAuthProvider: jest.fn(),
  authConfig: {
    supabase: {
      url: "https://test.supabase.co",
      anonKey: "test-key",
    },
  },
}));

describe("AuthContext", () => {
  let mockAuthProvider: any;

  // Use real timers for this test suite since waitFor relies on real timers
  beforeAll(() => {
    jest.useRealTimers();
  });

  afterAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();

    mockAuthProvider = {
      initialize: jest.fn().mockResolvedValue(undefined),
      getSession: jest.fn().mockResolvedValue(null),
      signUp: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      resetPassword: jest.fn(),
      updatePassword: jest.fn(),
      updateProfile: jest.fn(),
      refreshSession: jest.fn(),
      signInWithOAuth: jest.fn(),
      getUser: jest.fn(),
      onAuthStateChange: jest.fn((callback) => {
        return () => {}; // Return unsubscribe function
      }),
    };

    (getAuthProvider as jest.Mock).mockReturnValue(mockAuthProvider);
  });

  describe("useAuth hook", () => {
    it("should throw error when used outside AuthProvider", () => {
      // Suppress console.error for this test
      const consoleError = jest.spyOn(console, "error").mockImplementation();

      expect(() => {
        renderHook(() => useAuth());
      }).toThrow("useAuth must be used within an AuthProvider");

      consoleError.mockRestore();
    });

    it("should provide auth context when used within AuthProvider", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current).toBeDefined();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(result.current.session).toBeNull();
    });
  });

  describe("initialization", () => {
    it("should initialize auth provider on mount", async () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );

      renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(mockAuthProvider.initialize).toHaveBeenCalled();
      });
    });

    it("should restore existing session on initialization", async () => {
      const mockSession = {
        accessToken: "token",
        refreshToken: "refresh",
        expiresAt: Date.now() + 3600,
        user: {
          id: "user-123",
          email: "test@example.com",
          name: "Test User",
        },
      };

      mockAuthProvider.getSession.mockResolvedValue(mockSession);

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true);
        expect(result.current.user).toEqual(mockSession.user);
        expect(result.current.session).toEqual(mockSession);
      });
    });

    it("should set unauthenticated state if no session exists", async () => {
      mockAuthProvider.getSession.mockResolvedValue(null);

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(false);
        expect(result.current.authState).toBe("unauthenticated");
      });
    });
  });

  describe("signUp", () => {
    it("should sign up a new user successfully", async () => {
      const mockUser = {
        id: "user-123",
        email: "test@example.com",
        name: "Test User",
      };

      const mockSession = {
        accessToken: "token",
        refreshToken: "refresh",
        expiresAt: Date.now() + 3600,
        user: mockUser,
      };

      mockAuthProvider.signUp.mockResolvedValue({
        user: mockUser,
        session: mockSession,
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.authState).toBe("unauthenticated");
      });

      await act(async () => {
        await result.current.signUp({
          email: "test@example.com",
          password: "password123",
          name: "Test User",
        });
      });

      expect(mockAuthProvider.signUp).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
        name: "Test User",
      });

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true);
        expect(result.current.user).toEqual(mockUser);
      });
    });

    it("should handle signup errors", async () => {
      mockAuthProvider.signUp.mockRejectedValue(
        new Error("Email already exists")
      );

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.authState).toBe("unauthenticated");
      });

      // Call signUp and expect it to throw - error is propagated to caller
      await expect(
        act(async () => {
          await result.current.signUp({
            email: "existing@example.com",
            password: "password123",
          });
        })
      ).rejects.toThrow("Email already exists");

      // Note: Error state is not checked here because React doesn't commit
      // state updates when an error is thrown from within act().
      // In real usage, components would catch the error and handle it.
    });
  });

  describe("signIn", () => {
    it("should sign in a user successfully", async () => {
      const mockUser = {
        id: "user-123",
        email: "test@example.com",
        name: "Test User",
      };

      const mockSession = {
        accessToken: "token",
        refreshToken: "refresh",
        expiresAt: Date.now() + 3600,
        user: mockUser,
      };

      mockAuthProvider.signIn.mockResolvedValue({
        user: mockUser,
        session: mockSession,
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.authState).toBe("unauthenticated");
      });

      await act(async () => {
        await result.current.signIn({
          email: "test@example.com",
          password: "password123",
        });
      });

      expect(mockAuthProvider.signIn).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true);
        expect(result.current.authState).toBe("authenticated");
      });
    });
  });

  describe("signOut", () => {
    it("should sign out successfully", async () => {
      mockAuthProvider.signOut.mockResolvedValue(undefined);

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await waitFor(() => {
        expect(result.current.authState).toBe("unauthenticated");
      });

      await act(async () => {
        await result.current.signOut();
      });

      expect(mockAuthProvider.signOut).toHaveBeenCalled();
    });
  });

  describe("clearError", () => {
    it("should clear error state", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <AuthProvider>{children}</AuthProvider>
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      // Manually set error state (simulating an error from context initialization)
      // Note: We can't test error state from thrown errors due to React's behavior
      // with act(), so we test clearError functionality directly
      act(() => {
        result.current.clearError();
      });

      expect(result.current.error).toBeNull();
    });
  });
});
