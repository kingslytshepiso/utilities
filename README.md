# Template with Authentication

Cross-platform starter with Supabase authentication

## Features Enabled

- auth: ✅
- analytics: ❌
- notifications: ❌
- socialLogin: ✅
- biometricAuth: ❌

## Quick Start

1. Copy `.env.example` to `.env` and configure your environment variables
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Environment Variables

Make sure to set the following environment variables in your `.env` file:

- `EXPO_PUBLIC_ENABLE_AUTH`=true
- `EXPO_PUBLIC_ENABLE_ANALYTICS`=false
- `EXPO_PUBLIC_ENABLE_NOTIFICATIONS`=false
- `EXPO_PUBLIC_ENABLE_SOCIAL_LOGIN`=true
- `EXPO_PUBLIC_ENABLE_BIOMETRIC_AUTH`=false

## Development

- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS  
- `npm run web` - Run on Web
- `npm run lint` - Run ESLint
