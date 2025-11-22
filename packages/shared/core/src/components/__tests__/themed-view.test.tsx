import React from "react";
import { Text } from "react-native";
import { render, screen } from "../../../../test-utils";
import { ThemedView } from "../themed-view";

describe("ThemedView", () => {
  it("should render children", () => {
    render(
      <ThemedView>
        <Text>Test Content</Text>
      </ThemedView>
    );
    expect(screen.getByText("Test Content")).toBeTruthy();
  });

  it("should accept custom lightColor", () => {
    render(
      <ThemedView lightColor="#FF0000" testID="themed-view">
        <Text>Content</Text>
      </ThemedView>
    );
    expect(screen.getByTestId("themed-view")).toBeTruthy();
  });

  it("should accept custom darkColor", () => {
    render(
      <ThemedView darkColor="#0000FF" testID="themed-view">
        <Text>Content</Text>
      </ThemedView>
    );
    expect(screen.getByTestId("themed-view")).toBeTruthy();
  });

  it("should accept additional ViewProps", () => {
    render(
      <ThemedView testID="custom-view" accessibilityLabel="Custom view">
        <Text>Test</Text>
      </ThemedView>
    );
    expect(screen.getByTestId("custom-view")).toBeTruthy();
    expect(screen.getByLabelText("Custom view")).toBeTruthy();
  });

  it("should merge custom styles", () => {
    render(
      <ThemedView style={{ padding: 10 }} testID="styled-view">
        <Text>Content</Text>
      </ThemedView>
    );
    expect(screen.getByTestId("styled-view")).toBeTruthy();
  });

  it("should render without children", () => {
    render(<ThemedView testID="empty-view" />);
    expect(screen.getByTestId("empty-view")).toBeTruthy();
  });
});
