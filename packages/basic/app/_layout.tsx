import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Slot, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/app-header";
import { GradientBackground } from "@/components/gradient-background";
import { BottomNav } from "@/components/navigation";
import { ThemeProvider, useTheme } from "@/contexts/theme-context";

export const unstable_settings = {
  initialRouteName: "index",
};

function RootNavigator() {
  const { theme, isDark } = useTheme();
  const navigationTheme = isDark ? DarkTheme : DefaultTheme;
  const pathname = usePathname();

  // Check if we should show header and bottom nav
  const isModalPage = pathname?.startsWith("/modal");
  const shouldShowNavigation = !isModalPage;

  return (
    <PaperProvider theme={theme}>
      <NavigationThemeProvider value={navigationTheme}>
        <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
          <GradientBackground style={styles.gradient}>
            {/* App Header */}
            {shouldShowNavigation && (
              <AppHeader
                projectName="Starter Template"
                showGithub
                showAuth={false}
              />
            )}

            {/* Main Content - Use Slot to render child routes */}
            <View style={styles.content}>
              <Slot />
            </View>

            {/* Bottom Navigation */}
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
        <StatusBar style={isDark ? "light" : "dark"} translucent={false} />
      </NavigationThemeProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}
