// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolViewProps, SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";


/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  // Navigation icons (outlined and filled variants)
  house: "home-outlined",
  "house.fill": "home",
  "info.circle": "info-outlined",
  "info.circle.fill": "info",
  // Other icons
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "sun.max.fill": "light-mode",
  "moon.fill": "dark-mode",
  sparkles: "auto-awesome",
  "square.on.square": "content-copy",
  "paintbrush.fill": "palette",
  "square.grid.2x2": "grid-view",
  display: "devices",
  "checkmark.shield.fill": "verified-user",
  "app.dashed": "apps",
  link: "link",
  "arrow.up.right.square": "open-in-new",
} as const;

type IconMapping = typeof MAPPING;
type IconSymbolName = keyof IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name] as any}
      style={style}
    />
  );
}
