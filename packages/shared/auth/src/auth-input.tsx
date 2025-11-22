/**
 * Responsive Authentication Input Component
 * Platform and screen-size aware input field for auth forms
 */

import { useAuthInputSize, gutters } from "@utilities/shared-core";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

/**
 * Auth Input Props
 */
interface AuthInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoComplete?: "email" | "password" | "name" | "username" | "off";
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  error?: string;
  disabled?: boolean;
  leftIcon?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  onSubmitEditing?: () => void;
  returnKeyType?: "done" | "go" | "next" | "search" | "send";
  testID?: string;
}

/**
 * Responsive Authentication Input
 */
export function AuthInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  autoComplete,
  keyboardType = "default",
  error,
  disabled = false,
  leftIcon,
  autoCapitalize = "none",
  onSubmitEditing,
  returnKeyType = "next",
  testID,
}: AuthInputProps) {
  const inputSize = useAuthInputSize();
  const [showPassword, setShowPassword] = useState(false);

  // Calculate input height based on size
  const inputHeight = {
    small: 48,
    medium: 56,
    large: 64,
  }[inputSize];

  return (
    <View style={[gutters.marginBottom.sm]}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry && !showPassword}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        disabled={disabled}
        error={!!error}
        mode="outlined"
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
        testID={testID}
        style={[styles.input, { height: inputHeight }]}
        left={leftIcon ? <TextInput.Icon icon={leftIcon} /> : undefined}
        right={
          secureTextEntry ? (
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          ) : undefined
        }
      />
      {error && (
        <HelperText type="error" visible={!!error} padding="none">
          {error}
        </HelperText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "transparent",
  },
});
