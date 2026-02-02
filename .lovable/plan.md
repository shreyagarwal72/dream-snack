
# Plan: Fix Truck Animation and Add to All Order Confirmation Points

## Problem Analysis
After comparing the uploaded reference code with the current implementation:

1. **CSS Mismatch**: The current CSS in `src/index.css` uses CSS variables (HSL) which may not translate correctly in all scenarios, while the reference uses hardcoded hex values
2. **Missing Full Animation Styling**: Some critical CSS properties may be incomplete or incorrectly mapped
3. **Orders Page Missing Animation**: The `src/pages/Orders.tsx` page uses a standard button instead of the TruckButton
4. **GSAP Animation Identical**: The JavaScript animation logic appears correct

---

## Implementation Steps

### Step 1: Update CSS Styling for Truck Button
Replace the truck button CSS with the exact styling from the reference, adapted for both light/dark themes:

- Update color variables to match the reference exactly
- Ensure all pseudo-elements (`:before`, `:after`) are properly styled
- Fix the 3D transform and animation properties
- Maintain glass mode compatibility

**Key CSS fixes needed:**
- `--background: #2B3044` (exact hex)
- `--tick: #16BF78` (green checkmark)
- All truck part colors (wheels, cabin, box)
- Ensure `transform-style: preserve-3d` works correctly

### Step 2: Create Reusable TruckButton Component
Move the TruckButton component to a shared location so it can be reused:

**New file: `src/components/TruckButton.tsx`**
- Export the TruckButton component with all GSAP animation logic
- Accept props: `onOrderComplete`, `disabled`, `buttonText`
- Include glass mode support via `useGlass` context

### Step 3: Update Checkout Page
- Import the TruckButton from the new shared component
- Remove the inline TruckButton definition
- Keep current integration

### Step 4: Update Orders Page
Replace the standard "Place Order" button with the TruckButton:

**Location:** Lines 485-493 in `src/pages/Orders.tsx`
- Import `TruckButton` and `useGlass`
- Replace `<Button>` with `<TruckButton>`
- Connect to `handlePlaceOrder` function

---

## Technical Details

### Updated CSS (key changes for `src/index.css`):
```css
.truck-button {
  --color: #fff;
  --background: #2B3044;
  --tick: #16BF78;
  --base: #0D0F18;
  --wheel: #2B3044;
  --wheel-inner: #646B8C;
  --wheel-dot: #fff;
  --back: #6D58FF;
  --back-inner: #362A89;
  --back-inner-shadow: #2D246B;
  --front: #A6ACCD;
  --front-shadow: #535A79;
  --front-light: #FFF8B1;
  --window: #2B3044;
  --window-shadow: #404660;
  --street: #646B8C;
  --street-fill: #404660;
  --box: #DCB97A;
  --box-shadow: #B89B66;
  /* ...rest of styling from reference */
}
```

### TruckButton Component Structure:
```typescript
// src/components/TruckButton.tsx
interface TruckButtonProps {
  onOrderComplete: () => void;
  disabled?: boolean;
  buttonText?: string;
  successText?: string;
}
```

### Files to Modify:
1. **`src/index.css`** - Update truck button CSS with exact reference styling
2. **`src/components/TruckButton.tsx`** - Create new shared component
3. **`src/pages/Checkout.tsx`** - Import from shared component
4. **`src/pages/Orders.tsx`** - Add TruckButton for order placement

---

## Expected Result
- Complete 3D truck animation with box loading, truck driving, and progress bar
- Animation plays when placing orders on both Checkout and Orders pages
- Works in both light and dark themes
- Glass mode styling applied when enabled
- Animation completes, then triggers order placement logic
Add glass UI styling to the Checkout confirmation page to match the rest of the site and test anywhere missing of the style 