# Navigation Component Tests

This directory contains tests for navigation-related components.

## BottomNav Tests

**File**: `bottom-nav.test.tsx`

Tests for the mobile bottom navigation bar component.

### Test Coverage

1. **Rendering**

   - Renders navigation items correctly
   - Shows active state for current path
   - Shows inactive state for non-current paths
   - Handles paths with trailing slashes

2. **Platform Behavior**

   - Hides on web when `hideOnWeb` is true (default)
   - Shows on web when `hideOnWeb` is false
   - Shows on mobile platforms (Android/iOS)

3. **Navigation**

   - Navigates to home using `router.replace`
   - Navigates to other paths using `router.push`
   - Prevents navigation when already on the same path

4. **Accessibility**

   - Proper accessibility labels
   - Correct accessibility role (button)
   - Correct accessibility state (selected) for active items
   - Correct accessibility state for inactive items

5. **Icon Handling**
   - Uses `activeIcon` when provided
   - Falls back to `icon` when `activeIcon` is not provided

### Running Tests

```bash
# Run only navigation tests
npm test -- __tests__/components/navigation/

# Run with coverage
npm test -- __tests__/components/navigation/ --coverage
```

### Mock Dependencies

- **expo-router**: Mocked to control pathname and navigation functions
- **theme**: Mocked through jest.setup.js


