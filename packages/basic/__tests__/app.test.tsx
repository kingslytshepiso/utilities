import { render, screen } from "@utilities/shared-testing";
import React from "react";
import RootLayout from "../app/_layout";

// Mock the Slot component
jest.mock("expo-router", () => ({
  ...jest.requireActual("expo-router"),
  Slot: ({ children }: { children: React.ReactNode }) => children,
}));

describe("Basic Template", () => {
  it("should render without crashing", () => {
    render(<RootLayout />);

    // Should render the basic template structure
    expect(screen.getByText("Basic Template")).toBeTruthy();
  });

  it("should show navigation elements", () => {
    render(<RootLayout />);

    // Should show bottom navigation
    expect(screen.getByTestId("bottom-nav")).toBeTruthy();
  });

  it("should not show auth elements", () => {
    render(<RootLayout />);

    // Should not show auth menu since this is basic template
    expect(screen.queryByTestId("auth-menu")).toBeNull();
  });
});

