/**
 * Forgot Password Screen
 * Password reset request screen
 * Uses React Hook Form + Yup for validation
 */

import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Snackbar } from "react-native-paper";

import { AuthButton, AuthContainer } from "@/components/auth";
import { ControlledInput } from "@/components/forms";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAuth } from "@/contexts/auth-context";
import { usePaperTheme } from "@/hooks/use-theme-color";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/validation";

/**
 * Forgot Password Screen Component
 */
export default function ForgotPasswordScreen() {
  const theme = usePaperTheme();
  const { resetPassword, isLoading, error, clearError } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Initialize React Hook Form with Yup validation
  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  /**
   * Handle password reset request
   */
  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsSubmitting(true);

      await resetPassword({ email: data.email });

      setSuccessMessage("Password reset email sent! Please check your inbox.");

      // Navigate back to login after a delay
      setTimeout(() => {
        router.back();
      }, 3000);
    } catch (err) {
      console.error("Password reset error:", err);
      // Error is handled by context
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Navigate back to login
   */
  const handleBackToLogin = () => {
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
        title="Forgot Password"
        subtitle="Enter your email to receive a password reset link"
        headerLogo={
          <View
            style={[
              styles.logoContainer,
              { backgroundColor: theme.colors.primaryContainer },
            ]}
          >
            <IconSymbol
              name="key.fill"
              size={40}
              color={theme.colors.primary}
            />
          </View>
        }
      >
        {/* Email Input */}
        <ControlledInput
          control={control}
          name="email"
          label="Email"
          placeholder="your.email@example.com"
          keyboardType="email-address"
          autoComplete="email"
          leftIcon="email-outline"
          returnKeyType="go"
          onSubmitEditing={handleSubmit(onSubmit)}
          testID="forgot-password-email-input"
        />

        {/* Reset Password Button */}
        <AuthButton
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={isSubmitting}
          icon="email-send"
          testID="forgot-password-submit-button"
        >
          Send Reset Link
        </AuthButton>

        {/* Back to Login Link */}
        <View style={styles.backContainer}>
          <ThemedText style={styles.backText}>
            Remember your password?
          </ThemedText>
          <AuthButton mode="text" onPress={handleBackToLogin} fullWidth={false}>
            Back to Sign In
          </AuthButton>
        </View>

        {/* Info Text */}
        <View style={styles.infoContainer}>
          <ThemedText style={styles.infoText}>
            You will receive an email with instructions on how to reset your
            password. The link will expire in 24 hours.
          </ThemedText>
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
  backContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 4,
  },
  backText: {
    opacity: 0.7,
    fontSize: 14,
  },
  infoContainer: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  infoText: {
    fontSize: 13,
    opacity: 0.7,
    textAlign: "center",
    lineHeight: 20,
  },
});
