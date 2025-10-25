/**
 * Feature Card Component
 * Reusable feature card for showcasing features
 */

import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";

import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { usePaperTheme } from "@/hooks/use-theme-color";
import { gutters, layout, rounded, shadow } from "@/utils";

export interface FeatureCardProps {
  /**
   * Icon name from SF Symbols
   */
  icon: string;
  /**
   * Feature title
   */
  title: string;
  /**
   * Feature description
   */
  description: string;
  /**
   * Icon size
   * @default 32
   */
  iconSize?: number;
  /**
   * Icon color (optional, defaults to primary)
   */
  iconColor?: string;
  /**
   * On press callback
   */
  onPress?: () => void;
}

/**
 * Reusable Feature Card Component
 */
export function FeatureCard({
  icon,
  title,
  description,
  iconSize = 32,
  iconColor,
  onPress,
}: FeatureCardProps) {
  const theme = usePaperTheme();
  const color = iconColor || theme.colors.primary;

  return (
    <Card
      style={[styles.card, rounded.md, shadow.sm]}
      onPress={onPress}
      mode={onPress ? "elevated" : "outlined"}
    >
      <Card.Content style={[layout.center, gutters.padding.md]}>
        <IconSymbol name={icon as any} size={iconSize} color={color} />
        <ThemedText
          type="defaultSemiBold"
          style={[gutters.marginTop.sm, { textAlign: "center" }]}
        >
          {title}
        </ThemedText>
        <ThemedText
          style={[
            gutters.marginTop.xs,
            { textAlign: "center", fontSize: 12, opacity: 0.7 },
          ]}
        >
          {description}
        </ThemedText>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 140,
  },
});
