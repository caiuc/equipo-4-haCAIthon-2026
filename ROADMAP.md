# Project Implementation Roadmap · GreenLoop / Earthbound Delivery

This roadmap provides a structured step-by-step path to transition the **GreenLoop** Google Stitch design prototype into a production-ready mobile application (React Native / Expo / Flutter / Web).

---

## 🚩 Milestone Overview

```
Phase 1 ──► Phase 2 ──► Phase 3 ──► Phase 4 ──► Phase 5 ──► Phase 6
System      Core        Smart Drop- Duolingo   Merchant    Pitch &
Setup       Checkout    Off Logistics Gamify    Goals       Demo
```

---

## Phase 1: Environment Setup & Component Modularization

- [ ] **1.1 Workspace & Framework Initialization**
  - [ ] Initialize project with React Native (Expo) or Next.js / Vite web container.
  - [ ] Configure Tailwind CSS / NativeWind using tokens from `DESIGN.md`.
  - [ ] Set up Plus Jakarta Sans and Inter font loading.

- [ ] **1.2 Design System Token Integration**
  - [ ] Define global color palette (`primary: #012d1d`, `secondary: #116c4a`, `surface: #f9faf2`, `tertiary: #3f6653`, `gold: #a1f4c8`).
  - [ ] Define border radius scale (`rounded-lg: 16px`, `rounded-xl: 24px`, `rounded-full: 9999px`).
  - [ ] Set up Material Symbols Outlined font bindings.

- [ ] **1.3 Base Navigation Setup**
  - [ ] Implement Bottom Tab Bar Navigation (Feed, Returns, Leaderboard, Profile).
  - [ ] Implement TopAppBar component with Location selector & Green Points balance.

---

## Phase 2: Core Delivery & Returnable Container Checkout Flow

- [ ] **2.1 Sustainable Restaurant Feed (`templates/home_sustainable_feed/code.html`)**
  - [ ] Build search & category filter components ("Sustainable Restaurants", "Zero-Waste Packaging", "Plant-Based Options").
  - [ ] Render merchant cards with "Eco-Partner" badge overlay.
  - [ ] Add personal CO2 saved summary banner.

- [ ] **2.2 Merchant Detail Page (`templates/restaurant_green_bowl/code.html`)**
  - [ ] Implement Returnable Packaging Toggle switch on meal customization modal.
  - [ ] Calculate real-time discount (e.g. $1.50 off when selecting returnable container).
  - [ ] Display dish carbon footprint badges ($kg\text{ CO}_2e$).

- [ ] **2.3 Checkout & Order Lifecycle Engine**
  - [ ] Build cart drawer with itemized container deposit & discount breakdown.
  - [ ] Track active container state (`at_restaurant` -> `in_transit` -> `with_user`).

---

## Phase 3: Smart Drop-off & Packaging Return Logistics

- [ ] **3.1 Return Hub UI (`templates/rewards_returns/code.html`)**
  - [ ] Build active containers tracker widget.
  - [ ] Integrate camera/QR Code scanner for container return verification.

- [ ] **3.2 Smart Drop-Off Location Engine**
  - [ ] Implement GPS-based site locator for Campus Smart Bins, Store Return Points, and Next Delivery Pickups.
  - [ ] Display site availability, operating hours, and distance.

- [ ] **3.3 Green Points & Reward Crediting**
  - [ ] Trigger instant Green Points credit upon verified QR return scan.
  - [ ] Generate redeemable coupon codes for partner stores.

---

## Phase 4: Duolingo-Style Social Gamification & CO2 Engine

- [ ] **4.1 Quantified Carbon Footprint Engine**
  - [ ] Implement CO2 savings calculation algorithm based on packaging choice & distance.
  - [ ] Track user streak counter (e.g., 5 orders in returnable containers in a row).

- [ ] **4.2 Friend Leaderboard (`templates/impact_leaderboard/code.html`)**
  - [ ] Build social leaderboard showing friend ranks by $kg\text{ CO}_2$ saved.
  - [ ] Implement Duolingo-style celebratory animations on rank up or streak extension.

- [ ] **4.3 Achievement & Badge System**
  - [ ] Unlockable eco-badges ("Zero-Waste Novice", "Campus Eco Hero", "CO2 Saver 10kg").

---

## Phase 5: Merchant Portal & Sustainability Goals Engine

- [ ] **5.1 Merchant Sustainability Analytics**
  - [ ] Track merchant sales ratio of returnable vs standard packaging.
  - [ ] Monitor progress towards the **>30% Sustainable Sales Goal**.

- [ ] **5.2 Search Ranking Boost Engine**
  - [ ] Automatically apply search algorithm boost to merchants meeting sustainability criteria.
  - [ ] Display "30%+ Sustainable Sales Goal Met" badge on merchant profiles.

---

## Phase 6: Testing, Polish & HaCAiThon Pitch Presentation

- [ ] **6.1 Quality Assurance & UX Verification**
  - [ ] Run cross-device layout checks (iOS / Android screen ratios).
  - [ ] Verify accessibility & color contrast ratios against WCAG standard.

- [ ] **6.2 HaCAiThon 2026 Deliverables**
  - [ ] Ensure public GitHub repository includes MIT `LICENSE`.
  - [ ] Prepare live interactive demo and pitch deck.
  - [ ] Submit before 17:10 hrs deadline.
