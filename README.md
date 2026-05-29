# InsureQuick

Auto insurance quote generator built with Next.js 16 (App Router) and Tailwind CSS v4.

## Features

- **Multi-step quote form** (Personal Info → Vehicle Info → Driving & Coverage)
- **Real-time pricing** calculated from mock JSON data
- **Light/Dark mode** toggle with localStorage persistence
- **Dismissible coming soon banner** on the home page
- **Quote summary** with save, edit, and download actions
- **Quote history** from localStorage

## Pages

| Route | Description |
|---|---|
| `/` | Home page with CTA |
| `/quote` | 3-step quote form |
| `/summary` | Quote result & actions |
| `/quotes` | Saved quote history |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Data Files

- `data/vehicles.json` — Vehicle makes and models
- `data/pricing.json` — Base rates, deductibles, and multipliers

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # ESLint
npm test         # Playwright e2e tests
```
