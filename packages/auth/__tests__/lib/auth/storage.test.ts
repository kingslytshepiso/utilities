/**
 * Storage Adapter Tests
 * Tests for platform-specific storage implementation
 */

import { authStorage } from "@/lib/auth/storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

describe("authStorage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset Platform.OS for each test
    Platform.OS = "ios";
  });

  describe("getItem", () => {
    it("should use SecureStore on native platforms", async () => {
      Platform.OS = "ios";
      const mockValue = "test-value";
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(mockValue);

      const result = await authStorage.getItem("test-key");

      expect(SecureStore.getItemAsync).toHaveBeenCalledWith("auth-test-key");
      expect(result).toBe(mockValue);
    });

    it("should use localStorage on web", async () => {
      Platform.OS = "web";
      const mockValue = "test-value";

      // Mock localStorage
      const localStorageMock = {
        getItem: jest.fn().mockReturnValue(mockValue),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      };
      global.localStorage = localStorageMock as any;

      const result = await authStorage.getItem("test-key");

      expect(localStorageMock.getItem).toHaveBeenCalledWith("auth-test-key");
      expect(result).toBe(mockValue);
    });

    it("should return null if key does not exist", async () => {
      Platform.OS = "ios";
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue(null);

      const result = await authStorage.getItem("nonexistent-key");

      expect(result).toBeNull();
    });
  });

  describe("setItem", () => {
    it("should use SecureStore on native platforms", async () => {
      Platform.OS = "android";
      (SecureStore.setItemAsync as jest.Mock).mockResolvedValue(undefined);

      await authStorage.setItem("test-key", "test-value");

      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
        "auth-test-key",
        "test-value"
      );
    });

    it("should use localStorage on web", async () => {
      Platform.OS = "web";

      const localStorageMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      };
      global.localStorage = localStorageMock as any;

      await authStorage.setItem("test-key", "test-value");

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "auth-test-key",
        "test-value"
      );
    });
  });

  describe("removeItem", () => {
    it("should use SecureStore on native platforms", async () => {
      Platform.OS = "ios";
      (SecureStore.deleteItemAsync as jest.Mock).mockResolvedValue(undefined);

      await authStorage.removeItem("test-key");

      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith("auth-test-key");
    });

    it("should use localStorage on web", async () => {
      Platform.OS = "web";

      const localStorageMock = {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      };
      global.localStorage = localStorageMock as any;

      await authStorage.removeItem("test-key");

      expect(localStorageMock.removeItem).toHaveBeenCalledWith("auth-test-key");
    });
  });

  describe("key prefixing", () => {
    it("should prefix all keys with auth-", async () => {
      Platform.OS = "ios";
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValue("value");

      await authStorage.getItem("my-key");

      expect(SecureStore.getItemAsync).toHaveBeenCalledWith("auth-my-key");
    });
  });
});
