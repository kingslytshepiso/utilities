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

import { ThemeProvider, useTheme } from "../theme-context";
import { render, screen } from "../../../../test-utils";
import React from "react";
import { Pressable, Text, View } from "react-native";

const TestComponent = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <View>
      <Text testID="theme-mode">{isDark ? "dark" : "light"}</Text>
      <Text testID="primary-color">{theme.colors.primary}</Text>
      <Pressable testID="toggle-button" onPress={toggleTheme}>
        <Text>Toggle Theme</Text>
      </Pressable>
    </View>
  );
};

describe("ThemeProvider", () => {

  it("should provide light theme by default", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme-mode")).toHaveTextContent("light");
    expect(screen.getByTestId("primary-color")).toHaveTextContent("#6200ee");
  });

  it("should toggle theme when button is pressed", async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId("toggle-button");
    await toggleButton.press();

    expect(screen.getByTestId("theme-mode")).toHaveTextContent("dark");
  });

  it("should persist theme preference", async () => {
    const { unmount } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId("toggle-button");
    await toggleButton.press();

    expect(screen.getByTestId("theme-mode")).toHaveTextContent("dark");

    unmount();

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme-mode")).toHaveTextContent("dark");
  });
});

