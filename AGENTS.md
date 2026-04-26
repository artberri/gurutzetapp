# AGENTS.md

This file provides guidance to AI Code Agents when working with code in this repository.

## Repository layout

Two top-level folders (no root package — no monorepo tooling):

- `web/` — the main PWA (Gurutzetako Jaiak festival app). Everything below refers to this unless stated otherwise.
- `android/` — a Bubblewrap-generated TWA wrapper around the deployed PWA at `app.gurutzeta.info`. Contains the `twa-manifest.json` file, the rest files are ignored. No source code to modify; rebuild via `pnpx @bubblewrap/cli build` from inside `android/` (see root README).

## Toolchain

- Node and pnpm versions are pinned in `.prototools` (proto/moonrepo). CI uses `moonrepo/setup-toolchain@v0` with auto-install.
- Package manager is **pnpm** (not npm/yarn). Lockfile is `web/pnpm-lock.yaml`.
- Git hooks live in `.githooks/` (not `.husky/`). `pnpm run prepare` in `web/` wires `core.hooksPath` to it; the pre-commit hook runs `lint-staged` inside `web/`.

## Commands (run from `web/`)

```sh
pnpm install           # install deps
pnpm dev               # vite dev server
pnpm build             # tsc -b && vite build  (typecheck is part of build)
pnpm preview           # preview production build
pnpm lint              # oxlint
pnpm lint:fix          # oxlint with --fix --fix-suggestions --fix-dangerously
pnpm fmt               # oxfmt (write)
pnpm fmt:check         # oxfmt (check only)
pnpm qa                # tsc --noEmit + lint  (what CI runs)
pnpm deploy            # wrangler pages deploy dist --project-name gurutzeta
```

No test runner is configured.

The lint/format stack is **oxc** (oxlint + oxfmt), configured via `.oxlintrc.json` and `.oxfmtrc.json`. Oxlint runs with `typeAware: true` and almost every category set to `error`; the config disables many rules that would otherwise conflict with the codebase style (see `.oxlintrc.json`).

## Environment

`web/.env` must define:

```
VITE_CONTENTFUL_SPACE_ID=
VITE_CONTENTFUL_ACCESS_TOKEN=
VITE_SENTRY_DSN=
VITE_SENTRY_RELEASE=dev
```

CI injects these from `REACT_APP_*`-named GitHub secrets (legacy names, kept for continuity). Access env vars through `infrastructure/GetEnv.ts`, which returns an `Either`.

## Deployment

- Hosting: Cloudflare Pages, project name `gurutzeta`. `.github/workflows/deploy.yml` runs on successful `qa` workflow completion on `main` and calls `pnpm run deploy`.
- Android: manual via Bubblewrap CLI from `android/` (see root README). Not part of CI.

## Architecture (web/)

The app is a strict **hexagonal / ports-and-adapters** layout with a DI container and functional-style effect handling. Understanding these four layers is the fastest path to productivity:

### 1. `domain/` — pure business model and port interfaces

Plain TS classes and interfaces describing Activities, Categories, Venues, Favorites, and the orchestrating `Syncronizer`. Abstract classes (e.g. `Storage`, `Tracer`, `NetworkDetector`, `DataFetcher`) are the **ports** — other layers depend only on these, never on concrete implementations.

### 2. `infrastructure/` — adapters for ports

- `LocalStorage` implements `Storage` (browser localStorage, returning `Either<Error, T>` from `getItem`).
- `ContentfulDataFetcher` implements `DataFetcher` using Contentful's delta-sync API. It persists a `nextSyncToken` in storage under `GURUTZETAPP_NEXT_TOKEN_2025` so reloads fetch only changes. Look here before adding any remote data source.
- `SentryTracer` implements `Tracer`; `BrowserNetworkDetector` implements `NetworkDetector`.

### 3. `config/DependencyInjection.ts` — wiring

Uses **diod** `ContainerBuilder`. The exported `container` is constructed at module load; `src/index.tsx` turns it into a `serviceGetter` passed down via React context (`utils/ServiceUtils.tsx`). **To consume a service in a component, use `useService(SomeDomainClass)`** — don't import concrete adapters directly.

To add a new service: register the port in `DependencyInjection.ts`, map it to an adapter with `.use()`, declare `.withDependencies([...])`, and pick `.asSingleton()` unless you have reason not to. `registerDomainDependencies` must stay idempotent (it's called on the exported builder).

### 4. `utils/*Utils.tsx` — React-facing layer

Each domain concept has a `*Utils.tsx` file that exposes a `<XProvider>` and a `useX` hook. These providers live inside `ContentProviders.tsx` and are the bridge between the DI-managed domain services and React render state. `AppStateUtils` holds tab/navigation state; `OnlineStatusUtils` surfaces `NetworkDetector`.

### Effect handling

Side-effectful operations return **Fluture `FutureInstance<Error, T>`**, not Promises. They're consumed with `fork` (see `Content.tsx`'s sync effect) and composed with `map`/`chain` from `fluture`. The `Syncronizer.sync()` chain and `ContentfulDataFetcher.fetchLoop` are the canonical examples.

Error-valued returns use the custom `cross-cutting/Either.ts` (not fp-ts). `cross-cutting/Maybe.ts` is the optional type. `ramda` is used for functional pipelines (`pipe`, `filter`, `map`, `mergeDeepWith`). Prefer these over ad-hoc try/catch when modifying existing flows — they pervade the codebase.

### PWA / offline

`vite-plugin-pwa` (workbox) is configured in `web/vite.config.ts` with `registerType: "autoUpdate"`. The app is designed offline-first: Contentful sync runs only when `useOnlineStatus()` returns true, and all reads go through `LocalStorage`-backed storage classes. Don't add network fetches that bypass this.

### i18n

`react-i18next` with resources in `src/locales/{es,eu}.json` (Spanish and Basque). Domain entities store localized fields as `LocalizedText = { es: string; eu: string }`.

## Conventions worth knowing

- **Tabs**, not spaces (enforced by oxfmt/biome formatter config).
- Double quotes in JS/TS (biome + oxfmt).
- Import sort groups are defined in `.oxfmtrc.json` and auto-applied; don't hand-reorder.
- `oxlint` disables `no-magic-numbers`, `max-lines-per-function`, `id-length`, and many strict-type rules — the codebase leans on type inference and short names.
- `reflect-metadata` is imported at app entry for diod.
- `oxlint-disable-next-line` comments with specific rule names are the project's escape hatch — follow that style rather than broad `// @ts-ignore`.
