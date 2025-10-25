/**
 * Feature flags configuration
 * Controls which features are enabled in the application
 */

export interface FeatureConfig {
  auth: boolean;
  analytics: boolean;
  notifications: boolean;
  socialLogin: boolean;
  biometricAuth: boolean;
}

/**
 * Default feature configuration
 * Can be overridden by environment variables
 */
const defaultFeatures: FeatureConfig = {
  auth: process.env.EXPO_PUBLIC_ENABLE_AUTH === 'true',
  analytics: process.env.EXPO_PUBLIC_ENABLE_ANALYTICS === 'true',
  notifications: process.env.EXPO_PUBLIC_ENABLE_NOTIFICATIONS === 'true',
  socialLogin: process.env.EXPO_PUBLIC_ENABLE_SOCIAL_LOGIN === 'true',
  biometricAuth: process.env.EXPO_PUBLIC_ENABLE_BIOMETRIC_AUTH === 'true',
};

/**
 * Runtime feature configuration
 * Can be modified at runtime for A/B testing or dynamic feature toggles
 */
let runtimeFeatures: Partial<FeatureConfig> = {};

/**
 * Get the current feature configuration
 * Runtime overrides take precedence over environment variables
 */
export const getFeatures = (): FeatureConfig => ({
  ...defaultFeatures,
  ...runtimeFeatures,
});

/**
 * Update features at runtime
 * Useful for A/B testing or dynamic feature toggles
 */
export const updateFeatures = (features: Partial<FeatureConfig>): void => {
  runtimeFeatures = { ...runtimeFeatures, ...features };
};

/**
 * Check if a specific feature is enabled
 */
export const isFeatureEnabled = (feature: keyof FeatureConfig): boolean => {
  return getFeatures()[feature];
};

/**
 * Get all enabled features
 */
export const getEnabledFeatures = (): (keyof FeatureConfig)[] => {
  const features = getFeatures();
  return Object.keys(features).filter(
    (key) => features[key as keyof FeatureConfig]
  ) as (keyof FeatureConfig)[];
};

/**
 * Feature flag constants for type safety
 */
export const FEATURES = {
  AUTH: 'auth' as const,
  ANALYTICS: 'analytics' as const,
  NOTIFICATIONS: 'notifications' as const,
  SOCIAL_LOGIN: 'socialLogin' as const,
  BIOMETRIC_AUTH: 'biometricAuth' as const,
} as const;

/**
 * Environment-specific feature presets
 */
export const FEATURE_PRESETS = {
  // Basic template without authentication
  BASIC: {
    auth: false,
    analytics: false,
    notifications: false,
    socialLogin: false,
    biometricAuth: false,
  },
  
  // Template with authentication
  WITH_AUTH: {
    auth: true,
    analytics: false,
    notifications: false,
    socialLogin: true,
    biometricAuth: false,
  },
  
  // Full-featured template
  FULL: {
    auth: true,
    analytics: true,
    notifications: true,
    socialLogin: true,
    biometricAuth: true,
  },
} as const;

/**
 * Apply a feature preset
 */
export const applyPreset = (preset: keyof typeof FEATURE_PRESETS): void => {
  updateFeatures(FEATURE_PRESETS[preset]);
};
