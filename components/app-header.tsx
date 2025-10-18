/**
 * App Header Component
 * Reusable header with logo, theme toggle, and GitHub link
 */

import { FontAwesome } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import {
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { usePaperTheme, useTheme } from "@/hooks/use-theme-color";
import { gutters, layout, supportsHaptics } from "@/utils";

interface AppHeaderProps {
  /**
   * Project name to display
   * @default "Project Template"
   */
  projectName?: string;
  /**
   * GitHub repository URL
   */
  githubUrl?: string;
  /**
   * Show GitHub icon
   * @default true
   */
  showGithub?: boolean;
}

export function AppHeader({
  projectName = "Project Template",
  githubUrl = "https://github.com/your-username/your-repo",
  showGithub = true,
}: AppHeaderProps) {
  const theme = usePaperTheme();
  const { isDark, toggleTheme } = useTheme();

  const handleThemeToggle = async () => {
    if (supportsHaptics()) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    toggleTheme();
  };

  const handleGithubPress = () => {
    Linking.openURL(githubUrl);
  };

  return (
    <View
      style={[
        styles.container,
        gutters.paddingHorizontal.lg,
        gutters.paddingVertical.md,
        {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.outlineVariant,
        },
      ]}
    >
      {/* Logo / Brand */}
      <View style={[layout.flexRow, layout.itemsCenter, gutters.gap.sm]}>
        <View
          style={[
            styles.logoPlaceholder,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <ThemedText
            style={[styles.logoText, { color: theme.colors.onPrimary }]}
          >
            {projectName.charAt(0).toUpperCase()}
          </ThemedText>
        </View>
        <ThemedText type="defaultSemiBold" numberOfLines={1}>
          {projectName}
        </ThemedText>
      </View>

      {/* Actions */}
      <View style={[layout.flexRow, layout.itemsCenter, gutters.gap.xs]}>
        <TouchableOpacity
          onPress={handleThemeToggle}
          style={styles.iconButton}
          accessibilityLabel={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          <IconSymbol
            name={isDark ? "sun.max.fill" : "moon.fill"}
            size={24}
            color={theme.colors.onSurface}
          />
        </TouchableOpacity>

        {showGithub && (
          <TouchableOpacity
            onPress={handleGithubPress}
            style={styles.iconButton}
            accessibilityLabel="Open GitHub repository"
          >
            <FontAwesome
              name="github"
              size={24}
              color={theme.colors.onSurface}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    ...Platform.select({
      web: {
        position: "sticky" as any,
        top: 0,
        zIndex: 100,
      },
    }),
  },
  logoPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
});
