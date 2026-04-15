# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Open-Earth-Monitor Cyberinfrastructure (OEMC) — a geospatial web application for visualizing environmental monitoring datasets (monitors and geostories) on 2D maps (OpenLayers) and a 3D globe (Cesium).

## Commands

```bash
yarn dev          # Start dev server on localhost:3000
yarn build        # Production build (standalone output)
yarn start        # Run production build
yarn lint         # ESLint (next/core-web-vitals + @typescript-eslint + prettier)
yarn check-types  # TypeScript type checking
yarn test         # Playwright e2e tests (starts dev server automatically)
yarn test-ui      # Playwright e2e tests in interactive UI mode
```

Run a single Playwright test:
```bash
npx playwright test e2e/<test-file>.spec.ts
```

Node 22.14.0 (see `.nvmrc`), Yarn 3.6.3.

Stack: Next.js 16.2.3 (App Router, standalone output), React 19.1, TypeScript 5.9, Tailwind **3.3** (not v4), shadcn/ui on Radix.

**Cesium gotcha**: `postinstall` copies `node_modules/cesium/Build/Cesium/*` → `public/cesium/`. Required for globe rendering (`window.CESIUM_BASE_URL = '/cesium/'` in `src/components/globe/index.tsx`). Re-run `yarn install` if globe fails to load tiles/widgets.

**CI e2e** (see `playwright.config.ts`): runs `NODE_ENV=test yarn build && next start` on CI (vs `yarn dev` locally). Retries 2x on CI, 0 locally. `fullyParallel` disabled on CI. Playwright loads `.env.test`.

## Environment

Create `.env.local` from `.env.example`. Key variable:
- `NEXT_PUBLIC_API_URL` — API endpoint for dataset data (default: `https://g3w.earthmonitor.org/dev`)

Playwright uses `.env.test` for its own environment.

## Architecture

**Next.js App Router** with TypeScript. All source code lives under `src/`.

### Routing

| Route | Description |
|---|---|
| `/` | Landing — 3D globe (Cesium) with geostory pins, category filter, search |
| `/explore` | 2D map interface (OpenLayers) |
| `/explore/monitor/[monitor_id]` | Monitor detail with map layers |
| `/explore/geostory/[geostory_id]` | Geostory detail with map layers |
| `/disclaimer` | Disclaimer page |
| `/usage-stats` | Usage statistics page |

Landing uses `(landing)` route group so it can share a layout without adding a URL segment. Globe client at `src/app/(landing)/client.tsx` dynamically imports `./index.tsx` with `ssr: false` (Cesium needs `window`).

### Key directories

- `src/app/` — Next.js routes and root layout. Global Jotai atoms in `store.tsx`. Route group `(landing)` wraps globe page without adding URL segment.
- `src/containers/` — Page-level smart components: `explore`, `globe`, `map`, `sidebar`, `sidebar-anchor-elements`, `histogram`, `live-updates`, `filter-pill`. Compose smaller components and wire data/state.
- `src/components/` — Presentational components organized by feature. `components/ui/` contains shadcn/ui primitives (Radix-based).
- `src/hooks/` — `datasets`, `geostories`, `layers`, `map`, `monitors`, `openstreetmaps`, `pagination`, `social-media`, `sync-query` (URL state via nuqs), `web-traffic`.
- `src/services/api/` — Axios instances: default API (`NEXT_PUBLIC_API_URL`), `APISocialMedia` (Fosstodon), `APIOpenStreetMapLocation` (Nominatim).
- `src/types/` — TypeScript type definitions for monitors, geostories, layers, etc.
- `src/lib/` — Utilities (formatting, WMS helpers, classnames via clsx + tailwind-merge).
- `src/constants/` — App constants (theme categories, etc.).
- `src/utils/` — Provider wrappers, bbox utilities, JSON validation.
- `e2e/` — Playwright test specs.

### State management

- **Jotai** atoms (`src/app/store.tsx`) for global UI state (histogram visibility, coordinates, NUTS region data, compare mode, time series playback).
- **TanStack React Query** for server state / data fetching with 60s default stale time.
- **nuqs** (`next-usequerystate`) for URL query parameter synchronization.

### Styling

Tailwind CSS with shadcn/ui component library. Custom theme with `brand`, `primary`, `secondary`, `alert`, `monitors` color tokens. Fonts: Inter (body) and Satoshi (headings) loaded as CSS variables.

### Import order (enforced by ESLint)

`react` → `next` → external → `@/lib`, `@/store` → `@/types` → `@/app`, `@/constants` → `@/hooks` → `@/containers` → `@/components` → `@/styles`

### Code style

- Prettier: single quotes, semicolons, 100 char width, es5 trailing commas, tailwind plugin for class sorting.
- `no-console` warns (allow `info`, `error`, `debug`).
- Path alias: `@/*` maps to `src/*`.

