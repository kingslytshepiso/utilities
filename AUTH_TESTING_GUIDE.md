# Authentication Pages - Testing Guide

## Quick Start

To test the improved authentication pages, run the following commands:

### Web

```bash
npm run web
```

Navigate to `/auth/login` to see the login page

### Mobile (iOS Simulator)

```bash
npm run ios
```

### Mobile (Android Emulator)

```bash
npm run android
```

## What to Test

### 1. Login Page (`/auth/login`)

#### Mobile View (< 768px)

- ✅ Form should fill the screen width with 16px padding on sides
- ✅ Inputs should be properly spaced with 16px gaps
- ✅ Logo should be centered and visible
- ✅ "Forgot Password?" link should be left-aligned
- ✅ "Sign In" button should span full width
- ✅ Social auth buttons (if enabled) should be full width
- ✅ "Don't have an account? Sign Up" should be centered at bottom
- ✅ Should scroll smoothly when keyboard is visible

#### Tablet View (768px - 1024px)

- ✅ Form should be centered with max-width of 480px
- ✅ Card should have shadow and rounded corners
- ✅ Spacing should be more generous (20px gaps)
- ✅ All elements should be well-proportioned

#### Desktop View (> 1024px)

- ✅ Form should be centered with max-width of 600px
- ✅ Large padding around form (32-48px)
- ✅ Card should have prominent shadow
- ✅ Elements should have larger spacing (24-28px gaps)

### 2. Signup Page (`/auth/signup`)

#### All Screen Sizes

- ✅ All 4 input fields (Name, Email, Password, Confirm Password) should be visible
- ✅ Fields should maintain consistent spacing
- ✅ "Create Account" button should be properly styled
- ✅ "Already have an account? Sign In" should be centered at bottom
- ✅ Form should handle long names gracefully

#### Specific Checks

- ✅ Error messages should appear below each field
- ✅ Password visibility toggle should work on both password fields
- ✅ Form should validate properly before submission

### 3. Forgot Password Page (`/auth/forgot-password`)

#### Layout

- ✅ Single email input should be centered
- ✅ Info box at bottom should have rounded corners (12px)
- ✅ "Remember your password? Back to Sign In" should be centered
- ✅ Info text should be readable (font-size: 13px)

### 4. Responsive Behavior

Test the following by resizing browser window (web) or rotating device:

#### Portrait to Landscape (Mobile)

- ✅ Form should remain centered
- ✅ Keyboard should not cover inputs
- ✅ Scroll should work smoothly

#### Different Window Sizes (Web)

Test at these breakpoints:

- 375px (iPhone SE)
- 640px (Small tablet)
- 768px (iPad portrait)
- 1024px (iPad landscape)
- 1280px (Desktop)
- 1920px (Large desktop)

At each size:

- ✅ Form should be centered
- ✅ Padding should scale appropriately
- ✅ No horizontal scrollbar
- ✅ All elements should be readable

### 5. Platform-Specific Features

#### iOS

- ✅ Safe area insets should be respected
- ✅ Keyboard should push content up smoothly
- ✅ Tap outside inputs to dismiss keyboard

#### Android

- ✅ Keyboard should overlay properly
- ✅ Back button should navigate correctly
- ✅ Material Design inputs should render correctly

#### Web

- ✅ Card shadow should be visible
- ✅ Focus states should work with keyboard navigation
- ✅ Form should center properly in browser window

## Visual Checks

### Spacing

- ✅ Logo to title: 24px
- ✅ Title to subtitle: 8px
- ✅ Subtitle to first input: varies by layout (16-28px)
- ✅ Between inputs: 12-16px (via component margin)
- ✅ Last input to button: 12-16px
- ✅ Between buttons: 12-16px
- ✅ Last element to bottom link: 20px

### Typography

- ✅ Title size: 24px (compact) to 32px (wide)
- ✅ Subtitle size: 14px (compact) to 16px (wide)
- ✅ Bottom link text: 14px
- ✅ All text should be readable with good contrast

### Interactive Elements

- ✅ Buttons should have proper touch targets (min 44px height)
- ✅ Inputs should have proper height (48-64px depending on layout)
- ✅ Hover states should work on web
- ✅ Loading states should show properly
- ✅ Error states should be visible

## Common Issues to Check

### ❌ Form too narrow on mobile

**Expected**: Form should fill screen width minus 16px padding on each side
**If broken**: Check `useAuthFormWidth` hook returns correct value

### ❌ Form not centered on desktop

**Expected**: Form should be horizontally and vertically centered
**If broken**: Check `scrollContent` has `justifyContent: 'center'` and `alignItems: 'center'`

### ❌ Card cut off on small screens

**Expected**: Card should have margin and fit within viewport
**If broken**: Check `card` style has `marginHorizontal: 16`

### ❌ Keyboard covers input fields

**Expected**: `KeyboardAvoidingView` should push content up
**If broken**: Check `KeyboardAvoidingView` behavior is set correctly for platform

### ❌ Spacing inconsistent

**Expected**: Spacing should scale with screen size
**If broken**: Check `useAuthSpacing` values are being applied

## Performance Checks

- ✅ Page should load quickly (< 1 second)
- ✅ No layout shifts during initial render
- ✅ Smooth scrolling
- ✅ Keyboard animations should be smooth
- ✅ Navigation transitions should be smooth

## Accessibility Checks

- ✅ All inputs should be focusable with keyboard (web)
- ✅ Tab order should be logical
- ✅ Error messages should be announced (screen readers)
- ✅ Button labels should be descriptive
- ✅ Text should meet WCAG contrast requirements

## Screenshots Recommended

Take screenshots at these sizes for documentation:

1. Mobile (375px) - Login page
2. Tablet (768px) - Signup page
3. Desktop (1280px) - Login page with card
4. Mobile landscape - Any auth page

## Known Limitations

- Social auth buttons may not show on very small devices (< 640px) - this is intentional
- Split layout (side image) only appears on screens > 1280px
- Some Material Design components may look different between platforms

## Success Criteria

All authentication pages should:
✅ Fill their containers appropriately
✅ Be responsive across all screen sizes
✅ Have consistent spacing and typography
✅ Work smoothly on all platforms (iOS, Android, Web)
✅ Provide good UX with proper keyboard handling
✅ Look professional and modern
