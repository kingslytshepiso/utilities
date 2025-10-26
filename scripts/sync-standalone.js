const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const templates = ["basic", "auth", "full"];

// Shared dependencies that need to be included in standalone templates
const sharedDependencies = {
  "@expo/vector-icons": "^15.0.2",
  "@react-navigation/bottom-tabs": "^7.4.0",
  "@react-navigation/elements": "^2.6.3",
  "@react-navigation/native": "^7.1.8",
  expo: "~54.0.13",
  "expo-constants": "~18.0.9",
  "expo-font": "~14.0.9",
  "expo-haptics": "~15.0.7",
  "expo-image": "~3.0.9",
  "expo-linear-gradient": "^15.0.7",
  "expo-linking": "~8.0.8",
  "expo-router": "~6.0.11",
  "expo-splash-screen": "~31.0.10",
  "expo-status-bar": "~3.0.8",
  "expo-symbols": "~1.0.7",
  "expo-system-ui": "~6.0.7",
  react: "19.1.0",
  "react-dom": "19.1.0",
  "react-native": "0.81.4",
  "react-native-gesture-handler": "~2.28.0",
  "react-native-paper": "^5.14.5",
  "react-native-reanimated": "~4.1.1",
  "react-native-safe-area-context": "~5.6.0",
  "react-native-screens": "~4.16.0",
  "react-native-web": "~0.21.0",
  "react-native-worklets": "0.5.1",
};

// Auth-specific dependencies
const authDependencies = {
  "@hookform/resolvers": "^5.2.2",
  "@supabase/supabase-js": "^2.75.1",
  "expo-secure-store": "^15.0.7",
  "expo-web-browser": "~15.0.8",
  "react-hook-form": "^7.65.0",
  yup: "^1.7.1",
};

// Testing dependencies
const testingDependencies = {
  "@testing-library/jest-native": "^5.4.3",
  "@testing-library/react-native": "^13.3.3",
  "@types/jest": "^30.0.0",
  "@types/react": "~19.1.0",
  eslint: "^9.25.0",
  "eslint-config-expo": "~10.0.0",
  jest: "^30.2.0",
  "jest-expo": "^54.0.12",
  typescript: "~5.9.2",
};

console.log("🚀 Starting standalone template sync...\n");

templates.forEach((template) => {
  const sourceDir = `packages/${template}`;
  const targetDir = `../utilities-${template}`;

  console.log(`📦 Syncing ${template} template...`);

  try {
    // Create target directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Copy template files
    console.log(`  📁 Copying template files...`);
    if (process.platform === "win32") {
      // Windows: Use robocopy
      execSync(`robocopy "${sourceDir}" "${targetDir}" /E /MIR`, {
        stdio: "inherit",
      });
    } else {
      // Unix/Linux: Use rsync
      execSync(`rsync -av --delete ${sourceDir}/ ${targetDir}/`, {
        stdio: "inherit",
      });
    }

    // Update package.json
    console.log(`  📝 Updating package.json...`);
    updatePackageJson(template, targetDir);

    // Copy shared code
    console.log(`  🔄 Merging shared code...`);
    copySharedCode(template, targetDir);

    // Copy testing setup
    console.log(`  🧪 Setting up testing...`);
    copyTestingSetup(targetDir);

    // Create template-specific README
    console.log(`  📚 Creating README...`);
    createTemplateReadme(template, targetDir);

    console.log(`  ✅ ${template} template synced successfully!\n`);
  } catch (error) {
    console.error(`  ❌ Error syncing ${template} template:`, error.message);
  }
});

