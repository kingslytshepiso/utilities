# Changelog

All notable changes to this cross-platform starter template will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-10-18

### Added

#### 🎨 Theming & Design System
- **Theme Context with Manual Switching** - Complete theme management system supporting light, dark, and system modes
- **Gradient Backgrounds** - Customizable theme-aware gradient backgrounds with configurable variants (primary, accent, custom)
- **Gradient Color Configuration** - Pre-defined gradient color palettes for light and dark themes in `constants/theme.ts`
- **Secure Theme Persistence** - Theme preferences saved using SecureStore (mobile) and localStorage (web)
- **React Native Paper MD3** - Full Material Design 3 theming integration

#### 📐 Utility Systems
- **Comprehensive Styling Utilities** (`utils/styles.ts`)
  - Layout utilities (flex, alignment, positioning)
  - Spacing scale system (xs to xxxl) based on 4px grid
  - Typography utilities (sizes, weights, line heights)
  - Border radius utilities
  - Shadow/elevation utilities
  - Pre-built style combinations

- **Responsive Design Helpers** (`utils/responsive.ts`)
  - Breakpoint system (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, xxl: 1536px)
  - Device type detection (mobile, tablet, desktop)
  - Responsive value selector
  - Dimension helpers (width/height percentage)
  - Scaling utilities (scale, moderateScale, verticalScale)
  - Orientation detection
  - Grid column calculator

- **Platform Utilities** (`utils/platform.ts`)
  - Platform detection (iOS, Android, Web)
  - Platform-specific value selection
  - Status bar height detection
  - Safe area insets
  - Haptic feedback support detection
  - App version information
  - Keyboard behavior configuration

#### 🧩 Components
- **AppHeader** - Reusable header component with:
  - Placeholder logo (customizable)
  - Project name display
  - Theme toggle with haptic feedback
  - GitHub/external link icon
  - Sticky positioning on web
  
- **GradientBackground** - Theme-aware gradient background component with:
  - Multiple gradient variants
  - Custom color support
  - Automatic light/dark adaptation

- **Themed Components**
  - ThemedText - Typography with automatic theme adaptation
  - ThemedView - Container with theme-aware background
  - Collapsible - Expandable content sections

#### 📱 Application Structure
- **Landing Page** (`app/index.tsx`)
  - Hero section with app introduction
  - Feature cards showcasing template capabilities
  - Quick start guide
  - Modern, gradient-based design

- **About Page** (`app/about.tsx`)
  - Platform information display
  - Feature documentation with collapsible sections
  - Getting started guide
  - Resource links to documentation

- **Modal Example** (`app/modal.tsx`)
  - Demonstrates modal navigation pattern
  - Works across all platforms (iOS, Android, Web)

- **Simplified Navigation**
  - Stack-based navigation (platform-agnostic)
  - Removed tab navigation for cleaner structure
  - Works seamlessly on mobile, tablet, and web

#### 🔧 Development Experience
- **TypeScript** - Full type safety throughout the project
- **ESLint Configuration** - Code quality and consistency
- **Icon System** - SF Symbols (iOS) with Material Icons fallback (Android/Web)
- **Expo Vector Icons Integration** - Direct access to FontAwesome, MaterialCommunityIcons, and other icon families

#### 📦 Dependencies
- `expo-linear-gradient` - Gradient background support
- `expo-secure-store` - Secure storage for mobile platforms
- `expo-haptics` - Haptic feedback support
- All Expo SDK 54 essentials

### Changed
- **Theme System** - Migrated from basic color scheme to comprehensive MD3 theming with context
- **Storage** - Replaced AsyncStorage with SecureStore (mobile) and localStorage (web) for better security
- **Navigation Structure** - Simplified from tab-based to stack-based for universal platform support
- **Icon System** - Extended icon mapping to support more Material Icons
- **App Layout** - Updated to use ThemeProvider with proper context management

### Removed
- **Demo Components**
  - HelloWave animation component
  - ParallaxScrollView component
  - Tab navigation example screens
  
- **Dependencies**
  - `@react-native-async-storage/async-storage` (replaced with SecureStore + localStorage)

### Fixed
- Theme toggle icon visibility on Android and Web (added proper Material Icons mapping)
- GitHub icon - using FontAwesome for proper icon display across all platforms
- Import organization and code formatting consistency

## Project Structure

```
utilities/
├── app/                          # Application screens
│   ├── index.tsx                # Landing page
│   ├── about.tsx                # About/documentation page
│   ├── modal.tsx                # Example modal
│   └── _layout.tsx              # Root layout with theme provider
├── components/                   # Reusable components
│   ├── app-header.tsx           # App header with theme toggle
│   ├── gradient-background.tsx  # Gradient backgrounds
│   ├── themed-text.tsx          # Themed text component
│   ├── themed-view.tsx          # Themed view component
│   └── ui/                      # UI components
├── constants/                    # Constants and configuration
│   └── theme.ts                 # Theme colors and gradients
├── contexts/                     # React contexts
│   └── theme-context.tsx        # Theme management
├── hooks/                        # Custom hooks
│   ├── use-color-scheme.ts      # Color scheme hook
│   └── use-theme-color.ts       # Theme hooks
├── utils/                        # Utility functions
│   ├── styles.ts                # Style utilities
│   ├── responsive.ts            # Responsive helpers
│   ├── platform.ts              # Platform utilities
│   └── index.ts                 # Exports
└── README.md                     # Documentation
```

## Features Highlights

### 🎨 Material Design 3 Theming
- Full MD3 color palette
- Light, dark, and system modes
- Persistent preferences
- Easy customization

### 🌈 Gradient System
- Theme-aware gradients
- Multiple variants (primary, accent, custom)
- Customizable in `constants/theme.ts`

### 📐 Utility-First Styling
- Pre-built layout, spacing, and styling utilities
- Responsive design helpers
- Platform-specific utilities
- Type-safe with IntelliSense

### 📱 Cross-Platform Ready
- iOS native application
- Android native application
- Progressive Web App
- Single codebase

### 🔒 Secure by Default
- SecureStore for sensitive data (mobile)
- localStorage for web
- Type-safe storage abstraction

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platform
npm run ios        # iOS
npm run android    # Android
npm run web        # Web
```

## Customization

### Theme Colors
Edit `constants/theme.ts` to customize your brand colors and gradients.

### App Configuration
Update `app.json` with your app name and settings.

### Content
Replace `app/index.tsx` and `app/about.tsx` with your own content.

## Future Enhancements

Planned branches for different features:
- `auth-firebase` - Firebase Authentication
- `auth-supabase` - Supabase Authentication
- `auth-clerk` - Clerk Authentication
- `state-zustand` - Zustand state management
- `state-redux` - Redux Toolkit state management

## License

MIT License - Free to use for personal and commercial projects.

---

**Version 1.0.0** - Initial production-ready release
Built with ❤️ using Expo and React Native

