/**
 * Login Screen
 * Responsive login screen with email/password and social auth
 */

import {
  AuthButton,
  AuthContainer,
  AuthInput,
  SocialAuthButtons,
} from "@/components/auth";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { authConfig } from "@/config/auth.config";
import { useAuth } from "@/contexts/auth-context";
import { useShouldShowSocialAuth } from "@/hooks/use-responsive-auth";
import { usePaperTheme } from "@/hooks/use-theme-color";
import type { OAuthProvider } from "@/types/auth";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Snackbar } from "react-native-paper";

/**
 * Login Screen Component
 */
export default function LoginScreen() {
  const theme = usePaperTheme();
  const { signIn, signInWithOAuth, isLoading, error, clearError } = useAuth();
  const shouldShowSocialAuth = useShouldShowSocialAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Validate form
   */
  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < authConfig.security.minPasswordLength) {
      newErrors.password = `Password must be at least ${authConfig.security.minPasswordLength} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle email/password login
   */
  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setErrors({});

      await signIn({ email: email.trim(), password });

      // Navigation will be handled by auth state change
      router.replace("/");
    } catch (err) {
      console.error("Login error:", err);
      // Error is handled by context
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle social login
   */
  const handleSocialLogin = async (provider: OAuthProvider) => {
    try {
      await signInWithOAuth(provider);
    } catch (err) {
      console.error("Social login error:", err);
    }
  };

  /**
   * Navigate to signup
   */
  const handleSignUpPress = () => {
    router.push("/auth/signup");
  };

  /**
   * Navigate to forgot password
   */
  const handleForgotPasswordPress = () => {
    router.push("/auth/forgot-password");
  };

  if (isLoading && !isSubmitting) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <>
      <AuthContainer
        title="Welcome Back"
        subtitle="Sign in to your account to continue"
        headerLogo={
          <View
            style={[
              styles.logoContainer,
              { backgroundColor: theme.colors.primaryContainer },
            ]}
          >
            <IconSymbol
              name="lock.fill"
              size={40}
              color={theme.colors.primary}
            />
          </View>
        }
      >
        {/* Email Input */}
        <AuthInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="your.email@example.com"
          keyboardType="email-address"
          autoComplete="email"
          error={errors.email}
          leftIcon="email-outline"
          returnKeyType="next"
          testID="login-email-input"
        />

        {/* Password Input */}
        <AuthInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          autoComplete="password"
          error={errors.password}
          leftIcon="lock-outline"
          returnKeyType="go"
          onSubmitEditing={handleLogin}
          testID="login-password-input"
        />

        {/* Forgot Password Link */}
        <AuthButton
          mode="text"
          onPress={handleForgotPasswordPress}
          fullWidth={false}
        >
          Forgot Password?
        </AuthButton>

        {/* Login Button */}
        <AuthButton
          onPress={handleLogin}
          loading={isSubmitting}
          disabled={isSubmitting}
          icon="login"
          testID="login-submit-button"
        >
          Sign In
        </AuthButton>

        {/* Social Auth Buttons */}
        {shouldShowSocialAuth &&
          authConfig.oauth.enabledProviders.length > 0 && (
            <SocialAuthButtons
              providers={authConfig.oauth.enabledProviders as OAuthProvider[]}
              onPress={handleSocialLogin}
              loading={isSubmitting}
            />
          )}

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <ThemedText style={styles.signupText}>
            Don&apos;t have an account?
          </ThemedText>
          <AuthButton mode="text" onPress={handleSignUpPress} fullWidth={false}>
            Sign Up
          </AuthButton>
        </View>
      </AuthContainer>

      {/* Error Snackbar */}
      <Snackbar
        visible={!!error}
        onDismiss={clearError}
        duration={4000}
        action={{
          label: "Dismiss",
          onPress: clearError,
        }}
      >
        {error}
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  signupText: {
    opacity: 0.7,
  },
});
