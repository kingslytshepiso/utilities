/**
 * Supabase Authentication Provider
 * Implementation of IAuthProvider for Supabase
 */

import { authConfig } from "@/config/auth.config";
import {
  AuthSession,
  IAuthProvider,
  OAuthProvider,
  PasswordResetRequest,
  PasswordUpdate,
  ProfileUpdate,
  SignInCredentials,
  SignUpCredentials,
  User,
} from "@/types/auth";
import { createClient, Session, SupabaseClient } from "@supabase/supabase-js";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";
import { authStorage } from "./storage";

/**
 * Map Supabase session to our AuthSession type
 */
const mapSession = (session: Session | null): AuthSession | null => {
  if (!session) return null;

  return {
    accessToken: session.access_token,
    refreshToken: session.refresh_token,
    expiresAt: session.expires_at,
    user: {
      id: session.user.id,
      email: session.user.email || "",
      name:
        session.user.user_metadata?.name ||
        session.user.user_metadata?.full_name,
      avatar: session.user.user_metadata?.avatar_url,
      metadata: session.user.user_metadata,
      createdAt: session.user.created_at
        ? new Date(session.user.created_at)
        : undefined,
      updatedAt: session.user.updated_at
        ? new Date(session.user.updated_at)
        : undefined,
    },
  };
};

/**
 * Map Supabase user to our User type
 */
const mapUser = (user: any): User => {
  return {
    id: user.id,
    email: user.email || "",
    name: user.user_metadata?.name || user.user_metadata?.full_name,
    avatar: user.user_metadata?.avatar_url,
    metadata: user.user_metadata,
    createdAt: user.created_at ? new Date(user.created_at) : undefined,
    updatedAt: user.updated_at ? new Date(user.updated_at) : undefined,
  };
};

/**
 * Supabase Authentication Provider
 */
export class SupabaseAuthProvider implements IAuthProvider {
  private client: SupabaseClient | null = null;
  private initialized = false;

  /**
   * Initialize Supabase client
   */
  async initialize(): Promise<void> {
    if (this.initialized && this.client) return;

    const { supabase } = authConfig;
    if (!supabase) {
      throw new Error("Supabase configuration not found");
    }

    // Create Supabase client with platform-specific storage
    this.client = createClient(supabase.url, supabase.anonKey, {
      auth: {
        storage: authStorage,
        autoRefreshToken: supabase.enableAutoRefreshToken ?? true,
        persistSession: supabase.persistSession ?? true,
        detectSessionInUrl: supabase.detectSessionInUrl ?? false,
      },
    });

    this.initialized = true;
  }

  /**
   * Ensure client is initialized
   */
  private ensureInitialized(): SupabaseClient {
    if (!this.client || !this.initialized) {
      throw new Error(
        "Auth provider not initialized. Call initialize() first."
      );
    }
    return this.client;
  }

  /**
   * Sign up a new user
   */
  async signUp(
    credentials: SignUpCredentials
  ): Promise<{ user: User; session: AuthSession | null }> {
    const client = this.ensureInitialized();

    const { data, error } = await client.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          name: credentials.name,
          ...credentials.metadata,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error("Sign up failed: no user returned");
    }

    return {
      user: mapUser(data.user),
      session: mapSession(data.session),
    };
  }

  /**
   * Sign in an existing user
   */
  async signIn(
    credentials: SignInCredentials
  ): Promise<{ user: User; session: AuthSession }> {
    const client = this.ensureInitialized();

    const { data, error } = await client.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.session || !data.user) {
      throw new Error("Sign in failed");
    }

    return {
      user: mapUser(data.user),
      session: mapSession(data.session) as AuthSession,
    };
  }

  /**
   * Sign in with OAuth provider
   */
  async signInWithOAuth(
    provider: OAuthProvider
  ): Promise<{ url?: string; session?: AuthSession }> {
    const client = this.ensureInitialized();

    const { data, error } = await client.auth.signInWithOAuth({
      provider: provider as any,
      options: {
        redirectTo: authConfig.oauth.redirectUrl,
        skipBrowserRedirect: Platform.OS !== "web",
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    // For mobile, open the OAuth URL in browser
    if (Platform.OS !== "web" && data.url) {
      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        authConfig.oauth.redirectUrl
      );

      if (result.type === "success" && result.url) {
        // Extract session from callback URL
        // This would need additional handling based on your OAuth flow
        return { url: result.url };
      }
    }

    return { url: data.url };
  }

  /**
   * Sign out the current user
   */
  async signOut(): Promise<void> {
    const client = this.ensureInitialized();
    const { error } = await client.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Get the current session
   */
  async getSession(): Promise<AuthSession | null> {
    const client = this.ensureInitialized();
    const { data, error } = await client.auth.getSession();

    if (error) {
      console.warn("Error getting session:", error.message);
      return null;
    }

    return mapSession(data.session);
  }

  /**
   * Get the current user
   */
  async getUser(): Promise<User | null> {
    const client = this.ensureInitialized();
    const { data, error } = await client.auth.getUser();

    if (error) {
      console.warn("Error getting user:", error.message);
      return null;
    }

    return data.user ? mapUser(data.user) : null;
  }

  /**
   * Send password reset email
   */
  async resetPassword(request: PasswordResetRequest): Promise<void> {
    const client = this.ensureInitialized();

    const { error } = await client.auth.resetPasswordForEmail(request.email, {
      redirectTo: `${authConfig.oauth.redirectUrl}/reset-password`,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Update user password
   */
  async updatePassword(update: PasswordUpdate): Promise<void> {
    const client = this.ensureInitialized();

    const { error } = await client.auth.updateUser({
      password: update.password,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(update: ProfileUpdate): Promise<User> {
    const client = this.ensureInitialized();

    const { data, error } = await client.auth.updateUser({
      data: {
        name: update.name,
        avatar_url: update.avatar,
        ...update.metadata,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error("Profile update failed");
    }

    return mapUser(data.user);
  }

  /**
   * Refresh the current session
   */
  async refreshSession(): Promise<AuthSession> {
    const client = this.ensureInitialized();

    const { data, error } = await client.auth.refreshSession();

    if (error) {
      throw new Error(error.message);
    }

    if (!data.session) {
      throw new Error("Session refresh failed");
    }

    return mapSession(data.session) as AuthSession;
  }

  /**
   * Listen to authentication state changes
   */
  onAuthStateChange(
    callback: (session: AuthSession | null) => void
  ): () => void {
    const client = this.ensureInitialized();

    const { data } = client.auth.onAuthStateChange((_event, session) => {
      callback(mapSession(session));
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }
}
