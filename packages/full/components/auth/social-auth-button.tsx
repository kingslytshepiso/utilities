/**
 * Social Authentication Button Component
 * Platform-aware OAuth provider buttons
 */

import { ThemedText } from "@/components/themed-text";
import { useAuthInputSize, useAuthSpacing } from "@/hooks/use-responsive-auth";
import { OAuthProvider } from "@/types/auth";
import { gutters } from "@/utils";
import { platform } from "@/utils/platform";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Divider } from "react-native-paper";

/**
 * Social Auth Button Props
 */
interface SocialAuthButtonProps {
  provider: OAuthProvider;
  onPress: (provider: OAuthProvider) => void;
  loading?: boolean;
  disabled?: boolean;
}

/**
 * Provider configurations
 */
const providerConfig: Record<
  OAuthProvider,
  { icon: string; label: string; color?: string }
> = {
  google: { icon: "google", label: "Google" },
  apple: { icon: "apple", label: "Apple" },
  facebook: { icon: "facebook", label: "Facebook", color: "#1877F2" },
  github: { icon: "github", label: "GitHub" },
  twitter: { icon: "twitter", label: "Twitter", color: "#1DA1F2" },
  azure: { icon: "microsoft", label: "Microsoft" },
  gitlab: { icon: "gitlab", label: "GitLab" },
  bitbucket: { icon: "bitbucket", label: "Bitbucket" },
};

/**
 * Social Authentication Button
 */
export function SocialAuthButton({
  provider,
  onPress,
  loading = false,
  disabled = false,
}: SocialAuthButtonProps) {
  const config = providerConfig[provider];
  const inputSize = useAuthInputSize();

  const buttonHeight = {
    small: 44,
    medium: 48,
    large: 52,
  }[inputSize];

  return (
    <Button
      mode="outlined"
      onPress={() => onPress(provider)}
      loading={loading}
      disabled={disabled || loading}
      icon={config.icon}
      contentStyle={[styles.buttonContent, { height: buttonHeight }]}
      style={[styles.button, gutters.marginBottom.xs]}
    >
      Continue with {config.label}
    </Button>
  );
}

/**
 * Social Auth Buttons Container Props
 */
interface SocialAuthButtonsProps {
  providers: OAuthProvider[];
  onPress: (provider: OAuthProvider) => void;
  loading?: boolean;
  showDivider?: boolean;
}

/**
 * Social Auth Buttons Container
 */
export function SocialAuthButtons({
  providers,
  onPress,
  loading = false,
  showDivider = true,
}: SocialAuthButtonsProps) {
  const spacing = useAuthSpacing();

  // Filter providers based on platform
  const availableProviders = providers.filter((provider) => {
    // Apple Sign In only on iOS or web
    if (provider === "apple" && platform.isAndroid) {
      return false;
    }
    return true;
  });

  if (availableProviders.length === 0) {
    return null;
  }

  return (
    <View>
      {showDivider && (
        <View
          style={[styles.dividerContainer, { marginVertical: spacing.gap }]}
        >
          <Divider style={styles.divider} />
          <ThemedText style={styles.dividerText}>or continue with</ThemedText>
          <Divider style={styles.divider} />
        </View>
      )}

      {availableProviders.map((provider) => (
        <SocialAuthButton
          key={provider}
          provider={provider}
          onPress={onPress}
          loading={loading}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1.5,
  },
  buttonContent: {
    paddingHorizontal: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    flex: 1,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 13,
    opacity: 0.6,
  },
});
