/**
 * Authentication Provider Factory
 * Creates and returns the Supabase authentication provider
 */

import { IAuthProvider } from "../types/auth";
import { SupabaseAuthProvider } from "./supabase-provider";

/**
 * Create Supabase authentication provider
 * To use a different provider, replace SupabaseAuthProvider with your implementation
 */
export const createAuthProvider = (): IAuthProvider => {
  return new SupabaseAuthProvider();
};

/**
 * Singleton instance of the auth provider
 */
let authProviderInstance: IAuthProvider | null = null;

/**
 * Get the singleton auth provider instance
 */
export const getAuthProvider = (): IAuthProvider => {
  if (!authProviderInstance) {
    authProviderInstance = createAuthProvider();
  }
  return authProviderInstance;
};

/**
 * Initialize the auth provider
 */
export const initializeAuth = async (): Promise<void> => {
  const provider = getAuthProvider();
  await provider.initialize();
};

// Re-export types and config for convenience
export { authConfig } from "../config/auth.config";
export * from "../types/auth";
export * from "./validation/auth.schema";
