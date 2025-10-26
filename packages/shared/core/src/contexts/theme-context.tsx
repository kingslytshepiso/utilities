/**
 * Theme Context
 * Provides theme management with manual switching capability
 */

import { darkTheme, lightTheme } from "@/constants/theme";
import * as SecureStore from "expo-secure-store";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Platform, useColorScheme as useSystemColorScheme } from "react-native";
import type { MD3Theme } from "react-native-paper";

type ThemeMode = "light" | "dark" | "system";
type ColorScheme = "light" | "dark";

interface ThemeContextType {
  // Current active theme
  theme: MD3Theme;
  // Current color scheme (light or dark)
  colorScheme: ColorScheme;
  // Theme mode setting (light, dark, or system)
  themeMode: ThemeMode;
  // Toggle between light and dark
  toggleTheme: () => void;
  // Set specific theme mode
  setThemeMode: (mode: ThemeMode) => void;
  // Check if using dark mode
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "app_theme_mode";

/**
 * Storage utilities - SecureStore for mobile, localStorage for web
 */
const storage = {
  async getItem(key: string): Promise<string | null> {
    try {
      if (Platform.OS === "web") {
        return localStorage.getItem(key);
      }
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.warn("Failed to get storage item:", error);
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === "web") {
        localStorage.setItem(key, value);
      } else {
        await SecureStore.setItemAsync(key, value);
      }
    } catch (error) {
      console.warn("Failed to set storage item:", error);
    }
  },
};

interface ThemeProviderProps {
  children: ReactNode;
  /**
   * Default theme mode to use
   * @default "system"
   */
  defaultMode?: ThemeMode;
  /**
   * Custom light theme (overrides default)
   */
  customLightTheme?: MD3Theme;
  /**
   * Custom dark theme (overrides default)
   */
  customDarkTheme?: MD3Theme;
}

export function ThemeProvider({
  children,
  defaultMode = "system",
  customLightTheme,
  customDarkTheme,
}: ThemeProviderProps) {
  const systemColorScheme = useSystemColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>(defaultMode);
  const [isLoading, setIsLoading] = useState(true);

  // Determine actual color scheme based on mode
  const colorScheme: ColorScheme =
    themeMode === "system" ? systemColorScheme || "light" : themeMode;

  const isDark = colorScheme === "dark";

  // Select appropriate theme
  const activeTheme = isDark
    ? customDarkTheme || darkTheme
    : customLightTheme || lightTheme;

  // Load saved theme preference on mount
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Save theme preference when it changes
  useEffect(() => {
    if (!isLoading) {
      saveThemePreference(themeMode);
    }
  }, [themeMode, isLoading]);

  const loadThemePreference = async () => {
    try {
      const savedMode = await storage.getItem(THEME_STORAGE_KEY);
      if (savedMode && isValidThemeMode(savedMode)) {
        setThemeModeState(savedMode as ThemeMode);
      }
    } catch (error) {
      console.warn("Failed to load theme preference:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveThemePreference = async (mode: ThemeMode) => {
    try {
      await storage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.warn("Failed to save theme preference:", error);
    }
  };

  const isValidThemeMode = (mode: string): boolean => {
    return ["light", "dark", "system"].includes(mode);
  };

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
  };

  const toggleTheme = () => {
    if (themeMode === "system") {
      // If currently on system, toggle to opposite of current system setting
      setThemeModeState(systemColorScheme === "dark" ? "light" : "dark");
    } else {
      // Toggle between light and dark
      setThemeModeState(themeMode === "dark" ? "light" : "dark");
    }
  };

  const value: ThemeContextType = {
    theme: activeTheme,
    colorScheme,
    themeMode,
    toggleTheme,
    setThemeMode,
    isDark,
  };

  // Don't render children until theme is loaded
  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 * @throws Error if used outside ThemeProvider
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

/**
 * Hook to get current Paper theme
 */
export function usePaperTheme(): MD3Theme {
  const { theme } = useTheme();
  return theme;
}

/**
 * Hook to get current color scheme
 */
export function useColorScheme(): ColorScheme {
  const { colorScheme } = useTheme();
  return colorScheme;
}

/**
 * Hook to check if dark mode is active
 */
export function useIsDarkMode(): boolean {
  const { isDark } = useTheme();
  return isDark;
}
