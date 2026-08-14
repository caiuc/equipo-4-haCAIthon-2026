---
name: Earthbound Delivery
colors:
  surface: '#f9faf2'
  surface-dim: '#d9dbd3'
  surface-bright: '#f9faf2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4ec'
  surface-container: '#edefe7'
  surface-container-high: '#e8e9e1'
  surface-container-highest: '#e2e3db'
  on-surface: '#1a1c18'
  on-surface-variant: '#414844'
  inverse-surface: '#2f312c'
  inverse-on-surface: '#f0f1e9'
  outline: '#717973'
  outline-variant: '#c1c8c2'
  surface-tint: '#3f6653'
  primary: '#012d1d'
  on-primary: '#ffffff'
  primary-container: '#1b4332'
  on-primary-container: '#86af99'
  inverse-primary: '#a5d0b9'
  secondary: '#116c4a'
  on-secondary: '#ffffff'
  secondary-container: '#a1f4c8'
  on-secondary-container: '#1b724f'
  tertiary: '#1f2825'
  on-tertiary: '#ffffff'
  tertiary-container: '#353e3a'
  on-tertiary-container: '#9fa9a3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ecd4'
  primary-fixed-dim: '#a5d0b9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#274e3d'
  secondary-fixed: '#a1f4c8'
  secondary-fixed-dim: '#86d7ad'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#dbe5df'
  tertiary-fixed-dim: '#bfc9c3'
  on-tertiary-fixed: '#151d1a'
  on-tertiary-fixed-variant: '#3f4945'
  background: '#f9faf2'
  on-background: '#1a1c18'
  surface-variant: '#e2e3db'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-margin: 20px
  gutter: 16px
  stack-sm: 4px
  stack-md: 12px
  stack-lg: 24px
---

## Brand & Style
The design system is rooted in the "Conscious Consumer" aesthetic—a blend of modern **Minimalism** and **Tactile/Organic** influences. It aims to evoke feelings of trust, freshness, and community responsibility. 

The personality is approachable and "human," moving away from the sterile tech look and towards something that feels like a local farmer's market: warm, textured, and grounded. The UI prioritizes high legibility and frictionless navigation, ensuring that making sustainable choices is as easy as a single tap. High-quality photography of vibrant, fresh ingredients is central to the visual narrative, complemented by soft, illustrative elements that reinforce environmental impact.

## Colors
The palette is inspired by old-growth forests and garden herbs. 

- **Primary (Forest Green):** Used for primary actions, headlines, and key iconography to establish authority and depth.
- **Secondary (Leaf Green):** Used for "Eco-Partner" badges, success states, and progress indicators.
- **Tertiary (Soft Sage):** Used for subtle backgrounds, secondary buttons, and decorative organic shapes.
- **Neutral (Warm Cream):** The primary canvas color. It is warmer than pure white, reducing eye strain and feeling more "natural."
- **Accent (Harvest Gold):** A specialized token for **Flora** and gamification elements to provide a warm, rewarding contrast to the greens.

## Typography
We use **Plus Jakarta Sans** for its friendly, rounded terminals which mirror the organic shapes of the brand. It provides excellent legibility for food names and descriptions. For functional labels and utility text, **Inter** is used to provide a clean, systematic contrast that aids in quick scanning of data like delivery times and weights.

Headlines should use a tighter letter-spacing to appear modern and punchy. Body text maintains standard tracking to ensure accessibility.

## Layout & Spacing
This design system employs a **Fluid Grid** with generous safe margins (20px) to give content "room to breathe." 

- **Mobile:** 4-column layout with 16px gutters.
- **Desktop:** 12-column centered layout with a max-width of 1200px.
- **Rhythm:** An 8px base grid governs all padding and margins. Vertical stacking uses `stack-md` (12px) for related items within cards and `stack-lg` (24px) to separate distinct sections.
- **Negative Space:** High use of whitespace around impact statistics to emphasize importance and clarity.

## Elevation & Depth
The design system uses **Tonal Layers** and **Ambient Shadows** to create a soft, approachable hierarchy.

- **Level 0 (Base):** Warm Neutral (#F8F9F1) background.
- **Level 1 (Cards):** Pure white surfaces with a very soft, diffused shadow (0px 4px 20px, 4% opacity of Forest Green).
- **Level 2 (Overlays/Modals):** Pure white surfaces with a more pronounced shadow (0px 10px 30px, 8% opacity of Forest Green).
- **Interactive:** Components like buttons should feel "lifted" on hover/active states using a slight increase in shadow spread rather than a harsh border change.

## Shapes
The shape language is "Hyper-Rounded" but not childish.
- **Cards & Containers:** Use `rounded-lg` (16px) or `rounded-xl` (24px) for a soft, safe, and modern feel.
- **Buttons:** Use a pill-shape (32px+) to signify interactivity and friendliness.
- **Search Bars:** Fully rounded (pill) to suggest ease of use.
- **Icon Backdrops:** Organic, slightly irregular circles (like a hand-drawn pebble) for impact stats to reinforce the "human/earthy" theme.

## Components
- **Buttons:** Primary buttons are pill-shaped, using the Forest Green background with White text. Secondary buttons use the Soft Sage background with Forest Green text.
- **Impact Cards:** Use a split-layout; left side for the organic icon backdrop, right side for the statistic and label.
- **Restaurant Cards:** Feature a high-aspect-ratio image with a floating "Eco-Partner" badge in the top left. Sustainability tags (e.g., "100% Compostable") appear as small chips at the bottom.
- **Progress Bars:** Thick, rounded bars using Soft Sage as the track and Leaf Green as the fill. Used for "Green Point" milestones.
- **Badges:** Small, rounded-sm containers with subtle backgrounds. Eco-Partner badges use a Leaf Green background with a white leaf icon.
- **Selection Controls:** Checkboxes for "Returnable Packaging" should be larger than standard (24px) and use a Leaf Green fill when selected to feel rewarding.