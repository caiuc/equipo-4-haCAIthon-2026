# Prototype Screens Overview · RIU

This document provides a detailed breakdown of the 4 Google Stitch UI prototype screens for **RIU (Earthbound Delivery)**.

> [!NOTE]
> This describes the **original Stitch prototype**, kept frozen as a design reference.
> The shipped app in [`app/`](../app) evolved from it and differs in three ways:
> "Green Points" are now **Flora**, prices are in Chilean pesos, and the **daily-streak
> system was removed** — engagement is measured by containers returned instead.
> See [`../RESUMEN.md`](../RESUMEN.md) for the current feature set.

---

## Screen 1: Home Sustainable Feed

- **Source File:** [`templates/home_sustainable_feed/code.html`](file:///home/nicoquinta/code/equipo-4-haCAIthon-2026/templates/home_sustainable_feed/code.html)
- **Screenshot Reference:** `templates/home_sustainable_feed/screen.png`

```
┌────────────────────────────────────────────────────────┐
│ [📍 Deliver to 123 Greenway Ave]       [🍃 250 Points] │
├────────────────────────────────────────────────────────┤
│ HERO: Good food. Better planet.                        │
│ [ 🔍 Search healthy food...               ] [ 🎛️ Filter ] │
├────────────────────────────────────────────────────────┤
│ CATEGORIES:                                            │
│  [🍃 Sustainable]  [♻️ Zero-Waste]  [🌱 Plant-Based]     │
├────────────────────────────────────────────────────────┤
│ IMPACT CARD: 12.4 kg CO2 Avoided This Month            │
├────────────────────────────────────────────────────────┤
│ FEATURED RESTAURANTS:                                  │
│  - Green Bowl (Eco-Partner Badge • 100% Returnable)    │
│  - Earthy Eats (Plant-Based • Zero Plastic)            │
└────────────────────────────────────────────────────────┘
```

### Key UI Elements & Functional Specs:
1. **Header:** Location picker ("123 Greenway Ave") and real-time Green Points badge ("250 Green Points").
2. **Hero Banner:** "Good food. Better planet." typography set in Plus Jakarta Sans.
3. **Category Chips:** Horizontally scrollable pills with icons (`eco`, `recycling`, `spa`).
4. **Impact Summary Card:** Displays personal monthly carbon savings ($12.4\text{ kg CO}_2$).
5. **Merchant Cards:** Displays high-aspect image, delivery time, distance rating, and the green "Eco-Partner" badge for stores with >30% sustainable packaging sales.

---

## Screen 2: Sustainable Merchant Detail (Green Bowl)

- **Source File:** [`templates/restaurant_green_bowl/code.html`](file:///home/nicoquinta/code/equipo-4-haCAIthon-2026/templates/restaurant_green_bowl/code.html)
- **Screenshot Reference:** `templates/restaurant_green_bowl/screen.png`

```
┌────────────────────────────────────────────────────────┐
│ [⬅️ Back]                                [❤️ Favorite] │
├────────────────────────────────────────────────────────┤
│ COVER: Green Bowl Kitchen (⭐ 4.9 • 20-30 min)          │
│ BADGE: 🌿 30%+ Sustainable Sales Goal Met              │
├────────────────────────────────────────────────────────┤
│ PACKAGING PREFERENCE TOGGLE:                           │
│  (•) Returnable Container (Save $1.50 + Get 20 pts)    │
│  ( ) Standard Compostable Container                    │
├────────────────────────────────────────────────────────┤
│ POPULAR DISHES:                                        │
│  - Harvest Grain Bowl (🌱 0.4kg CO2e) ...... $12.50    │
│  - Avocado Kale Salad (🌱 0.2kg CO2e) ...... $10.99    │
└────────────────────────────────────────────────────────┘
```

### Key UI Elements & Functional Specs:
1. **Merchant Header & Sustainability Goal Badge:** Highlights merchant achievements (e.g., ">30% Sustainable Sales Goal Met").
2. **Returnable Packaging Toggle:** Interactive selection encouraging users to pick returnable bowls for a direct discount ($1.50 off) + bonus Green Points.
3. **Carbon Footprint Tags:** Each menu item lists its estimated carbon footprint ($kg\text{ CO}_2e$).

---

## Screen 3: Rewards & Smart Drop-Off Hub

- **Source File:** [`templates/rewards_returns/code.html`](file:///home/nicoquinta/code/equipo-4-haCAIthon-2026/templates/rewards_returns/code.html)
- **Screenshot Reference:** `templates/rewards_returns/screen.png`

```
┌────────────────────────────────────────────────────────┐
│ Packaging Return & Rewards Hub                         │
├────────────────────────────────────────────────────────┤
│ ACTIVE CONTAINERS: 2 Containers awaiting return        │
│ [ 📷 SCAN CONTAINER QR CODE TO RETURN ]                │
├────────────────────────────────────────────────────────┤
│ SMART DROP-OFF LOCATIONS:                              │
│  📍 Campus Central Library (Smart Bin • 0.3 km)        │
│  📍 Green Bowl Store (In-Store Drop-off • 0.8 km)      │
│  🛵 Next Delivery Option (Give to Rider)               │
├────────────────────────────────────────────────────────┤
│ YOUR REWARDS:                                          │
│  🎟️ $5 Off Next Order (Redeem 200 pts)                 │
│  ☕ Free Organic Coffee (Redeem 150 pts)               │
└────────────────────────────────────────────────────────┘
```

### Key UI Elements & Functional Specs:
1. **Active Containers Counter:** Shows containers currently checked out by the user.
2. **QR Code Return Scanner Button:** Prominent call-to-action to open camera scan.
3. **Smart Drop-Off Site Selector:** Lists 3 return methods:
   - Special Smart drop-off bins in university campuses.
   - Direct in-store returns at participating restaurants.
   - Returning containers to the delivery driver during the next delivery.
4. **Rewards Catalog:** Coupons and discounts unlocked via returned containers.

---

## Screen 4: Duolingo-Style Social CO2 Leaderboard

- **Source File:** [`templates/impact_leaderboard/code.html`](file:///home/nicoquinta/code/equipo-4-haCAIthon-2026/templates/impact_leaderboard/code.html)
- **Screenshot Reference:** `templates/impact_leaderboard/screen.png`

```
┌────────────────────────────────────────────────────────┐
│ Impact Leaderboard                                     │
│ 🔥 7-Day Sustainable Streak!                           │
├────────────────────────────────────────────────────────┤
│ FRIEND LEADERBOARD (Monthly CO2 Saved):                │
│  🥇 1. Alex R. .......... 28.5 kg CO2  [🔥 Streak 12] │
│  🥈 2. You .............. 22.4 kg CO2  [🔥 Streak 7]  │
│  🥉 3. Sofia M. ......... 18.2 kg CO2  [🔥 Streak 4]  │
├────────────────────────────────────────────────────────┤
│ ECO COMPANY LEADERBOARD (Top Sustainable Merchants):   │
│  1. Green Bowl .......... 94% Returnable Sales         │
│  2. Farm2Table .......... 88% Returnable Sales         │
└────────────────────────────────────────────────────────┘
```

### Key UI Elements & Functional Specs:
1. **Gamification Header:** Duolingo-style fire icon showing active sustainable streak.
2. **Friend Leaderboard:** Ranks friends by $kg\text{ CO}_2$ prevented from reaching the atmosphere.
3. **Company Leaderboard:** Publicly showcases restaurants leading in returnable container adoption (>30% goal threshold).
