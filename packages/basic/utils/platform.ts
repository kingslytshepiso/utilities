/**
 * Platform Utilities
 * Helpers for platform-specific functionality and checks
 */

import { Platform, StatusBar } from "react-native";
import Constants from "expo-constants";

/**
 * Platform detection utilities
 */
export const platform = {
  isIOS: Platform.OS === "ios",
  isAndroid: Platform.OS === "android",
  isWeb: Platform.OS === "web",
  isNative: Platform.OS !== "web",
  OS: Platform.OS,
  version: Platform.Version,
};

/**
 * Get platform-specific value
 * @example
 * const padding = platformSelect({ ios: 20, android: 16, default: 12 });
 */
export function platformSelect<T>(values: {
  ios?: T;
  android?: T;
  web?: T;
  native?: T;
  default: T;
}): T {
  if (platform.isIOS && values.ios !== undefined) return values.ios;
  if (platform.isAndroid && values.android !== undefined) return values.android;
  if (platform.isWeb && values.web !== undefined) return values.web;
  if (platform.isNative && values.native !== undefined) return values.native;
  return values.default;
}

/**
 * Get status bar height
 */
export const getStatusBarHeight = (): number => {
  if (platform.isIOS) {
    return Constants.statusBarHeight || 20;
  }
  if (platform.isAndroid) {
    return StatusBar.currentHeight || 0;
  }
  return 0;
};

/**
 * Check if device has notch (iPhone X and newer)
 */
export const hasNotch = (): boolean => {
  if (!platform.isIOS) return false;
  
  const statusBarHeight = getStatusBarHeight();
  // Devices with notch typically have status bar height > 20
  return statusBarHeight > 20;
};

/**
 * Safe area insets (approximate values)
 * For more accurate values, use react-native-safe-area-context
 */
export const getSafeAreaInsets = () => {
  const statusBarHeight = getStatusBarHeight();
  
  return {
    top: statusBarHeight,
    bottom: platformSelect({
      ios: hasNotch() ? 34 : 0,
      android: 0,
      default: 0,
    }),
    left: 0,
    right: 0,
  };
};

/**
 * Check if running in Expo Go
 */
export const isExpoGo = (): boolean => {
  return Constants.appOwnership === "expo";
};

/**
 * Check if running in development mode
 */
export const isDevelopment = (): boolean => {
  return __DEV__;
};

/**
 * Get app version
 */
export const getAppVersion = (): string => {
  return Constants.expoConfig?.version || "1.0.0";
};

/**
 * Get native build version
 */
export const getBuildVersion = (): string => {
  return (
    Constants.expoConfig?.ios?.buildNumber ||
    Constants.expoConfig?.android?.versionCode?.toString() ||
    "1"
  );
};

/**
 * Platform-specific style helper
 */
export const platformStyle = Platform.select;

/**
 * Check if device supports haptic feedback
 */
export const supportsHaptics = (): boolean => {
  return platform.isIOS || platform.isAndroid;
};

/**
 * Check for specific Android API level
 */
export const isAndroidApiLevel = (level: number): boolean => {
  if (!platform.isAndroid) return false;
  return typeof Platform.Version === "number" && Platform.Version >= level;
};

/**
 * Check for specific iOS version
 */
export const isIOSVersion = (version: number): boolean => {
  if (!platform.isIOS) return false;
  const iosVersion = typeof Platform.Version === "string" 
    ? parseFloat(Platform.Version) 
    : 0;
  return iosVersion >= version;
};

/**
 * Keyboard behavior configuration
 */
export const keyboardBehavior = platformSelect({
  ios: "padding" as const,
  android: "height" as const,
  default: undefined,
});

/**
 * Default keyboard vertical offset
 */
export const keyboardVerticalOffset = platformSelect({
  ios: 0,
  android: 20,
  default: 0,
});

