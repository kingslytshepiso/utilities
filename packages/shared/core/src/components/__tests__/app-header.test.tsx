jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  return {
    FontAwesome: (props: any) => React.createElement("FontAwesome", props),
  };
});

jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: "light",
  },
}));

import React from "react";
import { fireEvent, render, screen } from "../../../../test-utils";
import { AppHeader } from "../app-header";

describe("AppHeader", () => {

  const defaultProps = {
    projectName: "Test App",
  };

  it("should render project name", () => {
    render(<AppHeader {...defaultProps} />);

    expect(screen.getByText("Test App")).toBeTruthy();
  });

  it("should show github link when showGithub is true", () => {
    render(<AppHeader {...defaultProps} showGithub />);

    expect(screen.getByTestId("github-link")).toBeTruthy();
  });

  it("should not show github link when showGithub is false", () => {
    render(<AppHeader {...defaultProps} showGithub={false} />);

    expect(screen.queryByTestId("github-link")).toBeNull();
  });

  it("should show auth menu when showAuth is true", () => {
    render(<AppHeader {...defaultProps} showAuth />);

    expect(screen.getByTestId("auth-menu")).toBeTruthy();
  });

  it("should not show auth menu when showAuth is false", () => {
    render(<AppHeader {...defaultProps} showAuth={false} />);

    expect(screen.queryByTestId("auth-menu")).toBeNull();
  });

  it("should handle github link press", async () => {
    const mockOpenURL = jest.fn();
    jest.doMock("expo-linking", () => ({
      openURL: mockOpenURL,
    }));

    render(<AppHeader {...defaultProps} showGithub />);

    const githubLink = screen.getByTestId("github-link");
    await fireEvent.press(githubLink);

    expect(mockOpenURL).toHaveBeenCalledWith(
      "https://github.com/kingslytshepiso/utilities"
    );
  });

  it("should handle auth menu press", async () => {
    render(<AppHeader {...defaultProps} showAuth />);

    const authMenu = screen.getByTestId("auth-menu");
    await fireEvent.press(authMenu);

    // Should show user menu or auth options
    expect(screen.getByTestId("user-menu")).toBeTruthy();
  });
});
