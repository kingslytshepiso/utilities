/**
 * About Screen
 * Information about the template and how to use it
 */

import { Linking, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Divider, List } from "react-native-paper";

import { ThemedText } from "@/components/themed-text";
import { Collapsible } from "@/components/ui/collapsible";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { usePaperTheme } from "@/hooks/use-theme-color";
import { gutters, platform, shadow } from "@/utils";
import { useResponsiveValue } from "@/utils/responsive";

export default function AboutScreen() {
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
      {/* Header */}
      <View style={[gutters.marginBottom.xxl, styles.headerSection]}>
        <ThemedText type="title" style={styles.pageTitle}>
          About This Template
        </ThemedText>
        <ThemedText style={[gutters.marginTop.lg, styles.pageSubtitle]}>
          Everything you need to know to get started with this cross-platform
          starter template.
        </ThemedText>
      </View>

      {/* Platform Info */}
      <Card
        style={[gutters.marginBottom.xl, shadow.sm, styles.card]}
        elevation={1}
      >
        <Card.Content style={styles.cardContent}>
          <ThemedText
            type="subtitle"
            style={[gutters.marginBottom.lg, styles.cardTitle]}
          >
            Current Platform
          </ThemedText>

          <List.Item
            title="Platform"
            description={platform.OS}
            left={() => (
              <IconSymbol
                name="app.dashed"
                size={24}
                color={theme.colors.primary}
              />
            )}
          />
          <Divider />
          <List.Item
            title="Version"
            description={platform.version.toString()}
            left={() => (
              <IconSymbol
                name="info.circle"
                size={24}
                color={theme.colors.primary}
              />
            )}
          />
          <Divider />
          <List.Item
            title="Type"
            description={
              platform.isIOS
                ? "iOS Application"
                : platform.isAndroid
                ? "Android Application"
                : "Web Application"
            }
            left={() => (
              <IconSymbol
                name="display"
                size={24}
                color={theme.colors.primary}
              />
            )}
          />
        </Card.Content>
      </Card>

      {/* Features Overview */}
      <Card
        style={[gutters.marginBottom.xl, shadow.sm, styles.card]}
        elevation={1}
      >
        <Card.Content style={styles.cardContent}>
          <ThemedText
            type="subtitle"
            style={[gutters.marginBottom.lg, styles.cardTitle]}
          >
            Template Features
          </ThemedText>

          <Collapsible title="🎨 Theming System">
            <ThemedText
              style={[gutters.marginBottom.md, styles.featureDescription]}
            >
              Built on React Native Paper with Material Design 3.
            </ThemedText>
            <ThemedText style={styles.featureList}>
              • Light, Dark, and System modes{"\n"}• Persistent theme
              preferences{"\n"}• SecureStore (mobile) & localStorage (web)
              {"\n"}• Fully customizable color palette
            </ThemedText>
          </Collapsible>

          <Collapsible title="📐 Utility System">
            <ThemedText
              style={[gutters.marginBottom.md, styles.featureDescription]}
            >
              Pre-built utilities for rapid development.
            </ThemedText>
            <ThemedText style={styles.featureList}>
              • Layout helpers (flex, alignment, positioning){"\n"}• Spacing
              scale (xs to xxxl){"\n"}• Typography utilities{"\n"}• Shadows and
              border radius{"\n"}• Responsive design helpers
            </ThemedText>
          </Collapsible>

          <Collapsible title="📱 Cross-Platform">
            <ThemedText
              style={[gutters.marginBottom.md, styles.featureDescription]}
            >
              Single codebase for all platforms.
            </ThemedText>
            <ThemedText style={styles.featureList}>
              • iOS native application{"\n"}• Android native application{"\n"}•
              Progressive Web App{"\n"}• Platform-specific utilities{"\n"}•
              Responsive breakpoints
            </ThemedText>
          </Collapsible>

          <Collapsible title="🔧 Developer Experience">
            <ThemedText
              style={[gutters.marginBottom.md, styles.featureDescription]}
            >
              Tools and practices for productivity.
            </ThemedText>
            <ThemedText style={styles.featureList}>
              • TypeScript with strict mode{"\n"}• ESLint configuration{"\n"}•
              File-based routing (Expo Router){"\n"}• Component library ready
              {"\n"}• Gradient backgrounds
            </ThemedText>
          </Collapsible>
        </Card.Content>
      </Card>

      {/* Getting Started */}
      <Card
        style={[gutters.marginBottom.xl, shadow.sm, styles.card]}
        elevation={1}
      >
        <Card.Content style={styles.cardContent}>
          <ThemedText
            type="subtitle"
            style={[gutters.marginBottom.lg, styles.cardTitle]}
          >
            Getting Started
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

      {/* Resources */}
      <Card style={[shadow.sm, styles.card]} elevation={1}>
        <Card.Content style={styles.cardContent}>
          <ThemedText
            type="subtitle"
            style={[gutters.marginBottom.lg, styles.cardTitle]}
          >
            Resources
          </ThemedText>

          <Button
            mode="outlined"
            onPress={() => Linking.openURL("https://docs.expo.dev")}
            style={[gutters.marginBottom.md, styles.resourceButton]}
            icon="book-open-outline"
            contentStyle={styles.buttonContent}
          >
            Expo Documentation
          </Button>

          <Button
            mode="outlined"
            onPress={() => Linking.openURL("https://reactnativepaper.com")}
            style={[gutters.marginBottom.md, styles.resourceButton]}
            icon="palette-outline"
            contentStyle={styles.buttonContent}
          >
            React Native Paper Docs
          </Button>

          <Button
            mode="outlined"
            onPress={() => Linking.openURL("https://reactnative.dev")}
            icon="react"
            style={styles.resourceButton}
            contentStyle={styles.buttonContent}
          >
            React Native Docs
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Platform.OS === "web" ? 40 : 100,
  },
  headerSection: {
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: Platform.select({ web: 0, default: 16 }),
    paddingVertical: Platform.select({ web: 24, default: 16 }),
  },
  pageTitle: {
    fontSize: Platform.select({ web: 36, default: 28 }),
    lineHeight: Platform.select({ web: 44, default: 36 }),
    textAlign: Platform.select({ web: "left", default: "center" }),
  },
  pageSubtitle: {
    fontSize: Platform.select({ web: 18, default: 16 }),
    lineHeight: Platform.select({ web: 28, default: 24 }),
    opacity: 0.8,
    textAlign: Platform.select({ web: "left", default: "center" }),
  },
  card: {
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
    borderRadius: 16,
  },
  cardContent: {
    paddingVertical: Platform.select({ web: 28, default: 20 }),
    paddingHorizontal: Platform.select({ web: 24, default: 20 }),
  },
  cardTitle: {
    fontSize: Platform.select({ web: 24, default: 20 }),
    fontWeight: "600",
  },
  stepText: {
    lineHeight: 26,
    fontSize: 15,
  },
  featureDescription: {
    fontSize: 15,
    lineHeight: 24,
  },
  featureList: {
    lineHeight: 26,
    fontSize: 14,
  },
  resourceButton: {
    width: "100%",
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});
