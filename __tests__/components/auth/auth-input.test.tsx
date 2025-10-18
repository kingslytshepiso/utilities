/**
 * AuthInput Component Tests
 * Tests for responsive authentication input component
 */

import { AuthInput } from "@/components/auth/auth-input";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider>{children}</PaperProvider>
);

describe("AuthInput", () => {
  const defaultProps = {
    label: "Email",
    value: "",
    onChangeText: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render with label", () => {
      const { getByText } = render(<AuthInput {...defaultProps} />, {
        wrapper,
      });
      expect(getByText("Email")).toBeTruthy();
    });

    it("should render with placeholder", () => {
      const { getByPlaceholderText } = render(
        <AuthInput {...defaultProps} placeholder="Enter email" />,
        { wrapper }
      );
      expect(getByPlaceholderText("Enter email")).toBeTruthy();
    });

    it("should render with left icon", () => {
      const { getByTestId } = render(
        <AuthInput
          {...defaultProps}
          leftIcon="email-outline"
          testID="email-input"
        />,
        { wrapper }
      );
      expect(getByTestId("email-input")).toBeTruthy();
    });

    it("should render error message when error prop is provided", () => {
      const { getByText } = render(
        <AuthInput {...defaultProps} error="Email is required" />,
        { wrapper }
      );
      expect(getByText("Email is required")).toBeTruthy();
    });
  });

  describe("secure text entry", () => {
    it("should hide password by default when secureTextEntry is true", () => {
      const { getByTestId } = render(
        <AuthInput
          {...defaultProps}
          label="Password"
          secureTextEntry
          testID="password-input"
        />,
        { wrapper }
      );

      const input = getByTestId("password-input");
      expect(input.props.secureTextEntry).toBe(true);
    });

    it("should toggle password visibility when eye icon is pressed", () => {
      const { getByTestId, UNSAFE_getByProps } = render(
        <AuthInput
          {...defaultProps}
          label="Password"
          secureTextEntry
          testID="password-input"
        />,
        { wrapper }
      );

      // Find and press the eye icon
      const eyeIcon = UNSAFE_getByProps({ icon: "eye" });
      fireEvent.press(eyeIcon);

      // Password should now be visible
      const input = getByTestId("password-input");
      expect(input.props.secureTextEntry).toBe(false);
    });
  });

  describe("user interaction", () => {
    it("should call onChangeText when text changes", () => {
      const onChangeText = jest.fn();
      const { getByTestId } = render(
        <AuthInput
          {...defaultProps}
          onChangeText={onChangeText}
          testID="input"
        />,
        { wrapper }
      );

      const input = getByTestId("input");
      fireEvent.changeText(input, "test@example.com");

      expect(onChangeText).toHaveBeenCalledWith("test@example.com");
    });

    it("should call onSubmitEditing when submit is pressed", () => {
      const onSubmitEditing = jest.fn();
      const { getByTestId } = render(
        <AuthInput
          {...defaultProps}
          onSubmitEditing={onSubmitEditing}
          testID="input"
        />,
        { wrapper }
      );

      const input = getByTestId("input");
      fireEvent(input, "submitEditing");

      expect(onSubmitEditing).toHaveBeenCalled();
    });

    it("should not allow input when disabled", () => {
      const { getByTestId } = render(
        <AuthInput {...defaultProps} disabled testID="input" />,
        { wrapper }
      );

      const input = getByTestId("input");
      expect(input.props.editable).toBe(false);
    });
  });

  describe("keyboard configuration", () => {
    it("should use email keyboard type for email inputs", () => {
      const { getByTestId } = render(
        <AuthInput
          {...defaultProps}
          keyboardType="email-address"
          testID="email-input"
        />,
        { wrapper }
      );

      const input = getByTestId("email-input");
      expect(input.props.keyboardType).toBe("email-address");
    });

    it("should use correct return key type", () => {
      const { getByTestId } = render(
        <AuthInput {...defaultProps} returnKeyType="next" testID="input" />,
        { wrapper }
      );

      const input = getByTestId("input");
      expect(input.props.returnKeyType).toBe("next");
    });
  });

  describe("autocomplete", () => {
    it("should set autocomplete for email", () => {
      const { getByTestId } = render(
        <AuthInput {...defaultProps} autoComplete="email" testID="input" />,
        { wrapper }
      );

      const input = getByTestId("input");
      expect(input.props.autoComplete).toBe("email");
    });

    it("should set autocomplete for password", () => {
      const { getByTestId } = render(
        <AuthInput {...defaultProps} autoComplete="password" testID="input" />,
        { wrapper }
      );

      const input = getByTestId("input");
      expect(input.props.autoComplete).toBe("password");
    });
  });
});
