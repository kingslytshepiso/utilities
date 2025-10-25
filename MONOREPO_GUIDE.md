# Monorepo Feature Flag Guide

This template uses a **monorepo approach with feature flags** to manage different application variants in a single codebase. This eliminates the need for separate branches while providing flexibility to enable/disable features.

## 🎯 Benefits

- **Single Codebase**: Maintain one repository instead of multiple branches
- **Consistent Updates**: All variants stay in sync with core improvements
- **Easy Testing**: Comprehensive test coverage for all features
- **Flexible Deployment**: Enable/disable features per environment
- **Better Documentation**: Single source of truth

## 🚀 Quick Start

### 1. Choose Your Variant

```bash
# Basic template (no authentication)
npm run setup:basic

# Template with authentication
npm run setup:auth

# Full-featured template
npm run setup:full
```

### 2. Configure Environment

Copy the generated `.env` file and configure your variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Install and Run

```bash
npm install
npm start
```

## 🔧 Feature Flags

### Available Features

| Feature         | Description                    | Dependencies                                      |
| --------------- | ------------------------------ | ------------------------------------------------- |
| `auth`          | Supabase authentication system | `@supabase/supabase-js`, `react-hook-form`, `yup` |
| `analytics`     | Analytics tracking             | TBD                                               |
| `notifications` | Push notifications             | TBD                                               |
| `socialLogin`   | Social authentication          | Requires `auth`                                   |
| `biometricAuth` | Biometric authentication       | Requires `auth`                                   |

### Environment Variables

```bash
# Feature toggles
EXPO_PUBLIC_ENABLE_AUTH=true
EXPO_PUBLIC_ENABLE_ANALYTICS=false
EXPO_PUBLIC_ENABLE_NOTIFICATIONS=false
EXPO_PUBLIC_ENABLE_SOCIAL_LOGIN=true
EXPO_PUBLIC_ENABLE_BIOMETRIC_AUTH=false

# Configuration (only used if features are enabled)
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 💻 Usage in Code

### Using Feature Hooks

```tsx
import { useFeature, useFeatures } from "@/hooks/use-features";

function MyComponent() {
  const isAuthEnabled = useFeature("auth");
  const features = useFeatures();

  if (isAuthEnabled) {
    return <AuthenticatedContent />;
  }

  return <PublicContent />;
}
```

### Conditional Rendering

```tsx
import { FeatureGate } from "@/components/feature-gate";

function App() {
  return (
    <div>
      <PublicContent />

      <FeatureGate feature="auth">
        <AuthenticatedContent />
      </FeatureGate>

      <FeatureGate feature="analytics" fallback={<div>Analytics disabled</div>}>
        <AnalyticsDashboard />
      </FeatureGate>
    </div>
  );
}
```

### Higher-Order Components

```tsx
import { withFeatureGate } from "@/components/feature-gate";

const AuthRequiredComponent = withFeatureGate("auth")(({ user }) => (
  <div>Welcome {user.name}!</div>
));
```

## 🏗️ Architecture

### File Structure

```
├── config/
│   └── features.ts          # Feature flag configuration
├── hooks/
│   └── use-features.ts     # Feature flag hooks
├── components/
│   └── feature-gate.tsx    # Conditional rendering components
├── scripts/
│   └── setup-variant.js     # Variant setup script
└── app/
    └── _layout.tsx          # Main layout with feature integration
```

### Feature Configuration

```typescript
// config/features.ts
export const FEATURES = {
  AUTH: "auth" as const,
  ANALYTICS: "analytics" as const,
  // ... more features
} as const;

export const getFeatures = (): FeatureConfig => ({
  auth: process.env.EXPO_PUBLIC_ENABLE_AUTH === "true",
  analytics: process.env.EXPO_PUBLIC_ENABLE_ANALYTICS === "true",
  // ... more features
});
```

## 🎨 Variant Presets

### Basic Template

- **Features**: Core theming, utilities, responsive design
- **Use Case**: Simple apps without user authentication
- **Setup**: `npm run setup:basic`

### Auth Template

- **Features**: Basic + Supabase authentication
- **Use Case**: Apps requiring user accounts
- **Setup**: `npm run setup:auth`

### Full Template

- **Features**: All available features
- **Use Case**: Complex apps with full feature set
- **Setup**: `npm run setup:full`

## 🔄 Migration from Branches

If you're migrating from the old branch-based approach:

1. **Backup your work**: Commit all changes to your current branch
2. **Choose a variant**: Run the appropriate setup script
3. **Test thoroughly**: Ensure all features work as expected
4. **Update documentation**: Update any project-specific docs

## 🧪 Testing

### Feature-Specific Tests

```bash
# Test only authentication features
npm run test:auth

# Test all features
npm test

# Test with coverage
npm run test:coverage
```

### Environment Testing

```bash
# Test with auth disabled
EXPO_PUBLIC_ENABLE_AUTH=false npm start

# Test with all features enabled
EXPO_PUBLIC_ENABLE_AUTH=true EXPO_PUBLIC_ENABLE_ANALYTICS=true npm start
```

## 🚀 Deployment

### Environment-Specific Builds

```bash
# Production with auth
EXPO_PUBLIC_ENABLE_AUTH=true eas build --platform all

# Production without auth
EXPO_PUBLIC_ENABLE_AUTH=false eas build --platform all
```

### CI/CD Integration

```yaml
# .github/workflows/build.yml
- name: Build Basic Variant
  run: |
    npm run setup:basic
    eas build --platform all

- name: Build Auth Variant
  run: |
    npm run setup:auth
    eas build --platform all
```

## 🔧 Advanced Usage

### Runtime Feature Updates

```typescript
import { updateFeatures } from "@/config/features";

// Enable analytics at runtime
updateFeatures({ analytics: true });

// Disable auth for maintenance
updateFeatures({ auth: false });
```

### A/B Testing

```typescript
import { applyPreset } from "@/config/features";

// Apply different presets based on user segment
if (userSegment === "premium") {
  applyPreset("FULL");
} else {
  applyPreset("BASIC");
}
```

### Custom Feature Logic

```typescript
// config/features.ts
export const getFeatures = (): FeatureConfig => {
  const baseFeatures = {
    auth: process.env.EXPO_PUBLIC_ENABLE_AUTH === "true",
    // ... other features
  };

  // Custom logic based on build type
  if (__DEV__) {
    return { ...baseFeatures, analytics: false };
  }

  return baseFeatures;
};
```

## 📚 Best Practices

1. **Feature Naming**: Use clear, descriptive feature names
2. **Documentation**: Document each feature's purpose and dependencies
3. **Testing**: Test all feature combinations
4. **Performance**: Only load code for enabled features
5. **Security**: Never expose sensitive logic through feature flags

## 🐛 Troubleshooting

### Feature Not Working

1. Check environment variables are set correctly
2. Verify feature dependencies are met
3. Check for typos in feature names
4. Ensure proper imports in components

### Build Issues

1. Clear Metro cache: `npx expo start -c`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check TypeScript errors: `npx tsc --noEmit`

## 🤝 Contributing

When adding new features:

1. Add feature to `config/features.ts`
2. Create appropriate hooks in `hooks/use-features.ts`
3. Add conditional rendering components
4. Update setup scripts
5. Add tests for the new feature
6. Update documentation

## 📞 Support

For issues or questions:

1. Check this guide first
2. Review the code comments
3. Open an issue in the repository
4. Check the [Expo documentation](https://docs.expo.dev)

---

**Happy coding! 🚀**

This monorepo approach gives you the flexibility of multiple variants while maintaining a single, manageable codebase.
