/**
 * User Menu Modal Component
 * Custom menu implementation for better Android compatibility
 * Alternative to react-native-paper Menu component
 */

import React from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Divider, List, Surface } from "react-native-paper";

import { ThemedText } from "@/components/themed-text";
import { usePaperTheme } from "@/hooks/use-theme-color";

export interface UserMenuModalProps {
  /**
   * Whether the menu is visible
   */
  visible: boolean;
  /**
   * Callback when menu is dismissed
   */
  onDismiss: () => void;
  /**
   * User email to display
   */
  userEmail: string;
  /**
   * Callback when sign out is pressed
   */
  onSignOut: () => void;
}

/**
 * Custom User Menu Modal
 * More reliable than Paper Menu on Android
 */
export function UserMenuModal({
  visible,
  onDismiss,
  userEmail,
  onSignOut,
}: UserMenuModalProps) {
  const theme = usePaperTheme();

  const handleSignOut = () => {
    console.log("[UserMenuModal] Sign out pressed");
    onSignOut();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
      statusBarTranslucent
    >
      <Pressable style={styles.overlay} onPress={onDismiss}>
        <View style={styles.menuPositioner}>
          <Surface
            style={[
              styles.menu,
              {
                backgroundColor: theme.colors.surface,
                ...Platform.select({
                  android: {
                    elevation: 8,
                  },
                  ios: {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                  },
                  web: {
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  },
                }),
              },
            ]}
          >
            {/* User Email (disabled/non-clickable) */}
            <View style={styles.userInfoContainer}>
              <List.Icon icon="account-circle" color={theme.colors.primary} />
              <ThemedText
                numberOfLines={1}
                style={[styles.userEmail, { color: theme.colors.onSurface }]}
              >
                {userEmail}
              </ThemedText>
            </View>

            <Divider />

            {/* Sign Out Button */}
            <TouchableOpacity
              onPress={handleSignOut}
              style={styles.menuItem}
              activeOpacity={0.7}
            >
              <List.Icon icon="logout" color={theme.colors.error} />
              <ThemedText style={{ color: theme.colors.error }}>
                Sign Out
              </ThemedText>
            </TouchableOpacity>
          </Surface>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  menuPositioner: {
    position: "absolute",
    top: Platform.OS === "android" ? 60 : 50,
    right: 16,
  },
  menu: {
    minWidth: 220,
    borderRadius: 12,
    overflow: "hidden",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  userEmail: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
});
