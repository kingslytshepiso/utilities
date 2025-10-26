/**
 * Utility Functions Export
 * Centralized export for all utility functions and constants
 */

// Style utilities
export {
  spacing,
  borderRadius,
  shadows,
  typography,
  layout,
  gutters,
  rounded,
  shadow,
} from "./styles";

// Responsive utilities
export {
  getDeviceDimensions,
  breakpoints,
  deviceType,
  responsive,
  scale,
  moderateScale,
  verticalScale,
  responsiveFontSize,
  widthPercentage,
  heightPercentage,
  matchesBreakpoint,
  getOrientation,
  isLandscape,
  isPortrait,
  getGridColumns,
  useResponsiveValue,
} from "./responsive";

// Platform utilities
export {
  platform,
  platformSelect,
  getStatusBarHeight,
  hasNotch,
  getSafeAreaInsets,
  isExpoGo,
  isDevelopment,
  getAppVersion,
  getBuildVersion,
  platformStyle,
  supportsHaptics,
  isAndroidApiLevel,
  isIOSVersion,
  keyboardBehavior,
  keyboardVerticalOffset,
} from "./platform";

