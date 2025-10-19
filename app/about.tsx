/**
 * About Screen
 * Information about the template and how to use it
 */

import { Linking, ScrollView } from "react-native";
import { Button, Card, Divider, List } from "react-native-paper";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Collapsible } from "@/components/ui/collapsible";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { usePaperTheme } from "@/hooks/use-theme-color";
import { gutters, platform, rounded, shadow } from "@/utils";

export default function AboutScreen() {
  const theme = usePaperTheme();

  return (
    <ScrollView contentContainerStyle={[gutters.padding.lg]}>
      {/* Header */}
      <ThemedView style={[gutters.marginBottom.xl]}>
        <ThemedText type="title">About This Template</ThemedText>
        <ThemedText style={[gutters.marginTop.sm, { opacity: 0.8 }]}>
          Everything you need to know to get started with this cross-platform
          starter template.
        </ThemedText>
      </ThemedView>

      {/* Platform Info */}
      <Card style={[gutters.marginBottom.md, rounded.md, shadow.sm]}>
        <Card.Content>
          <ThemedText type="subtitle" style={[gutters.marginBottom.md]}>
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
      <Card style={[gutters.marginBottom.md, rounded.md, shadow.sm]}>
        <Card.Content>
          <ThemedText type="subtitle" style={[gutters.marginBottom.md]}>
            Template Features
          </ThemedText>

          <Collapsible title="🎨 Theming System">
            <ThemedText style={[gutters.marginBottom.sm]}>
              Built on React Native Paper with Material Design 3.
            </ThemedText>
            <ThemedText>
              • Light, Dark, and System modes{"\n"}• Persistent theme
              preferences{"\n"}• SecureStore (mobile) & localStorage (web)
              {"\n"}• Fully customizable color palette
            </ThemedText>
          </Collapsible>

          <Collapsible title="📐 Utility System">
            <ThemedText style={[gutters.marginBottom.sm]}>
              Pre-built utilities for rapid development.
            </ThemedText>
            <ThemedText>
              • Layout helpers (flex, alignment, positioning){"\n"}• Spacing
              scale (xs to xxxl){"\n"}• Typography utilities{"\n"}• Shadows and
              border radius{"\n"}• Responsive design helpers
            </ThemedText>
          </Collapsible>

          <Collapsible title="📱 Cross-Platform">
            <ThemedText style={[gutters.marginBottom.sm]}>
              Single codebase for all platforms.
            </ThemedText>
            <ThemedText>
              • iOS native application{"\n"}• Android native application{"\n"}•
              Progressive Web App{"\n"}• Platform-specific utilities{"\n"}•
              Responsive breakpoints
            </ThemedText>
          </Collapsible>

          <Collapsible title="🔧 Developer Experience">
            <ThemedText style={[gutters.marginBottom.sm]}>
              Tools and practices for productivity.
            </ThemedText>
            <ThemedText>
              • TypeScript with strict mode{"\n"}• ESLint configuration{"\n"}•
              File-based routing (Expo Router){"\n"}• Component library ready
              {"\n"}• Gradient backgrounds
            </ThemedText>
          </Collapsible>
        </Card.Content>
      </Card>

      {/* Getting Started */}
      <Card style={[gutters.marginBottom.md, rounded.md, shadow.sm]}>
        <Card.Content>
          <ThemedText type="subtitle" style={[gutters.marginBottom.md]}>
            Getting Started
          </ThemedText>

          <ThemedText style={[gutters.marginBottom.sm]}>
            <ThemedText type="defaultSemiBold">1. Customize Theme</ThemedText>
            {"\n"}
            Edit{" "}
            <ThemedText type="defaultSemiBold">
              constants/theme.ts
            </ThemedText>{" "}
            to set your brand colors.
          </ThemedText>

          <ThemedText style={[gutters.marginBottom.sm]}>
            <ThemedText type="defaultSemiBold">2. Update App Config</ThemedText>
            {"\n"}
            Modify <ThemedText type="defaultSemiBold">app.json</ThemedText> with
            your app name and settings.
          </ThemedText>

          <ThemedText style={[gutters.marginBottom.sm]}>
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

          <ThemedText>
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
      <Card style={[rounded.md, shadow.sm]}>
        <Card.Content>
          <ThemedText type="subtitle" style={[gutters.marginBottom.md]}>
            Resources
          </ThemedText>

          <Button
            mode="outlined"
            onPress={() => Linking.openURL("https://docs.expo.dev")}
            style={[gutters.marginBottom.sm]}
            icon="book-open-outline"
          >
            Expo Documentation
          </Button>

          <Button
            mode="outlined"
            onPress={() => Linking.openURL("https://reactnativepaper.com")}
            style={[gutters.marginBottom.sm]}
            icon="palette-outline"
          >
            React Native Paper Docs
          </Button>

          <Button
            mode="outlined"
            onPress={() => Linking.openURL("https://reactnative.dev")}
            icon="react"
          >
            React Native Docs
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
