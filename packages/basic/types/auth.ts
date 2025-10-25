/**
 * Authentication Types
 * Abstract types that work with any authentication provider
 */

/**
 * User profile data
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  metadata?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Authentication session
 */
export interface AuthSession {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
  user: User;
}

/**
 * Sign up credentials
 */
export interface SignUpCredentials {
  email: string;
  password: string;
  name?: string;
  metadata?: Record<string, any>;
}

/**
 * Sign in credentials
 */
export interface SignInCredentials {
  email: string;
  password: string;
}

/**
 * Password reset request
 */
export interface PasswordResetRequest {
  email: string;
}

/**
 * Password update
 */
export interface PasswordUpdate {
  password: string;
  token?: string;
}

/**
 * OAuth provider types
 */
export type OAuthProvider =
  | "google"
  | "apple"
  | "facebook"
  | "github"
  | "twitter"
  | "azure"
  | "gitlab"
  | "bitbucket";

/**
 * Authentication error
 */
export interface AuthError {
  code: string;
  message: string;
  details?: any;
}

/**
 * Authentication state
 */
export type AuthState =
  | "authenticated"
  | "unauthenticated"
  | "loading"
  | "error";

/**
 * Profile update data
 */
export interface ProfileUpdate {
  name?: string;
  avatar?: string;
  metadata?: Record<string, any>;
}

/**
 * Abstract Authentication Provider Interface
 * Implement this interface for any authentication backend (Supabase, Firebase, Auth0, etc.)
 */
export interface IAuthProvider {
  /**
   * Initialize the authentication provider
   */
  initialize(): Promise<void>;

  /**
   * Sign up a new user
   */
  signUp(
    credentials: SignUpCredentials
  ): Promise<{ user: User; session: AuthSession | null }>;

  /**
   * Sign in an existing user
   */
  signIn(
    credentials: SignInCredentials
  ): Promise<{ user: User; session: AuthSession }>;

  /**
   * Sign in with OAuth provider
   */
  signInWithOAuth(
    provider: OAuthProvider
  ): Promise<{ url?: string; session?: AuthSession }>;

  /**
   * Sign out the current user
   */
  signOut(): Promise<void>;

  /**
   * Get the current session
   */
  getSession(): Promise<AuthSession | null>;

  /**
   * Get the current user
   */
  getUser(): Promise<User | null>;

  /**
   * Send password reset email
   */
  resetPassword(request: PasswordResetRequest): Promise<void>;

  /**
   * Update user password
   */
  updatePassword(update: PasswordUpdate): Promise<void>;

  /**
   * Update user profile
   */
  updateProfile(update: ProfileUpdate): Promise<User>;

  /**
   * Refresh the current session
   */
  refreshSession(): Promise<AuthSession>;

  /**
   * Listen to authentication state changes
   */
  onAuthStateChange(
    callback: (session: AuthSession | null) => void
  ): () => void;
}
