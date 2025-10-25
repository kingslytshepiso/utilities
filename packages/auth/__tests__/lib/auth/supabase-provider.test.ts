/**
 * Supabase Provider Tests
 * Tests for Supabase authentication provider implementation
 */

import { SupabaseAuthProvider } from "@/lib/auth/supabase-provider";
import { createClient } from "@supabase/supabase-js";

// Mock Supabase client
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(),
}));

// Mock storage
jest.mock("@/lib/auth/storage", () => ({
  authStorage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
}));

describe("SupabaseAuthProvider", () => {
  let provider: SupabaseAuthProvider;
  let mockSupabaseClient: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Create mock Supabase client
    mockSupabaseClient = {
      auth: {
        signUp: jest.fn(),
        signInWithPassword: jest.fn(),
        signInWithOAuth: jest.fn(),
        signOut: jest.fn(),
        getSession: jest.fn(),
        getUser: jest.fn(),
        resetPasswordForEmail: jest.fn(),
        updateUser: jest.fn(),
        refreshSession: jest.fn(),
        onAuthStateChange: jest.fn(() => ({
          data: {
            subscription: {
              unsubscribe: jest.fn(),
            },
          },
        })),
      },
    };

    (createClient as jest.Mock).mockReturnValue(mockSupabaseClient);
    provider = new SupabaseAuthProvider();
  });

  describe("initialize", () => {
    it("should initialize Supabase client successfully", async () => {
      await provider.initialize();

      expect(createClient).toHaveBeenCalledWith(
        "https://test-project.supabase.co",
        "test-anon-key",
        expect.objectContaining({
          auth: expect.objectContaining({
            autoRefreshToken: true,
            persistSession: true,
          }),
        })
      );
    });

    it("should only initialize once", async () => {
      await provider.initialize();
      await provider.initialize();

      expect(createClient).toHaveBeenCalledTimes(1);
    });

    // Note: Testing missing configuration requires complex module-level mocking
    // and is better handled through integration tests or manual verification
    // The configuration validation is done at build time via TypeScript types
  });

  describe("signUp", () => {
    beforeEach(async () => {
      await provider.initialize();
    });

    it("should sign up a new user successfully", async () => {
      const mockUser = {
        id: "user-123",
        email: "test@example.com",
        user_metadata: { name: "Test User" },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const mockSession = {
        access_token: "access-token",
        refresh_token: "refresh-token",
        expires_at: Date.now() + 3600,
        user: mockUser,
      };

      mockSupabaseClient.auth.signUp.mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null,
      });

      const result = await provider.signUp({
        email: "test@example.com",
        password: "password123",
        name: "Test User",
      });

      expect(mockSupabaseClient.auth.signUp).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
        options: {
          data: {
            name: "Test User",
          },
        },
      });

      expect(result.user).toBeDefined();
      expect(result.user.id).toBe("user-123");
      expect(result.user.email).toBe("test@example.com");
      expect(result.session).toBeDefined();
    });

    it("should throw error on signup failure", async () => {
      mockSupabaseClient.auth.signUp.mockResolvedValue({
        data: { user: null, session: null },
        error: { message: "Email already exists" },
      });

      await expect(
        provider.signUp({
          email: "existing@example.com",
          password: "password123",
        })
      ).rejects.toThrow("Email already exists");
    });
  });

  describe("signIn", () => {
    beforeEach(async () => {
      await provider.initialize();
    });

    it("should sign in an existing user successfully", async () => {
      const mockUser = {
        id: "user-123",
        email: "test@example.com",
        user_metadata: { name: "Test User" },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const mockSession = {
        access_token: "access-token",
        refresh_token: "refresh-token",
        expires_at: Date.now() + 3600,
        user: mockUser,
      };

      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null,
      });

      const result = await provider.signIn({
        email: "test@example.com",
        password: "password123",
      });

      expect(mockSupabaseClient.auth.signInWithPassword).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });

      expect(result.user).toBeDefined();
      expect(result.session).toBeDefined();
    });

    it("should throw error on invalid credentials", async () => {
      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: { user: null, session: null },
        error: { message: "Invalid credentials" },
      });

      await expect(
        provider.signIn({
          email: "test@example.com",
          password: "wrongpassword",
        })
      ).rejects.toThrow("Invalid credentials");
    });
  });

  describe("signOut", () => {
    beforeEach(async () => {
      await provider.initialize();
    });

    it("should sign out successfully", async () => {
      mockSupabaseClient.auth.signOut.mockResolvedValue({
        error: null,
      });

      await provider.signOut();

      expect(mockSupabaseClient.auth.signOut).toHaveBeenCalled();
    });

    it("should throw error on signout failure", async () => {
      mockSupabaseClient.auth.signOut.mockResolvedValue({
        error: { message: "Network error" },
      });

      await expect(provider.signOut()).rejects.toThrow("Network error");
    });
  });

  describe("getSession", () => {
    beforeEach(async () => {
      await provider.initialize();
    });

    it("should return current session", async () => {
      const mockSession = {
        access_token: "access-token",
        refresh_token: "refresh-token",
        expires_at: Date.now() + 3600,
        user: {
          id: "user-123",
          email: "test@example.com",
          user_metadata: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      };

      mockSupabaseClient.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
        error: null,
      });

      const result = await provider.getSession();

      expect(result).toBeDefined();
      expect(result?.accessToken).toBe("access-token");
      expect(result?.user.id).toBe("user-123");
    });

    it("should return null if no session exists", async () => {
      mockSupabaseClient.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: null,
      });

      const result = await provider.getSession();

      expect(result).toBeNull();
    });

    it("should return null on error", async () => {
      mockSupabaseClient.auth.getSession.mockResolvedValue({
        data: { session: null },
        error: { message: "Network error" },
      });

      const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
      const result = await provider.getSession();

      expect(result).toBeNull();
      expect(consoleWarnSpy).toHaveBeenCalled();
      consoleWarnSpy.mockRestore();
    });
  });

  describe("resetPassword", () => {
    beforeEach(async () => {
      await provider.initialize();
    });

    it("should send password reset email successfully", async () => {
      mockSupabaseClient.auth.resetPasswordForEmail.mockResolvedValue({
        error: null,
      });

      await provider.resetPassword({ email: "test@example.com" });

      expect(
        mockSupabaseClient.auth.resetPasswordForEmail
      ).toHaveBeenCalledWith(
        "test@example.com",
        expect.objectContaining({
          redirectTo: expect.stringContaining("/reset-password"),
        })
      );
    });

    it("should throw error on reset failure", async () => {
      mockSupabaseClient.auth.resetPasswordForEmail.mockResolvedValue({
        error: { message: "Email not found" },
      });

      await expect(
        provider.resetPassword({ email: "nonexistent@example.com" })
      ).rejects.toThrow("Email not found");
    });
  });

  describe("onAuthStateChange", () => {
    beforeEach(async () => {
      await provider.initialize();
    });

    it("should subscribe to auth state changes", () => {
      const callback = jest.fn();
      const unsubscribe = provider.onAuthStateChange(callback);

      expect(mockSupabaseClient.auth.onAuthStateChange).toHaveBeenCalled();
      expect(typeof unsubscribe).toBe("function");
    });

    it("should call callback on auth state change", () => {
      const callback = jest.fn();
      let authChangeCallback: any;

      mockSupabaseClient.auth.onAuthStateChange.mockImplementation(
        (cb: any) => {
          authChangeCallback = cb;
          return {
            data: {
              subscription: {
                unsubscribe: jest.fn(),
              },
            },
          };
        }
      );

      provider.onAuthStateChange(callback);

      // Simulate auth state change
      const mockSession = {
        access_token: "token",
        refresh_token: "refresh",
        expires_at: Date.now() + 3600,
        user: {
          id: "user-123",
          email: "test@example.com",
          user_metadata: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      };

      authChangeCallback("SIGNED_IN", mockSession);

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          accessToken: "token",
        })
      );
    });
  });

  describe("uninitialized provider", () => {
    it("should throw error when calling methods without initialization", async () => {
      const uninitializedProvider = new SupabaseAuthProvider();

      await expect(
        uninitializedProvider.signIn({
          email: "test@example.com",
          password: "password",
        })
      ).rejects.toThrow("Auth provider not initialized");
    });
  });
});
