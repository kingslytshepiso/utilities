# Utilities Monorepo - React Native Starter Templates

A collection of production-ready React Native starter templates with **shared packages** and **standalone distribution** for maximum flexibility.

[![GitHub](https://img.shields.io/badge/GitHub-kingslytshepiso%2Futilities-blue?logo=github)](https://github.com/kingslytshepiso/utilities)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Expo](https://img.shields.io/badge/Expo-SDK%2052-blue.svg?logo=expo)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg?logo=typescript)](https://www.typescriptlang.org/)

## 🏗️ **Architecture Overview**

### **Shared Packages** (No Duplication!)

```
packages/
├── shared/
│   ├── core/              # Core components, utils, themes
│   └── auth/              # Authentication components & logic
│
├── basic/                 # Basic template (uses @utilities/shared-core)
└── auth/                  # Auth template (uses shared-core + shared-auth)
```

### **Template Packages** (Minimal & Clean!)

Each template package is now **ultra-lightweight** and imports from shared packages:

```typescript
// packages/basic/app/_layout.tsx
import {
  AppHeader,
  GradientBackground,
  BottomNav,
  ThemeProvider,
} from "@utilities/shared-core";
```

## 🎯 **Template Variants**

### 📦 **Basic Template** (`packages/basic`)

- **Dependencies**: `@utilities/shared-core`
- **Features**: Theming, utilities, responsive design, navigation
- **Perfect for**: Simple apps, learning, quick prototypes

### 🔐 **Auth Template** (`packages/auth`)

- **Dependencies**: `@utilities/shared-core` + `@utilities/shared-auth`
- **Features**: Basic + Supabase authentication, protected routes
- **Perfect for**: Apps requiring user accounts


## 🚀 **Quick Start**

### **Option 1: Use Standalone Templates (Recommended)**

```bash
# Clone a specific template (no monorepo needed)
git clone https://github.com/kingslytshepiso/utilities-basic.git
cd utilities-basic

# Install dependencies
npm install --legacy-peer-deps

# Start development
npm start
```

**Available Standalone Templates:**

- **Basic:** https://github.com/kingslytshepiso/utilities-basic
- **Auth:** https://github.com/kingslytshepiso/utilities-auth

### **Option 2: Use Monorepo for Development**

> **Note:** The root workspace is a tooling/packaging layer only; there is no Expo `app.json` here anymore. Always run `npm start` from inside the chosen package (`packages/basic` or `packages/auth`) or use the workspace scripts below.

```bash
# Clone the repository
git clone https://github.com/kingslytshepiso/utilities.git
cd utilities

# Install all dependencies (including shared packages)
npm run install:all

# Choose your template
cd packages/basic    # or packages/auth

# Start development
npm start
```

### **Option 3: Use Workspace Commands**

```bash
# Clone the repository
git clone https://github.com/kingslytshepiso/utilities.git
cd utilities

# Install all dependencies
npm run install:all

# Start specific template
npm run dev:basic    # Basic template
npm run dev:auth     # Auth template
```

## 📁 **Shared Packages Structure**

### **@utilities/shared-core**

Contains all the common functionality:

```
packages/shared/core/
├── src/
│   ├── components/         # AppHeader, GradientBackground, BottomNav, etc.
│   ├── utils/             # Platform, responsive, styles utilities
│   ├── constants/         # Theme configuration
│   ├── hooks/             # useTheme, useColorScheme, etc.
│   └── contexts/          # ThemeProvider
└── package.json
```

### **@utilities/shared-auth**

Contains all authentication functionality:

```
packages/shared/auth/
├── src/
│   ├── auth-button.tsx     # Auth components
│   ├── auth-container.tsx
│   ├── protected-route.tsx
│   ├── auth-context.tsx   # Auth context
│   └── lib/               # Supabase integration
└── package.json
```

## 🎨 **Template Features**

### **All Templates Include:**

- 🎨 **Material Design 3 Theming** - React Native Paper with full MD3 support
- 🌓 **Smart Theme Switching** - Light, dark, and system modes
- 📱 **Cross-Platform** - iOS, Android, and Web support
- 🎯 **File-Based Routing** - Expo Router navigation
- 📐 **Utility Styling System** - Pre-built utilities for rapid development
- 📱 **Responsive Design** - Adaptive layouts for all screen sizes
- 🔧 **TypeScript** - Full type safety and IntelliSense
- 🔒 **Secure Storage** - SecureStore for mobile, localStorage for web

### **Auth Template Adds:**

- 🔐 **Supabase Authentication** - Complete auth system
- 👤 **User Management** - Login, signup, password reset
- 🔒 **Protected Routes** - Route protection and guards
- 🌐 **OAuth Integration** - Social authentication
- 🧪 **Comprehensive Testing** - Full test suite for auth features



## 🛠️ **Development**

### **Workspace Commands**

```bash
# Install all dependencies (including shared packages)
npm run install:all

# Build all packages (including shared packages)
npm run build

# Start specific template
npm run dev:basic
npm run dev:auth

# Run tests for all packages
npm run test

# Lint all packages
npm run lint
```

### **Shared Package Development**

```bash
# Build shared packages
cd packages/shared/core
npm run build

cd packages/shared/auth
npm run build

# Watch mode for development
npm run dev
```

## 🧪 **Testing**

- **Central config**: `jest.config.js` at the repo root defines all presets, module mappings, and coverage roots so every workspace uses the same test surface.
- **Shared setup**: `jest.setup.js` loads `packages/shared/jest.setup.js` plus some root-only helpers to mock the theme context, `structuredClone`, and suppressed `act()` warnings.
- **Template scripts**: Each template package runs `jest --config=../../jest.config.js` so you never need to maintain a second Jest config in every workspace.

## 🔧 **Adding New Features**

### **To Shared Core Package:**

1. Add component/utility to `packages/shared/core/src/`
2. Export from `packages/shared/core/src/index.ts`
3. All templates automatically get the new feature

### **To Shared Auth Package:**

1. Add auth component to `packages/shared/auth/src/`
2. Export from `packages/shared/auth/src/index.ts`
3. Auth template gets the new feature

### **To Template Packages:**

1. Import from shared packages: `import { Component } from "@utilities/shared-core"`
2. Use the component in your template
3. No duplication needed!

## 📚 **Benefits of Shared Architecture**

### **✅ Eliminates Duplication**

- **No more copied components** across packages
- **Single source of truth** for common functionality
- **Easy maintenance** - update once, affects all templates

### **✅ Clean Template Packages**

- **Ultra-lightweight** template packages
- **Clear dependencies** - easy to see what each template includes
- **Focused templates** - each template has a specific purpose

### **✅ Easy Distribution**

- **Shared packages** can be published to npm
- **Template packages** are simple and focused
- **Users get exactly what they need**

### **✅ Scalable Architecture**

- **Add new shared packages** for new feature sets
- **Compose templates** by combining shared packages
- **Easy to maintain** and extend

## 🚀 **Deployment**

### **Building for Production**

```bash
# Build all shared packages
npm run build --workspace=packages/shared/core
npm run build --workspace=packages/shared/auth

# Build specific template
cd packages/basic
npm run build
```

### **Publishing Shared Packages**

```bash
# Publish shared packages to npm (optional)
cd packages/shared/core
npm publish

cd packages/shared/auth
npm publish
```

## 🤝 **Contributing**

1. **Fork the repository**
2. **Create a feature branch**
3. **Add features to appropriate shared packages**
4. **Update template packages to use new features**
5. **Test all templates**
6. **Submit a pull request**

### **Adding New Shared Packages**

1. **Create new shared package**: `packages/shared/analytics/`
2. **Add to workspace**: Update `package.json` workspaces
3. **Create package.json** with proper dependencies
4. **Add to templates** that need the new functionality

## 📄 **License**

MIT License - feel free to use these templates for personal or commercial projects.

## 🔗 **Resources**

- [Expo Documentation](https://docs.expo.dev)
- [React Native Paper](https://reactnativepaper.com)
- [Expo Router](https://docs.expo.dev/router/introduction)
- [React Native](https://reactnative.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Supabase](https://supabase.com)

## 💡 **Tips**

1. **Start Simple**: Begin with the basic template and add features as needed
2. **Shared Philosophy**: Common code lives in shared packages, templates are minimal
3. **Clean Separation**: Each shared package has a specific purpose
4. **Easy Maintenance**: Update shared packages to fix bugs across all templates
5. **Production Ready**: All templates are production-ready with proper testing

## 🐛 **Troubleshooting**

### **Common Issues**

1. **Shared package not found**: Run `npm run install:all` to install all dependencies
2. **Build errors**: Make sure shared packages are built first
3. **Import errors**: Check that shared packages are properly exported

### **Getting Help**

1. Check the shared package documentation
2. Review the template-specific documentation
3. Open an issue in the repository
4. Check the [Expo documentation](https://docs.expo.dev)

---

**Happy coding! 🚀**

This shared architecture eliminates duplication while keeping templates clean and focused. Choose the template that fits your needs and start building amazing React Native applications!
