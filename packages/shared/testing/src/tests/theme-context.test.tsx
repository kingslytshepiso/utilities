import { ThemeProvider, useTheme } from "@utilities/shared-core";
import { render, screen } from "@utilities/shared-testing";
import React from "react";

// Test component that uses the theme context
const TestComponent = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <div>
      <div data-testid="theme-mode">{isDark ? "dark" : "light"}</div>
      <div data-testid="primary-color">{theme.colors.primary}</div>
      <button data-testid="toggle-button" onPress={toggleTheme}>
        Toggle Theme
      </button>
    </div>
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

    // Re-render and check if theme is persisted
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme-mode")).toHaveTextContent("dark");
  });
});

