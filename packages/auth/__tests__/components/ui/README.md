# UI Component Tests

This directory contains tests for UI utility components.

## IconSymbol Tests

**File**: `icon-symbol.test.tsx`

Tests for the icon component that maps SF Symbols to Material Icons.

### Test Coverage

1. **Rendering**

   - Renders with required props (name, color)
   - Renders with custom size
   - Renders with default size (24)
   - Renders with custom color
   - Renders with custom style

2. **Icon Mapping**

   - Navigation icons (house, house.fill, info.circle, info.circle.fill)
   - Common icons (paperplane, chevron, sun, moon, sparkles, etc.)
   - Verifies all mapped icons render without errors

3. **Weight Prop**

   - Accepts weight prop without error
   - Accepts different weight values (regular, bold, semibold, thin)

4. **Color Handling**

   - Hex color values (#FF5722)
   - RGB color values (rgb(255, 87, 34))
   - Color names (red, blue, etc.)

5. **Size Handling**
   - Various size values (12, 16, 20, 24, 32, 48, 64)

### Platform Differences

The component has two implementations:

- **iOS**: Uses native `SymbolView` from `expo-symbols`
- **Android/Web**: Uses `MaterialIcons` from `@expo/vector-icons`

Tests run against the Android/Web version using MaterialIcons.

### Running Tests

```bash
# Run only UI component tests
npm test -- __tests__/components/ui/

# Run with coverage
npm test -- __tests__/components/ui/ --coverage
```

### Notes

- Tests use `UNSAFE_root` from React Testing Library to verify rendering since MaterialIcons doesn't pass through testID
- All icon mappings are tested to ensure they render without errors


