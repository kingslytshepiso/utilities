# 🔐 Authentication System

Production-ready Supabase authentication with responsive UI and platform-specific optimizations.

## ✨ Features

- ✅ **Email/Password & OAuth** - Login, signup, password reset, social auth
- ✅ **Session Management** - Auto-refresh, secure storage (SecureStore/localStorage)
- ✅ **Protected Routes** - Automatic redirection for unauthenticated users
- ✅ **Responsive UI** - Adapts to mobile, tablet, desktop (4 layout modes)
- ✅ **Platform Optimized** - iOS (Keychain), Android (EncryptedPrefs), Web (localStorage)
- ✅ **Type-Safe** - Full TypeScript with abstract provider interface
- ✅ **SSO Ready** - OAuth with PKCE flow support

## 🚀 Quick Start

### 1. Supabase Configuration (✅ Already Set Up)

**Current Project:** `https://svwpscvbrcvoenxxujtc.supabase.co`

The Supabase credentials are already configured in `app.json`. To use your own project:

1. Create project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API
3. Update credentials in `app.json` → `expo.extra`

### 2. Configure Environment (Optional)

For local development with different credentials, create `.env.local`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

**Note:** `.env.local` is git-ignored for security.

### 3. Enable Auth Providers

In Supabase Dashboard:

1. **Authentication** → **Providers**
2. Enable **Email** (required)
3. Enable **OAuth providers** for SSO (optional):
   - Google (recommended for SSO)
   - Apple (iOS/macOS apps)
   - GitHub
   - More: Facebook, Twitter, Azure, GitLab, Bitbucket
4. **Authentication** → **URL Configuration**
   - Add redirect URLs:
     - `utilities://auth/callback` (mobile - matches scheme in app.json)
     - `http://localhost:8081/auth/callback` (web dev)
     - `https://yourdomain.com/auth/callback` (production web)

**OAuth/SSO Setup:**

- Each provider requires Client ID & Secret from their developer console
- PKCE flow is automatically enabled for mobile (secure OAuth)
- For enterprise SSO, see Supabase docs on SAML/OIDC providers

### 4. Start App

```bash
npm start
```

Navigate to `/auth/login` to test.

## 📖 Usage

### Basic Authentication

```typescript
import { useAuth } from "@/contexts/auth-context";

function MyComponent() {
  const { user, isAuthenticated, signIn, signOut } = useAuth();

  if (!isAuthenticated) return <LoginScreen />;

  return (
    <View>
      <Text>Welcome, {user.name}!</Text>
      <Button onPress={signOut}>Sign Out</Button>
    </View>
  );
}
```

### Protected Routes

Routes are automatically protected by `ProtectedRoute` in `app/_layout.tsx`:

```typescript
// Unauthenticated → Redirected to /auth/login
// Authenticated → Access granted
```

### Protect Specific Components

```typescript
import { AuthGuard } from "@/components/auth";

function ProtectedContent() {
  return (
    <AuthGuard>
      <SensitiveData />
    </AuthGuard>
  );
}
```

### User Menu

```typescript
import { UserMenu } from "@/components/auth";

function AppHeader() {
  return (
    <View>
      <Logo />
      <UserMenu />
    </View>
  );
}
```

### OAuth Sign In (SSO)

```typescript
const { signInWithOAuth } = useAuth();

// Supports all OAuth providers:
await signInWithOAuth("google"); // Google SSO
await signInWithOAuth("apple"); // Apple Sign In
await signInWithOAuth("github"); // GitHub
await signInWithOAuth("azure"); // Microsoft/Azure AD (Enterprise SSO)
// Also: facebook, twitter, gitlab, bitbucket
```

**SSO Flow:**

1. User clicks OAuth button
2. Redirects to provider login
3. User authenticates with provider
4. Provider redirects back with tokens
5. App automatically creates session
6. User is logged in (PKCE flow for mobile security)

## 🎨 Configuration

Edit `config/auth.config.ts`:

```typescript
export const authConfig = {
  session: {
    persistSession: true,
    autoRefresh: true,
    refreshThreshold: 60, // Refresh 60s before expiry
  },

  oauth: {
    redirectUrl: Platform.select({
      web: "http://localhost:8081/auth/callback",
      default: "utilities://auth/callback",
    }),
    enabledProviders: ["google", "apple", "github"],
  },

  security: {
    minPasswordLength: 8,
    requireEmailVerification: false,
    enableBiometrics: Platform.OS !== "web",
  },
};
```

