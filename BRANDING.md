# Branding & Color Configuration

This document explains how colors are managed in the project to make it easy to adapt for different portals (Angular.DE, ReactJS.DE, VueJS.DE).

## Color Configuration Location

Colors are defined in two places:

1. **`src/styles/global.css`** - Full Tailwind color scales (the source of truth)
2. **`src/config/site.ts`** - Reference values for JS/TS usage (gradients, etc.)

### CSS Variables (global.css)

```css
@theme {
  /* Primary color scale (Angular purple - matching angular.dev) */
  --color-primary-50: #faf5ff;
  --color-primary-100: #f3e8ff;
  --color-primary-200: #e9d5ff;
  --color-primary-300: #d8b4fe;
  --color-primary-400: #c084fc;
  --color-primary-500: #a855f7;
  --color-primary-600: #8514f5; /* Base */
  --color-primary-700: #7c3aed;
  --color-primary-800: #6b21a8;
  --color-primary-900: #581c87;
  --color-primary-950: #3b0764;
  --color-primary: #8514f5; /* Alias */

  /* Accent color scale (Pink - matching angular.dev) */
  --color-accent-50: #fdf2f8;
  --color-accent-100: #fce7f3;
  --color-accent-200: #fbcfe8;
  --color-accent-300: #f9a8d4;
  --color-accent-400: #f472b6;
  --color-accent-500: #ec4899; /* Base */
  --color-accent-600: #db2777;
  --color-accent-700: #be185d;
  --color-accent-800: #9d174d;
  --color-accent-900: #831843;
  --color-accent-950: #500724;
  --color-accent: #ec4899; /* Alias */
}
```

## Usage Guidelines

### ✅ Correct Usage (Brand-agnostic)

Use these utility classes that automatically adapt to the brand:

**Primary (brand color):**

- `text-primary` or `text-primary-500` - Primary text color
- `text-primary-600` - Darker primary (hover states)
- `text-primary-400` - Lighter primary
- `bg-primary` - Primary background
- `bg-primary-100` - Light primary background
- `bg-primary/10` - Primary with 10% opacity
- `border-primary-200` - Light primary border
- `hover:text-primary-600` - Primary hover state

**Accent (links, interactive elements):**

- `text-accent` or `text-accent-500` - Accent text color
- `text-accent-600` - Darker accent (hover states)
- `bg-accent-100` - Light accent background
- `border-accent-200` - Light accent border

### ❌ Avoid (Brand-specific hardcoded colors)

Don't use hardcoded color classes for brand colors:

| ❌ Avoid           | ✅ Use Instead       |
| ------------------ | -------------------- |
| `text-red-500`     | `text-primary`       |
| `text-red-600`     | `text-primary-600`   |
| `bg-red-100`       | `bg-primary-100`     |
| `border-red-200`   | `border-primary-200` |
| `text-pink-500`    | `text-accent`        |
| `text-pink-600`    | `text-accent-600`    |
| `bg-pink-100`      | `bg-accent-100`      |
| `text-purple-500`  | `text-primary`       |

### ⚠️ Exceptions (Keep hardcoded)

Some colors are semantic and should remain hardcoded:

- `text-gray-*` - Neutral colors
- `bg-white` / `bg-black` - Absolute colors
- `text-red-500` - Error states (not brand color!)
- `text-yellow-500` - Warning states
- `text-orange-500` - Caution states

## Adapting for a New Portal

To create a new portal (e.g., VueJS.DE):

1. **Update `src/styles/global.css`** - Change the color values in the `@theme` block:

   ```css
   @theme {
     /* Primary color scale (Vue.js green) */
     --color-primary-50: #f0fdf7;
     --color-primary-100: #dcfce9;
     --color-primary-200: #bbf7d4;
     --color-primary-300: #86efb4;
     --color-primary-400: #4ade8b;
     --color-primary-500: #42b883; /* Vue.js green */
     --color-primary-600: #16a35a;
     --color-primary-700: #158049;
     --color-primary-800: #16653c;
     --color-primary-900: #145333;
     --color-primary-950: #052e19;
     --color-primary: #42b883;
     /* ... accent colors ... */
   }
   ```

2. **Update `src/config/site.ts`** - Update the reference values:

   ```typescript
   branding: {
     primary: "#42b883",
     primaryRgb: "66, 184, 131",
     // ... update color scales and gradients
   }
   ```

3. **Update logos and images** in `public/assets/img/`

4. **That's it!** All `text-primary-*`, `bg-primary-*`, `text-accent-*` classes will automatically use the new colors.

## Testing

After changing brand colors, test these areas:

1. Hero section (light & dark mode)
2. Navigation (active states)
3. Buttons and CTAs
4. Category badges
5. Code blocks
6. Alert boxes
7. Form elements
8. Hover states

