/**
 * Theme Color Hooks
 * Re-export theme hooks from the theme context
 */

export {
  useColorScheme,
  useIsDarkMode,
  usePaperTheme,
  useTheme,
} from "@/contexts/theme-context";

/**
 * Legacy hook for backward compatibility with custom colors
 * For new code, use usePaperTheme() to access the full MD3 color palette
 */
import { Colors } from "@/constants/theme";
import { useColorScheme as useColorSchemeInternal } from "@/contexts/theme-context";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const colorScheme = useColorSchemeInternal();
  const colorFromProps = props[colorScheme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[colorScheme][colorName];
  }
}
