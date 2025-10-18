/**
 * Forgot Password Screen
 * Password reset request screen
 */

import { AuthButton, AuthContainer, AuthInput } from "@/components/auth";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAuth } from "@/contexts/auth-context";
import { usePaperTheme } from "@/hooks/use-theme-color";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Snackbar } from "react-native-paper";

/**
 * Forgot Password Screen Component
 */
export default function ForgotPasswordScreen() {
  const theme = usePaperTheme();
  const { resetPassword, isLoading, error, clearError } = useAuth();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  /**
   * Validate email
   */
  const validateEmail = (): boolean => {
    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format");
      return false;
    }

    setEmailError("");
    return true;
  };

  /**
   * Handle password reset request
   */
  const handleResetPassword = async () => {
    if (!validateEmail()) return;

    try {
      setIsSubmitting(true);

      await resetPassword({ email: email.trim() });

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
        <AuthInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="your.email@example.com"
          keyboardType="email-address"
          autoComplete="email"
          error={emailError}
          leftIcon="email-outline"
          returnKeyType="go"
          onSubmitEditing={handleResetPassword}
          testID="forgot-password-email-input"
        />

        {/* Reset Password Button */}
        <AuthButton
          onPress={handleResetPassword}
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
    marginTop: 16,
  },
  backText: {
    opacity: 0.7,
  },
  infoContainer: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  infoText: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: "center",
    lineHeight: 18,
  },
});
