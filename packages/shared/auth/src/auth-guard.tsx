/**
 * Auth Guard Component
 * Higher-order component for protecting specific screens
 */

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAuth } from "@/contexts/auth-context";
import { usePaperTheme } from "@/hooks/use-theme-color";
import { gutters } from "@/utils";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

/**
 * Auth Guard Props
 */
interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

/**
 * Auth Guard Component
 * Shows fallback or redirects if user is not authenticated
 */
export function AuthGuard({ children, fallback, redirectTo }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const theme = usePaperTheme();

  if (isLoading) {
    return null; // Or show a loading indicator
  }

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <ThemedView style={styles.container}>
        <View
          style={[
            styles.content,
            { backgroundColor: theme.colors.surfaceVariant },
          ]}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: theme.colors.primaryContainer },
            ]}
          >
            <IconSymbol
              name="lock.fill"
              size={48}
              color={theme.colors.primary}
            />
          </View>

          <ThemedText type="title" style={[styles.title, gutters.marginTop.lg]}>
            Authentication Required
          </ThemedText>

          <ThemedText style={[styles.message, gutters.marginTop.sm]}>
            Please sign in to access this content
          </ThemedText>

          <Button
            mode="contained"
            onPress={() => router.push(redirectTo || ("/auth/login" as any))}
            icon="login"
            style={[gutters.marginTop.xl]}
          >
            Sign In
          </Button>
        </View>
      </ThemedView>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  content: {
    padding: 32,
    borderRadius: 16,
    alignItems: "center",
    maxWidth: 400,
    width: "100%",
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    opacity: 0.7,
  },
});
