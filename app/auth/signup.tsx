/**
 * Sign Up Screen
 * Responsive registration screen with validation
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
 * Sign Up Screen Component
 */
export default function SignUpScreen() {
  const theme = usePaperTheme();
  const { signUp, signInWithOAuth, isLoading, error, clearError } = useAuth();
  const shouldShowSocialAuth = useShouldShowSocialAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  /**
   * Validate form
   */
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

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

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle sign up
   */
  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setErrors({});

      await signUp({
        email: email.trim(),
        password,
        name: name.trim(),
      });

      // Check if email verification is required
      if (authConfig.security.requireEmailVerification) {
        setSuccessMessage(
          "Account created! Please check your email to verify your account."
        );
        // Stay on signup screen with success message
      } else {
        // Navigate to home on successful signup
        router.replace("/");
      }
    } catch (err) {
      console.error("Sign up error:", err);
      // Error is handled by context
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle social sign up
   */
  const handleSocialSignUp = async (provider: OAuthProvider) => {
    try {
      await signInWithOAuth(provider);
    } catch (err) {
      console.error("Social sign up error:", err);
    }
  };

  /**
   * Navigate to login
   */
  const handleLoginPress = () => {
    router.back();
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
        title="Create Account"
        subtitle="Sign up to get started"
        headerLogo={
          <View
            style={[
              styles.logoContainer,
              { backgroundColor: theme.colors.primaryContainer },
            ]}
          >
            <IconSymbol
              name="person.badge.plus"
              size={40}
              color={theme.colors.primary}
            />
          </View>
        }
      >
        {/* Name Input */}
        <AuthInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          placeholder="John Doe"
          autoComplete="name"
          error={errors.name}
          leftIcon="account-outline"
          returnKeyType="next"
          autoCapitalize="words"
          testID="signup-name-input"
        />

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
          testID="signup-email-input"
        />

        {/* Password Input */}
        <AuthInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Create a password"
          secureTextEntry
          autoComplete="password"
          error={errors.password}
          leftIcon="lock-outline"
          returnKeyType="next"
          testID="signup-password-input"
        />

        {/* Confirm Password Input */}
        <AuthInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry
          autoComplete="password"
          error={errors.confirmPassword}
          leftIcon="lock-check-outline"
          returnKeyType="go"
          onSubmitEditing={handleSignUp}
          testID="signup-confirm-password-input"
        />

        {/* Sign Up Button */}
        <AuthButton
          onPress={handleSignUp}
          loading={isSubmitting}
          disabled={isSubmitting}
          icon="account-plus"
          testID="signup-submit-button"
        >
          Create Account
        </AuthButton>

        {/* Social Auth Buttons */}
        {shouldShowSocialAuth &&
          authConfig.oauth.enabledProviders.length > 0 && (
            <SocialAuthButtons
              providers={authConfig.oauth.enabledProviders as OAuthProvider[]}
              onPress={handleSocialSignUp}
              loading={isSubmitting}
            />
          )}

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <ThemedText style={styles.loginText}>
            Already have an account?
          </ThemedText>
          <AuthButton mode="text" onPress={handleLoginPress} fullWidth={false}>
            Sign In
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

      {/* Success Snackbar */}
      <Snackbar
        visible={!!successMessage}
        onDismiss={() => setSuccessMessage("")}
        duration={4000}
      >
        {successMessage}
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
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  loginText: {
    opacity: 0.7,
  },
});
