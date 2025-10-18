import { View, type ViewProps } from "react-native";

import { usePaperTheme, useThemeColor } from "@/hooks/use-theme-color";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const paperTheme = usePaperTheme();
  const backgroundColor =
    lightColor || darkColor
      ? useThemeColor({ light: lightColor, dark: darkColor }, "background")
      : paperTheme.colors.background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
