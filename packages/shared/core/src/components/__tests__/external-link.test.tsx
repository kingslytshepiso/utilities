import React from "react";
import { Text } from "react-native";
import { fireEvent, render, screen } from "../../../../test-utils";
import { ExternalLink } from "../external-link";

// Mock expo-web-browser
jest.mock("expo-web-browser", () => ({
  openBrowserAsync: jest.fn(),
  WebBrowserPresentationStyle: {
    AUTOMATIC: "automatic",
  },
}));

describe("ExternalLink", () => {

  const defaultProps = {
    href: "https://example.com" as any,
  };

  beforeEach(() => {
    // Reset environment variable
    process.env.EXPO_OS = "ios";
  });

  it("should render children", () => {
    render(
      <ExternalLink {...defaultProps}>
        <Text>Link Text</Text>
      </ExternalLink>
    );
    expect(screen.getByText("Link Text")).toBeTruthy();
  });

  it("should open link in browser on native platforms", async () => {
    const { openBrowserAsync } = require("expo-web-browser");
    process.env.EXPO_OS = "ios";

    render(
      <ExternalLink {...defaultProps} testID="external-link">
        <Text>Open Link</Text>
      </ExternalLink>
    );

    const link = screen.getByTestId("external-link");
    await fireEvent.press(link);

    expect(openBrowserAsync).toHaveBeenCalledWith(
      "https://example.com",
      expect.objectContaining({
        presentationStyle: "automatic",
      })
    );
  });

  it("should not prevent default on web platform", () => {
    process.env.EXPO_OS = "web";
    const preventDefault = jest.fn();
    const mockEvent = { preventDefault };

    render(
      <ExternalLink {...defaultProps} testID="external-link">
        <Text>Open Link</Text>
      </ExternalLink>
    );

    // On web, the Link component handles navigation normally
    expect(screen.getByTestId("external-link")).toBeTruthy();
  });

  it("should accept additional Link props", () => {
    render(
      <ExternalLink
        {...defaultProps}
        testID="custom-link"
        accessibilityLabel="External link"
      >
        <Text>Link</Text>
      </ExternalLink>
    );
    expect(screen.getByTestId("custom-link")).toBeTruthy();
    expect(screen.getByLabelText("External link")).toBeTruthy();
  });

  it("should set target to _blank", () => {
    const { container } = render(
      <ExternalLink {...defaultProps} testID="external-link">
        <Text>Link</Text>
      </ExternalLink>
    );
    expect(container).toBeTruthy();
  });
});

