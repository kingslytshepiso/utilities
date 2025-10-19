# Style Utilities Refactoring Guide

## Common Redundant Patterns to Replace

### ❌ **Redundant:** Custom StyleSheet definitions

### ✅ **Use:** Utility styles from `@/utils`

---

## 1. Layout & Flex

### Replace:

```tsx
// ❌ Don't do this
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
```

### With:

```tsx
// ✅ Use utilities
import { layout } from "@/utils";

<View style={layout.flex1} />
<View style={layout.flexRow} />
<View style={layout.center} />
<View style={layout.rowBetween} />
```

**Available:** `flex1`, `flexRow`, `flexCol`, `center`, `rowCenter`, `rowBetween`, `itemsCenter`, `justifyCenter`, `fullWidth`, `fullHeight`

---

## 2. Padding & Margins

### Replace:

```tsx
// ❌ Don't do this
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  spaced: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  topMargin: {
    marginTop: 24,
  },
});
```

### With:

```tsx
// ✅ Use utilities
import { gutters } from "@/utils";

<View style={gutters.padding.md} />
<View style={[gutters.paddingHorizontal.lg, gutters.paddingVertical.md]} />
<View style={gutters.marginTop.lg} />
```

**Spacing scale:**

- `xs` = 4px
- `sm` = 8px
- `md` = 16px ✅ Most common
- `lg` = 24px
- `xl` = 32px
- `xxl` = 48px
- `xxxl` = 64px

**Available for:** `padding`, `paddingHorizontal`, `paddingVertical`, `paddingTop/Bottom/Left/Right`, `margin`, `marginHorizontal`, `marginVertical`, `marginTop/Bottom/Left/Right`, `gap`, `rowGap`, `columnGap`

---

## 3. Border Radius

### Replace:

```tsx
// ❌ Don't do this
const styles = StyleSheet.create({
  rounded: {
    borderRadius: 12,
  },
  circle: {
    borderRadius: 9999,
  },
});
```

### With:

```tsx
// ✅ Use utilities
import { rounded } from "@/utils";

<View style={rounded.md} />  // 12px
<View style={rounded.full} />  // 9999px
```

**Scale:** `xs` (4px), `sm` (8px), `md` (12px), `lg` (16px), `xl` (24px), `full` (9999px)

---

## 4. Shadows

### Replace:

```tsx
// ❌ Don't do this
const styles = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});
```

### With:

```tsx
// ✅ Use utilities
import { shadow } from "@/utils";

<Card style={shadow.md} />;
```

**Available:** `sm`, `md`, `lg`, `xl`, `none`

---

## 5. Typography (Use constants)

### Replace:

```tsx
// ❌ Don't do this
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
  },
});
```

### With:

```tsx
// ✅ Use typography constants
import { typography } from "@/utils";

<Text style={{
  fontSize: typography.sizes["2xl"],  // 24
  fontWeight: typography.weights.bold,  // "700"
  lineHeight: typography.sizes["2xl"] * typography.lineHeights.normal,
}} />

// Or better: use ThemedText component with type prop
<ThemedText type="title">Title</ThemedText>
```

---

## 6. Combining Utilities

```tsx
// ✅ Combine multiple utilities
import { layout, gutters, rounded, shadow } from "@/utils";

<View
  style={[
    layout.flex1,
    layout.center,
    gutters.padding.lg,
    rounded.md,
    shadow.sm,
  ]}
/>;
```

---

## Priority Refactoring Files

### High Priority (Most Redundant):

1. ✅ `components/app-header.tsx` - **COMPLETED** (64 lines → 36 lines, 44% reduction)
2. ✅ `app/index.tsx` - **COMPLETED** (105 lines → 77 lines, 26% reduction)
3. ✅ `app/about.tsx` - **COMPLETED** (58 lines → 48 lines, 17% reduction)
4. ✅ `components/auth/auth-container.tsx` - **COMPLETED** (73 lines → 38 lines, 48% reduction)

### Medium Priority:

5. `app/auth/signup.tsx`
6. `app/auth/login.tsx`
7. `app/auth/forgot-password.tsx`

---

## Example Refactoring

### Before:

```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});

<View style={styles.container}>
  <View style={styles.card}>{/* content */}</View>
</View>;
```

### After:

```tsx
import { layout, gutters, rounded, shadow } from "@/utils";

// Remove 90% of StyleSheet.create!
<View style={[layout.flex1, gutters.padding.md]}>
  <View
    style={[
      layout.rowBetween,
      gutters.padding.lg,
      gutters.marginBottom.md,
      rounded.md,
      shadow.md,
    ]}
  >
    {/* content */}
  </View>
</View>;
```

---

## Benefits

✅ **Less code** - Remove 60-80% of custom styles  
✅ **Consistency** - All spacing follows 4px grid  
✅ **Maintainability** - Change spacing scale in one place  
✅ **Readability** - Self-documenting style names  
✅ **Performance** - Utilities are pre-created StyleSheets

---

## When to Keep Custom Styles

Keep custom StyleSheet.create() for:

- Complex platform-specific styles
- Unique positioning (`top`, `left`, `absolute` coordinates)
- Custom colors/backgrounds (use theme colors instead when possible)
- Width/height with specific pixel values
- Unique combinations not covered by utilities

**Example of when custom is needed:**

```tsx
const styles = StyleSheet.create({
  unique: {
    width: 250, // Specific width
    maxWidth: 600, // Max constraint
    ...Platform.select({
      web: { position: "sticky", top: 0, zIndex: 100 }, // Platform-specific
    }),
  },
});
```