## 📱 Responsive Breakpoints

Components automatically adapt:

- **Compact** (< 640px) - Mobile full-width
- **Standard** (640-1024px) - Tablet centered card
- **Wide** (1024-1280px) - Desktop wide form
- **Split** (> 1280px) - Two-column with side image

## 🏗️ Architecture

### Provider Pattern

The system uses an abstract `IAuthProvider` interface, making it easy to swap backends:

```
App Components
    ↓
useAuth() Hook
    ↓
AuthContext (state management)
    ↓
IAuthProvider (abstract interface)
    ↓
SupabaseAuthProvider (current implementation)
```

### File Structure

```
├── types/auth.ts              # TypeScript interfaces
├── config/auth.config.ts      # Configuration
├── lib/auth/
│   ├── index.ts              # Provider factory
│   └── supabase-provider.ts  # Supabase implementation
├── contexts/auth-context.tsx  # Global auth state
├── hooks/use-responsive-auth.ts # Responsive helpers
├── components/auth/           # UI components
└── app/auth/                  # Auth screens
```

### Storage Strategy

- **iOS/Android**: Expo SecureStore (encrypted)
- **Web**: localStorage
- Auto-detects platform and uses appropriate storage

## 🔄 Switching Providers

To use a different auth backend (e.g., Firebase, Auth0):

1. **Create provider**:

```typescript
// lib/auth/your-provider.ts
export class YourAuthProvider implements IAuthProvider {
  // Implement all interface methods
}
```

2. **Update factory**:

```typescript
// lib/auth/index.ts
export const getAuthProvider = () => new YourAuthProvider();
```

That's it! No changes needed in components or screens.

## 🔐 Security Features

- ✅ **Secure Token Storage** - Platform-specific encrypted storage
- ✅ **Auto Token Refresh** - Prevents session expiration
- ✅ **Password Validation** - Configurable min length
- ✅ **OAuth PKCE** - Secure OAuth flow
- ✅ **HTTPS Only** - Secure API communication
- ✅ **Session Persistence** - Restore on app restart

## 🐛 Troubleshooting

### "Auth provider not initialized"

Ensure `AuthProvider` wraps your app in `app/_layout.tsx`.

### OAuth not working

- Check URL scheme in `app.json` → `expo.scheme`
- Verify redirect URLs in Supabase dashboard
- Confirm providers are enabled

### Session not persisting

- Verify `persistSession: true` in config
- Check that `expo-secure-store` is installed
- Clear app data and retry

### Environment variables not found

- Add to `app.json` → `expo.extra`
- Or use `.env.local` with proper variable names

## 🎨 Customization

### Change Theme

```typescript
// constants/theme.ts
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#YOUR_COLOR",
  },
};
```

### Add Custom Metadata

```typescript
await signUp({
  email,
  password,
  name,
  metadata: { company: "Acme Inc", role: "admin" },
});
```

### Modify Security

```typescript
// config/auth.config.ts
security: {
  minPasswordLength: 12,
  requireEmailVerification: true,
}
```

## 📚 API Reference

### useAuth() Hook

```typescript
const {
  user, // Current user object
  session, // Current session
  authState, // 'authenticated' | 'unauthenticated' | 'loading' | 'error'
  isAuthenticated, // Boolean
  isLoading, // Boolean
  error, // Error message
  signUp, // (credentials) => Promise<void>
  signIn, // (credentials) => Promise<void>
  signInWithOAuth, // (provider) => Promise<void>
  signOut, // () => Promise<void>
  resetPassword, // (request) => Promise<void>
  updatePassword, // (update) => Promise<void>
  updateProfile, // (update) => Promise<void>
  refreshSession, // () => Promise<void>
  clearError, // () => void
} = useAuth();
```

## 🧪 Testing

Complete unit test suite included with 80+ test cases.

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

See [TESTS.md](./TESTS.md) for full testing documentation.

## 🔗 Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Expo Router](https://docs.expo.dev/router)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Testing Guide](./TESTS.md)

---

**Built with ❤️ using Expo, React Native, Supabase, and TypeScript**
