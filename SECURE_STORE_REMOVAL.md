# SecureStore Removal - Summary

## Problem

The Android build was failing due to missing XML configuration files for `expo-secure-store`. The plugin was configured but not generating the required files during `expo prebuild`.

## Root Cause Analysis

The issue wasn't with `expo-secure-store` itself, but with how it was being used:

1. **`expo-secure-store` was being used for theme preferences** - Theme preferences don't require secure storage
2. **The `expo-secure-store` plugin requires native configuration** - This adds complexity and potential build failures
3. **AsyncStorage is more appropriate** - Theme preferences are not sensitive data

## Solution

Replaced `expo-secure-store` with `@react-native-async-storage/async-storage` for theme preferences.

### What Changed

1. **Removed `expo-secure-store` dependency**
2. **Added `@react-native-async-storage/async-storage` dependency**
3. **Updated `packages/basic/contexts/theme-context.tsx`** to use AsyncStorage instead of SecureStore
4. **Removed SecureStore plugin from `app.json`**
5. **Simplified storage implementation** - No need for Platform checks

### Benefits

- ✅ **Simpler**: No native configuration required
- ✅ **More reliable**: AsyncStorage is a stable, well-maintained library
- ✅ **Appropriate security**: Theme preferences don't need encryption
- ✅ **No build issues**: AsyncStorage doesn't require special Android XML files
- ✅ **Cross-platform**: AsyncStorage works consistently on all platforms

## Key Takeaway

**Use the right tool for the right job:**

- **SecureStore**: For sensitive data (auth tokens, passwords, keys)
- **AsyncStorage**: For app preferences, settings, non-sensitive data

Theme preferences fall into the latter category, making AsyncStorage the correct choice.

## Files Changed

- `packages/basic/package.json` - Dependencies updated
- `packages/basic/app.json` - Plugin removed
- `packages/basic/contexts/theme-context.tsx` - Storage implementation updated
