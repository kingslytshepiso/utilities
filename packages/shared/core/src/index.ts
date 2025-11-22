/**
 * Shared Core Package - Main Export
 * Exports all components, contexts, hooks, utilities, and constants
 */

// Components
export { AppHeader, type AppHeaderProps } from "./components/app-header";
export { ExternalLink, type ExternalLinkProps } from "./components/external-link";
export { GradientBackground, type GradientBackgroundProps } from "./components/gradient-background";
export { HapticTab } from "./components/haptic-tab";
export { ThemedText, type ThemedTextProps } from "./components/themed-text";
export { ThemedView, type ThemedViewProps } from "./components/themed-view";
export { UserMenuModal, type UserMenuModalProps } from "./components/user-menu-modal";

// Form Components
export * from "./components/forms";

// Navigation Components
export * from "./components/navigation";

// Template Components
export * from "./components/template";

// UI Components
export { Collapsible } from "./components/ui/collapsible";
export { IconSymbol } from "./components/ui/icon-symbol";

// Contexts
export {
  ThemeProvider,
  useTheme,
  usePaperTheme,
  useColorScheme,
  useIsDarkMode,
  type ThemeContextType,
  type ThemeMode,
  type ColorScheme,
} from "./contexts/theme-context";

// Constants
export {
  lightTheme,
  darkTheme,
  gradientColors,
  Colors,
  Fonts,
  type MD3Theme,
} from "./constants/theme";

// Hooks
export * from "./hooks/use-color-scheme";
export * from "./hooks/use-color-scheme.web";
export * from "./hooks/use-responsive-auth";
export * from "./hooks/use-theme-color";

// Utils
export * from "./utils";
