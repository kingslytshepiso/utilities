/**
 * Responsive Authentication Container
 * Adaptive container for auth screens based on screen size
 */

import { ThemedText } from "@/components/themed-text";
import {
  useAuthFormWidth,
  useAuthLayout,
  useAuthSpacing,
} from "@/hooks/use-responsive-auth";
import { usePaperTheme } from "@/hooks/use-theme-color";
import { gutters, rounded, shadow } from "@/utils";
import React from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Auth Container Props
 */
interface AuthContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerLogo?: React.ReactNode;
  backgroundImage?: any;
  showCard?: boolean;
}

/**
 * Responsive Authentication Container
 */
export function AuthContainer({
  children,
  title,
  subtitle,
  headerLogo,
  backgroundImage,
  showCard = true,
}: AuthContainerProps) {
  const theme = usePaperTheme();
  const layout = useAuthLayout();
  const formWidth = useAuthFormWidth();
  const spacing = useAuthSpacing();

  // Render content based on layout type
  const renderContent = () => {
    const formWidthStyle =
      typeof formWidth === "string"
        ? { width: formWidth as any }
        : formWidth
        ? { width: formWidth }
        : { width: "100%" };

    const content = (
      <View
        style={[
          layout.fullWidth,
          layout.selfCenter,
          styles.formContainer,
          formWidthStyle,
          {
            padding: spacing.padding,
            gap: spacing.gap,
          },
        ]}
      >
        {/* Header */}
        {(headerLogo || title || subtitle) && (
          <View style={[layout.itemsCenter, { marginBottom: spacing.gap }]}>
            {headerLogo && (
              <View style={gutters.marginBottom.lg}>{headerLogo}</View>
            )}

            {title && (
              <ThemedText
                type="title"
                style={[
                  gutters.marginBottom.sm,
                  styles.title,
                  { fontSize: layout === "compact" ? 24 : 32 },
                ]}
              >
                {title}
              </ThemedText>
            )}

            {subtitle && (
              <ThemedText
                style={[
                  styles.subtitle,
                  { fontSize: layout === "compact" ? 14 : 16 },
                ]}
              >
                {subtitle}
              </ThemedText>
            )}
          </View>
        )}

        {/* Form Content */}
        {children}
      </View>
    );

    // Wrap in card for larger screens
    if (showCard && layout !== "compact") {
      return (
        <Card
          style={[
            layout.fullWidth,
            layout.selfCenter,
            gutters.marginHorizontal.md,
            rounded.lg,
            shadow.lg,
            styles.card,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Card.Content style={styles.cardContent}>{content}</Card.Content>
        </Card>
      );
    }

    return content;
  };

  // Split layout (desktop with side image)
  if (layout === "split" && backgroundImage) {
    return (
      <SafeAreaView style={layout.flex1} edges={["top", "bottom"]}>
        <View style={[layout.flex1, layout.flexRow]}>
          {/* Image Side */}
          <ImageBackground
            source={backgroundImage}
            style={[layout.flex1, layout.relative]}
            resizeMode="cover"
          >
            <View
              style={[
                styles.imageOverlay,
                { backgroundColor: theme.colors.primary },
              ]}
            />
          </ImageBackground>

          {/* Form Side */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[layout.flex1, styles.splitForm]}
          >
            <ScrollView
              contentContainerStyle={[
                layout.center,
                gutters.paddingHorizontal.xxl,
                gutters.paddingVertical.xxl,
                styles.scrollContent,
              ]}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {renderContent()}
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    );
  }

  // Standard layout (mobile/tablet)
  return (
    <SafeAreaView style={layout.flex1} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={layout.flex1}
      >
        <ScrollView
          contentContainerStyle={[
            layout.center,
            gutters.paddingHorizontal.md,
            gutters.paddingVertical.lg,
            styles.scrollContent,
            layout === "wide" && gutters.paddingHorizontal.xl,
            layout === "wide" && styles.scrollContentWide,
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {renderContent()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  scrollContentWide: {
    paddingVertical: 40,
  },
  formContainer: {
    maxWidth: 600,
  },
  title: {
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.7,
  },
  card: {
    maxWidth: 600,
    ...Platform.select({
      web: {
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
    }),
  },
  cardContent: {
    padding: 0,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },
  splitForm: {
    minWidth: 400,
    maxWidth: 700,
  },
});