function updatePackageJson(template, targetDir) {
  const packageJsonPath = path.join(targetDir, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  // Remove workspace dependencies
  delete packageJson.dependencies["@utilities/shared-core"];
  delete packageJson.dependencies["@utilities/shared-auth"];
  delete packageJson.dependencies["@utilities/shared-testing"];

  // Add all shared dependencies
  packageJson.dependencies = {
    ...sharedDependencies,
    ...packageJson.dependencies,
  };

  // Add auth dependencies for auth and full templates
  if (template === "auth" || template === "full") {
    packageJson.dependencies = {
      ...packageJson.dependencies,
      ...authDependencies,
    };
  }

  // Add testing dependencies
  packageJson.devDependencies = {
    ...testingDependencies,
    ...packageJson.devDependencies,
  };

  // Update scripts
  packageJson.scripts = {
    start: "expo start",
    android: "expo start --android",
    ios: "expo start --ios",
    web: "expo start --web",
    lint: "expo lint",
    test: "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    ...packageJson.scripts,
  };

  // Add auth-specific test script
  if (template === "auth" || template === "full") {
    packageJson.scripts["test:auth"] = "jest --testPathPattern=auth";
  }

  // Add Jest configuration
  packageJson.jest = {
    preset: "jest-expo",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    testPathIgnorePatterns: ["/node_modules/"],
    transformIgnorePatterns: [
      "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|victory-native|victory-[^/]+|react-native-svg|expo-modules-core|expo|@expo/vector-icons)",
    ],
  };

  // Update metadata
  packageJson.name = `utilities-${template}`;
  packageJson.description = getTemplateDescription(template);
  packageJson.private = true;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

function copySharedCode(template, targetDir) {
  // Copy shared core code
  const coreSource = "packages/shared/core/src";

  if (fs.existsSync(coreSource)) {
    console.log(`    📦 Copying shared core code...`);
    if (process.platform === "win32") {
      execSync(`robocopy "${coreSource}" "${targetDir}" /E`, {
        stdio: "inherit",
      });
    } else {
      execSync(`cp -r ${coreSource}/* ${targetDir}/`, { stdio: "inherit" });
    }
  }

  // Copy shared auth code for auth and full templates
  if (template === "auth" || template === "full") {
    const authSource = "packages/shared/auth/src";

    if (fs.existsSync(authSource)) {
      console.log(`    🔐 Copying shared auth code...`);
      if (process.platform === "win32") {
        execSync(`robocopy "${authSource}" "${targetDir}" /E`, {
          stdio: "inherit",
        });
      } else {
        execSync(`cp -r ${authSource}/* ${targetDir}/`, { stdio: "inherit" });
      }
    }
  }
}

function copyTestingSetup(targetDir) {
  const testingSource = "packages/shared/testing";
  const testingTarget = path.join(targetDir, "__tests__");

  if (fs.existsSync(testingSource)) {
    // Create tests directory
    if (!fs.existsSync(testingTarget)) {
      fs.mkdirSync(testingTarget, { recursive: true });
    }

    // Copy test utilities
    if (process.platform === "win32") {
      execSync(`robocopy "${testingSource}/src" "${testingTarget}" /E`, {
        stdio: "inherit",
      });
    } else {
      execSync(`cp -r ${testingSource}/src/* ${testingTarget}/`, {
        stdio: "inherit",
      });
    }

    // Copy Jest configuration
    if (process.platform === "win32") {
      execSync(`copy "${testingSource}/jest.config.js" "${targetDir}/"`, {
        stdio: "inherit",
      });
      execSync(`copy "${testingSource}/jest.setup.js" "${targetDir}/"`, {
        stdio: "inherit",
      });
    } else {
      execSync(`cp ${testingSource}/jest.config.js ${targetDir}/`, {
        stdio: "inherit",
      });
      execSync(`cp ${testingSource}/jest.setup.js ${targetDir}/`, {
        stdio: "inherit",
      });
    }

    // Copy mocks
    const mocksSource = path.join(testingSource, "mocks");
    const mocksTarget = path.join(targetDir, "__mocks__");

    if (fs.existsSync(mocksSource)) {
      if (process.platform === "win32") {
        execSync(`robocopy "${mocksSource}" "${mocksTarget}" /E`, {
          stdio: "inherit",
        });
      } else {
        execSync(`cp -r ${mocksSource}/* ${mocksTarget}/`, {
          stdio: "inherit",
        });
      }
    }
  }
}

function createTemplateReadme(template, targetDir) {
  const readmeContent = getTemplateReadme(template);
  const readmePath = path.join(targetDir, "README.md");

  fs.writeFileSync(readmePath, readmeContent);
}

function getTemplateDescription(template) {
  const descriptions = {
    basic:
      "Basic React Native starter template with theming, utilities, and responsive design",
    auth: "React Native starter template with Supabase authentication, theming, utilities, and responsive design",
    full: "Full-featured React Native starter template with authentication, analytics, notifications, theming, utilities, and responsive design",
  };

  return descriptions[template] || "React Native starter template";
}

function getTemplateReadme(template) {
  const readmes = {
    basic: `# Basic React Native Starter Template

A clean, minimal React Native starter template with theming, utilities, and responsive design.

## 🚀 Quick Start

\`\`\`bash
git clone https://github.com/kingslytshepiso/utilities-basic.git
cd utilities-basic
npm install
npm start
\`\`\`

## ✨ Features

- 🎨 Material Design 3 Theming
- 🌓 Smart Theme Switching
- 📱 Cross-Platform Support
- 🎯 File-Based Routing
- 📐 Utility Styling System
- 📱 Responsive Design
- 🔧 TypeScript Support

## 📱 Platforms

- iOS
- Android
- Web

## 🛠️ Development

\`\`\`bash
npm start          # Start development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on Web
npm test           # Run tests
npm run test:watch # Run tests in watch mode
npm run test:coverage # Run tests with coverage
\`\`\`

## 📚 Documentation

- [Expo Documentation](https://docs.expo.dev)
- [React Native Paper](https://reactnativepaper.com)
- [Expo Router](https://docs.expo.dev/router/introduction)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.`,

    auth: `# React Native Starter Template with Authentication

A production-ready React Native starter template with Supabase authentication, theming, utilities, and responsive design.

## 🚀 Quick Start

\`\`\`bash
git clone https://github.com/kingslytshepiso/utilities-auth.git
cd utilities-auth
npm install

# Configure Supabase
cp .env.example .env
# Edit .env with your Supabase credentials

npm start
\`\`\`

## ✨ Features

- 🔐 Complete Supabase Authentication
- 👤 User Management (Login, Signup, Password Reset)
- 🔒 Protected Routes
- 🌐 OAuth Integration
- 🎨 Material Design 3 Theming
- 🌓 Smart Theme Switching
- 📱 Cross-Platform Support
- 🎯 File-Based Routing
- 📐 Utility Styling System
- 📱 Responsive Design
- 🔧 TypeScript Support
- 🧪 Comprehensive Testing

## 🔧 Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the dashboard
3. Update \`.env\` file with your credentials:

\`\`\`bash
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
\`\`\`

4. Configure authentication providers in your Supabase dashboard
5. Start the app and test authentication flows

## 📱 Platforms

- iOS
- Android
- Web

## 🛠️ Development

\`\`\`bash
npm start          # Start development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on Web
npm test           # Run tests
npm run test:watch # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run test:auth  # Run auth-specific tests
\`\`\`

## 📚 Documentation

- [Expo Documentation](https://docs.expo.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [React Native Paper](https://reactnativepaper.com)
- [Expo Router](https://docs.expo.dev/router/introduction)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.`,

    full: `# Full-Featured React Native Starter Template

A comprehensive React Native starter template with authentication, analytics, notifications, theming, utilities, and responsive design.

## 🚀 Quick Start

\`\`\`bash
git clone https://github.com/kingslytshepiso/utilities-full.git
cd utilities-full
npm install

# Configure all services
cp .env.example .env
# Edit .env with your service credentials

npm start
\`\`\`

## ✨ Features

- 🔐 Complete Supabase Authentication
- 👤 User Management (Login, Signup, Password Reset)
- 🔒 Protected Routes
- 🌐 OAuth Integration
- 📊 Analytics Integration
- 🔔 Push Notifications
- 🎨 Material Design 3 Theming
- 🌓 Smart Theme Switching
- 📱 Cross-Platform Support
- 🎯 File-Based Routing
- 📐 Utility Styling System
- 📱 Responsive Design
- 🔧 TypeScript Support
- 🧪 Comprehensive Testing

## 🔧 Service Setup

### Supabase Authentication
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the dashboard
3. Update \`.env\` file with your credentials

### Analytics (Optional)
1. Set up your analytics service
2. Update \`.env\` file with your analytics credentials

### Push Notifications (Optional)
1. Set up your push notification service
2. Update \`.env\` file with your notification credentials

## 📱 Platforms

- iOS
- Android
- Web

## 🛠️ Development

\`\`\`bash
npm start          # Start development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on Web
npm test           # Run tests
npm run test:watch # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run test:auth  # Run auth-specific tests
\`\`\`

## 📚 Documentation

- [Expo Documentation](https://docs.expo.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [React Native Paper](https://reactnativepaper.com)
- [Expo Router](https://docs.expo.dev/router/introduction)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.`,
  };

  return readmes[template] || readmes.basic;
}

console.log("🎉 Standalone template sync completed!");
console.log("\n📋 Next steps:");
console.log("1. Create standalone repositories on GitHub");
console.log("2. Push the synced templates to their repositories");
console.log("3. Set up GitHub Actions for automatic sync");
console.log("4. Test standalone usage of each template");
