# Cross-Platform Starter Template

A production-ready React Native starter template built with Expo, featuring a comprehensive theming system, utility styles, and responsive design helpers for building cross-platform applications.

## ✨ Features

- 🎨 **Material Design 3 Theming** - Built on React Native Paper with full MD3 support
- 🌓 **Smart Theme Switching** - Light, dark, and system modes with persistence
- 📱 **Cross-Platform** - Single codebase for iOS, Android, and Web
- 🎯 **File-Based Routing** - Powered by Expo Router for intuitive navigation
- 📐 **Utility Styling System** - Pre-built utilities for rapid development
- 📱 **Responsive Design** - Helpers for building adaptive layouts
- 🔧 **TypeScript** - Full type safety and IntelliSense support
- 🔒 **Secure Storage** - SecureStore for mobile, localStorage for web

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- For iOS development: Xcode (macOS only)
- For Android development: Android Studio

### Installation

```bash
# Clone the template
git clone <your-repo-url>
cd utilities

# Install dependencies
npm install

# Start the development server
npm start
```

### Run on Different Platforms

```bash
# iOS (macOS only)
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📁 Project Structure

```
utilities/
├── app/                      # Expo Router screens
│   ├── index.tsx            # Landing/home screen
│   ├── about.tsx            # About screen
│   ├── modal.tsx            # Example modal screen
│   └── _layout.tsx          # Root layout with theme providers
│
├── components/              # Reusable components
│   ├── app-header.tsx      # App header with logo and theme toggle
│   ├── gradient-background.tsx  # Theme-aware gradient backgrounds
│   ├── themed-text.tsx     # Text component with theme support
│   ├── themed-view.tsx     # View component with theme support
│   └── ui/                 # UI components
│       ├── collapsible.tsx # Collapsible component
│       └── icon-symbol.tsx # Icon component
│
├── constants/              # App constants
│   └── theme.ts           # Theme colors, gradients, and configuration
│
├── contexts/              # React contexts
│   └── theme-context.tsx  # Theme management context
│
├── hooks/                 # Custom React hooks
│   ├── use-color-scheme.ts    # Color scheme hook
│   └── use-theme-color.ts     # Theme color hooks
│
├── utils/                 # Utility functions and styles
│   ├── styles.ts         # Styling utilities
│   ├── responsive.ts     # Responsive design helpers
│   ├── platform.ts       # Platform-specific utilities
│   └── index.ts          # Centralized exports
│
├── app.json              # App configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Theming System

### Using the Theme

```tsx
import { usePaperTheme, useTheme } from "@/hooks/use-theme-color";

function MyComponent() {
  const theme = usePaperTheme();
  const { isDark, toggleTheme, setThemeMode } = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.onBackground }}>
        Current theme: {isDark ? "Dark" : "Light"}
      </Text>
      <Button onPress={toggleTheme}>Toggle Theme</Button>
    </View>
  );
}
```

### Customizing Theme Colors

Edit `constants/theme.ts` to customize your theme:

```tsx
export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#0a7ea4", // Your brand color
    primaryContainer: "#d1e7ed",
    // ... customize other colors
  },
};
```

### Theme Modes

The app supports three theme modes:

- **Light** - Always use light theme
- **Dark** - Always use dark theme
- **System** - Follow device system preferences

Theme preference is automatically persisted using SecureStore (mobile) and localStorage (web).

## 📐 Utility Styling System

### Layout Utilities

```tsx
import { layout, gutters, rounded, shadow } from "@/utils";

function MyComponent() {
  return (
    <View
      style={[
        layout.flex1, // flex: 1
        layout.center, // center content
        gutters.padding.lg, // padding: 24px
      ]}
    >
      <View
        style={[
          layout.rowBetween, // row with space-between
          gutters.gap.md, // gap: 16px
          rounded.md, // borderRadius: 12px
          shadow.sm, // small shadow
        ]}
      >
        {/* Content */}
      </View>
    </View>
  );
}
```

### Spacing Scale

All spacing utilities follow a 4px grid system:

- `xs` = 4px
- `sm` = 8px
- `md` = 16px
- `lg` = 24px
- `xl` = 32px
- `xxl` = 48px
- `xxxl` = 64px

### Available Utilities

```tsx
// Layout
layout.flex1, layout.flexRow, layout.flexCol;
layout.center, layout.rowCenter, layout.rowBetween;
layout.itemsCenter, layout.justifyCenter;
layout.fullWidth, layout.fullHeight;

// Spacing (with all scale sizes)
gutters.padding.md, gutters.margin.lg;
gutters.paddingHorizontal.sm, gutters.marginVertical.xl;
gutters.gap.md, gutters.rowGap.sm;

// Border Radius
rounded.xs, rounded.sm, rounded.md, rounded.lg, rounded.full;

// Shadows
shadow.sm, shadow.md, shadow.lg, shadow.xl;
```

