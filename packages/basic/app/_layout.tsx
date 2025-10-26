import { Slot, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  AppHeader,
  BottomNav,
  GradientBackground,
  ThemeProvider,
  useTheme,
} from "@utilities/shared-core";

export const unstable_settings = {
  initialRouteName: "index",
};

function RootNavigator() {
  const { theme, isDark } = useTheme();
  const pathname = usePathname();

  // Check if we should show header and bottom nav
  const isModalPage = pathname?.startsWith("/modal");
  const shouldShowNavigation = !isModalPage;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <GradientBackground style={styles.gradient}>
        {/* App Header */}
        {shouldShowNavigation && (
          <AppHeader projectName="Basic Template" showGithub showAuth={false} />
        )}

        {/* Main Content */}
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
      <StatusBar style={isDark ? "light" : "dark"} translucent={false} />
    </SafeAreaView>
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
