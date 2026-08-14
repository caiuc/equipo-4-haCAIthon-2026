# Design System Technical Guide · Earthbound / RIU

This guide details how the design tokens from [`DESIGN.md`](file:///home/nicoquinta/code/equipo-4-haCAIthon-2026/DESIGN.md) are configured in code and how developers/AI agents should consume them when building app components.

---

## 1. Color Palette Tokens

The palette is built around an organic, grounded aesthetic (Forest Greens, Warm Creams, Harvest Gold).

| Token Name | Hex Code | Purpose & Usage |
| :--- | :--- | :--- |
| `primary` | `#012d1d` | Dominant brand color. Used for main headlines, primary buttons, header text. |
| `secondary` | `#116c4a` | Leaf Green accent. Used for Eco-Partner badges, active toggles, success indicators. |
| `tertiary` | `#1f2825` | Deep Sage. Used for dark surface containers and high-contrast text. |
| `background` / `surface` | `#f9faf2` | Warm Cream background canvas. Replaces cold white to reduce eye strain. |
| `surface-container` | `#edefe7` | Subtle container background for cards and secondary list items. |
| `primary-container` | `#1b4332` | Dark green surface for featured hero cards. |
| `secondary-container` | `#a1f4c8` | Soft mint green background for point chips and highlighted badges. |
| `outline` | `#717973` | Subdued borders and dividers. |

---

## 2. Typography Tokens

We pair **Plus Jakarta Sans** (friendly, rounded terminals for display/headings) with **Inter** (clean, crisp legibility for metadata and numbers).

```
Plus Jakarta Sans (Display & Headings)
├── display-lg  : 40px / Line Height: 48px / Bold (700) / Tracking: -0.02em
├── headline-lg : 24px / Line Height: 32px / Bold (700)
├── title-md    : 18px / Line Height: 24px / SemiBold (600)
└── body-md     : 14px / Line Height: 20px / Regular (400)

Inter (System Labels & Utility)
└── label-sm    : 12px / Line Height: 16px / Medium (500) / Tracking: 0.05em
```

---

## 3. Layout Grid & Spacing Scale

- **Base Unit:** 8px grid system.
- **Safe Margins:** 20px (`px-container-margin`).
- **Gutter:** 16px (`gap-gutter`).
- **Stack Spacing:**
  - `stack-sm` (4px): Micro spacing between label and value.
  - `stack-md` (12px): Component spacing inside cards.
  - `stack-lg` (24px): Section spacing between page blocks.

---

## 4. Rounded Corner Scale

- `rounded-sm`: `0.25rem` (4px) - Badges and chips.
- `rounded-md`: `0.5rem` (8px) - Form inputs and small popovers.
- `rounded-lg`: `0.75rem` (12px) - Standard cards.
- `rounded-xl`: `1.5rem` (24px) - Hero containers and major cards.
- `rounded-full`: `9999px` - Action buttons, search bars, avatar rings.

---

## 5. Tailwind Configuration Snippet

For reference, the inline Tailwind configuration used in the template HTML screens:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        "primary": "#012d1d",
        "secondary": "#116c4a",
        "tertiary": "#1f2825",
        "surface": "#f9faf2",
        "background": "#f9faf2",
        "surface-container": "#edefe7",
        "primary-container": "#1b4332",
        "secondary-container": "#a1f4c8",
        "on-primary": "#ffffff",
        "on-secondary": "#ffffff",
        "on-surface": "#1a1c18"
      },
      fontFamily: {
        "display-lg": ["Plus Jakarta Sans"],
        "headline-lg": ["Plus Jakarta Sans"],
        "title-md": ["Plus Jakarta Sans"],
        "body-md": ["Plus Jakarta Sans"],
        "label-sm": ["Inter"]
      }
    }
  }
}
```
