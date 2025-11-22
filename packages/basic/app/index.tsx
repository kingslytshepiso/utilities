/**
 * Landing Screen
 * Main entry point - placeholder for your app content
 */

import { router } from "expo-router";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Divider } from "react-native-paper";

import {
  ThemedText,
  IconSymbol,
  usePaperTheme,
  gutters,
  layout,
  rounded,
  shadow,
  useResponsiveValue,
} from "@utilities/shared-core";

export default function LandingScreen() {
  const theme = usePaperTheme();

  // Responsive padding
  const containerPadding = useResponsiveValue({
    sm: 16,
    md: 24,
    lg: 32,
    default: 16,
  });

  const verticalSpacing = useResponsiveValue({
    sm: 24,
    md: 40,
    lg: 60,
    default: 24,
  });

  const handleGetStarted = () => {
    router.push("/about");
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContent,
        {
          paddingHorizontal: containerPadding,
          paddingVertical: verticalSpacing,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <View style={[layout.center, styles.heroSection]}>
        <View
          style={[
            layout.center,
            shadow.md,
            styles.heroIcon,
            { backgroundColor: theme.colors.primaryContainer },
          ]}
        >
          <IconSymbol name="sparkles" size={64} color={theme.colors.primary} />
        </View>

        <ThemedText
          type="title"
          style={[
            gutters.marginTop.xl,
            styles.heroTitle,
            { textAlign: "center" },
          ]}
        >
          Your App Starts Here
        </ThemedText>

        <ThemedText
          style={[
            gutters.marginTop.md,
            gutters.marginBottom.xl,
            styles.heroSubtitle,
            { textAlign: "center", opacity: 0.8 },
          ]}
        >
          A cross-platform starter template ready for your next project. Built
          with Expo, React Native Paper, and modern best practices.
        </ThemedText>

        <Button
          mode="contained"
          onPress={handleGetStarted}
          icon="rocket-launch"
          style={[gutters.marginBottom.sm, rounded.md, styles.primaryButton]}
          contentStyle={styles.buttonContent}
        >
          Get Started
        </Button>

        <Button
          mode="text"
          onPress={() => router.push("/modal")}
          contentStyle={styles.buttonContent}
        >
          View Example Modal
        </Button>
      </View>

      <Divider style={[gutters.marginVertical.xl]} />

      {/* Features Grid */}
      <View style={[gutters.marginBottom.xl, styles.featuresSection]}>
        <ThemedText
          type="subtitle"
          style={[gutters.marginBottom.lg, styles.sectionTitle]}
        >
          What&apos;s Included
        </ThemedText>

        <View
          style={[
            layout.flexRow,
            layout.flexWrap,
            layout.justifyCenter,
            styles.featuresGrid,
          ]}
        >
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
      </View>

      {/* Quick Actions */}
      <Card
        style={[
          layout.selfCenter,
          layout.fullWidth,
          rounded.lg,
          shadow.sm,
          styles.quickStartCard,
        ]}
      >
        <Card.Content style={styles.cardContentPadding}>
          <ThemedText
            type="subtitle"
            style={[gutters.marginBottom.lg, styles.sectionTitle]}
          >
            Quick Start
          </ThemedText>

          <ThemedText style={[gutters.marginBottom.md, styles.stepText]}>
            <ThemedText type="defaultSemiBold">1. Customize Theme</ThemedText>
            {"\n"}
            Edit{" "}
            <ThemedText type="defaultSemiBold">
              constants/theme.ts
            </ThemedText>{" "}
            to set your brand colors.
          </ThemedText>

          <ThemedText style={[gutters.marginBottom.md, styles.stepText]}>
            <ThemedText type="defaultSemiBold">2. Update App Config</ThemedText>
            {"\n"}
            Modify <ThemedText type="defaultSemiBold">app.json</ThemedText> with
            your app name and settings.
          </ThemedText>

          <ThemedText style={[gutters.marginBottom.md, styles.stepText]}>
            <ThemedText type="defaultSemiBold">
              3. Build Your Screens
            </ThemedText>
            {"\n"}
            Replace{" "}
            <ThemedText type="defaultSemiBold">
              app/index.tsx
            </ThemedText> and{" "}
            <ThemedText type="defaultSemiBold">app/about.tsx</ThemedText> with
            your content.
          </ThemedText>

          <ThemedText style={styles.stepText}>
            <ThemedText type="defaultSemiBold">4. Use Utilities</ThemedText>
            {"\n"}
            Import from <ThemedText type="defaultSemiBold">
              @/utils
            </ThemedText>{" "}
            for styling and responsive design.
          </ThemedText>
        </Card.Content>
      </Card>
    </ScrollView>
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
    <Card style={[rounded.lg, shadow.sm, styles.featureCard]} elevation={1}>
      <Card.Content style={[layout.center, styles.featureCardContent]}>
        <View
          style={[
            layout.center,
            gutters.marginBottom.xs,
            styles.iconContainer,
            { backgroundColor: theme.colors.primaryContainer },
          ]}
        >
          <IconSymbol
            name={icon as any}
            size={28}
            color={theme.colors.primary}
          />
        </View>
        <ThemedText
          type="defaultSemiBold"
          style={[gutters.marginTop.md, styles.featureTitle]}
        >
          {title}
        </ThemedText>
        <ThemedText style={[gutters.marginTop.xs, styles.featureDescription]}>
          {description}
        </ThemedText>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Platform.OS === "web" ? 40 : 100, // Extra space for mobile bottom nav
  },
  heroSection: {
    paddingVertical: Platform.select({ web: 40, default: 32 }),
    paddingHorizontal: Platform.select({ web: 16, default: 16 }),
  },
  heroIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  heroTitle: {
    fontSize: Platform.select({ web: 36, default: 28 }),
    lineHeight: Platform.select({ web: 44, default: 36 }),
    paddingHorizontal: 16,
  },
  heroSubtitle: {
    fontSize: Platform.select({ web: 18, default: 16 }),
    lineHeight: Platform.select({ web: 28, default: 24 }),
    maxWidth: 600,
    paddingHorizontal: 16,
  },
  primaryButton: {
    minWidth: 200,
  },
  buttonContent: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: Platform.select({ web: 24, default: 20 }),
    textAlign: "center",
  },
  featuresSection: {
    marginBottom: 24,
  },
  featuresGrid: {
    gap: Platform.select({ web: 20, default: 16 }),
    paddingHorizontal: Platform.select({ web: 0, default: 8 }),
  },
  featureCard: {
    flex: 1,
    minWidth: Platform.select({ web: 180, default: 150 }),
    maxWidth: 240,
    overflow: "hidden",
  },
  featureCardContent: {
    paddingVertical: Platform.select({ web: 28, default: 24 }),
    paddingHorizontal: Platform.select({ web: 20, default: 16 }),
    gap: 8,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  featureTitle: {
    textAlign: "center",
    fontSize: Platform.select({ web: 17, default: 16 }),
  },
  featureDescription: {
    textAlign: "center",
    fontSize: Platform.select({ web: 14, default: 13 }),
    opacity: 0.7,
    lineHeight: 20,
  },
  quickStartCard: {
    maxWidth: 700,
  },
  cardContentPadding: {
    paddingVertical: Platform.select({ web: 28, default: 20 }),
    paddingHorizontal: Platform.select({ web: 24, default: 20 }),
  },
  stepText: {
    lineHeight: 24,
  },
});
