# React Native Paper Theme Migration Guide

## Overview

This project has been migrated from a custom theme structure to **React Native Paper's Material Design 3 (MD3)** theme system. This provides a more comprehensive color palette and better integration with React Native Paper components.

## What Changed

### 1. Theme Structure (`constants/theme.ts`)

- **Added**: React Native Paper MD3 theme with full color palette
- **Created**: `lightTheme` and `darkTheme` using MD3 theme structure
- **Maintained**: Legacy `Colors` object for backward compatibility
- **Preserved**: `Fonts` configuration remains unchanged

### 2. Root Layout (`app/_layout.tsx`)

- **Added**: `PaperProvider` wrapper around the app
- **Integration**: Paper theme is now connected to the color scheme detection
- **Structure**: App now has both Paper theme and React Navigation theme

### 3. Hooks (`hooks/use-theme-color.ts`)

- **Added**: `usePaperTheme()` hook for accessing full MD3 theme
- **Preserved**: `useThemeColor()` for backward compatibility
- **Recommended**: Use `usePaperTheme()` for new code

### 4. Components Updated

All themed components now use React Native Paper's theme:

- `ThemedText` - Uses `paperTheme.colors.onSurface` for text
- `ThemedView` - Uses `paperTheme.colors.background` for backgrounds
- `Collapsible` - Uses `paperTheme.colors.onSurfaceVariant` for icons
- `TabLayout` - Uses `paperTheme.colors.primary` for active tint

## How to Use

### Using the Paper Theme Hook

```tsx
import { usePaperTheme } from "@/hooks/use-theme-color";

function MyComponent() {
  const theme = usePaperTheme();

  return (
    <View style={{ backgroundColor: theme.colors.surface }}>
      <Text style={{ color: theme.colors.onSurface }}>Hello World</Text>
    </View>
  );
}
```

### Available Colors

The MD3 theme provides a comprehensive color palette:

#### Primary Colors

- `primary` - Main brand color (#0a7ea4 light, #fff dark)
- `onPrimary` - Text color on primary backgrounds
- `primaryContainer` - Lighter variant of primary
- `onPrimaryContainer` - Text color on primary container

#### Secondary Colors

- `secondary` - Secondary brand color
- `onSecondary` - Text color on secondary backgrounds
- `secondaryContainer` - Lighter variant of secondary
- `onSecondaryContainer` - Text color on secondary container

#### Tertiary Colors

- `tertiary` - Tertiary brand color
- `onTertiary` - Text color on tertiary backgrounds
- `tertiaryContainer` - Lighter variant of tertiary
- `onTertiaryContainer` - Text color on tertiary container

#### Surface Colors

- `surface` - Default surface color
- `onSurface` - Default text color
- `surfaceVariant` - Variant surface color
- `onSurfaceVariant` - Text color on surface variant

#### Error Colors

- `error` - Error state color
- `onError` - Text color on error backgrounds
- `errorContainer` - Lighter error color
- `onErrorContainer` - Text color on error container

#### Other Colors

- `background` - App background color
- `outline` - Border and outline color
- `outlineVariant` - Lighter outline color
- `backdrop` - Modal backdrop color
- `elevation` - Object with elevation levels (level0 - level5)

### Using React Native Paper Components

You can now use any React Native Paper component with automatic theme support:

```tsx
import { Button, Card, Text } from "react-native-paper";

function MyComponent() {
  return (
    <Card>
      <Card.Content>
        <Text variant="headlineMedium">Welcome</Text>
        <Text variant="bodyMedium">This is using Paper components</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained">Submit</Button>
        <Button mode="outlined">Cancel</Button>
      </Card.Actions>
    </Card>
  );
}
```

## Backward Compatibility

The legacy `Colors` object is still available for backward compatibility:

```tsx
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

function LegacyComponent() {
  const colorScheme = useColorScheme();
  const textColor = Colors[colorScheme ?? "light"].text;

  return <Text style={{ color: textColor }}>Legacy usage</Text>;
}
```

However, it's recommended to migrate to the Paper theme for full MD3 support.

## Best Practices

1. **Use Paper Theme Hook**: Always use `usePaperTheme()` for new components
2. **Semantic Colors**: Use semantic color names (e.g., `onSurface`, `primary`) instead of direct color values
3. **Paper Components**: Prefer React Native Paper components when available
4. **Consistent Theming**: Let the theme system handle color switching automatically

## Custom Theme Colors

To customize the theme colors, edit `constants/theme.ts`:

```tsx
export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#your-color",
    // ... other customizations
  },
};
```

## Resources

- [React Native Paper Documentation](https://callstack.github.io/react-native-paper/)
- [Material Design 3](https://m3.material.io/)
- [MD3 Color System](https://m3.material.io/styles/color/system/overview)
