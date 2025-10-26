# Standalone Template Strategy

## 🎯 **Goal**

Keep the monorepo structure for development while making individual templates **standalone and cloneable** without dependencies.

## ✅ **Solution: Git Subtree Strategy**

### **How It Works:**

1. **Keep monorepo** for development and maintenance
2. **Create standalone repos** that are automatically synced
3. **Users clone standalone repos** - no monorepo needed
4. **Automatic sync** from monorepo to standalone repos

## 🏗️ **Repository Structure**

```
utilities/                    # Main monorepo (development)
├── packages/
│   ├── basic/               # Basic template
│   ├── auth/                # Auth template
│   └── full/                # Full template
└── scripts/
    └── sync-standalone.js   # Sync script

utilities-basic/             # Standalone basic template
├── app/
├── components/
├── utils/
├── constants/
├── hooks/
├── contexts/
├── package.json             # All dependencies included
├── README.md
└── .env.example

utilities-auth/              # Standalone auth template
├── app/
├── components/
├── utils/
├── constants/
├── hooks/
├── contexts/
├── lib/auth/
├── package.json             # All dependencies included
├── README.md
└── .env.example

utilities-full/              # Standalone full template
├── app/
├── components/
├── utils/
├── constants/
├── hooks/
├── contexts/
├── lib/
├── package.json             # All dependencies included
├── README.md
└── .env.example
```

## 🔧 **Implementation**

### **1. Create Standalone Repositories**

```bash
# Create standalone repositories
git init utilities-basic
git init utilities-auth
git init utilities-full
```

### **2. Sync Script**

Create a script that copies and prepares standalone templates:

