import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/app-header";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { GradientBackground } from "@/components/gradient-background";
import { BottomNav } from "@/components/navigation";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider, useTheme } from "@/contexts/theme-context";

export const unstable_settings = {
  initialRouteName: "index",
};

function RootNavigator() {
  const { theme, isDark } = useTheme();
  const navigationTheme = isDark ? DarkTheme : DefaultTheme;
  const pathname = usePathname();

  // Check if we should show header and bottom nav
  const isAuthPage = pathname?.startsWith("/auth");
  const isModalPage = pathname?.startsWith("/modal");
  const shouldShowNavigation = !isAuthPage && !isModalPage;

  return (
    <PaperProvider theme={theme}>
      <NavigationThemeProvider value={navigationTheme}>
        <ProtectedRoute>
          <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
            <GradientBackground>
              {/* App Header - hide on auth and modal pages */}
              {shouldShowNavigation && (
                <AppHeader projectName="Starter Template" showGithub showAuth />
              )}

              {/* Main Content */}
              <View style={styles.content}>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="index" />
                  <Stack.Screen name="about" />
                  <Stack.Screen
                    name="modal"
                    options={{
                      presentation: "modal",
                      title: "Example Modal",
                      headerShown: true,
                    }}
                  />
                  <Stack.Screen name="auth" />
                </Stack>
              </View>

              {/* Bottom Navigation - hide on auth and modal pages */}
              {shouldShowNavigation && (
                <BottomNav
                  items={[
                    {
                      path: "/",
                      icon: "house",
                      activeIcon: "house.fill",
                      label: "Home",
                    },
                    {
                      path: "/about",
                      icon: "info.circle",
                      activeIcon: "info.circle.fill",
                      label: "About",
                    },
                  ]}
                />
              )}
            </GradientBackground>
          </SafeAreaView>
        </ProtectedRoute>
        <StatusBar style={isDark ? "light" : "dark"} translucent={false} />
      </NavigationThemeProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
