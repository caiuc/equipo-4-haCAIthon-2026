# Architecture & Technical Overview · RIU / Earthbound Delivery

This document provides a comprehensive technical architecture guide for **Claude Code** and other AI coding agents working on the **RIU (Earthbound Delivery)** codebase.

---

## 1. System Vision & Core Pillars

RIU is a native mobile-first food & grocery delivery platform designed around environmental sustainability, returnable packaging economics, and Duolingo-inspired social gamification.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    RIU Sustainable Delivery                       │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
       ┌───────────────────────────┼───────────────────────────┐
       ▼                           ▼                           ▼
┌──────────────┐            ┌──────────────┐            ┌──────────────┐
│  Returnable  │            │ Smart Drop-  │            │ Social CO2   │
│ Packaging &  │            │ Off Site     │            │ Leaderboard  │
│  Discounts   │            │ Logistics    │            │ (Duolingo)   │
└──────────────┘            └──────────────┘            └──────────────┘
       │                           │                           │
       └───────────────────────────┼───────────────────────────┘
                                   ▼
                   ┌───────────────────────────────┐
                   │   30%+ Merchant Sustainable   │
                   │    Sales Goal & Rank Boost    │
                   └───────────────────────────────┘
```

### Core Architecture Pillars:
1. **Returnable Packaging Economy:** Users select reusable containers during checkout for a discounted meal price. Returning packaging (in-store, campus smart drop-offs, or via next delivery rider) grants coupons and **Flora**, the in-app currency.
2. **Social CO2 Gamification:** Quantified carbon footprint engine tracking $kg\text{ CO}_2$ saved. Users compete with friends on dynamic leaderboards and earn badges for returned-container milestones. *(Daily streaks were evaluated and dropped: they reward logging in, not returning packaging.)*
3. **Sustainable Merchant Incentives:** Restaurants hitting sustainability targets (e.g., >30% sustainable sales) receive marketing badges and priority placement on the home feed.
4. **Human-Centric Design System:** Grounded, natural palette (Forest Green, Leaf Green, Warm Cream) with rounded containers and intuitive UX familiar to DoorDash / UberEats users.

---

## 2. Repository Layout & File Roles

```
.
├── README.md                           # Main repository document (Project + HaCAiThon 2026 Bases)
├── ROADMAP.md                          # Production implementation roadmap & checklist
├── DESIGN.md                           # Master Design System (Tokens, Palette, Typography)
├── ARCHITECTURE.md                     # Technical & Architectural Guide (This file)
├── LICENSE                             # MIT Open-Source License
├── stitch_riu_sustainable_delivery.zip # Original compressed Stitch export
│
├── docs/                               # Developer & AI Agent Context Documentation
│   ├── FILE_INDEX.md                   # Directory map & complete file descriptions
│   ├── SCREENS_OVERVIEW.md             # Breakdown of all 4 UI prototype screens
│   └── DESIGN_SYSTEM_GUIDE.md          # Guide on consuming DESIGN.md tokens in code
│
└── templates/                          # Untouched Google Stitch HTML/Tailwind Screens
    ├── index.html                      # Interactive Navigation Hub to preview screens
    ├── home_sustainable_feed/          # Screen 1: Home Feed & Search
    │   ├── code.html                   # HTML / Tailwind template (Untouched)
    │   └── screen.png                  # UI Screenshot reference
    ├── restaurant_green_bowl/          # Screen 2: Merchant Detail Page
    │   ├── code.html                   # HTML / Tailwind template (Untouched)
    │   └── screen.png                  # UI Screenshot reference
    ├── rewards_returns/                # Screen 3: Smart Drop-off & Packaging Return Hub
    │   ├── code.html                   # HTML / Tailwind template (Untouched)
    │   └── screen.png                  # UI Screenshot reference
    ├── impact_leaderboard/             # Screen 4: Social CO2 Leaderboard
    │   ├── code.html                   # HTML / Tailwind template (Untouched)
    │   └── screen.png                  # UI Screenshot reference
    └── global_overview/                # Global Design Overview
        └── overview.png                # Combined screen preview image
