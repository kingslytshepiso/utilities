/**
 * Authentication Context
 * Provides authentication state and methods throughout the app
 */

import { getAuthProvider } from "@/lib/auth";
import type {
  AuthSession,
  AuthState,
  OAuthProvider,
  PasswordResetRequest,
  PasswordUpdate,
  ProfileUpdate,
  SignInCredentials,
  SignUpCredentials,
  User,
} from "@/types/auth";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Authentication context value
 */
interface AuthContextValue {
  // State
  user: User | null;
  session: AuthSession | null;
  authState: AuthState;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Methods
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signInWithOAuth: (provider: OAuthProvider) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (request: PasswordResetRequest) => Promise<void>;
  updatePassword: (update: PasswordUpdate) => Promise<void>;
  updateProfile: (update: ProfileUpdate) => Promise<void>;
  refreshSession: () => Promise<void>;
  clearError: () => void;
}

/**
 * Create authentication context
 */
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Authentication Provider Props
 */
interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Authentication Provider Component
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [error, setError] = useState<string | null>(null);

  // Get auth provider singleton (memoized to avoid re-creating on every render)
  const authProvider = useMemo(() => getAuthProvider(), []);

  /**
   * Initialize auth and restore session
   */
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Initialize the auth provider
        await authProvider.initialize();

        // Try to restore existing session
        const existingSession = await authProvider.getSession();

        if (mounted) {
          if (existingSession) {
            setSession(existingSession);
            setUser(existingSession.user);
            setAuthState("authenticated");
          } else {
            setAuthState("unauthenticated");
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        if (mounted) {
          setAuthState("error");
          setError(
            err instanceof Error
              ? err.message
              : "Authentication initialization failed"
          );
        }
      }
    };

    initializeAuth();

    // Listen to auth state changes
    const unsubscribe = authProvider.onAuthStateChange((newSession) => {
      if (!mounted) return;

      if (newSession) {
        setSession(newSession);
        setUser(newSession.user);
        setAuthState("authenticated");
      } else {
        setSession(null);
        setUser(null);
        setAuthState("unauthenticated");
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [authProvider]);

  /**
   * Sign up a new user
   */
  const signUp = useCallback(async (credentials: SignUpCredentials) => {
    try {
      setAuthState("loading");
      setError(null);

      const { user: newUser, session: newSession } = await authProvider.signUp(
        credentials
      );

      setUser(newUser);
      setSession(newSession);
      setAuthState(newSession ? "authenticated" : "unauthenticated");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign up failed";
      setError(message);
      setAuthState("error");
      throw err;
    }
  }, [authProvider]);

  /**
   * Sign in existing user
   */
  const signIn = useCallback(async (credentials: SignInCredentials) => {
    try {
      setAuthState("loading");
      setError(null);

      const { user: authUser, session: authSession } =
        await authProvider.signIn(credentials);

      setUser(authUser);
      setSession(authSession);
      setAuthState("authenticated");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign in failed";
      setError(message);
      setAuthState("error");
      throw err;
    }
  }, [authProvider]);

  /**
   * Sign in with OAuth provider
   */
  const signInWithOAuth = useCallback(async (provider: OAuthProvider) => {
    try {
      setAuthState("loading");
      setError(null);

      await authProvider.signInWithOAuth(provider);
      // Session will be updated via onAuthStateChange callback
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "OAuth sign in failed";
      setError(message);
      setAuthState("error");
      throw err;
    }
  }, [authProvider]);

  /**
   * Sign out current user
   */
  const signOut = useCallback(async () => {
    try {
      setError(null);
      await authProvider.signOut();
      // State will be updated via onAuthStateChange callback
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign out failed";
      setError(message);
      throw err;
    }
  }, [authProvider]);

  /**
   * Request password reset
   */
  const resetPassword = useCallback(async (request: PasswordResetRequest) => {
    try {
      setError(null);
      await authProvider.resetPassword(request);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Password reset failed";
      setError(message);
      throw err;
    }
  }, [authProvider]);

  /**
   * Update user password
   */
  const updatePassword = useCallback(async (update: PasswordUpdate) => {
    try {
      setError(null);
      await authProvider.updatePassword(update);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Password update failed";
      setError(message);
      throw err;
    }
  }, [authProvider]);

  /**
   * Update user profile
   */
  const updateProfile = useCallback(async (update: ProfileUpdate) => {
    try {
      setError(null);
      const updatedUser = await authProvider.updateProfile(update);
      setUser(updatedUser);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Profile update failed";
      setError(message);
      throw err;
    }
  }, [authProvider]);

  /**
   * Refresh current session
   */
  const refreshSession = useCallback(async () => {
    try {
      setError(null);
      const newSession = await authProvider.refreshSession();
      setSession(newSession);
      setUser(newSession.user);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Session refresh failed";
      setError(message);
      throw err;
    }
  }, [authProvider]);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextValue = {
    user,
    session,
    authState,
    isAuthenticated: authState === "authenticated",
    isLoading: authState === "loading",
    error,
    signUp,
    signIn,
    signInWithOAuth,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    refreshSession,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use authentication context
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
