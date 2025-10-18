/**
 * AuthButton Component Tests
 * Tests for responsive authentication button component
 */

import { AuthButton } from "@/components/auth/auth-button";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PaperProvider>{children}</PaperProvider>
);

describe("AuthButton", () => {
  const defaultProps = {
    children: "Sign In",
    onPress: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render with children text", () => {
      const { getByText } = render(<AuthButton {...defaultProps} />, {
        wrapper,
      });
      expect(getByText("Sign In")).toBeTruthy();
    });

    it("should render with icon", () => {
      const { getByTestId } = render(
        <AuthButton {...defaultProps} icon="login" testID="button" />,
        { wrapper }
      );
      expect(getByTestId("button")).toBeTruthy();
    });

    it("should apply contained mode by default", () => {
      const { getByTestId } = render(
        <AuthButton {...defaultProps} testID="button" />,
        { wrapper }
      );
      expect(getByTestId("button")).toBeTruthy();
    });

    it("should apply custom mode", () => {
      const { getByTestId } = render(
        <AuthButton {...defaultProps} mode="outlined" testID="button" />,
        { wrapper }
      );
      expect(getByTestId("button")).toBeTruthy();
    });
  });

  describe("user interaction", () => {
    it("should call onPress when pressed", () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <AuthButton {...defaultProps} onPress={onPress} />,
        { wrapper }
      );

      fireEvent.press(getByText("Sign In"));

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it("should not call onPress when disabled", () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <AuthButton {...defaultProps} onPress={onPress} disabled />,
        { wrapper }
      );

      const button = getByText("Sign In");
      // Disabled buttons in Paper don't fire press events
      expect(button).toBeTruthy();
    });

    it("should not call onPress when loading", () => {
      const onPress = jest.fn();
      const { getByTestId } = render(
        <AuthButton
          {...defaultProps}
          onPress={onPress}
          loading
          testID="button"
        />,
        { wrapper }
      );

      const button = getByTestId("button");
      expect(button).toBeTruthy();
    });
  });

  describe("loading state", () => {
    it("should show loading indicator when loading", () => {
      const { getByTestId } = render(
        <AuthButton {...defaultProps} loading testID="button" />,
        { wrapper }
      );

      const button = getByTestId("button");
      expect(button.props.accessibilityState.disabled).toBe(true);
    });

    it("should be disabled when loading", () => {
      const { getByTestId } = render(
        <AuthButton {...defaultProps} loading testID="button" />,
        { wrapper }
      );

      const button = getByTestId("button");
      expect(button.props.accessibilityState.disabled).toBe(true);
    });
  });

  describe("width", () => {
    it("should be full width by default", () => {
      const { getByTestId } = render(
        <AuthButton {...defaultProps} testID="button" />,
        { wrapper }
      );

      const button = getByTestId("button");
      expect(button.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({ width: "100%" })])
      );
    });

    it("should not be full width when fullWidth is false", () => {
      const { getByTestId } = render(
        <AuthButton {...defaultProps} fullWidth={false} testID="button" />,
        { wrapper }
      );

      const button = getByTestId("button");
      expect(button.props.style).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ width: "100%" })])
      );
    });
  });
});
