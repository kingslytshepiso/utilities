import React from 'react';
import { useFeature } from '@/hooks/use-features';

interface FeatureGateProps {
  feature: keyof import('@/config/features').FeatureConfig;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  mode?: 'hide' | 'disable';
}

/**
 * Component that conditionally renders children based on feature flags
 * 
 * @param feature - The feature flag to check
 * @param children - Content to render when feature is enabled
 * @param fallback - Content to render when feature is disabled (optional)
 * @param mode - How to handle disabled state: 'hide' (default) or 'disable'
 */
export const FeatureGate: React.FC<FeatureGateProps> = ({
  feature,
  children,
  fallback = null,
  mode = 'hide',
}) => {
  const isEnabled = useFeature(feature);

  if (!isEnabled) {
    if (mode === 'disable') {
      // Render children but disable them
      return (
        <div style={{ opacity: 0.5, pointerEvents: 'none' }}>
          {children}
        </div>
      );
    }
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

/**
 * Higher-order component for feature gating
 * @param feature - The feature flag to check
 * @param fallback - Component to render when feature is disabled
 */
export const withFeatureGate = <P extends object>(
  feature: keyof import('@/config/features').FeatureConfig,
  fallback?: React.ComponentType<P>
) => {
  return (WrappedComponent: React.ComponentType<P>) => {
    const FeatureGatedComponent: React.FC<P> = (props) => {
      const isEnabled = useFeature(feature);

      if (!isEnabled && fallback) {
        return <fallback {...props} />;
      }

      if (!isEnabled) {
        return null;
      }

      return <WrappedComponent {...props} />;
    };

    FeatureGatedComponent.displayName = `withFeatureGate(${WrappedComponent.displayName || WrappedComponent.name})`;
    
    return FeatureGatedComponent;
  };
};