```javascript
// scripts/sync-standalone.js
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const templates = ["basic", "auth", "full"];

templates.forEach((template) => {
  const sourceDir = `packages/${template}`;
  const targetDir = `../utilities-${template}`;

  console.log(`Syncing ${template} template...`);

  // Copy files
  execSync(`rsync -av --delete ${sourceDir}/ ${targetDir}/`);

  // Update package.json to remove workspace dependencies
  const packageJsonPath = `${targetDir}/package.json`;
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  // Remove workspace dependencies
  delete packageJson.dependencies["@utilities/shared-core"];
  delete packageJson.dependencies["@utilities/shared-auth"];
  delete packageJson.dependencies["@utilities/shared-testing"];

  // Add all necessary dependencies
  packageJson.dependencies = {
    ...packageJson.dependencies,
    // Add all shared dependencies here
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  // Copy shared code into template
  copySharedCode(template, targetDir);

  console.log(`✅ ${template} template synced`);
});

function copySharedCode(template, targetDir) {
  // Copy shared core code
  execSync(`cp -r packages/shared/core/src/* ${targetDir}/`);

  // Copy shared auth code if needed
  if (template === "auth" || template === "full") {
    execSync(`cp -r packages/shared/auth/src/* ${targetDir}/`);
  }

  // Copy shared testing code
  execSync(`cp -r packages/shared/testing/* ${targetDir}/__tests__/`);
}
```

### **3. Package.json for Standalone Templates**

#### **Basic Template:**

```json
{
  "name": "utilities-basic",
  "version": "1.0.0",
  "description": "Basic React Native starter template",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "expo lint",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "dependencies": {
    "@expo/vector-icons": "^15.0.2",
    "@react-navigation/bottom-tabs": "^7.4.0",
    "@react-navigation/elements": "^2.6.3",
    "@react-navigation/native": "^7.1.8",
    "expo": "~54.0.13",
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
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-native": "0.81.4",
    "react-native-gesture-handler": "~2.28.0",
    "react-native-paper": "^5.14.5",
    "react-native-reanimated": "~4.1.1",
    "react-native-safe-area-context": "~5.6.0",
    "react-native-screens": "~4.16.0",
    "react-native-web": "~0.21.0",
    "react-native-worklets": "0.5.1"
  },
  "devDependencies": {
    "@testing-library/jest-native": "^5.4.3",
    "@testing-library/react-native": "^13.3.3",
    "@types/jest": "^30.0.0",
    "@types/react": "~19.1.0",
    "eslint": "^9.25.0",
    "eslint-config-expo": "~10.0.0",
    "jest": "^30.2.0",
    "jest-expo": "^54.0.12",
    "typescript": "~5.9.2"
  },
  "jest": {
    "preset": "jest-expo",
    "setupFilesAfterEnv": ["<rootDir>/jest.setup.js"],
    "testPathIgnorePatterns": ["/node_modules/"],
    "transformIgnorePatterns": [
      "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|victory-native|victory-[^/]+|react-native-svg|expo-modules-core|expo|@expo/vector-icons)"
    ]
  },
  "private": true
}
```

#### **Auth Template:**

```json
{
  "name": "utilities-auth",
  "version": "1.0.0",
  "description": "React Native starter template with Supabase authentication",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "expo lint",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:auth": "jest --testPathPattern=auth"
  },
  "dependencies": {
    // All basic dependencies +
    "@hookform/resolvers": "^5.2.2",
    "@supabase/supabase-js": "^2.75.1",
    "expo-secure-store": "^15.0.7",
    "expo-web-browser": "~15.0.8",
    "react-hook-form": "^7.65.0",
    "yup": "^1.7.1"
  },
  "devDependencies": {
    // Same as basic template
  },
  "jest": {
    // Same as basic template
  },
  "private": true
}
```

## 🚀 **User Experience**

### **For Basic Template Users:**

```bash
git clone https://github.com/kingslytshepiso/utilities-basic.git
cd utilities-basic
npm install
npm start
# Ready to go! 🚀
```

### **For Auth Template Users:**

```bash
git clone https://github.com/kingslytshepiso/utilities-auth.git
cd utilities-auth
npm install
# Add Supabase config to .env
npm start
# Ready to go! 🚀
```

## 🔄 **Sync Process**

### **Automatic Sync (GitHub Actions)**

```yaml
# .github/workflows/sync-standalone.yml
name: Sync Standalone Templates

on:
  push:
    branches: [main]
    paths: ["packages/**"]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm install

      - name: Sync standalone templates
        run: node scripts/sync-standalone.js

      - name: Commit and push to standalone repos
        run: |
          # Push to utilities-basic
          cd ../utilities-basic
          git add .
          git commit -m "Sync from monorepo" || exit 0
          git push origin main

          # Push to utilities-auth
          cd ../utilities-auth
          git add .
          git commit -m "Sync from monorepo" || exit 0
          git push origin main

          # Push to utilities-full
          cd ../utilities-full
          git add .
          git commit -m "Sync from monorepo" || exit 0
          git push origin main
```

### **Manual Sync**

```bash
# Run sync script
npm run sync-standalone

# Or manually
node scripts/sync-standalone.js
```

## 📦 **Template Structure After Sync**

### **Basic Template:**

```
utilities-basic/
├── app/                    # From packages/basic/app
├── components/            # From packages/basic/components + shared/core
├── utils/                 # From packages/basic/utils + shared/core
├── constants/             # From packages/basic/constants + shared/core
├── hooks/                 # From packages/basic/hooks + shared/core
├── contexts/              # From packages/basic/contexts + shared/core
├── __tests__/             # From packages/shared/testing
├── __mocks__/             # From packages/shared/testing/mocks
├── package.json           # All dependencies included
├── jest.config.js         # From packages/shared/testing
├── jest.setup.js          # From packages/shared/testing
├── README.md              # Template-specific README
└── .env.example           # Environment variables
```

### **Auth Template:**

```
utilities-auth/
├── app/                    # From packages/auth/app
├── components/            # From packages/auth/components + shared/core + shared/auth
├── utils/                 # From packages/auth/utils + shared/core
├── constants/             # From packages/auth/constants + shared/core
├── hooks/                 # From packages/auth/hooks + shared/core
├── contexts/              # From packages/auth/contexts + shared/core + shared/auth
├── lib/auth/              # From packages/auth/lib/auth + shared/auth
├── __tests__/             # From packages/shared/testing
├── __mocks__/             # From packages/shared/testing/mocks
├── package.json           # All dependencies included
├── jest.config.js         # From packages/shared/testing
├── jest.setup.js          # From packages/shared/testing
├── README.md              # Template-specific README
└── .env.example           # Supabase configuration
```

## 🎯 **Benefits**

### **✅ Development Experience**

- **Keep monorepo structure** for easy development
- **Shared packages** for code reuse
- **Single source of truth** for all templates
- **Easy maintenance** - update once, sync everywhere

### **✅ User Experience**

- **Standalone repositories** - no monorepo needed
- **Zero dependencies** - just clone and run
- **Clear purpose** - each template does one thing
- **Easy discovery** - find exactly what you need

### **✅ Distribution**

- **Independent repositories** - each can be published separately
- **Automatic sync** - changes propagate automatically
- **Version control** - each template has its own history
- **Easy maintenance** - update monorepo, sync to standalone

## 🚀 **Next Steps**

1. **Create standalone repositories** on GitHub
2. **Set up sync script** in monorepo
3. **Configure GitHub Actions** for automatic sync
4. **Test standalone usage** of each template
5. **Update documentation** for both approaches

This approach gives you the **best of both worlds** - monorepo for development, standalone repos for distribution! 🎯

