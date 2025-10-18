/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * This theme structure is compatible with React Native Paper's MD3 theme system.
 */

import { Platform } from "react-native";
import type { MD3Theme } from "react-native-paper";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

/**
 * Gradient configurations for light and dark themes
 * Customize these to match your brand
 */
export const gradientColors = {
  light: {
    primary: ["#ffffff", "#f0f4f7", "#e8eff3"],
    accent: ["#d1e7ed", "#e8eff3", "#ffffff"],
    custom: ["#ffffff", "#f0f9ff", "#e0f2fe"], // Customize this for your brand
  },
  dark: {
    primary: ["#151718", "#1c2326", "#21282b"],
    accent: ["#1c2326", "#21282b", "#252d30"],
    custom: ["#0a0f14", "#151718", "#1c2326"], // Customize this for your brand
  },
} as const;

// Light theme configuration
export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: tintColorLight,
    primaryContainer: "#d1e7ed",
    secondary: "#526070",
    secondaryContainer: "#d5e4f7",
    tertiary: "#6d5677",
    tertiaryContainer: "#f5daff",
    error: "#ba1a1a",
    errorContainer: "#ffdad6",
    background: "#ffffff",
    surface: "#ffffff",
    surfaceVariant: "#dde3ea",
    outline: "#73777f",
    outlineVariant: "#c1c7ce",
    onPrimary: "#ffffff",
    onPrimaryContainer: "#001f24",
    onSecondary: "#ffffff",
    onSecondaryContainer: "#0f1d27",
    onTertiary: "#ffffff",
    onTertiaryContainer: "#251431",
    onError: "#ffffff",
    onErrorContainer: "#410002",
    onBackground: "#11181C",
    onSurface: "#11181C",
    onSurfaceVariant: "#41484d",
    inverseSurface: "#2b3133",
    inverseOnSurface: "#eff1f3",
    inversePrimary: "#6dd3f3",
    elevation: {
      level0: "transparent",
      level1: "#f0f4f7",
      level2: "#e8eff3",
      level3: "#e0eaef",
      level4: "#dee8ed",
      level5: "#d9e4ea",
    },
    surfaceDisabled: "rgba(26, 28, 30, 0.12)",
    onSurfaceDisabled: "rgba(26, 28, 30, 0.38)",
    backdrop: "rgba(44, 49, 55, 0.4)",
  },
};

// Dark theme configuration
export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: tintColorDark,
    primaryContainer: "#004f58",
    secondary: "#b9c8da",
    secondaryContainer: "#3a4857",
    tertiary: "#d9bce1",
    tertiaryContainer: "#533d5e",
    error: "#ffb4ab",
    errorContainer: "#93000a",
    background: "#151718",
    surface: "#151718",
    surfaceVariant: "#41484d",
    outline: "#8b9297",
    outlineVariant: "#41484d",
    onPrimary: "#003640",
    onPrimaryContainer: "#6dd3f3",
    onSecondary: "#233240",
    onSecondaryContainer: "#d5e4f7",
    onTertiary: "#3c2947",
    onTertiaryContainer: "#f5daff",
    onError: "#690005",
    onErrorContainer: "#ffdad6",
    onBackground: "#ECEDEE",
    onSurface: "#ECEDEE",
    onSurfaceVariant: "#c1c7ce",
    inverseSurface: "#e1e3e5",
    inverseOnSurface: "#2b3133",
    inversePrimary: "#006874",
    elevation: {
      level0: "transparent",
      level1: "#1c2326",
      level2: "#21282b",
      level3: "#252d30",
      level4: "#273135",
      level5: "#29363a",
    },
    surfaceDisabled: "rgba(226, 227, 229, 0.12)",
    onSurfaceDisabled: "rgba(226, 227, 229, 0.38)",
    backdrop: "rgba(58, 64, 69, 0.4)",
  },
};

// Legacy color structure for backward compatibility
export const Colors = {
  light: {
    text: lightTheme.colors.onBackground,
    background: lightTheme.colors.background,
    tint: lightTheme.colors.primary,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: lightTheme.colors.primary,
  },
  dark: {
    text: darkTheme.colors.onBackground,
    background: darkTheme.colors.background,
    tint: darkTheme.colors.primary,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: darkTheme.colors.primary,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
