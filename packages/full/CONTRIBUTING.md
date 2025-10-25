# Contributing to Cross-Platform Starter Template

Thank you for your interest in contributing! This template is designed to be a solid foundation for cross-platform React Native projects.

## 🎯 Philosophy

This template prioritizes:
- **Simplicity** - Only essential features in the base template
- **Flexibility** - Easy to customize and extend
- **Best Practices** - Modern patterns and clean architecture
- **Cross-Platform** - True write-once, run-everywhere approach

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- (Optional) Xcode for iOS development
- (Optional) Android Studio for Android development

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd utilities

# Install dependencies
npm install

# Start development server
npm start
```

## 📝 Making Changes

### Code Style

- **TypeScript** - Use TypeScript for all new code
- **Formatting** - Code is auto-formatted with Prettier (integrated with ESLint)
- **Naming Conventions**:
  - Components: PascalCase (`AppHeader.tsx`)
  - Hooks: camelCase with `use` prefix (`useTheme.ts`)
  - Utilities: camelCase (`responsive.ts`)
  - Constants: UPPER_SNAKE_CASE

### Component Guidelines

```tsx
// ✅ Good - Typed, documented, exported
/**
 * MyComponent description
 */
export function MyComponent({ title }: { title: string }) {
  const theme = usePaperTheme();
  
  return (
    <View style={[layout.flex1, gutters.padding.md]}>
      <ThemedText>{title}</ThemedText>
    </View>
  );
}

// ❌ Bad - No types, no documentation
export default function MyComponent(props) {
  return <View><Text>{props.title}</Text></View>;
}
```

### Utility Styles First

Always try to use existing utilities before creating custom styles:

```tsx
// ✅ Good
<View style={[layout.flex1, layout.center, gutters.padding.lg]}>

// ❌ Bad (unless necessary)
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
```

### Theme-Aware Components

All components should respect the theme:

```tsx
// ✅ Good
const theme = usePaperTheme();
<View style={{ backgroundColor: theme.colors.surface }}>

// ❌ Bad
<View style={{ backgroundColor: '#FFFFFF' }}>
```

## 🧪 Testing

Before submitting changes:

```bash
# Check TypeScript types
npx tsc --noEmit

# Run linter
npm run lint

# Test on all platforms
npm run web
npm run ios     # macOS only
npm run android
```

## 📦 Adding Dependencies

### Before Adding a Package

1. Is it really necessary?
2. Does it work on all platforms (iOS, Android, Web)?
3. Is it actively maintained?
4. What's the bundle size impact?
5. Is the license compatible (MIT preferred)?

### Adding a Package

```bash
# Install
npm install package-name

# Update documentation
# - Add to README if it's a major dependency
# - Document usage if needed
# - Update CHANGELOG.md
```

## 🎨 Adding New Utilities

When adding utilities to `utils/`:

1. Keep functions pure and platform-agnostic when possible
2. Add TypeScript types
3. Add JSDoc comments
4. Export from `utils/index.ts`
5. Update README with examples

Example:

```typescript
/**
 * Calculate responsive padding based on screen size
 * @param baseSize - Base padding size
 * @returns Scaled padding value
 */
export function getResponsivePadding(baseSize: number): number {
  const { width } = getDeviceDimensions();
  return width > breakpoints.lg ? baseSize * 1.5 : baseSize;
}
```

## 🌈 Customizing Gradients

To add new gradient variants:

1. Edit `constants/theme.ts`:
```typescript
export const gradientColors = {
  light: {
    custom: ["#your", "#colors", "#here"],
  },
  dark: {
    custom: ["#your", "#colors", "#here"],
  },
};
```

2. Update TypeScript types if needed

## 🔧 Branch Strategy

- `main` - Stable, production-ready base template
- `feature/*` - New features
- `auth-*` - Authentication implementations
- `state-*` - State management setups

## 📋 Pull Request Process

1. **Create a descriptive branch**
   ```bash
   git checkout -b feature/add-dark-mode-improvements
   ```

2. **Make your changes**
   - Follow code style guidelines
   - Add/update tests if applicable
   - Update documentation

3. **Test thoroughly**
   - Test on iOS, Android, and Web
   - Test in both light and dark modes
   - Check TypeScript types
   - Run linter

4. **Commit with clear messages**
   ```bash
   git commit -m "feat: improve dark mode transition animation"
   ```

   Use conventional commits:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation
   - `style:` - Code style (formatting)
   - `refactor:` - Code refactoring
   - `test:` - Tests
   - `chore:` - Maintenance

5. **Update CHANGELOG.md**
   Add your changes under `[Unreleased]` section

6. **Create Pull Request**
   - Describe what changed and why
   - Include screenshots for UI changes
   - Reference any related issues

## 🐛 Reporting Issues

When reporting bugs, include:
- Platform (iOS, Android, Web)
- OS version
- Node.js version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 💡 Suggesting Features

For feature requests:
- Explain the use case
- Describe the proposed solution
- Consider if it fits the template's philosophy
- Would it benefit most users or is it too specific?

## 📚 Documentation

When adding features:
- Update README.md
- Add examples
- Update CHANGELOG.md
- Add inline code comments for complex logic
- Update TypeScript types

## ✅ Code Review Checklist

Before submitting:
- [ ] Code follows style guidelines
- [ ] TypeScript types are correct
- [ ] No linter errors
- [ ] Tested on iOS, Android, Web
- [ ] Tested in light and dark modes
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Commit messages are clear

## 🤝 Community Guidelines

- Be respectful and constructive
- Help others learn
- Share knowledge
- Give credit where due
- Focus on the code, not the person

## 📞 Questions?

- Check existing issues and discussions
- Review the README and documentation
- Ask in GitHub Discussions

## 🙏 Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Appreciated for their work!

---

Thank you for contributing to making this template better! 🚀

