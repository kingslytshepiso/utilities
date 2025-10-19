# Android Menu Issue - Debug Guide

## 🔧 Debugging Steps

I've added comprehensive logging to track exactly what's happening with the user menu on Android. Follow these steps to identify the issue:

---

## 📱 Step 1: Run on Android with Logs

### Start the app with visible logs:

```bash
npm run android
```

### In a separate terminal, monitor the logs:

**Option A - All logs:**

```bash
npx react-native log-android
```

**Option B - Filtered logs (if you have adb):**

```bash
adb logcat | findstr "AppHeader"
```

**Option C - Metro bundler logs:**
Just watch the Metro terminal where you ran `npm run android`

---

## 🎯 Step 2: Test the Menu

1. **Sign in** to your app
2. **Look for this log**: `[AppHeader] Menu visibility changed to: false`
3. **Click the user avatar** (circle with your email initial)
4. **Expected logs**:
   ```
   [AppHeader] Avatar pressed, current state: false
   [AppHeader] Setting menu visible to: true
   [AppHeader] Menu visibility changed to: true
   ```
5. **Menu should appear** ✅
6. **Click outside the menu** to dismiss it
7. **Expected log**:
   ```
   [AppHeader] Menu dismissed via onDismiss
   [AppHeader] Closing user menu
   [AppHeader] Menu visibility changed to: false
   ```
8. **Click the avatar again**
9. **Expected logs**:
   ```
   [AppHeader] Avatar pressed, current state: false
   [AppHeader] Setting menu visible to: true
   [AppHeader] Menu visibility changed to: true
   ```
10. **Menu should appear again** ✅

---

## 🐛 What to Look For

### Scenario 1: Menu doesn't show the second time

**If you see**:

```
[AppHeader] Avatar pressed, current state: false
[AppHeader] Setting menu visible to: true
[AppHeader] Menu visibility changed to: true
```

But the menu doesn't appear...

