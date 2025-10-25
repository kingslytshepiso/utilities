/**
 * Hero Section Component
 * Reusable hero section for landing pages
 */

import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { usePaperTheme } from "@/hooks/use-theme-color";
import { gutters, layout } from "@/utils";

export interface HeroSectionProps {
  /**
   * Icon name from SF Symbols
   */
  icon?: string;
  /**
   * Icon size
   * @default 64
   */
  iconSize?: number;
  /**
   * Hero title
   */
  title: string;
  /**
   * Hero subtitle/description
   */
  subtitle: string;
  /**
   * Primary button text
   */
  primaryButtonText?: string;
  /**
   * Primary button icon
   */
  primaryButtonIcon?: string;
  /**
   * Primary button action
   */
  onPrimaryPress?: () => void;
  /**
   * Secondary button text
   */
  secondaryButtonText?: string;
  /**
   * Secondary button action
   */
  onSecondaryPress?: () => void;
  /**
   * Custom content to render instead of default
   */
  children?: React.ReactNode;
}

/**
 * Reusable Hero Section Component
 */
export function HeroSection({
  icon = "sparkles",
  iconSize = 64,
  title,
  subtitle,
  primaryButtonText,
  primaryButtonIcon,
  onPrimaryPress,
  secondaryButtonText,
  onSecondaryPress,
  children,
}: HeroSectionProps) {
  const theme = usePaperTheme();

  return (
    <ThemedView style={[layout.center, gutters.paddingVertical.xxxl]}>
      {/* Hero Icon */}
      <View
        style={[
          styles.heroIcon,
          { backgroundColor: theme.colors.primaryContainer },
        ]}
      >
        <IconSymbol
          name={icon as any}
          size={iconSize}
          color={theme.colors.primary}
        />
      </View>

      {/* Title */}
      <ThemedText
        type="title"
        style={[gutters.marginTop.xl, { textAlign: "center" }]}
      >
        {title}
      </ThemedText>

      {/* Subtitle */}
      <ThemedText
        style={[
          gutters.marginTop.md,
          gutters.marginBottom.xl,
          { textAlign: "center", opacity: 0.8 },
        ]}
      >
        {subtitle}
      </ThemedText>

      {/* Custom Children or Default Buttons */}
      {children ? (
        children
      ) : (
        <>
          {primaryButtonText && onPrimaryPress && (
            <Button
              mode="contained"
              onPress={onPrimaryPress}
              icon={primaryButtonIcon}
              style={[gutters.marginBottom.sm]}
            >
              {primaryButtonText}
            </Button>
          )}

          {secondaryButtonText && onSecondaryPress && (
            <Button mode="text" onPress={onSecondaryPress}>
              {secondaryButtonText}
            </Button>
          )}
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heroIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
