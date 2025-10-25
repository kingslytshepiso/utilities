/**
 * Responsive Utilities
 * Helpers for responsive design and device-specific layouts
 */

import { Dimensions, Platform, PixelRatio } from "react-native";

/**
 * Get current device dimensions
 */
export const getDeviceDimensions = () => {
  return {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    screenWidth: Dimensions.get("screen").width,
    screenHeight: Dimensions.get("screen").height,
  };
};

/**
 * Breakpoints for responsive design
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
} as const;

/**
 * Device type detection
 */
export const deviceType = {
  isSmallDevice: () => {
    const { width } = getDeviceDimensions();
    return width < breakpoints.sm;
  },
  isTablet: () => {
    const { width } = getDeviceDimensions();
    return width >= breakpoints.md && width < breakpoints.lg;
  },
  isDesktop: () => {
    const { width } = getDeviceDimensions();
    return width >= breakpoints.lg;
  },
  isMobile: () => {
    const { width } = getDeviceDimensions();
    return width < breakpoints.md;
  },
};

/**
 * Responsive value selector based on screen width
 * @param values Object with breakpoint keys and values
 * @returns Value for current screen size
 * 
 * @example
 * const padding = responsive({ sm: 8, md: 16, lg: 24 });
 */
export function responsive<T>(values: {
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  default: T;
}): T {
  const { width } = getDeviceDimensions();

  if (width >= breakpoints.xl && values.xl !== undefined) return values.xl;
  if (width >= breakpoints.lg && values.lg !== undefined) return values.lg;
  if (width >= breakpoints.md && values.md !== undefined) return values.md;
  if (width >= breakpoints.sm && values.sm !== undefined) return values.sm;

  return values.default;
}

/**
 * Scale value based on device pixel ratio
 * Useful for making sizes consistent across different screen densities
 */
export const scale = (size: number): number => {
  return PixelRatio.roundToNearestPixel(size);
};

/**
 * Moderate scale - scales less aggressively than scale()
 * Good for fonts and paddings
 */
export const moderateScale = (size: number, factor: number = 0.5): number => {
  const { width } = getDeviceDimensions();
  const baseWidth = 375; // iPhone SE width as base
  const scaleFactor = width / baseWidth;
  return size + (scaleFactor - 1) * size * factor;
};

/**
 * Vertical scale based on screen height
 */
export const verticalScale = (size: number): number => {
  const { height } = getDeviceDimensions();
  const baseHeight = 812; // iPhone X height as base
  return (height / baseHeight) * size;
};

/**
 * Get responsive font size
 */
export const responsiveFontSize = (size: number): number => {
  return moderateScale(size, 0.3);
};

/**
 * Percentage-based width
 */
export const widthPercentage = (percentage: number): number => {
  const { width } = getDeviceDimensions();
  return (width * percentage) / 100;
};

/**
 * Percentage-based height
 */
export const heightPercentage = (percentage: number): number => {
  const { height } = getDeviceDimensions();
  return (height * percentage) / 100;
};

/**
 * Check if current screen matches a breakpoint
 */
export const matchesBreakpoint = (
  breakpoint: keyof typeof breakpoints
): boolean => {
  const { width } = getDeviceDimensions();
  return width >= breakpoints[breakpoint];
};

/**
 * Get orientation
 */
export const getOrientation = () => {
  const { width, height } = getDeviceDimensions();
  return width > height ? "landscape" : "portrait";
};

/**
 * Check if device is in landscape mode
 */
export const isLandscape = (): boolean => {
  return getOrientation() === "landscape";
};

/**
 * Check if device is in portrait mode
 */
export const isPortrait = (): boolean => {
  return getOrientation() === "portrait";
};

/**
 * Responsive grid columns calculator
 */
export const getGridColumns = (): number => {
  const { width } = getDeviceDimensions();
  
  if (width >= breakpoints.xl) return 4;
  if (width >= breakpoints.lg) return 3;
  if (width >= breakpoints.md) return 2;
  return 1;
};

/**
 * Hook-like helper for responsive values (can be used in components)
 * Note: For actual React hooks, use with useState and Dimensions.addEventListener
 */
export const useResponsiveValue = <T,>(values: {
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  default: T;
}): T => {
  return responsive(values);
};

