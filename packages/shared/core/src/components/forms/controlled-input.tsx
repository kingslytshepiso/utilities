/**
 * Controlled Input Component
 * React Hook Form controlled input with Material Design styling
 */

import { useAuthInputSize } from "@/hooks/use-responsive-auth";
import { gutters } from "@/utils";
import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";

export interface ControlledInputProps<T extends FieldValues>
  extends Omit<TextInputProps, "value" | "onChangeText" | "error"> {
  /**
   * React Hook Form control object
   */
  control: Control<T>;
  /**
   * Field name
   */
  name: FieldPath<T>;
  /**
   * Input label
   */
  label: string;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Show password toggle (for password inputs)
   */
  secureTextEntry?: boolean;
  /**
   * Left icon
   */
  leftIcon?: string;
  /**
   * Test ID for testing
   */
  testID?: string;
  /**
   * Input mode
   * @default "outlined"
   */
  mode?: "flat" | "outlined";
}

/**
 * Controlled Input Component for React Hook Form
 */
export function ControlledInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  secureTextEntry = false,
  leftIcon,
  testID,
  mode = "outlined",
  ...textInputProps
}: ControlledInputProps<T>) {
  const inputSize = useAuthInputSize();
  const [showPassword, setShowPassword] = React.useState(false);

  // Calculate input height based on size
  const inputHeight = {
    small: 48,
    medium: 56,
    large: 64,
  }[inputSize];

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={[gutters.marginBottom.sm]}>
          <TextInput
            label={label}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry && !showPassword}
            error={!!error}
            mode={mode}
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
            {...textInputProps}
          />
          {error && (
            <HelperText type="error" visible={!!error} padding="none">
              {error.message}
            </HelperText>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "transparent",
  },
});
