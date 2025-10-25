# Utilities Monorepo

A collection of production-ready React Native starter templates with different feature sets, built with Expo, TypeScript, and modern development practices.

[![GitHub](https://img.shields.io/badge/GitHub-kingslytshepiso%2Futilities-blue?logo=github)](https://github.com/kingslytshepiso/utilities)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Expo](https://img.shields.io/badge/Expo-SDK%2052-blue.svg?logo=expo)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg?logo=typescript)](https://www.typescriptlang.org/)

## 🎯 **Template Variants**

### 📦 **Basic Template** (`packages/basic`)
- **Clean, minimal starter** without authentication
- **Perfect for**: Simple apps, learning, quick prototypes
- **Features**: Theming, utilities, responsive design, navigation

### 🔐 **Auth Template** (`packages/auth`)
- **Complete authentication system** with Supabase
- **Perfect for**: Apps requiring user accounts
- **Features**: Basic + login, signup, password reset, OAuth, protected routes

### 🚀 **Full Template** (`packages/full`)
- **All features enabled** for complex applications
- **Perfect for**: Production apps with full feature set
- **Features**: Auth + analytics, notifications, advanced features

## 🚀 **Quick Start**

### **Option 1: Use a Specific Template**

```bash
# Clone the repository
git clone https://github.com/kingslytshepiso/utilities.git
cd utilities

# Choose your template
cd packages/basic    # or packages/auth or packages/full

# Install dependencies
npm install

# Start development
npm start
```

### **Option 2: Use Workspace Commands**

```bash
# Clone the repository
git clone https://github.com/kingslytshepiso/utilities.git
cd utilities

# Install all dependencies
npm run install:all

# Start specific template
npm run dev:basic    # Basic template
npm run dev:auth     # Auth template
npm run dev:full     # Full template
```

## 📁 **Monorepo Structure**

```
utilities/
├── packages/
│   ├── basic/              # Basic template package
│   │   ├── app/            # Expo Router screens
│   │   ├── components/     # Reusable components
│   │   ├── utils/         # Utility functions
│   │   ├── constants/     # Theme configuration
│   │   └── package.json   # Package configuration
│   │
│   ├── auth/               # Auth template package
│   │   ├── app/            # Screens + auth screens
│   │   ├── components/     # Core + auth components
│   │   ├── lib/auth/       # Authentication logic
│   │   ├── contexts/       # Auth context
│   │   └── package.json    # Package configuration
│   │
│   └── full/               # Full template package
│       ├── app/            # All screens
│       ├── components/     # All components
│       ├── lib/            # All libraries
│       └── package.json    # Package configuration
│
├── package.json            # Workspace configuration
└── README.md               # This file
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

### **Full Template Adds:**
- 📊 **Analytics Integration** - User behavior tracking
- 🔔 **Push Notifications** - Real-time notifications
- 🔐 **Biometric Authentication** - Fingerprint/Face ID support
- 📈 **Advanced Features** - All available functionality

## 🛠️ **Development**

### **Workspace Commands**

```bash
# Install all dependencies
npm run install:all

# Start specific template
npm run dev:basic
npm run dev:auth
npm run dev:full

# Run tests for all packages
npm run test

# Lint all packages
npm run lint

# Build all packages
npm run build
```

### **Individual Package Commands**

```bash
# Navigate to specific package
cd packages/basic

# Install dependencies
npm install

# Start development server
npm start

# Run on specific platforms
npm run android
npm run ios
npm run web

# Run tests
npm test
npm run test:coverage
```

## 📚 **Documentation**

Each template package includes comprehensive documentation:

- **`packages/basic/README.md`** - Basic template setup and usage
- **`packages/auth/README.md`** - Auth template with Supabase setup
- **`packages/full/README.md`** - Full template with all features

## 🔧 **Configuration**

### **Environment Variables**

Each template includes an `env.example` file with required environment variables:

```bash
# Copy example file
cp env.example .env

# Edit with your configuration
# Basic template: No additional config needed
# Auth template: Add Supabase credentials
# Full template: Add all service credentials
```

### **Template-Specific Setup**

1. **Basic Template**: No additional setup required
2. **Auth Template**: Configure Supabase project and credentials
3. **Full Template**: Configure all services (Supabase, analytics, notifications)

## 🚀 **Deployment**

### **Building for Production**

```bash
# Build specific template
cd packages/basic
npm run build

# Or use workspace commands
npm run build --workspace=packages/basic
```

### **Platform-Specific Builds**

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 🤝 **Contributing**

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Test all templates**
5. **Submit a pull request**

### **Adding New Features**

When adding new features:

1. **Update the appropriate template(s)**
2. **Add tests for new functionality**
3. **Update documentation**
4. **Ensure backward compatibility**

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
2. **Template Philosophy**: Each template is self-contained and focused
3. **Clean Separation**: No complex configuration or feature flags
4. **Easy Migration**: Switch between templates as your needs grow
5. **Production Ready**: All templates are production-ready with proper testing

## 🐛 **Troubleshooting**

### **Common Issues**

1. **Metro bundler cache issues**: `npx expo start -c`
2. **Package installation issues**: `rm -rf node_modules && npm install`
3. **iOS Simulator issues**: `npx expo run:ios --device`

### **Getting Help**

1. Check the template-specific documentation
2. Review the code comments in the templates
3. Open an issue in the repository
4. Check the [Expo documentation](https://docs.expo.dev)

---

**Happy coding! 🚀**

Choose the template that fits your needs and start building amazing React Native applications!