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

  switch (layout) {
    case "split":
      return "50%";
    case "wide":
      return 600;
    case "standard":
      return 480;
    case "compact":
      return "100%";
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
    compact: { padding: 16, gap: 12, logoSize: 48 },
    standard: { padding: 24, gap: 16, logoSize: 64 },
    wide: { padding: 32, gap: 20, logoSize: 72 },
    split: { padding: 40, gap: 24, logoSize: 80 },
  };

  return spacing[layout];
};
