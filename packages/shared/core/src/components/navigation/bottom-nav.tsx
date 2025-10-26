/**
 * Bottom Navigation Component
 * Modern mobile navigation bar with smooth animations
 * Safe areas handled by parent layout
 * Only shown on mobile platforms (Android/iOS)
 */

import { router, usePathname } from "expo-router";
import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { usePaperTheme } from "@/hooks/use-theme-color";

export interface BottomNavItem {
  /**
   * Route path (e.g., "/", "/about")
   */
  path: string;
  /**
   * Icon name from SF Symbols
   */
  icon: string;
  /**
   * Active icon (optional, defaults to same as icon)
   */
  activeIcon?: string;
  /**
   * Label text
   */
  label: string;
}

export interface BottomNavProps {
  /**
   * Navigation items to display
   */
  items: BottomNavItem[];
  /**
   * Hide on web
   * @default true
   */
  hideOnWeb?: boolean;
}

/**
 * Bottom Navigation Bar for Mobile
 */
export function BottomNav({ items, hideOnWeb = true }: BottomNavProps) {
  const theme = usePaperTheme();
  const pathname = usePathname();

  // Debug: Log pathname to console (remove in production)
  React.useEffect(() => {
    if (__DEV__) {
      console.log("[BottomNav] Current pathname:", pathname);
    }
  }, [pathname]);

  // Hide on web if specified
  if (hideOnWeb && Platform.OS === "web") {
    return null;
  }

  const handleNavPress = (path: string) => {
    if (pathname === path) return; // Already on this page

    if (path === "/") {
      router.replace("/");
    } else {
      router.push(path as any);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
            },
            android: {
              elevation: 8,
            },
            web: {
              boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
            },
          }),
        },
      ]}
    >
      {items.map((item) => {
        // Normalize paths for comparison (remove trailing slashes)
        const normalizedPathname = pathname?.replace(/\/$/, "") || "/";
        const normalizedItemPath = item.path.replace(/\/$/, "") || "/";
        const isActive = normalizedPathname === normalizedItemPath;

        // Always use the filled icon (activeIcon) for visual consistency
        // Active state is shown through background color, not icon style
        const iconName = item.activeIcon || item.icon;

        // Debug: Log active state (remove in production)
        if (__DEV__) {
          console.log(
            `[BottomNav] Item: ${item.path}, Active: ${isActive}, Pathname: ${normalizedPathname}, Icon: ${iconName}`
          );
        }

        return (
          <TouchableOpacity
            key={item.path}
            onPress={() => handleNavPress(item.path)}
            style={styles.navItem}
            activeOpacity={0.6}
            accessibilityLabel={item.label}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <View
              style={[
                styles.navItemContent,
                isActive && [
                  {
                    backgroundColor: theme.colors.primaryContainer,
                  },
                  Platform.select({
                    ios: {
                      shadowColor: theme.colors.primary,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.15,
                      shadowRadius: 4,
                    },
                    android: {
                      elevation: 2,
                    },
                  }),
                ],
              ]}
            >
              <View style={styles.iconWrapper}>
                <IconSymbol
                  name={iconName as any}
                  size={26}
                  color={
                    isActive
                      ? theme.colors.primary
                      : theme.colors.onSurfaceVariant
                  }
                  weight="regular"
                />
              </View>
              <ThemedText
                style={[
                  styles.label,
                  {
                    color: isActive
                      ? theme.colors.primary
                      : theme.colors.onSurfaceVariant,
                    fontWeight: isActive ? "600" : "500",
                  },
                ]}
              >
                {item.label}
              </ThemedText>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: Platform.select({ ios: 12, android: 10, default: 10 }),
    paddingBottom: Platform.select({ ios: 8, android: 10, default: 10 }),
    paddingHorizontal: 8,
    borderTopLeftRadius: Platform.select({ ios: 24, android: 20, default: 20 }),
    borderTopRightRadius: Platform.select({
      ios: 24,
      android: 20,
      default: 20,
    }),
    gap: 4,
    ...Platform.select({
      web: {
        position: "fixed" as any,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      },
    }),
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  navItemContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    minWidth: 64,
    gap: 4,
  },
  iconWrapper: {
    width: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    textAlign: "center",
    letterSpacing: 0.2,
  },
});
