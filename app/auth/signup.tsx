/**
 * Sign Up Screen
 * Responsive registration screen with validation
 * Uses React Hook Form + Yup for validation
 */

import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Snackbar } from "react-native-paper";

import {
  AuthButton,
  AuthContainer,
  SocialAuthButtons,
} from "@/components/auth";
import { ControlledInput } from "@/components/forms";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { authConfig } from "@/config/auth.config";
import { useAuth } from "@/contexts/auth-context";
import { useShouldShowSocialAuth } from "@/hooks/use-responsive-auth";
import { usePaperTheme } from "@/hooks/use-theme-color";
import { signUpSchema, type SignUpFormData } from "@/lib/validation";
import type { OAuthProvider } from "@/types/auth";

/**
 * Sign Up Screen Component
 */
export default function SignUpScreen() {
  const theme = usePaperTheme();
  const { signUp, signInWithOAuth, isLoading, error, clearError } = useAuth();
  const shouldShowSocialAuth = useShouldShowSocialAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Initialize React Hook Form with Yup validation
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  /**
   * Handle sign up
   */
  const onSubmit = async (data: SignUpFormData) => {
    try {
      setIsSubmitting(true);

      await signUp({
        email: data.email,
        password: data.password,
        name: data.name,
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
        <ControlledInput
          control={control}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          autoComplete="name"
          leftIcon="account-outline"
          returnKeyType="next"
          autoCapitalize="words"
          testID="signup-name-input"
        />

        {/* Email Input */}
        <ControlledInput
          control={control}
          name="email"
          label="Email"
          placeholder="your.email@example.com"
          keyboardType="email-address"
          autoComplete="email"
          leftIcon="email-outline"
          returnKeyType="next"
          testID="signup-email-input"
        />

        {/* Password Input */}
        <ControlledInput
          control={control}
          name="password"
          label="Password"
          placeholder="Create a password"
          secureTextEntry
          autoComplete="password"
          leftIcon="lock-outline"
          returnKeyType="next"
          testID="signup-password-input"
        />

        {/* Confirm Password Input */}
        <ControlledInput
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          secureTextEntry
          autoComplete="password"
          leftIcon="lock-check-outline"
          returnKeyType="go"
          onSubmitEditing={handleSubmit(onSubmit)}
          testID="signup-confirm-password-input"
        />

        {/* Sign Up Button */}
        <AuthButton
          onPress={handleSubmit(onSubmit)}
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
    marginTop: 20,
    gap: 4,
  },
  loginText: {
    opacity: 0.7,
    fontSize: 14,
  },
});
