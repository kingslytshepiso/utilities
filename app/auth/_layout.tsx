/**
 * Auth Layout
 * Layout wrapper for authentication screens
 */

import { GradientBackground } from "@/components/gradient-background";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <GradientBackground>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="forgot-password" />
      </Stack>
    </GradientBackground>
  );
}
