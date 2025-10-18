/**
 * Secure Storage Adapter
 * Platform-specific storage for auth tokens
 * Uses SecureStore on native, localStorage on web
 */

import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const STORAGE_KEY_PREFIX = "@auth:";

/**
 * Storage interface matching what Supabase expects
 */
export const authStorage = {
  async getItem(key: string): Promise<string | null> {
    const prefixedKey = `${STORAGE_KEY_PREFIX}${key}`;

    if (Platform.OS === "web") {
      return localStorage.getItem(prefixedKey);
    }

    return await SecureStore.getItemAsync(prefixedKey);
  },

  async setItem(key: string, value: string): Promise<void> {
    const prefixedKey = `${STORAGE_KEY_PREFIX}${key}`;

    if (Platform.OS === "web") {
      localStorage.setItem(prefixedKey, value);
      return;
    }

    await SecureStore.setItemAsync(prefixedKey, value);
  },

  async removeItem(key: string): Promise<void> {
    const prefixedKey = `${STORAGE_KEY_PREFIX}${key}`;

    if (Platform.OS === "web") {
      localStorage.removeItem(prefixedKey);
      return;
    }

    await SecureStore.deleteItemAsync(prefixedKey);
  },
};