```

---

## 3. Strict Rules for AI Coding Agents

> [!IMPORTANT]
> **Source Code Immutability Rule:**
> Do **NOT** modify files inside `templates/*/code.html` directly. These files serve as the authoritative Stitch design reference. When building new features or porting to React Native / Flutter / Web frameworks, construct new modular components in a dedicated application directory (e.g., `src/` or `app/`).

### Workflow Rules for AI Agents:
- **Consult `DESIGN.md`:** Always use the defined color tokens (`primary: #012d1d`, `secondary: #116c4a`, `surface: #f9faf2`, etc.) when creating new UI code.
- **Reference `templates/*/code.html`:** Extract class structures, layout hierarchy, and Material Symbols icon names directly from template HTML files.
- **Inspect `docs/SCREENS_OVERVIEW.md`:** Understand the user flow and functional requirements before creating component logic.

---

## 4. Conceptual Data Schema Blueprints

When implementing the backend or state management, use the following schema specifications:

### User Profile & Impact Schema
```typescript
interface UserProfile {
  id: string;
  name: string;
  avatarUrl: string;
  greenPoints: number;
  totalCo2SavedKg: number;
  containersInCirculation: number;
  returnedContainersCount: number;
  friends: string[]; // User IDs
  badges: Badge[];
}

interface Badge {
  id: string;
  name: string;
  icon: string;
  unlockedAt: string;
}
```

### Returnable Container Schema
```typescript
interface ReturnableContainer {
  qrCodeId: string;
  containerType: 'bowl_medium' | 'bowl_large' | 'drink_cup' | 'bento_box';
  depositAmount: number;
  discountApplied: number;
  status: 'at_restaurant' | 'in_transit' | 'with_user' | 'dropped_off' | 'sanitized';
  currentHolderId: string;
  assignedOrderId: string;
}
```

### Smart Drop-Off Location Schema
```typescript
interface DropOffSite {
  id: string;
  name: string;
  type: 'campus_hub' | 'in_store' | 'delivery_rider';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  operatingHours: string;
  activeBins: number;
  distanceKm?: number;
}
```

### Merchant & Sustainability Metrics Schema
```typescript
interface Merchant {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  rating: number;
  deliveryTimeMin: number;
  sustainableSalesRatio: number; // e.g. 0.35 = 35%
  isEcoPartnerBadge: boolean;   // True if > 30% sustainable sales
  packagingOptions: {
    returnableAvailable: boolean;
    returnableDiscount: number; // e.g. $1.50 off
  }[];
}
```

---

## 5. UI Component Hierarchy Blueprint

```
App Root
├── TopAppBar (Location Selector + Flora Balance)
├── Navigation Router / Bottom Tab Bar
│   ├── [Tab 1] HomeSustainableFeed
│   │   ├── HeroBanner ("Good food. Better planet.")
│   │   ├── SearchAndFilterBar
│   │   ├── CategoryPills (Sustainable Restaurants, Zero-Waste, Plant-Based)
│   │   ├── ImpactSummaryCard (Personal CO2 avoided)
│   │   └── MerchantList (Filtered by Eco-Partner badge)
│   │
│   ├── [Tab 2] RestaurantDetail (Green Bowl)
│   │   ├── MerchantHeaderImage & EcoBadge
│   │   ├── PackagingOptionToggle (Returnable vs Standard)
│   │   ├── Co2FootprintChip
│   │   └── SustainableMenuItems
│   │
│   ├── [Tab 3] RewardsReturnsHub
│   │   ├── ActiveContainersCounter
│   │   ├── QRScanReturnButton
│   │   ├── DropOffSitesMap / List (Campus, Store, Rider)
│   │   └── RedeemedCouponsCarousel
│   │
│   └── [Tab 4] ImpactLeaderboard
│       ├── ImpactSummaryHeader (CO2 saved + containers returned + rank)
│       ├── FriendRankingsTable (CO2 saved leaderboards)
│       ├── AchievementBadgesGrid
│       └── MerchantSustainabilityLeaderboard
```

---

## 6. How to Preview the Stitch Screens

Run a local HTTP server inside the project root:

```bash
# Using Python 3
python3 -m http.server 8000

# Or using Node npx serve
npx serve .
```

Open `http://localhost:8000/templates/index.html` to access the interactive navigation hub.
