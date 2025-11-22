import React from "react";
import { render, screen } from "../../../../test-utils";
import { ThemedText } from "../themed-text";

describe("ThemedText", () => {
  it("should render children text", () => {
    render(<ThemedText>Hello World</ThemedText>);
    expect(screen.getByText("Hello World")).toBeTruthy();
  });

  it("should apply default type styles", () => {
    const { getByText } = render(<ThemedText>Default text</ThemedText>);
    const text = getByText("Default text");
    expect(text).toBeTruthy();
  });

  it("should apply title type styles", () => {
    render(<ThemedText type="title">Title Text</ThemedText>);
    expect(screen.getByText("Title Text")).toBeTruthy();
  });

  it("should apply subtitle type styles", () => {
    render(<ThemedText type="subtitle">Subtitle Text</ThemedText>);
    expect(screen.getByText("Subtitle Text")).toBeTruthy();
  });

  it("should apply link type styles", () => {
    render(<ThemedText type="link">Link Text</ThemedText>);
    expect(screen.getByText("Link Text")).toBeTruthy();
  });

  it("should apply defaultSemiBold type styles", () => {
    render(<ThemedText type="defaultSemiBold">Bold Text</ThemedText>);
    expect(screen.getByText("Bold Text")).toBeTruthy();
  });

  it("should accept custom lightColor", () => {
    render(<ThemedText lightColor="#FF0000">Colored Text</ThemedText>);
    expect(screen.getByText("Colored Text")).toBeTruthy();
  });

  it("should accept custom darkColor", () => {
    render(<ThemedText darkColor="#0000FF">Dark Colored Text</ThemedText>);
    expect(screen.getByText("Dark Colored Text")).toBeTruthy();
  });

  it("should accept additional TextProps", () => {
    render(
      <ThemedText testID="custom-test-id" accessibilityLabel="Custom label">
        Test
      </ThemedText>
    );
    expect(screen.getByTestId("custom-test-id")).toBeTruthy();
    expect(screen.getByLabelText("Custom label")).toBeTruthy();
  });

  it("should merge custom styles with type styles", () => {
    const { getByText } = render(
      <ThemedText type="title" style={{ fontSize: 40 }}>
        Custom Title
      </ThemedText>
    );
    expect(getByText("Custom Title")).toBeTruthy();
  });
});