**Problem**: React Native Paper Menu rendering issue on Android
**Solution**: We need to use a different approach (see Solution #2 below)

---

### Scenario 2: State gets stuck

**If you see**:

```
[AppHeader] Avatar pressed, current state: true
[AppHeader] Setting menu visible to: false
[AppHeader] Menu visibility changed to: false
```

After the first click...

**Problem**: State is not resetting properly after dismiss
**Solution**: The `onDismiss` handler might not be firing (see Solution #3 below)

---

### Scenario 3: No logs at all on second click

**If you don't see any logs** after the second avatar click...

**Problem**: TouchableOpacity not responding
**Solution**: Check if the menu is blocking the touch (see Solution #4 below)

---

## 🔧 Solution Options

### Solution #1: Current Implementation (with Debug Logs)

This is what we have now. If logs show state changes correctly but menu doesn't appear, we know it's a react-native-paper rendering issue.

---

### Solution #2: Custom Menu Component

If react-native-paper Menu is problematic, use a custom modal:

```tsx
// Create components/user-menu-modal.tsx
import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { List, Surface } from "react-native-paper";

interface UserMenuModalProps {
  visible: boolean;
  onDismiss: () => void;
  userEmail: string;
  onSignOut: () => void;
}

export function UserMenuModal({
  visible,
  onDismiss,
  userEmail,
  onSignOut,
}: UserMenuModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <Pressable style={styles.overlay} onPress={onDismiss}>
        <Surface style={styles.menu}>
          <List.Item
            title={userEmail}
            left={(props) => <List.Icon {...props} icon="account-circle" />}
            disabled
          />
          <List.Item
            title="Sign Out"
            left={(props) => <List.Icon {...props} icon="logout" />}
            onPress={onSignOut}
          />
        </Surface>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 60,
    paddingRight: 16,
  },
  menu: {
    minWidth: 200,
    borderRadius: 8,
    elevation: 4,
  },
});
```

---

### Solution #3: Force Re-render with Timestamp Key

Instead of `key={menu-${userMenuVisible}}`, use a timestamp:

```tsx
const [menuKey, setMenuKey] = React.useState(Date.now());

// When opening menu
setUserMenuVisible(true);
setMenuKey(Date.now()); // Force new instance

// In Menu component
<Menu
  key={`menu-${menuKey}`}
  visible={userMenuVisible}
  ...
/>
```

---

### Solution #4: Separate the Anchor from Menu

Move TouchableOpacity completely outside Menu:

```tsx
<View style={styles.menuContainer}>
  <TouchableOpacity onPress={toggleMenu}>
    <View style={styles.avatar}>
      <Text>{initial}</Text>
    </View>
  </TouchableOpacity>
</View>;

{
  userMenuVisible && (
    <Modal visible transparent>
      {/* Custom menu implementation */}
    </Modal>
  );
}
```

---

## 📋 Debug Checklist

When testing on Android, check these:

- [ ] Console logs appear when clicking avatar
- [ ] State changes from `false` to `true` on first click
- [ ] State changes from `true` to `false` when menu dismissed
- [ ] State changes from `false` to `true` on second click
- [ ] Menu appears on first click
- [ ] Menu appears on second click
- [ ] Menu appears on third+ clicks
- [ ] Sign out works from menu
- [ ] Menu closes when clicking outside

---

## 🚨 Common Android Menu Issues

### Issue: Menu doesn't reopen

**Symptoms**: Logs show state changing correctly, but menu doesn't render

**Cause**: React Native Paper Menu component has known issues on Android with:

- Portal rendering
- Anchor positioning
- State management after dismissal

**Permanent Fix**: Replace with custom Modal implementation (Solution #2)

---

### Issue: Touch events blocked

**Symptoms**: No logs after first menu interaction

**Cause**: Menu overlay might be blocking touch events

**Fix**: Ensure `pointerEvents="box-none"` on containers

---

### Issue: State out of sync

**Symptoms**: Logs show wrong state values

**Cause**: Closure capturing stale state

**Fix**: Use functional setState: `setUserMenuVisible(prev => !prev)`

---

## 🧪 Test on Android Emulator

1. **Start emulator**:

   ```bash
   # List emulators
   emulator -list-avds

   # Start specific emulator
   emulator -avd Pixel_5_API_31
   ```

2. **Run app**:

   ```bash
   npm run android
   ```

3. **Monitor logs** in Metro terminal

4. **Test menu repeatedly** (at least 5 times)

---

## 📊 Expected Log Sequence

### First Click (Open Menu):

```
[AppHeader] Avatar pressed, current state: false
[AppHeader] Setting menu visible to: true
[AppHeader] Menu visibility changed to: true
```

### Dismiss Menu:

```
[AppHeader] Menu dismissed via onDismiss
[AppHeader] Closing user menu
[AppHeader] Menu visibility changed to: false
```

### Second Click (Reopen Menu):

```
[AppHeader] Avatar pressed, current state: false
[AppHeader] Setting menu visible to: true
[AppHeader] Menu visibility changed to: true
```

### Click Sign Out:

```
[AppHeader] Logout menu item pressed
[AppHeader] Sign out initiated
[AppHeader] Menu visibility changed to: false
```

---

## 🔍 What to Report

After testing, please report:

1. **Which logs you see** (copy/paste the actual log output)
2. **Where the logs stop** (after which action)
3. **What the menu does** (appears, doesn't appear, flickers, etc.)
4. **Android version** you're testing on
5. **Device type** (emulator model or real device)

---

## 💡 Quick Fixes to Try

### If menu works on web but not Android:

**Try #1 - Add Android-specific handling:**

```tsx
const toggleMenu = () => {
  if (Platform.OS === "android") {
    // Force state update with slight delay on Android
    setTimeout(() => {
      setUserMenuVisible((prev) => !prev);
    }, 0);
  } else {
    setUserMenuVisible((prev) => !prev);
  }
};
```

**Try #2 - Use Portal (if not already):**
Make sure `PaperProvider` wraps your app root and Menu uses Portal internally.

**Try #3 - Replace Menu with ActionSheet (Android only):**

```tsx
{Platform.OS === 'android' ? (
  // Use ActionSheet or custom Modal
  <CustomUserMenu />
) : (
  // Use Paper Menu on iOS/Web
  <Menu ... />
)}
```

---

## 📞 Next Steps

1. **Run the app on Android**
2. **Test the menu 5+ times**
3. **Copy all logs** related to `[AppHeader]`
4. **Report what you see** so we can implement the right fix

The debug logs will help us identify exactly where the issue is occurring! 🔍
