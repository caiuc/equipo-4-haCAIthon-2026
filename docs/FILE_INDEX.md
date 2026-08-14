# Complete Repository File Index · GreenLoop

This file serves as a comprehensive registry of all files and directories in the **GreenLoop (Earthbound Delivery)** workspace. It explains the structure, purpose, and guidelines for every file so that AI agents and human developers can navigate the codebase instantly.

---

## Workspace Directory Tree

```
.
├── README.md                           # Master repository guide (Project overview + HaCAiThon 2026 bases)
├── ROADMAP.md                          # Production implementation roadmap & feature checklist
├── DESIGN.md                           # Earthbound Delivery Design System tokens & guidelines
├── ARCHITECTURE.md                     # Technical architecture & layout guide for Claude Code / AI Agents
├── LICENSE                             # MIT Open Source License file
├── stitch_greenloop_sustainable_delivery.zip # Original compressed export from Google Stitch
│
├── docs/                               # Developer & AI Agent Context Documentation
│   ├── FILE_INDEX.md                   # Complete file map & descriptions (This file)
│   ├── SCREENS_OVERVIEW.md             # Functional breakdown of the 4 prototype UI screens
│   └── DESIGN_SYSTEM_GUIDE.md          # Guide on consuming DESIGN.md color tokens & Tailwind config
│
└── templates/                          # Google Stitch HTML/Tailwind Prototype Screens (UNTOUCHED)
    ├── index.html                      # Interactive Navigation Hub to preview screens in browser
    ├── home_sustainable_feed/          # Screen 1: Home Feed & Search
    │   ├── code.html                   # HTML / Tailwind source template (Untouched)
    │   └── screen.png                  # UI Screenshot reference
    ├── restaurant_green_bowl/          # Screen 2: Sustainable Merchant Page
    │   ├── code.html                   # HTML / Tailwind source template (Untouched)
    │   └── screen.png                  # UI Screenshot reference
    ├── rewards_returns/                # Screen 3: Smart Drop-off & Packaging Return Hub
    │   ├── code.html                   # HTML / Tailwind source template (Untouched)
    │   └── screen.png                  # UI Screenshot reference
    ├── impact_leaderboard/             # Screen 4: Duolingo-Style Social CO2 Leaderboard
    │   ├── code.html                   # HTML / Tailwind source template (Untouched)
    │   └── screen.png                  # UI Screenshot reference
    └── global_overview/                # Overview design reference
        └── overview.png                # Combined Stitch prototype overview screenshot
```

---

## File Descriptions & Roles

### Root Files
| File Path | Description | Recommended AI Action |
| :--- | :--- | :--- |
| [README.md](file:///home/nicoquinta/code/equipo-4-haCAIthon-2026/README.md) | Main entrypoint for the project. Includes project vision, key features, quickstart, directory layout, and HaCAiThon 2026 contest bases. | Read to understand project objectives, contest requirements, and high-level setup. |
| [ROADMAP.md](file:///home/nicoquinta/code/equipo-4-haCAIthon-2026/ROADMAP.md) | Phased implementation roadmap for building the full application. | Use as a progress tracker when implementing features. |
| [DESIGN.md](file:///home/nicoquinta/code/equipo-4-haCAIthon-2026/DESIGN.md) | Color palette tokens, typography scales, layout spacing, elevation, and rounded corner rules. | Read before building any UI component or writing CSS/Tailwind styles. |
| [ARCHITECTURE.md](file:///home/nicoquinta/code/equipo-4-haCAIthon-2026/ARCHITECTURE.md) | Architectural blueprints, component hierarchy, data models, and strict AI coding rules. | Read before designing state managers, APIs, or data schemas. |
| [LICENSE](file:///home/nicoquinta/code/equipo-4-haCAIthon-2026/LICENSE) | MIT License covering all original code produced for HaCAiThon 2026. | Keep intact. |
| `stitch_greenloop_sustainable_delivery.zip` | Untouched ZIP file containing the original output exported from Google Stitch. | Preserved for fallback reference. |

---

### Documentation (`docs/`)
| File Path | Description | Recommended AI Action |
| :--- | :--- | :--- |
| [docs/FILE_INDEX.md](file:///home/nicoquinta/code/equipo-4-haCAIthon-2026/docs/FILE_INDEX.md) | Detailed registry of all repository files. | Read to quickly locate specific files. |
| [docs/SCREENS_OVERVIEW.md](file:///home/nicoquinta/code/equipo-4-haCAIthon-2026/docs/SCREENS_OVERVIEW.md) | Breakdown of the 4 prototype UI screens, features, material icons, and user flows. | Read when converting HTML screens into reusable React Native / Web components. |
| [docs/DESIGN_SYSTEM_GUIDE.md](file:///home/nicoquinta/code/equipo-4-haCAIthon-2026/docs/DESIGN_SYSTEM_GUIDE.md) | Developer guide on how Tailwind settings match `DESIGN.md` design tokens. | Reference during styling implementation. |

---

### Template Prototype Screens (`templates/`)
> [!CAUTION]
> **Do NOT edit the source code inside `templates/*/code.html` directly.**

| File Path | Description | Recommended AI Action |
| :--- | :--- | :--- |
| [templates/index.html](file:///home/nicoquinta/code/equipo-4-haCAIthon-2026/templates/index.html) | Interactive browser launcher listing all 4 prototype screens with direct preview links. | Open in browser (`python3 -m http.server`) to preview designs live. |
| [templates/home_sustainable_feed/code.html](file:///home/nicoquinta/code/equipo-4-haCAIthon-2026/templates/home_sustainable_feed/code.html) | Screen 1: Home Feed UI template with search, categories, and eco-partner cards. | Inspect HTML structure to extract React / Vue / Flutter components. |
| [templates/restaurant_green_bowl/code.html](file:///home/nicoquinta/code/equipo-4-haCAIthon-2026/templates/restaurant_green_bowl/code.html) | Screen 2: Merchant Detail UI template with returnable container toggle. | Inspect HTML structure for meal customization modal. |
| [templates/rewards_returns/code.html](file:///home/nicoquinta/code/equipo-4-haCAIthon-2026/templates/rewards_returns/code.html) | Screen 3: Rewards & Smart Drop-off Hub UI template with QR scan & map. | Inspect HTML structure for return bin list and coupon cards. |
| [templates/impact_leaderboard/code.html](file:///home/nicoquinta/code/equipo-4-haCAIthon-2026/templates/impact_leaderboard/code.html) | Screen 4: Duolingo-style social CO2 leaderboard UI template. | Inspect HTML structure for friend rankings and streak UI. |
| `templates/*/screen.png` | Screenshot PNG references for each screen. | View for visual layout confirmation. |