### Map stack

- **OpenLayers** (+ rlayers React bindings, ol-ext) for the 2D explore map with WMS/TMS layers and time series.
- **OLCesium** (OpenLayers-Cesium integration) for the 3D globe view with synchronized layers.
- **Cesium** for 3D rendering with interactive camera control.
- **VisX** (D3 wrapper) for histogram/chart visualizations.

### Globe (3D) Implementation Details

**Map3D Component** (`src/components/globe/index.tsx`) — split across siblings: `camera-constraints.tsx`, `diamond-pin.ts`, `dynamic-lighting.tsx`, `fly-to-center.tsx`, `geostory-dialog.tsx`, `globe-ready.tsx`, `pulse-animation.ts`, `pulse-layer.tsx`:
- Core Cesium wrapper using Resium declarative components for 3D rendering
- Mount-only initialization to prevent scene blinking/recreation
- Callback refs used to maintain closure over current values without triggering re-renders
- Basemap: ESRI World Imagery (free XYZ tile provider via `UrlTemplateImageryProvider`)
  - Cesium Ion is explicitly disabled (no token required): `Cesium.Ion.defaultAccessToken = undefined`
  - Provider defined at module level for stable reference (Resium read-only prop requirement)
  - Configured via Resium's declarative `<ImageryLayer>` component with `baseLayer={false}` on `<Viewer>` to prevent Ion default imagery layer
  - XYZ endpoint: `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`
  - Includes proper attribution credit via Cesium Credit API
- Layer sync: Diff-based (add new, remove stale) instead of replace-all
- ResizeObserver only fires `fitGlobeToViewport` on first resize, not on window resizes

**Atmosphere and Lighting**:
- SkyAtmosphere configured with `perFragmentAtmosphere = true` for detailed limb glow at globe edges
- Atmospheric parameters: `hueShift = 0.0`, `saturationShift = 0.4`, `brightnessShift = -0.9`, `atmosphereLightIntensity = 0.0` for subtle deep-space appearance
- Ground atmosphere enabled (`scene.globe.showGroundAtmosphere = true`) for atmospheric effects on globe surface
- Directional lighting (`scene.globe.enableLighting = true`) simulates sun from top-left
- Light direction dynamically updated every frame via `preRender` listener: `normalize(camera.right * 0.5 - camera.up * 0.7 + camera.direction * 0.5)` so shadow and highlights follow camera rotation, keeping bottom-right illuminated
- Scene background: dark navy (`#09131d`) for space effect, skyBox disabled

**Camera Controls**:
- Zoom disabled (`screenSpaceCameraController.enableZoom = false`) to maintain full-globe visibility as reference context
- Rotation and tilt enabled for interactive exploration
- Camera locked to full-globe altitude via `computeFullGlobeHeight()` to ensure entire earth always visible

**Camera Control Features**:
- `flyToBounds(extent)` — Rotate camera to center on a [west, south, east, north] extent at fixed full-globe altitude (no zoom)
- `flyToDefault()` — Return camera to default position [20°, 15°] with animation at full-globe altitude
- Both methods cancel in-progress flights to prevent jarring interruptions
- `computeFullGlobeHeight(scene, globePadding)` — Helper function calculates fixed altitude keeping full globe visible, based on ellipsoid radius, viewport FOV, aspect ratio, and padding

**Click Handling**:
- ScreenSpaceEventHandler properly initialized for Cesium click events
- Type-safe discrimination between Cesium and OpenLayers click events
- Exports `CesiumClickEvent` type for consumers

**Globe Page** (`src/app/(landing)/index.tsx`):
- Integrates category filtering with camera animation
- When filters change, camera flies to fit visible geostory markers
- Handles edge cases: no pins → default view, 1 pin → zoom with padding, N pins → bounding box
- Memoizes pin layer creation to avoid unnecessary re-renders

**Sidebar Geostories** (`src/containers/globe/geostories/index.tsx`):
- Filters geostory list by selected categories
- Shows all geostories when categories is empty array or null (proper truthiness check)
- Search integration with debouncing

**Geostory Pins Hook** (`src/app/(landing)/geostory-pins.ts`):
- `useGeostoryPins()` returns all available geostory pins with valid coordinates
- Handles Web Mercator vs lon/lat coordinate detection
- Validates bbox format and coordinate bounds
- Category filtering moved to consuming component (globe page)

<!-- autoskills:start -->
Project skills live in `.claude/skills/` and are auto-loaded by the skill loader (no need to index them here). Relevant skills for this repo: `next-best-practices`, `next-cache-components`, `next-upgrade`, `playwright-best-practices`, `accessibility`, `tailwind-css-patterns`, `shadcn`, `vercel-react-best-practices`, `vercel-composition-patterns`, `frontend-design`, `typescript-advanced-types`, `nodejs-best-practices`, `seo`.
<!-- autoskills:end -->

