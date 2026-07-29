# Analytics

The platform uses a **self-hosted Plausible** instance at
`https://plausible.earthmonitor.org` for both automatic and custom analytics.

- [Setup](#setup)
- [Automatic tracking](#automatic-tracking)
- [Custom events](#custom-events)
- [Event sources](#event-sources)
- [Adding a new event](#adding-a-new-event)
- [Conventions and gotchas](#conventions-and-gotchas)
- [Relationship to `/usage-stats`](#relationship-to-usage-stats)

## Setup

Plausible is wired up in `src/utils/providers.tsx` via
[`next-plausible`](https://github.com/4lejandrito/next-plausible):

```tsx
<PlausibleProvider
  domain="app.earthmonitor.org"
  trackOutboundLinks
  trackFileDownloads
  selfHosted
  scriptProps={{
    src: 'https://plausible.earthmonitor.org/js/script.file-downloads.hash.outbound-links.pageview-props.tagged-events.js',
  }}
>
```

Two things about this block are easy to get wrong:

- **`domain` must be a bare hostname.** `next-plausible` passes the prop
  straight through to the script's `data-domain` attribute, and Plausible
  matches that value against the domain registered in the dashboard, which is
  stored without a protocol or trailing slash. A value like
  `https://app.earthmonitor.org/` silently drops every event — the script loads,
  requests fire, and nothing is ever attributed.
- **`scriptProps.src` overrides the computed URL.** `next-plausible` normally
  derives the script filename from the boolean props, but anything in
  `scriptProps` is spread last and wins. The hardcoded URL above must therefore
  already include every extension the app relies on:
  `file-downloads`, `hash`, `outbound-links`, `pageview-props`, `tagged-events`.
  Adding a prop like `revenue` without also updating this URL would have no
  effect.

### When events are sent

`PlausibleProvider` is enabled by default only when
`NODE_ENV === 'production'` and `NEXT_PUBLIC_VERCEL_ENV` is either unset or
`'production'`. This project deploys via Docker, so the Vercel variable is
unset and a production build always tracks. **Nothing is sent from `yarn dev`.**

To verify events locally, add `trackLocalhost` to the provider temporarily —
don't commit it, or local development will pollute production stats.

## Automatic tracking

Handled by the Plausible script itself, no application code involved:

| What | Source |
| --- | --- |
| Pageviews | Core script |
| Outbound link clicks | `trackOutboundLinks` |
| File downloads | `trackFileDownloads` |

## Custom events

All custom events go through one typed helper, `src/lib/analytics.ts`:

```tsx
import { useTrackEvent } from '@/lib/analytics';

const track = useTrackEvent();

track('Geostory Open', {
  props: { geostory_id: id, title, source: 'geostories-page' },
});
```

`useTrackEvent` is `usePlausible<AnalyticsEvents>()`. Because the event map is
passed as the type parameter, **both the event name and its props are checked at
the call site** — a typo in a name, a missing prop, or a wrong `source` value is
a build error rather than a silently malformed event.

Every event and its properties are declared in the `AnalyticsEvents` type. That
type is the single source of truth; the table below mirrors it.

### `Geostory Open`

A user navigated into a geostory.

| Prop | Type |
| --- | --- |
| `geostory_id` | `string` |
| `title` | `string` |
| `source` | [`EventSource`](#event-sources) |

Fired from seven places — every entry point into a geostory:

| File | Surface |
| --- | --- |
| `containers/globe/geostories/geostories-list/item.tsx` | Landing globe geostory list |
| `components/globe/geostory-dialog.tsx` | Landing globe dialog, arrow button |
| `components/geostories/item/index.tsx` | Geostories page card |
| `components/monitors/table/item/geostory.tsx` | A monitor's expandable geostory sublist |
| `components/sidebar/card-header.tsx` | Explore sidebar, card title link |
| `components/sidebar/card-geostory-content.tsx` | Explore sidebar, "Go to geostory" |
| `components/sidebar/card-monitor-content.tsx` | Explore sidebar, "Related geostories" |

The last three live in the same sidebar card but are separate `<Link>`s — a
click on the chevron never runs the card header's handler, so each needs its
own call.

### `Monitor Open`

A user navigated into a monitor.

| Prop | Type |
| --- | --- |
| `monitor_id` | `string` |
| `title` | `string` |
| `source` | [`EventSource`](#event-sources) |

| File | Surface |
| --- | --- |
| `components/monitors/table/item/monitor.tsx` | Monitors page link |
| `components/sidebar/card-header.tsx` | Explore sidebar, card title link |
| `components/sidebar/card-monitor-content.tsx` | Explore sidebar, "Go to monitor" |

### `Layer Activate`

A dataset layer was switched **on**. Deactivation is deliberately not tracked —
turning a layer off is not an interest signal and only adds noise to the
breakdown.

| Prop | Type |
| --- | --- |
| `layer_id` | `string` |
| `title` | `string` |
| `parent_type` | `'monitor' \| 'geostory'` |

Fired from `components/datasets/card/index.tsx`, inside the activation branch of
`handleToggleLayer`.

### `Category Filter`

A category (theme) was **selected**. Clearing a category is not tracked, so the
breakdown reads as interest per category rather than raw toggle volume.

| Prop | Type |
| --- | --- |
| `category` | `CategoryId \| 'All'` |
| `source` | [`EventSource`](#event-sources) |

| File | Surface |
| --- | --- |
| `containers/globe/filters/item.tsx` | Landing globe category pills (multi-select) |
| `components/theme-filter/map-sidebar-item.tsx` | Explore sidebar icon rail (single-select, plus "All") |
| `containers/globe/mobile-toolbar.tsx` | Landing mobile toolbar |
| `containers/explore/toolbar/mobile/nav-bar/index.tsx` | Explore mobile nav bar |

The landing globe pills are a genuine toggle, so the call there is guarded by
`if (!isActive)`. The other three surfaces only ever *set* a category, so they
fire unconditionally. The mobile "Catalogue" back button calls
`setCategory(null)` and is not tracked — that is a clear, not a selection.

### `Dataset Type Filter`

The monitors / geostories / all switch changed.

| Prop | Type |
| --- | --- |
| `dataset_type` | `'all' \| 'monitors' \| 'geostories'` |
| `source` | [`EventSource`](#event-sources) |

| File | Surface |
| --- | --- |
| `components/sidebar/select.tsx` | Explore sidebar select |
| `containers/globe/mobile-toolbar.tsx` | Landing mobile toolbar |
| `containers/explore/toolbar/mobile/nav-bar/index.tsx` | Explore mobile nav bar |

`components/filters-by-dataset-type/desktop` is presentational and receives
`handleDatasetTypeChange` as a prop, so the event lives in each of the three
containers that own the setter — not in the shared component.

### `Histogram Open`

A histogram was opened from a map tooltip.

| Prop | Type |
| --- | --- |
| `histogram_type` | `'point' \| 'region'` |
| `layer_id` | `string` |
| `source` | [`EventSource`](#event-sources) |

The two histogram buttons are mutually exclusive and driven by
`regionsLayerVisibilityAtom`: **"Show point histogram"** renders while the
regions layer is off, **"Show region histogram"** while it is on. Rather than
two event names, one event carries `histogram_type` so the two can be compared
in a single breakdown.

| File | Handler | `histogram_type` |
| --- | --- | --- |
| `components/map/tooltip/index.tsx` | `handleClick` | `point` |
| `components/map/tooltip/index.tsx` | `handleHistogram` | `region` |
| `components/map/tooltip/geostory-tooltip.tsx` | `handleClick` | `point` |
| `components/map/tooltip/geostory-tooltip.tsx` | `handleHistogram` | `region` |

In the geostory tooltip both handlers are bound twice — once for `leftData` and
once for `rightData` in compare mode — but they always describe the same layer,
`leftData.id`.

### `Regions Layer Activate`

The regions (NUTS) overlay was switched **on**. Switching it off is not tracked,
matching `Layer Activate`.

| Prop | Type |
| --- | --- |
| `source` | [`EventSource`](#event-sources) |

Fired from `components/map/controls/basemaps/index.tsx`.

### `Basemap Change`

| Prop | Type |
| --- | --- |
| `basemap` | `'world_imagery' \| 'gray_scale'` |
| `source` | [`EventSource`](#event-sources) |

### `Map Labels Change`

| Prop | Type |
| --- | --- |
| `labels` | `'dark' \| 'light' \| 'no-label'` |
| `source` | [`EventSource`](#event-sources) |

Both are fired from `components/map/controls/basemaps/index.tsx`, and both
handlers already early-return when the value is unchanged, so re-selecting the
active option sends nothing.

The prop types are imported from
`components/map/controls/basemaps/constants` as `import type`, so adding a
basemap or label there widens the event type automatically with no runtime
coupling.

## Event sources

`source` is a closed union rather than a free string, so a surface is always
reported under the same name and breakdowns stay comparable over time.

| Value | Where |
| --- | --- |
| `landing-globe` | Landing page globe, desktop |
| `landing-globe-dialog` | Geostory dialog on the landing globe |
| `landing-globe-mobile` | Landing page mobile toolbar |
| `geostories-page` | Geostories listing page |
| `monitors-page` | Monitors listing page |
| `monitor-geostories` | Geostory sublist inside a monitor row |
| `explore-sidebar` | Explore page sidebar, desktop |
| `explore-mobile` | Explore page mobile nav bar |
| `map-controls` | Map settings popover (basemap, labels, regions) |
| `map-tooltip` | Monitor map tooltip |
| `geostory-map-tooltip` | Geostory map tooltip |

## Adding a new event

1. Add the event name and its props to `AnalyticsEvents` in
   `src/lib/analytics.ts`. Add a new `EventSource` member if the surface isn't
   listed yet.
2. Call it from a **client** component:
   ```tsx
   const track = useTrackEvent();
   track('My Event', { props: { ... } });
   ```
3. If the call sits inside a `useCallback`, add `track` to the dependency array.
   It is referentially stable (`usePlausible` memoises with `[]`), so this
   doesn't cause re-renders.
4. **Allow-list the prop keys in the Plausible dashboard.** See below.
5. Update this document.

### Dashboard configuration

Custom properties are not automatically visible. Each key must be added under
*Site settings → Custom properties* in the Plausible dashboard, otherwise the
event count is recorded but every breakdown shows up empty. The keys currently
in use:

```
geostory_id, monitor_id, layer_id, title, source,
parent_type, category, dataset_type, histogram_type, basemap, labels
```

## Conventions and gotchas

- **Activation only.** For anything that toggles — layers, categories, the
  regions overlay — only the "on" transition is tracked. Off-transitions
  roughly double event volume while adding no signal.
- **Never track inside a state updater.** React may invoke an updater function
  more than once, which would double-count. Compute the condition from current
  state and fire before calling the setter:
  ```tsx
  if (!isActive) track('Category Filter', { props: { ... } });
  setCategoriesFilter((prev) => { ... });
  ```
- **Hooks before early returns.** Several instrumented components early-return
  (`if (!geostory) return null`). `useTrackEvent()` must be called above that
  line to keep hook order stable across renders.
- **Events are queued, not lost.** `PlausibleProvider` injects an init snippet
  that stubs `window.plausible` with a queue, so a click that lands before the
  script finishes loading is still delivered.
- **Instrument the container, not the shared presentational component.** Where a
  handler is passed down as a prop, the event belongs with whoever owns the
  state, so the `source` can be set correctly per surface.

## Relationship to `/usage-stats`

Plausible is **not** the only counter in the app. `postWebTraffic` in
`src/hooks/web-traffic.ts` POSTs to the backend `/usage-stats` endpoint, and
those counts drive the "most visited" geostories and monitors shown in the UI.

The two are independent and intentionally so — `/usage-stats` is a product
feature whose numbers are rendered to users, while Plausible is for analysis.
Some handlers call both. Don't replace one with the other.
