/**
 * Test Utilities
 * Common test helpers, wrappers, and utilities
 */

import { render, RenderOptions } from "@testing-library/react-native";
import { lightTheme } from "@utilities/shared-core/constants/theme";
import React from "react";
import { PaperProvider } from "react-native-paper";

/**
 * Wrapper with all necessary providers for testing
 * ThemeProvider is mocked in jest.setup.js to avoid async issues
 */
export function AllTheProviders({ children }: { children: React.ReactNode }) {
  return <PaperProvider theme={lightTheme}>{children}</PaperProvider>;
}

/**
 * Custom render function that includes all providers
 */
export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

/**
 * Re-export everything from testing library
 */
export * from "@testing-library/react-native";

/**
 * Export the custom render as default
 */
export { renderWithProviders as render };
