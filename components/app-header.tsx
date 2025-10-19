/**
 * App Header Component
 * Reusable header with logo, theme toggle, auth navigation, and GitHub link
 */

import { FontAwesome } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import {
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Menu } from "react-native-paper";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { UserMenuModal } from "@/components/user-menu-modal";
import { useAuth } from "@/contexts/auth-context";
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
  /**
   * Show authentication navigation
   * @default true
   */
  showAuth?: boolean;
}

export function AppHeader({
  projectName = "Project Template",
  githubUrl = "https://github.com/kingslytshepiso/utilities",
  showGithub = true,
  showAuth = true,
}: AppHeaderProps) {
  const theme = usePaperTheme();
  const { isDark, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [userMenuVisible, setUserMenuVisible] = React.useState(false);

  const handleThemeToggle = async () => {
    if (supportsHaptics()) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    toggleTheme();
  };

  const handleGithubPress = () => {
    Linking.openURL(githubUrl);
  };

  const handleLoginPress = () => {
    router.push("/auth/login");
  };

  const handleSignUpPress = () => {
    router.push("/auth/signup");
  };

  const handleSignOut = async () => {
    console.log("[AppHeader] Sign out initiated");
    setUserMenuVisible(false);
    await signOut();
  };

  const closeUserMenu = () => {
    console.log("[AppHeader] Closing user menu");
    setUserMenuVisible(false);
  };

  // Debug effect to track menu state changes
  React.useEffect(() => {
    console.log("[AppHeader] Menu visibility changed to:", userMenuVisible);
  }, [userMenuVisible]);

  return (
    <View
      style={[
        styles.container,
        gutters.paddingHorizontal.md,
        gutters.paddingVertical.sm,
        {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.outlineVariant,
        },
      ]}
    >
      {/* Logo / Brand */}
      <View style={[layout.flexRow, layout.itemsCenter, gutters.gap.sm]}>
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={[layout.flexRow, layout.itemsCenter, gutters.gap.sm]}
          activeOpacity={0.7}
        >
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
        </TouchableOpacity>

        {/* About link on web */}
        {Platform.OS === "web" && (
          <TouchableOpacity
            onPress={() => router.push("/about")}
            style={styles.navLink}
            activeOpacity={0.7}
          >
            <ThemedText style={{ color: theme.colors.onSurface, fontSize: 14 }}>
              About
            </ThemedText>
          </TouchableOpacity>
        )}
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

        {/* Auth Navigation */}
        {showAuth && (
          <>
            {user ? (
              <>
                {/* Use custom modal on Android, Paper Menu on other platforms */}
                {Platform.OS === "android" ? (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        console.log(
                          "[AppHeader] Avatar pressed (Android), current state:",
                          userMenuVisible
                        );
                        setUserMenuVisible((prev) => {
                          console.log(
                            "[AppHeader] State change:",
                            prev,
                            "->",
                            !prev
                          );
                          return !prev;
                        });
                      }}
                      style={styles.userButton}
                      accessibilityLabel="User menu"
                      activeOpacity={0.7}
                    >
                      <View
                        style={[
                          styles.avatar,
                          { backgroundColor: theme.colors.primary },
                        ]}
                      >
                        <ThemedText
                          style={[
                            styles.avatarText,
                            { color: theme.colors.onPrimary },
                          ]}
                        >
                          {user.email?.charAt(0).toUpperCase() || "U"}
                        </ThemedText>
                      </View>
                    </TouchableOpacity>

                    <UserMenuModal
                      visible={userMenuVisible}
                      onDismiss={() => {
                        console.log(
                          "[AppHeader] Custom menu dismissed (Android)"
                        );
                        closeUserMenu();
                      }}
                      userEmail={user.email || "User"}
                      onSignOut={handleSignOut}
                    />
                  </>
                ) : (
                  <Menu
                    visible={userMenuVisible}
                    onDismiss={() => {
                      console.log("[AppHeader] Menu dismissed (Web/iOS)");
                      closeUserMenu();
                    }}
                    anchor={
                      <TouchableOpacity
                        onPress={() => {
                          console.log(
                            "[AppHeader] Avatar pressed (Web/iOS), current state:",
                            userMenuVisible
                          );
                          setUserMenuVisible((prev) => {
                            console.log(
                              "[AppHeader] State change:",
                              prev,
                              "->",
                              !prev
                            );
                            return !prev;
                          });
                        }}
                        style={styles.userButton}
                        accessibilityLabel="User menu"
                        activeOpacity={0.7}
                      >
                        <View
                          style={[
                            styles.avatar,
                            { backgroundColor: theme.colors.primary },
                          ]}
                        >
                          <ThemedText
                            style={[
                              styles.avatarText,
                              { color: theme.colors.onPrimary },
                            ]}
                          >
                            {user.email?.charAt(0).toUpperCase() || "U"}
                          </ThemedText>
                        </View>
                      </TouchableOpacity>
                    }
                    contentStyle={styles.menuContent}
                  >
                    <Menu.Item
                      leadingIcon="account-circle"
                      title={user.email || "User"}
                      disabled
                      style={styles.menuItemDisabled}
                    />
                    <Menu.Item
                      leadingIcon="logout"
                      onPress={() => {
                        console.log("[AppHeader] Logout menu item pressed");
                        handleSignOut();
                      }}
                      title="Sign Out"
                    />
                  </Menu>
                )}
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={handleLoginPress}
                  style={styles.authButton}
                  accessibilityLabel="Login"
                >
                  <ThemedText
                    style={{ color: theme.colors.primary, fontSize: 14 }}
                  >
                    Login
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSignUpPress}
                  style={[
                    styles.authButton,
                    styles.signUpButton,
                    { backgroundColor: theme.colors.primary },
                  ]}
                  accessibilityLabel="Sign Up"
                >
                  <ThemedText
                    style={{ color: theme.colors.onPrimary, fontSize: 14 }}
                  >
                    Sign Up
                  </ThemedText>
                </TouchableOpacity>
              </>
            )}
          </>
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
  navLink: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
  authButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  signUpButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  userButton: {
    padding: 4,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "600",
  },
  menuContent: {
    marginTop: Platform.OS === "android" ? 8 : 0,
    minWidth: 200,
  },
  menuItemDisabled: {
    opacity: 0.6,
  },
});
