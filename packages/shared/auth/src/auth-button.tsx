/**
 * Responsive Authentication Button Component
 * Platform and screen-size aware button for auth actions
 */

import { useAuthInputSize, gutters } from "@utilities/shared-core";
import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

/**
 * Auth Button Props
 */
interface AuthButtonProps {
  children: string;
  onPress: () => void;
  mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  fullWidth?: boolean;
  testID?: string;
}

/**
 * Responsive Authentication Button
 */
export function AuthButton({
  children,
  onPress,
  mode = "contained",
  loading = false,
  disabled = false,
  icon,
  fullWidth = true,
  testID,
}: AuthButtonProps) {
  const inputSize = useAuthInputSize();

  // Calculate button height based on size
  const buttonHeight = {
    small: 44,
    medium: 48,
    large: 56,
  }[inputSize];

  // Calculate font size based on size
  const fontSize = {
    small: 14,
    medium: 16,
    large: 18,
  }[inputSize];

  return (
    <Button
      mode={mode}
      onPress={onPress}
      loading={loading}
      disabled={disabled || loading}
      icon={icon}
      contentStyle={[styles.buttonContent, { height: buttonHeight }]}
      labelStyle={[styles.buttonLabel, { fontSize }]}
      style={[gutters.marginBottom.sm, fullWidth && styles.fullWidth]}
      testID={testID}
    >
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({
  buttonContent: {
    paddingHorizontal: 16,
  },
  buttonLabel: {
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  fullWidth: {
    width: "100%",
  },
});
