import React from "react";
import { Text } from "react-native";
import { render, screen } from "../../../../test-utils";
import { GradientBackground } from "../gradient-background";

describe("GradientBackground", () => {
  it("should render children", () => {
    render(
      <GradientBackground>
        <Text>Content</Text>
      </GradientBackground>
    );
    expect(screen.getByText("Content")).toBeTruthy();
  });

  it("should use primary variant by default", () => {
    render(
      <GradientBackground testID="gradient-bg">
        <Text>Content</Text>
      </GradientBackground>
    );
    expect(screen.getByTestId("gradient-bg")).toBeTruthy();
  });

  it("should accept accent variant", () => {
    render(
      <GradientBackground variant="accent" testID="gradient-bg">
        <Text>Content</Text>
      </GradientBackground>
    );
    expect(screen.getByTestId("gradient-bg")).toBeTruthy();
  });

  it("should accept custom variant", () => {
    render(
      <GradientBackground variant="custom" testID="gradient-bg">
        <Text>Content</Text>
      </GradientBackground>
    );
    expect(screen.getByTestId("gradient-bg")).toBeTruthy();
  });

  it("should accept custom colors", () => {
    const customColors = ["#FF0000", "#00FF00", "#0000FF"];
    render(
      <GradientBackground colors={customColors} testID="gradient-bg">
        <Text>Content</Text>
      </GradientBackground>
    );
    expect(screen.getByTestId("gradient-bg")).toBeTruthy();
  });

  it("should accept custom start and end points", () => {
    render(
      <GradientBackground
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        testID="gradient-bg"
      >
        <Text>Content</Text>
      </GradientBackground>
    );
    expect(screen.getByTestId("gradient-bg")).toBeTruthy();
  });

  it("should accept additional ViewProps", () => {
    render(
      <GradientBackground
        testID="custom-gradient"
        accessibilityLabel="Gradient background"
      >
        <Text>Content</Text>
      </GradientBackground>
    );
    expect(screen.getByTestId("custom-gradient")).toBeTruthy();
    expect(screen.getByLabelText("Gradient background")).toBeTruthy();
  });

  it("should merge custom styles", () => {
    render(
      <GradientBackground style={{ opacity: 0.9 }} testID="styled-gradient">
        <Text>Content</Text>
      </GradientBackground>
    );
    expect(screen.getByTestId("styled-gradient")).toBeTruthy();
  });
});

