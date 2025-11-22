/**
 * Authentication Configuration
 * Centralized configuration for Supabase authentication
 */

import Constants from "expo-constants";
import { Platform } from "react-native";

/**
 * Authentication configuration
 */
export interface AuthConfig {
  // Supabase configuration
  supabase: {
    url: string;
    anonKey: string;
    enableAutoRefreshToken?: boolean;
    detectSessionInUrl?: boolean;
    persistSession?: boolean;
  };

  // Session configuration
  session: {
    persistSession: boolean;
    storageKey: string;
    autoRefresh: boolean;
    refreshThreshold: number; // seconds before expiry to refresh
  };

  // OAuth configuration
  oauth: {
    redirectUrl: string;
    enabledProviders: string[];
  };

  // Security settings
  security: {
    minPasswordLength: number;
    requireEmailVerification: boolean;
    enableBiometrics: boolean;
  };
}

/**
 * Get environment variable with fallback
 */
const getEnvVar = (key: string, fallback: string = ""): string => {
  // Check expo-constants extra config first
  const extraConfig = Constants.expoConfig?.extra;
  if (extraConfig && extraConfig[key]) {
    return extraConfig[key];
  }

  // Check process.env for web
  if (Platform.OS === "web" && typeof process !== "undefined" && process.env) {
    return (process.env as any)[key] || fallback;
  }

  return fallback;
};

/**
 * Default authentication configuration
 * Override these values using environment variables in app.json or .env.local
 */
export const authConfig: AuthConfig = {
  supabase: {
    url: getEnvVar("SUPABASE_URL", "https://your-project.supabase.co"),
    anonKey: getEnvVar("SUPABASE_ANON_KEY", "your-anon-key"),
    enableAutoRefreshToken: true,
    detectSessionInUrl: Platform.OS === "web",
    persistSession: true,
  },

  session: {
    persistSession: true,
    storageKey: "auth-session",
    autoRefresh: true,
    refreshThreshold: 60, // Refresh 60 seconds before expiry
  },

  oauth: {
    redirectUrl: Platform.select({
      web: getEnvVar(
        "AUTH_REDIRECT_URL",
        "http://localhost:8081/auth/callback"
      ),
      default: getEnvVar("AUTH_REDIRECT_URL", "utilities://auth/callback"),
    }) as string,
    enabledProviders: ["google", "apple", "github"],
  },

  security: {
    minPasswordLength: 8,
    requireEmailVerification: false,
    enableBiometrics: Platform.OS !== "web",
  },
};

/**
 * Validate configuration
 */
export const validateAuthConfig = (config: AuthConfig): boolean => {
  if (!config.supabase?.url || config.supabase.url.includes("your-project")) {
    console.warn(
      "⚠️  Supabase URL not configured. Please set SUPABASE_URL in app.json or .env.local"
    );
    return false;
  }
  if (
    !config.supabase?.anonKey ||
    config.supabase.anonKey.includes("your-anon-key")
  ) {
    console.warn(
      "⚠️  Supabase anon key not configured. Please set SUPABASE_ANON_KEY in app.json or .env.local"
    );
    return false;
  }
  return true;
};
