/**
 * Features Grid Component
 * Reusable grid container for displaying feature cards
 */

import { StyleSheet, View } from "react-native";

import {
  FeatureCard,
  FeatureCardProps,
} from "@/components/template/feature-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { gutters } from "@/utils";

export interface FeaturesGridProps {
  /**
   * Section title
   */
  title?: string;
  /**
   * Array of features to display
   */
  features: Omit<FeatureCardProps, "onPress">[];
  /**
   * Gap between cards
   * @default 12
   */
  gap?: number;
  /**
   * On feature press callback
   */
  onFeaturePress?: (feature: Omit<FeatureCardProps, "onPress">) => void;
}

/**
 * Reusable Features Grid Component
 */
export function FeaturesGrid({
  title,
  features,
  gap = 12,
  onFeaturePress,
}: FeaturesGridProps) {
  return (
    <ThemedView style={[gutters.marginBottom.lg]}>
      {title && (
        <ThemedText type="subtitle" style={[gutters.marginBottom.md]}>
          {title}
        </ThemedText>
      )}

      <View style={[styles.grid, { gap }]}>
        {features.map((feature, index) => (
          <FeatureCard
            key={`${feature.title}-${index}`}
            {...feature}
            onPress={onFeaturePress ? () => onFeaturePress(feature) : undefined}
          />
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
