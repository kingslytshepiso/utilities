/**
 * Gradient Background Component
 * Provides theme-aware gradient backgrounds
 */

import { gradientColors } from "@/constants/theme";
import { useIsDarkMode } from "@/hooks/use-theme-color";
import { LinearGradient } from "expo-linear-gradient";
import type { ViewProps } from "react-native";
import { StyleSheet } from "react-native";

export interface GradientBackgroundProps extends ViewProps {
  children?: React.ReactNode;
  /**
   * Custom gradient colors (overrides theme colors)
   */
  colors?: string[];
  /**
   * Gradient variant to use from theme
   * @default "primary"
   */
  variant?: "primary" | "accent" | "custom";
  /**
   * Gradient direction
   */
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

/**
 * Gradient background that adapts to theme
 * Customize gradient colors in constants/theme.ts
 */
export function GradientBackground({
  children,
  colors,
  variant = "primary",
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  style,
  ...props
}: GradientBackgroundProps) {
  const isDark = useIsDarkMode();

  // Use custom colors or theme-based gradient
  const themeGradient = isDark
    ? gradientColors.dark[variant]
    : gradientColors.light[variant];

  const gradientColorArray = colors || (themeGradient as unknown as string[]);

  return (
    <LinearGradient
      colors={gradientColorArray as any}
      start={start}
      end={end}
      style={[styles.container, style]}
      {...props}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
