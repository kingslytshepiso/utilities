import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider, useTheme } from "@/contexts/theme-context";

export const unstable_settings = {
  initialRouteName: "index",
};

function RootNavigator() {
  const { theme, isDark } = useTheme();
  const navigationTheme = isDark ? DarkTheme : DefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationThemeProvider value={navigationTheme}>
        <ProtectedRoute>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="about" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{
                presentation: "modal",
                title: "Example Modal",
                headerShown: true,
              }}
            />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
          </Stack>
        </ProtectedRoute>
        <StatusBar style={isDark ? "light" : "dark"} />
      </NavigationThemeProvider>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
