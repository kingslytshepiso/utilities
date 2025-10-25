/**
 * Utility Styling System
 * Provides reusable style utilities for consistent spacing, layout, and typography
 */

import { StyleSheet } from "react-native";

/**
 * Spacing scale based on 4px grid system
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

/**
 * Border radius scale
 */
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

/**
 * Common shadow configurations
 */
export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
} as const;

/**
 * Typography scale
 */
export const typography = {
  // Font sizes
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
  },
  // Font weights
  weights: {
    light: "300" as const,
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
  // Line heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

/**
 * Layout utility styles
 */
export const layout = StyleSheet.create({
  // Flex utilities
  flex1: { flex: 1 },
  flexRow: { flexDirection: "row" },
  flexCol: { flexDirection: "column" },
  flexWrap: { flexWrap: "wrap" },
  
  // Alignment
  itemsCenter: { alignItems: "center" },
  itemsStart: { alignItems: "flex-start" },
  itemsEnd: { alignItems: "flex-end" },
  itemsStretch: { alignItems: "stretch" },
  
  justifyCenter: { justifyContent: "center" },
  justifyStart: { justifyContent: "flex-start" },
  justifyEnd: { justifyContent: "flex-end" },
  justifyBetween: { justifyContent: "space-between" },
  justifyAround: { justifyContent: "space-around" },
  justifyEvenly: { justifyContent: "space-evenly" },
  
  // Common combinations
  center: { alignItems: "center", justifyContent: "center" },
  rowCenter: { flexDirection: "row", alignItems: "center" },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  
  // Self alignment
  selfCenter: { alignSelf: "center" },
  selfStart: { alignSelf: "flex-start" },
  selfEnd: { alignSelf: "flex-end" },
  selfStretch: { alignSelf: "stretch" },
  
  // Position
  absolute: { position: "absolute" },
  relative: { position: "relative" },
  
  // Full size
  fullWidth: { width: "100%" },
  fullHeight: { height: "100%" },
  fullScreen: { width: "100%", height: "100%" },
});

/**
 * Spacing utility styles
 * Usage: [gutters.padding.md, gutters.marginTop.lg]
 */
export const gutters = {
  // Padding
  padding: StyleSheet.create({
    xs: { padding: spacing.xs },
    sm: { padding: spacing.sm },
    md: { padding: spacing.md },
    lg: { padding: spacing.lg },
    xl: { padding: spacing.xl },
    xxl: { padding: spacing.xxl },
    xxxl: { padding: spacing.xxxl },
  }),
  paddingHorizontal: StyleSheet.create({
    xs: { paddingHorizontal: spacing.xs },
    sm: { paddingHorizontal: spacing.sm },
    md: { paddingHorizontal: spacing.md },
    lg: { paddingHorizontal: spacing.lg },
    xl: { paddingHorizontal: spacing.xl },
    xxl: { paddingHorizontal: spacing.xxl },
    xxxl: { paddingHorizontal: spacing.xxxl },
  }),
  paddingVertical: StyleSheet.create({
    xs: { paddingVertical: spacing.xs },
    sm: { paddingVertical: spacing.sm },
    md: { paddingVertical: spacing.md },
    lg: { paddingVertical: spacing.lg },
    xl: { paddingVertical: spacing.xl },
    xxl: { paddingVertical: spacing.xxl },
    xxxl: { paddingVertical: spacing.xxxl },
  }),
  paddingTop: StyleSheet.create({
    xs: { paddingTop: spacing.xs },
    sm: { paddingTop: spacing.sm },
    md: { paddingTop: spacing.md },
    lg: { paddingTop: spacing.lg },
    xl: { paddingTop: spacing.xl },
    xxl: { paddingTop: spacing.xxl },
    xxxl: { paddingTop: spacing.xxxl },
  }),
  paddingBottom: StyleSheet.create({
    xs: { paddingBottom: spacing.xs },
    sm: { paddingBottom: spacing.sm },
    md: { paddingBottom: spacing.md },
    lg: { paddingBottom: spacing.lg },
    xl: { paddingBottom: spacing.xl },
    xxl: { paddingBottom: spacing.xxl },
    xxxl: { paddingBottom: spacing.xxxl },
  }),
  paddingLeft: StyleSheet.create({
    xs: { paddingLeft: spacing.xs },
    sm: { paddingLeft: spacing.sm },
    md: { paddingLeft: spacing.md },
    lg: { paddingLeft: spacing.lg },
    xl: { paddingLeft: spacing.xl },
    xxl: { paddingLeft: spacing.xxl },
    xxxl: { paddingLeft: spacing.xxxl },
  }),
  paddingRight: StyleSheet.create({
    xs: { paddingRight: spacing.xs },
    sm: { paddingRight: spacing.sm },
    md: { paddingRight: spacing.md },
    lg: { paddingRight: spacing.lg },
    xl: { paddingRight: spacing.xl },
    xxl: { paddingRight: spacing.xxl },
    xxxl: { paddingRight: spacing.xxxl },
  }),
  
  // Margin
  margin: StyleSheet.create({
    xs: { margin: spacing.xs },
    sm: { margin: spacing.sm },
    md: { margin: spacing.md },
    lg: { margin: spacing.lg },
    xl: { margin: spacing.xl },
    xxl: { margin: spacing.xxl },
    xxxl: { margin: spacing.xxxl },
  }),
  marginHorizontal: StyleSheet.create({
    xs: { marginHorizontal: spacing.xs },
    sm: { marginHorizontal: spacing.sm },
    md: { marginHorizontal: spacing.md },
    lg: { marginHorizontal: spacing.lg },
    xl: { marginHorizontal: spacing.xl },
    xxl: { marginHorizontal: spacing.xxl },
    xxxl: { marginHorizontal: spacing.xxxl },
  }),
  marginVertical: StyleSheet.create({
    xs: { marginVertical: spacing.xs },
    sm: { marginVertical: spacing.sm },
    md: { marginVertical: spacing.md },
    lg: { marginVertical: spacing.lg },
    xl: { marginVertical: spacing.xl },
    xxl: { marginVertical: spacing.xxl },
    xxxl: { marginVertical: spacing.xxxl },
  }),
  marginTop: StyleSheet.create({
    xs: { marginTop: spacing.xs },
    sm: { marginTop: spacing.sm },
    md: { marginTop: spacing.md },
    lg: { marginTop: spacing.lg },
    xl: { marginTop: spacing.xl },
    xxl: { marginTop: spacing.xxl },
    xxxl: { marginTop: spacing.xxxl },
  }),
  marginBottom: StyleSheet.create({
    xs: { marginBottom: spacing.xs },
    sm: { marginBottom: spacing.sm },
    md: { marginBottom: spacing.md },
    lg: { marginBottom: spacing.lg },
    xl: { marginBottom: spacing.xl },
    xxl: { marginBottom: spacing.xxl },
    xxxl: { marginBottom: spacing.xxxl },
  }),
  marginLeft: StyleSheet.create({
    xs: { marginLeft: spacing.xs },
    sm: { marginLeft: spacing.sm },
    md: { marginLeft: spacing.md },
    lg: { marginLeft: spacing.lg },
    xl: { marginLeft: spacing.xl },
    xxl: { marginLeft: spacing.xxl },
    xxxl: { marginLeft: spacing.xxxl },
  }),
  marginRight: StyleSheet.create({
    xs: { marginRight: spacing.xs },
    sm: { marginRight: spacing.sm },
    md: { marginRight: spacing.md },
    lg: { marginRight: spacing.lg },
    xl: { marginRight: spacing.xl },
    xxl: { marginRight: spacing.xxl },
    xxxl: { marginRight: spacing.xxxl },
  }),
  
  // Gap (for flexbox)
  gap: StyleSheet.create({
    xs: { gap: spacing.xs },
    sm: { gap: spacing.sm },
    md: { gap: spacing.md },
    lg: { gap: spacing.lg },
    xl: { gap: spacing.xl },
    xxl: { gap: spacing.xxl },
    xxxl: { gap: spacing.xxxl },
  }),
  rowGap: StyleSheet.create({
    xs: { rowGap: spacing.xs },
    sm: { rowGap: spacing.sm },
    md: { rowGap: spacing.md },
    lg: { rowGap: spacing.lg },
    xl: { rowGap: spacing.xl },
    xxl: { rowGap: spacing.xxl },
    xxxl: { rowGap: spacing.xxxl },
  }),
  columnGap: StyleSheet.create({
    xs: { columnGap: spacing.xs },
    sm: { columnGap: spacing.sm },
    md: { columnGap: spacing.md },
    lg: { columnGap: spacing.lg },
    xl: { columnGap: spacing.xl },
    xxl: { columnGap: spacing.xxl },
    xxxl: { columnGap: spacing.xxxl },
  }),
};

/**
 * Border radius utility styles
 */
export const rounded = StyleSheet.create({
  xs: { borderRadius: borderRadius.xs },
  sm: { borderRadius: borderRadius.sm },
  md: { borderRadius: borderRadius.md },
  lg: { borderRadius: borderRadius.lg },
  xl: { borderRadius: borderRadius.xl },
  full: { borderRadius: borderRadius.full },
});

/**
 * Shadow utility styles
 */
export const shadow = StyleSheet.create({
  sm: shadows.sm,
  md: shadows.md,
  lg: shadows.lg,
  xl: shadows.xl,
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
});

