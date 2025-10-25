/**
 * Responsive Authentication Hooks
 * Hooks for responsive authentication UI
 */

import { breakpoints, deviceType } from "@/utils/responsive";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

/**
 * Authentication layout type based on screen size
 */
export type AuthLayoutType = "compact" | "standard" | "wide" | "split";

/**
 * Get authentication layout type based on screen size
 */
export const useAuthLayout = (): AuthLayoutType => {
  const [layout, setLayout] = useState<AuthLayoutType>("compact");

  useEffect(() => {
    const updateLayout = () => {
      const { width } = Dimensions.get("window");

      if (width >= breakpoints.xl) {
        setLayout("split"); // Two-column layout with image
      } else if (width >= breakpoints.lg) {
        setLayout("wide"); // Wide single column
      } else if (width >= breakpoints.md) {
        setLayout("standard"); // Standard form width
      } else {
        setLayout("compact"); // Full width on mobile
      }
    };

    updateLayout();
    const subscription = Dimensions.addEventListener("change", updateLayout);

    return () => {
      subscription?.remove();
    };
  }, []);

  return layout;
};

/**
 * Get form container width based on layout
 */
export const useAuthFormWidth = (): number | string => {
  const layout = useAuthLayout();
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    const updateWidth = () => {
      setWindowWidth(Dimensions.get("window").width);
    };

    const subscription = Dimensions.addEventListener("change", updateWidth);
    return () => subscription?.remove();
  }, []);

  switch (layout) {
    case "split":
      return "100%";
    case "wide":
      return Math.min(600, windowWidth - 64); // Account for scroll padding
    case "standard":
      return Math.min(480, windowWidth - 64);
    case "compact":
      return "100%"; // Let it use the full width of parent
    default:
      return "100%";
  }
};

/**
 * Check if device should show social auth buttons
 */
export const useShouldShowSocialAuth = (): boolean => {
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    // You can customize this logic based on your requirements
    // For example, hide on very small devices
    setShouldShow(!deviceType.isSmallDevice());
  }, []);

  return shouldShow;
};

/**
 * Get input size based on screen size
 */
export const useAuthInputSize = (): "small" | "medium" | "large" => {
  const layout = useAuthLayout();

  switch (layout) {
    case "split":
    case "wide":
      return "large";
    case "standard":
      return "medium";
    case "compact":
      return "medium";
    default:
      return "medium";
  }
};

/**
 * Get spacing values for auth screens
 */
export const useAuthSpacing = () => {
  const layout = useAuthLayout();

  const spacing = {
    compact: { padding: 20, gap: 16, logoSize: 48 },
    standard: { padding: 28, gap: 20, logoSize: 64 },
    wide: { padding: 36, gap: 24, logoSize: 72 },
    split: { padding: 44, gap: 28, logoSize: 80 },
  };

  return spacing[layout];
};
