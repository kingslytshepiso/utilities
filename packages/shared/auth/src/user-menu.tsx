/**
 * User Menu Component
 * Displays user profile and auth actions in the header
 */

import { ThemedText, usePaperTheme, platform } from "@utilities/shared-core";
import { useAuth } from "./auth-context";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Divider, IconButton, Menu } from "react-native-paper";

/**
 * User Menu Props
 */
interface UserMenuProps {
  showLabel?: boolean;
}

/**
 * User Menu Component
 */
export function UserMenu({ showLabel = true }: UserMenuProps) {
  const theme = usePaperTheme();
  const { user, isAuthenticated, signOut } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <IconButton
        icon="login"
        onPress={() => router.push("/auth/login")}
        iconColor={theme.colors.primary}
      />
    );
  }

  const handleSignOut = async () => {
    setMenuVisible(false);
    try {
      await signOut();
      router.replace("/auth/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Menu
      visible={menuVisible}
      onDismiss={() => setMenuVisible(false)}
      anchor={
        <View style={styles.anchor}>
          {user.avatar ? (
            <Avatar.Image
              size={36}
              source={{ uri: user.avatar }}
              style={styles.avatar}
            />
          ) : (
            <Avatar.Text
              size={36}
              label={getInitials(user.name || user.email)}
              style={styles.avatar}
            />
          )}
          {showLabel && !platform.isWeb && (
            <IconButton
              icon={menuVisible ? "chevron-up" : "chevron-down"}
              size={16}
              onPress={() => setMenuVisible(true)}
              style={styles.chevron}
            />
          )}
        </View>
      }
      anchorPosition="bottom"
    >
      {/* User Info */}
      <View style={styles.userInfo}>
        <ThemedText type="defaultSemiBold">{user.name || "User"}</ThemedText>
        <ThemedText style={styles.email}>{user.email}</ThemedText>
      </View>

      <Divider />

      {/* Profile */}
      <Menu.Item
        leadingIcon="account"
        onPress={() => {
          setMenuVisible(false);
          router.push("/about");
        }}
        title="Profile"
      />

      {/* Settings */}
      <Menu.Item
        leadingIcon="cog"
        onPress={() => {
          setMenuVisible(false);
          router.push("/about");
        }}
        title="Settings"
      />

      <Divider />

      {/* Sign Out */}
      <Menu.Item
        leadingIcon="logout"
        onPress={handleSignOut}
        title="Sign Out"
      />
    </Menu>
  );
}

const styles = StyleSheet.create({
  anchor: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
  },
  avatar: {
    marginLeft: 8,
  },
  chevron: {
    margin: 0,
  },
  userInfo: {
    padding: 16,
  },
  email: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
});
