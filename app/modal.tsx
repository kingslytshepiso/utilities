import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { Button, Card } from "react-native-paper";

import { GradientBackground } from "@/components/gradient-background";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { usePaperTheme } from "@/hooks/use-theme-color";
import { gutters, layout, rounded, shadow } from "@/utils";

export default function ModalScreen() {
  const theme = usePaperTheme();

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={[gutters.padding.lg]}>
        <ThemedView style={[layout.center, gutters.marginBottom.xl]}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: theme.colors.primaryContainer,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconSymbol
              name="square.on.square"
              size={48}
              color={theme.colors.primary}
            />
          </View>
          <ThemedText type="title" style={[gutters.marginTop.md]}>
            Example Modal
          </ThemedText>
          <ThemedText style={[gutters.marginTop.sm, { textAlign: "center" }]}>
            This demonstrates modal navigation patterns across all platforms
          </ThemedText>
        </ThemedView>

        <Card style={[gutters.marginBottom.md, rounded.md, shadow.sm]}>
          <Card.Content>
            <ThemedText type="subtitle" style={[gutters.marginBottom.md]}>
              Modal Use Cases
            </ThemedText>

            <ThemedText style={[gutters.marginBottom.sm]}>
              Modals are perfect for:
            </ThemedText>

            <ThemedText>
              • Focused tasks requiring user attention{"\n"}• Forms and data
              input workflows{"\n"}• Confirmations and alerts{"\n"}• Detail
              views overlaying main content{"\n"}• Settings and preferences
            </ThemedText>
          </Card.Content>
        </Card>

        <Card style={[rounded.md, shadow.sm]}>
          <Card.Content>
            <ThemedText type="subtitle" style={[gutters.marginBottom.md]}>
              Implementation
            </ThemedText>

            <ThemedText style={[gutters.marginBottom.md]}>
              This modal is configured in{" "}
              <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText>{" "}
              with presentation mode &ldquo;modal&rdquo;. It works seamlessly
              across iOS, Android, and Web.
            </ThemedText>

            <Button
              mode="contained"
              onPress={() => router.back()}
              icon="arrow-left"
            >
              Close Modal
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </GradientBackground>
  );
}
