#!/usr/bin/env node

/**
 * Setup script for different template variants
 * Usage: node scripts/setup-variant.js <variant>
 * 
 * Variants:
 * - basic: Template without authentication
 * - auth: Template with authentication
 * - full: Template with all features
 */

const fs = require('fs');
const path = require('path');

const variants = {
  basic: {
    name: 'Basic Template',
    description: 'Cross-platform starter without authentication',
    features: {
      auth: false,
      analytics: false,
      notifications: false,
      socialLogin: false,
      biometricAuth: false,
    },
    env: {
      EXPO_PUBLIC_ENABLE_AUTH: 'false',
      EXPO_PUBLIC_ENABLE_ANALYTICS: 'false',
      EXPO_PUBLIC_ENABLE_NOTIFICATIONS: 'false',
      EXPO_PUBLIC_ENABLE_SOCIAL_LOGIN: 'false',
      EXPO_PUBLIC_ENABLE_BIOMETRIC_AUTH: 'false',
    },
  },
  auth: {
    name: 'Template with Authentication',
    description: 'Cross-platform starter with Supabase authentication',
    features: {
      auth: true,
      analytics: false,
      notifications: false,
      socialLogin: true,
      biometricAuth: false,
    },
    env: {
      EXPO_PUBLIC_ENABLE_AUTH: 'true',
      EXPO_PUBLIC_ENABLE_ANALYTICS: 'false',
      EXPO_PUBLIC_ENABLE_NOTIFICATIONS: 'false',
      EXPO_PUBLIC_ENABLE_SOCIAL_LOGIN: 'true',
      EXPO_PUBLIC_ENABLE_BIOMETRIC_AUTH: 'false',
    },
  },
  full: {
    name: 'Full-Featured Template',
    description: 'Cross-platform starter with all features enabled',
    features: {
      auth: true,
      analytics: true,
      notifications: true,
      socialLogin: true,
      biometricAuth: true,
    },
    env: {
      EXPO_PUBLIC_ENABLE_AUTH: 'true',
      EXPO_PUBLIC_ENABLE_ANALYTICS: 'true',
      EXPO_PUBLIC_ENABLE_NOTIFICATIONS: 'true',
      EXPO_PUBLIC_ENABLE_SOCIAL_LOGIN: 'true',
      EXPO_PUBLIC_ENABLE_BIOMETRIC_AUTH: 'true',
    },
  },
};

function createEnvFile(variant) {
  const envContent = Object.entries(variant.env)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  const additionalEnv = `
# App Configuration
EXPO_PUBLIC_APP_NAME=${variant.name}
EXPO_PUBLIC_APP_VERSION=1.0.0

# Authentication Configuration (only used if AUTH is enabled)
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Analytics Configuration (only used if ANALYTICS is enabled)
EXPO_PUBLIC_ANALYTICS_API_KEY=your_analytics_api_key_here
`;

  fs.writeFileSync('.env', envContent + additionalEnv);
  console.log('✅ Created .env file');
}

function updatePackageJson(variant) {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Update package name and description
  packageJson.name = `cross-platform-starter-${variant}`;
  packageJson.description = variant.description;
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Updated package.json');
}

function createReadme(variant) {
  const readmeContent = `# ${variant.name}

${variant.description}

## Features Enabled

${Object.entries(variant.features)
  .map(([feature, enabled]) => `- ${feature}: ${enabled ? '✅' : '❌'}`)
  .join('\n')}

## Quick Start

1. Copy \`.env.example\` to \`.env\` and configure your environment variables
2. Install dependencies: \`npm install\`
3. Start the development server: \`npm start\`

## Environment Variables

Make sure to set the following environment variables in your \`.env\` file:

${Object.entries(variant.env)
  .map(([key, value]) => `- \`${key}\`=${value}`)
  .join('\n')}

## Development

- \`npm start\` - Start Expo development server
- \`npm run android\` - Run on Android
- \`npm run ios\` - Run on iOS  
- \`npm run web\` - Run on Web
- \`npm run lint\` - Run ESLint
`;

  fs.writeFileSync('README.md', readmeContent);
  console.log('✅ Created README.md');
}

function main() {
  const variant = process.argv[2];
  
  if (!variant || !variants[variant]) {
    console.log('Usage: node scripts/setup-variant.js <variant>');
    console.log('\nAvailable variants:');
    Object.entries(variants).forEach(([key, config]) => {
      console.log(`  ${key}: ${config.name}`);
    });
    process.exit(1);
  }

  const config = variants[variant];
  
  console.log(`🚀 Setting up ${config.name}...`);
  console.log(`📝 ${config.description}\n`);

  try {
    createEnvFile(config);
    updatePackageJson(variant);
    createReadme(config);
    
    console.log('\n✅ Setup complete!');
    console.log('\nNext steps:');
    console.log('1. Copy .env.example to .env and configure your variables');
    console.log('2. Run: npm install');
    console.log('3. Run: npm start');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

main();
