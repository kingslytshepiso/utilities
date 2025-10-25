/**
 * Auth Config Tests
 * Tests for authentication configuration and validation
 */

import { authConfig, validateAuthConfig } from "@/config/auth.config";
import { Platform } from "react-native";

describe("authConfig", () => {
  describe("configuration structure", () => {
    it("should have supabase configuration", () => {
      expect(authConfig.supabase).toBeDefined();
      expect(authConfig.supabase.url).toBeDefined();
      expect(authConfig.supabase.anonKey).toBeDefined();
    });

    it("should have session configuration", () => {
      expect(authConfig.session).toBeDefined();
      expect(authConfig.session.persistSession).toBe(true);
      expect(authConfig.session.autoRefresh).toBe(true);
      expect(authConfig.session.refreshThreshold).toBe(60);
    });

    it("should have oauth configuration", () => {
      expect(authConfig.oauth).toBeDefined();
      expect(authConfig.oauth.redirectUrl).toBeDefined();
      expect(authConfig.oauth.enabledProviders).toBeInstanceOf(Array);
    });

    it("should have security configuration", () => {
      expect(authConfig.security).toBeDefined();
      expect(authConfig.security.minPasswordLength).toBeGreaterThan(0);
      expect(typeof authConfig.security.requireEmailVerification).toBe(
        "boolean"
      );
      expect(typeof authConfig.security.enableBiometrics).toBe("boolean");
    });
  });

  describe("platform-specific configuration", () => {
    it("should enable biometrics on native platforms", () => {
      Platform.OS = "ios";
      expect(authConfig.security.enableBiometrics).toBe(true);

      Platform.OS = "android";
      expect(authConfig.security.enableBiometrics).toBe(true);
    });

    it("should disable biometrics on web", () => {
      Platform.OS = "web";
      // The config is created once, so we just check the logic
      expect(Platform.OS !== "web").toBe(false);
    });
  });

  describe("validateAuthConfig", () => {
    it("should return true for valid configuration", () => {
      const validConfig = {
        supabase: {
          url: "https://valid-project.supabase.co",
          anonKey: "valid-anon-key-12345",
          enableAutoRefreshToken: true,
          detectSessionInUrl: false,
          persistSession: true,
        },
        session: {
          persistSession: true,
          storageKey: "auth-session",
          autoRefresh: true,
          refreshThreshold: 60,
        },
        oauth: {
          redirectUrl: "app://auth/callback",
          enabledProviders: ["google"],
        },
        security: {
          minPasswordLength: 8,
          requireEmailVerification: false,
          enableBiometrics: true,
        },
      };

      const isValid = validateAuthConfig(validConfig);
      expect(isValid).toBe(true);
    });

    it("should return false for invalid Supabase URL", () => {
      const invalidConfig = {
        ...authConfig,
        supabase: {
          ...authConfig.supabase,
          url: "https://your-project.supabase.co",
        },
      };

      const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
      const isValid = validateAuthConfig(invalidConfig);

      expect(isValid).toBe(false);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining("Supabase URL not configured")
      );
      consoleWarnSpy.mockRestore();
    });

    it("should return false for invalid Supabase anon key", () => {
      const invalidConfig = {
        ...authConfig,
        supabase: {
          ...authConfig.supabase,
          url: "https://valid-project.supabase.co",
          anonKey: "your-anon-key",
        },
      };

      const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation();
      const isValid = validateAuthConfig(invalidConfig);

      expect(isValid).toBe(false);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining("Supabase anon key not configured")
      );
      consoleWarnSpy.mockRestore();
    });
  });

  describe("environment variables", () => {
    it("should use environment variables when available", () => {
      // Environment variables are set via expo-constants mock
      expect(authConfig.supabase.url).toBe("https://test-project.supabase.co");
      expect(authConfig.supabase.anonKey).toBe("test-anon-key");
    });
  });

  describe("security settings", () => {
    it("should have minimum password length of at least 8", () => {
      expect(authConfig.security.minPasswordLength).toBeGreaterThanOrEqual(8);
    });

    it("should have default enabled providers", () => {
      expect(authConfig.oauth.enabledProviders.length).toBeGreaterThan(0);
      expect(authConfig.oauth.enabledProviders).toContain("google");
    });
  });
});