## 📱 Responsive Design

### Responsive Values

```tsx
import { responsive, deviceType } from "@/utils";

function MyComponent() {
  const padding = responsive({
    sm: 8, // < 640px
    md: 16, // >= 640px
    lg: 24, // >= 1024px
    default: 12,
  });

  const columns = deviceType.isTablet() ? 2 : 1;

  return <View style={{ padding }} />;
}
```

### Screen Dimensions

```tsx
import { getDeviceDimensions, widthPercentage } from "@/utils";

function MyComponent() {
  const { width, height } = getDeviceDimensions();
  const cardWidth = widthPercentage(90); // 90% of screen width

  return <View style={{ width: cardWidth }} />;
}
```

### Breakpoints

- `sm` - 640px (Small phones)
- `md` - 768px (Large phones / Small tablets)
- `lg` - 1024px (Tablets)
- `xl` - 1280px (Large tablets / Desktops)
- `xxl` - 1536px (Large desktops)

## 🔧 Platform-Specific Code

```tsx
import { platform, platformSelect } from "@/utils";

function MyComponent() {
  const padding = platformSelect({
    ios: 20,
    android: 16,
    web: 24,
    default: 16,
  });

  return (
    <View style={{ padding }}>
      <Text>Running on {platform.OS}</Text>
      {platform.isIOS && <Text>iOS-specific content</Text>}
    </View>
  );
}
```

## 🧭 Navigation

This template uses Expo Router for file-based routing:

```tsx
import { Link, router } from "expo-router";

// Link component
<Link href="/explore">Go to Explore</Link>;

// Programmatic navigation
router.push("/explore");
router.back();

// Modal navigation
router.push("/modal");
```

### Adding New Screens

1. Create a new file in the `app/` directory
2. Export a React component as default
3. The route is automatically generated based on the file path

```tsx
// app/profile.tsx
export default function ProfileScreen() {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}
// Route: /profile
```

## 🎯 Configuration

Edit `app.json` to customize app information:

```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "version": "1.0.0"
  }
}
```

Edit `constants/theme.ts` for theme customization.

## 📦 Using React Native Paper Components

This template includes React Native Paper with full theming support:

```tsx
import { Button, Card, TextInput } from "react-native-paper";

function MyComponent() {
  return (
    <Card>
      <Card.Content>
        <TextInput label="Email" mode="outlined" />
        <Button mode="contained" onPress={() => {}}>
          Submit
        </Button>
      </Card.Content>
    </Card>
  );
}
```

[View all Paper components](https://reactnativepaper.com/docs/components/overview)

## 🔮 Future Branches/Versions

This template is designed to be extended. Planned branches include:

- **auth-firebase** - Firebase Authentication integration
- **auth-supabase** - Supabase Authentication integration
- **auth-clerk** - Clerk Authentication integration
- **state-zustand** - Zustand state management setup
- **state-redux** - Redux Toolkit state management setup

## 🛠️ Development

### Linting

```bash
npm run lint
```

### Type Checking

TypeScript is configured for strict type checking. Run type check with:

```bash
npx tsc --noEmit
```

## 📱 Building for Production

### iOS

```bash
# Build for App Store
eas build --platform ios

# Or using Expo
expo build:ios
```

### Android

```bash
# Build for Play Store
eas build --platform android

# Or using Expo
expo build:android
```

### Web

```bash
# Build for production
npx expo export --platform web

# Output will be in dist/ directory
```

## 🤝 Contributing

This is a template project. Feel free to fork and customize for your needs!

## 📄 License

MIT License - feel free to use this template for personal or commercial projects.

## 🔗 Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Paper](https://reactnativepaper.com)
- [Expo Router](https://docs.expo.dev/router/introduction)
- [React Native](https://reactnative.dev)
- [TypeScript](https://www.typescriptlang.org)

## 💡 Tips

1. **Theme Colors**: Use `theme.colors.*` from `usePaperTheme()` instead of hardcoded colors
2. **Utilities First**: Try using utility styles before writing custom StyleSheet
3. **Responsive Design**: Test on different screen sizes early
4. **Platform-Specific**: Use `platformSelect()` for platform-specific logic
5. **TypeScript**: Let TypeScript guide you - it catches errors early

## 🐛 Troubleshooting

### Metro bundler cache issues

```bash
npx expo start -c
```

### Package installation issues

```bash
rm -rf node_modules package-lock.json
npm install
```

### iOS Simulator issues

```bash
npx expo run:ios --device
```

## 📞 Support

For issues or questions:

1. Check the [Expo documentation](https://docs.expo.dev)
2. Review the code comments in the template
3. Open an issue in the repository

---

**Happy coding! 🚀**

Built with ❤️ using Expo and React Native
