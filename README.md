# Mapping Library Testing App

Astro app for testing multiple mapping engines across multiple UI frameworks.

## Routing model

The app uses route hierarchy to control which scripts and styles are loaded.

- `/` → framework selection
- `/frameworks/vanilla` → engine selection for vanilla
- `/frameworks/vanilla/engines/maplibre` → loads only MapLibre assets
- `/frameworks/vanilla/engines/leaflet` → loads only Leaflet assets

Each engine page injects its own dependencies in a head slot, so no other mapping library code is added to the DOM for that route.

## Layouts

- `src/layouts/base.astro`: shared document shell (font, meta, global styles, head slot)
- `src/layouts/test-harness.astro`: sidebar + map workspace shell for engine pages

## Next framework expansion

Follow the same pattern for new frameworks:

- `/frameworks/react/...`
- `/frameworks/vue/...`
- `/frameworks/solid/...`

With per-engine pages under each framework, each route can keep asset loading isolated and predictable.

## Commands

- `pnpm install` installs dependencies
- `pnpm dev` starts local dev server at `localhost:4321`
- `pnpm build` builds production output in `dist/`
- `pnpm preview` previews the built app

## Environment variables

Set the NGD tiles API key in a local `.env` file:

- `PUBLIC_API_KEY_NGD_TILES=your_key_here`

This key is intentionally client-visible for this internal testing tool, but it is not hardcoded in source.
