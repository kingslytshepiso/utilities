/**
 * Landing Screen
 * Main entry point - placeholder for your app content
 */

import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Divider } from "react-native-paper";

import { AppHeader } from "@/components/app-header";
import { GradientBackground } from "@/components/gradient-background";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { usePaperTheme } from "@/hooks/use-theme-color";
import { gutters, layout, rounded, shadow } from "@/utils";

export default function LandingScreen() {
  const theme = usePaperTheme();

  return (
    <GradientBackground>
      <AppHeader projectName="Starter Template" showGithub />

      <ScrollView contentContainerStyle={[gutters.padding.lg]}>
        {/* Hero Section */}
        <ThemedView style={[layout.center, gutters.paddingVertical.xxxl]}>
          <View
            style={[
              styles.heroIcon,
              { backgroundColor: theme.colors.primaryContainer },
            ]}
          >
            <IconSymbol
              name="sparkles"
              size={64}
              color={theme.colors.primary}
            />
          </View>

          <ThemedText
            type="title"
            style={[gutters.marginTop.xl, { textAlign: "center" }]}
          >
            Your App Starts Here
          </ThemedText>

          <ThemedText
            style={[
              gutters.marginTop.md,
              gutters.marginBottom.xl,
              { textAlign: "center", opacity: 0.8 },
            ]}
          >
            A cross-platform starter template ready for your next project. Built
            with Expo, React Native Paper, and modern best practices.
          </ThemedText>

          <Button
            mode="contained"
            onPress={() => router.push("/about")}
            icon="information-outline"
            style={[gutters.marginBottom.sm]}
          >
            Learn More
          </Button>

          <Button mode="text" onPress={() => router.push("/modal")}>
            View Example Modal
          </Button>
        </ThemedView>

        <Divider style={[gutters.marginVertical.lg]} />

        {/* Features Grid */}
        <ThemedView style={[gutters.marginBottom.lg]}>
          <ThemedText type="subtitle" style={[gutters.marginBottom.md]}>
            What&apos;s Included
          </ThemedText>

          <View style={styles.featuresGrid}>
            <FeatureCard
              icon="paintbrush.fill"
              title="Theming"
              description="Material Design 3 with light/dark modes"
            />
            <FeatureCard
              icon="square.grid.2x2"
              title="Utilities"
              description="Pre-built styling and layout helpers"
            />
            <FeatureCard
              icon="display"
              title="Responsive"
              description="Adapts to all screen sizes"
            />
            <FeatureCard
              icon="checkmark.shield.fill"
              title="Type Safe"
              description="Full TypeScript support"
            />
          </View>
        </ThemedView>

        {/* Quick Actions */}
        <Card style={[rounded.md, shadow.sm]}>
          <Card.Content>
            <ThemedText type="subtitle" style={[gutters.marginBottom.md]}>
              Quick Start
            </ThemedText>

            <ThemedText style={[gutters.marginBottom.sm]}>
              1. Customize your theme in{" "}
              <ThemedText type="defaultSemiBold">constants/theme.ts</ThemedText>
            </ThemedText>

            <ThemedText style={[gutters.marginBottom.sm]}>
              2. Update app name in{" "}
              <ThemedText type="defaultSemiBold">app.json</ThemedText>
            </ThemedText>

            <ThemedText style={[gutters.marginBottom.sm]}>
              3. Replace this placeholder with your content
            </ThemedText>

            <ThemedText>4. Start building amazing features!</ThemedText>
          </Card.Content>
        </Card>
      </ScrollView>
    </GradientBackground>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  const theme = usePaperTheme();

  return (
    <Card style={[styles.featureCard, rounded.md, shadow.sm]}>
      <Card.Content style={[layout.center, gutters.padding.md]}>
        <IconSymbol name={icon as any} size={32} color={theme.colors.primary} />
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
  heroIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  featureCard: {
    flex: 1,
    minWidth: 140,
  },
});
