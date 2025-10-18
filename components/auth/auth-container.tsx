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
    const content = (
      <View
        style={[
          styles.formContainer,
          {
            width: typeof formWidth === "number" ? formWidth : undefined,
            padding: spacing.padding,
            gap: spacing.gap,
          },
          typeof formWidth === "string" && { width: formWidth as any },
        ]}
      >
        {/* Header */}
        {(headerLogo || title || subtitle) && (
          <View style={[styles.header, { marginBottom: spacing.gap }]}>
            {headerLogo && <View style={styles.logo}>{headerLogo}</View>}

            {title && (
              <ThemedText
                type="title"
                style={[
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
            styles.card,
            shadow.lg,
            rounded.lg,
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
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <View style={styles.splitContainer}>
          {/* Image Side */}
          <ImageBackground
            source={backgroundImage}
            style={styles.splitImage}
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
            style={styles.splitForm}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
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
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            layout === "compact" && gutters.padding.md,
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
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    maxWidth: 600,
    width: "100%",
  },
  header: {
    alignItems: "center",
  },
  logo: {
    marginBottom: 24,
  },
  title: {
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.7,
  },
  card: {
    maxWidth: 600,
    width: "90%",
  },
  cardContent: {
    padding: 0,
  },
  splitContainer: {
    flex: 1,
    flexDirection: "row",
  },
  splitImage: {
    flex: 1,
    position: "relative",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },
  splitForm: {
    flex: 1,
    minWidth: 400,
  },
});
