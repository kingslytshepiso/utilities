import { useMemo } from 'react';
import { getFeatures, isFeatureEnabled, type FeatureConfig } from '@/config/features';

/**
 * Hook to access feature flags in components
 * Returns the current feature configuration
 */
export const useFeatures = (): FeatureConfig => {
  return useMemo(() => getFeatures(), []);
};

/**
 * Hook to check if a specific feature is enabled
 * @param feature - The feature to check
 * @returns boolean indicating if the feature is enabled
 */
export const useFeature = (feature: keyof FeatureConfig): boolean => {
  return useMemo(() => isFeatureEnabled(feature), [feature]);
};

/**
 * Hook to get multiple features at once
 * @param features - Array of features to check
 * @returns Object with feature names as keys and boolean values
 */
export const useMultipleFeatures = <T extends keyof FeatureConfig>(
  features: T[]
): Record<T, boolean> => {
  return useMemo(() => {
    const result = {} as Record<T, boolean>;
    features.forEach((feature) => {
      result[feature] = isFeatureEnabled(feature);
    });
    return result;
  }, features);
};

/**
 * Hook for conditional rendering based on features
 * @param feature - The feature to check
 * @returns Object with isEnabled boolean and render function
 */
export const useFeatureGate = (feature: keyof FeatureConfig) => {
  const isEnabled = useFeature(feature);
  
  return {
    isEnabled,
    render: (children: React.ReactNode) => isEnabled ? children : null,
  };
};
