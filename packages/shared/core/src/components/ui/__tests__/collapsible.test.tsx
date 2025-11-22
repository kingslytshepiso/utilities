import React from "react";
import { Text } from "react-native";
import { fireEvent, render, screen } from "../../../../../test-utils";
import { Collapsible } from "../collapsible";

describe("Collapsible", () => {
  const defaultProps = {
    title: "Collapsible Title",
  };

  it("should render title", () => {
    render(
      <Collapsible {...defaultProps}>
        <Text>Content</Text>
      </Collapsible>
    );
    expect(screen.getByText("Collapsible Title")).toBeTruthy();
  });

  it("should not show content initially", () => {
    render(
      <Collapsible {...defaultProps}>
        <Text>Hidden Content</Text>
      </Collapsible>
    );
    expect(screen.queryByText("Hidden Content")).toBeNull();
  });

  it("should show content when expanded", async () => {
    render(
      <Collapsible {...defaultProps}>
        <Text>Expanded Content</Text>
      </Collapsible>
    );

    const title = screen.getByText("Collapsible Title");
    await fireEvent.press(title.parent!);

    expect(screen.getByText("Expanded Content")).toBeTruthy();
  });

  it("should hide content when collapsed after expansion", async () => {
    render(
      <Collapsible {...defaultProps}>
        <Text>Toggle Content</Text>
      </Collapsible>
    );

    const title = screen.getByText("Collapsible Title");
    const toggleButton = title.parent!;

    // Expand
    await fireEvent.press(toggleButton);
    expect(screen.getByText("Toggle Content")).toBeTruthy();

    // Collapse
    await fireEvent.press(toggleButton);
    expect(screen.queryByText("Toggle Content")).toBeNull();
  });

  it("should toggle multiple times", async () => {
    render(
      <Collapsible {...defaultProps}>
        <Text>Toggleable Content</Text>
      </Collapsible>
    );

    const title = screen.getByText("Collapsible Title");
    const toggleButton = title.parent!;

    // First toggle - expand
    await fireEvent.press(toggleButton);
    expect(screen.getByText("Toggleable Content")).toBeTruthy();

    // Second toggle - collapse
    await fireEvent.press(toggleButton);
    expect(screen.queryByText("Toggleable Content")).toBeNull();

    // Third toggle - expand again
    await fireEvent.press(toggleButton);
    expect(screen.getByText("Toggleable Content")).toBeTruthy();
  });

  it("should render with complex children", () => {
    render(
      <Collapsible {...defaultProps}>
        <Text>First Item</Text>
        <Text>Second Item</Text>
        <Text>Third Item</Text>
      </Collapsible>
    );
    expect(screen.getByText("Collapsible Title")).toBeTruthy();
  });
});

