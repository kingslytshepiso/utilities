const fs = require("fs");
const path = require("path");

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

console.log("🔧 Fixing package.json files for standalone templates...\n");

templates.forEach((template) => {
  const targetDir = `../utilities-${template}`;
  const packageJsonPath = path.join(targetDir, "package.json");

  console.log(`📦 Fixing ${template} template...`);

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    // Remove workspace dependencies
    delete packageJson.dependencies["@utilities/shared-core"];
    delete packageJson.dependencies["@utilities/shared-auth"];
    // Remove workspace devDependencies
    delete packageJson.devDependencies["@utilities/shared-core"];
    delete packageJson.devDependencies["@utilities/shared-auth"];

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

    console.log(`  ✅ ${template} template package.json fixed!`);
  } catch (error) {
    console.error(`  ❌ Error fixing ${template} template:`, error.message);
  }
});

function getTemplateDescription(template) {
  const descriptions = {
    basic:
      "Basic React Native starter template with theming, utilities, and responsive design",
    auth: "React Native starter template with Supabase authentication, theming, utilities, and responsive design",
    full: "Full-featured React Native starter template with authentication, analytics, notifications, theming, utilities, and responsive design",
  };

  return descriptions[template] || "React Native starter template";
}

console.log("\n🎉 Package.json files fixed successfully!");
console.log("\n📋 Next steps:");
console.log("1. Test the standalone templates");
console.log("2. Create GitHub repositories for each template");
console.log("3. Push the templates to their repositories");
console.log("4. Set up GitHub Actions for automatic sync");
