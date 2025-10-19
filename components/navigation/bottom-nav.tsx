/**
 * Bottom Navigation Component
 * Mobile navigation bar (safe areas handled by parent layout)
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

  // Hide on web if specified
  if (hideOnWeb && Platform.OS === "web") {
    return null;
  }

  const handleNavPress = (path: string) => {
    if (pathname === path) return; // Already on this page

    if (path === "/") {
      router.replace("/");
    } else {
      router.push(path);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outlineVariant,
        },
      ]}
    >
      {items.map((item) => {
        const isActive = pathname === item.path;
        const iconName =
          isActive && item.activeIcon ? item.activeIcon : item.icon;

        return (
          <TouchableOpacity
            key={item.path}
            onPress={() => handleNavPress(item.path)}
            style={styles.navItem}
            activeOpacity={0.7}
            accessibilityLabel={item.label}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <IconSymbol
              name={iconName as any}
              size={24}
              color={
                isActive ? theme.colors.primary : theme.colors.onSurfaceVariant
              }
            />
            <ThemedText
              style={[
                styles.label,
                {
                  color: isActive
                    ? theme.colors.primary
                    : theme.colors.onSurfaceVariant,
                  fontWeight: isActive ? "600" : "400",
                },
              ]}
            >
              {item.label}
            </ThemedText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    paddingTop: 6,
    paddingBottom: 6,
    paddingHorizontal: 4,
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
    paddingVertical: 6,
    gap: 2,
  },
  label: {
    fontSize: 11,
    textAlign: "center",
  },
});
