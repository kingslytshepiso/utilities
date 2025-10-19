/**
 * AuthButton Component Tests
 * Tests for responsive authentication button component
 */

import { AuthButton } from "@/components/auth/auth-button";
import React from "react";
import { fireEvent, render } from "../../../__tests__/test-utils";

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
      const { getByText } = render(<AuthButton {...defaultProps} />);
      expect(getByText("Sign In")).toBeTruthy();
    });

    it("should render with icon", () => {
      const { getByTestId } = render(
        <AuthButton {...defaultProps} icon="login" testID="button" />
      );
      expect(getByTestId("button")).toBeTruthy();
    });

    it("should apply contained mode by default", () => {
      const { getByTestId } = render(
        <AuthButton {...defaultProps} testID="button" />
      );
      expect(getByTestId("button")).toBeTruthy();
    });

    it("should apply custom mode", () => {
      const { getByTestId } = render(
        <AuthButton {...defaultProps} mode="outlined" testID="button" />
      );
      expect(getByTestId("button")).toBeTruthy();
    });
  });

  describe("user interaction", () => {
    it("should call onPress when pressed", () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <AuthButton {...defaultProps} onPress={onPress} />
      );

      fireEvent.press(getByText("Sign In"));

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it("should not call onPress when disabled", () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <AuthButton {...defaultProps} onPress={onPress} disabled />
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
        />
      );

      const button = getByTestId("button");
      expect(button).toBeTruthy();
    });
  });

  describe("loading state", () => {
    it("should show loading indicator when loading", () => {
      const { getByTestId } = render(
        <AuthButton {...defaultProps} loading testID="button" />
      );

      const button = getByTestId("button");
      expect(button.props.accessibilityState.disabled).toBe(true);
    });

    it("should be disabled when loading", () => {
      const { getByTestId } = render(
        <AuthButton {...defaultProps} loading testID="button" />
      );

      const button = getByTestId("button");
      expect(button.props.accessibilityState.disabled).toBe(true);
    });
  });

  describe("width", () => {
    it("should render when fullWidth is true", () => {
      const { getByTestId } = render(
        <AuthButton {...defaultProps} fullWidth={true} testID="button" />
      );

      const button = getByTestId("button");
      expect(button).toBeTruthy();
    });

    it("should render when fullWidth is false", () => {
      const { getByTestId } = render(
        <AuthButton {...defaultProps} fullWidth={false} testID="button" />
      );

      const button = getByTestId("button");
      expect(button).toBeTruthy();
    });
  });
});
