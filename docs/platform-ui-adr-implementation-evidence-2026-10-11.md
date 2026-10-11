# Triminds Platform UI ADR-to-implementation evidence review — 2026-10-11

## Scope and boundary

This review compares the root README, architecture document, eleven ADRs in packages/ui-core/docs/adr, package manifests, selected UI source and workflow files. No install, lint, build, tests, publication, accessibility scan or live app check was run. Current CI status and package publication status remain unverified.

## Executive findings

1. **The monorepo foundation and core UI package are present.** The repository has pnpm workspace configuration, Turbo configuration, an apps/demo app, and packages/ui-core with tokens, theme provider, components, layouts, patterns and tests.
2. **The documented package topology is ahead of the current tree.** ADR-0006 and the root README list ui-themes and shared-utils as separate packages; the inspected tree has only ui-core plus apps/demo. Themes and utility functions currently live inside ui-core.
3. **The theming implementation is evidenced, but multi-tenant runtime resolution is not.** ThemeProvider applies CSS variables and supports configuration updates; base, OCL, Satellite and Vector AI theme definitions exist. No tenant resolver for domain/identity/environment, declarative per-tenant feature/navigation config or tenant schema validation was identified in the inspected runtime.
4. **Several accepted state/data/routing decisions are not implemented in the package manifests/source reviewed.** ADR-0007 calls for TanStack Query and Zustand, but those dependencies are not in ui-core or demo package manifests. ADR-0008 describes TanStack Query and domain service modules; the demo API helper uses direct fetch and the demo App does not consume it. ADR-0010 describes shell-owned routing, but react-router and a route registry/resolver were not identified in the reviewed manifests/source.
5. **Tailwind version documentation is inconsistent.** The README and docs/ARCHITECTURE.md say Tailwind CSS v4, while ui-core and the demo declare Tailwind CSS 3.4.x. This should be aligned to the version the workspace actually uses.
6. **The root CI has a clear build/test path, but nested workflow files are not active workflows in their current locations.** The active root .github/workflows/ci.yml installs with the frozen lockfile, runs Turbo build and ui-core tests. Additional ci/publish/release workflow files are stored under packages/ui-core/.github/workflows; GitHub Actions discovers workflow definitions from the repository-root .github/workflows directory, so these nested files do not run automatically from their current paths.
7. **The nested publish workflow also has source-level script mismatches.** It invokes “pnpm pnpm --filter ... typecheck”, while the package manifest does not define a typecheck script; the package CI workflow calls type-check, also not defined. These files should not be described as effective gates or publication automation until moved/configured and corrected.
8. **The demo API helper is not used by the current demo App.** It targets a Geo AI API by default at localhost:8000, but App.tsx only demonstrates a local counter and UI components. This is acceptable as a component demo if documented; it is not evidence of an integrated product API flow.

## ADR evidence matrix

| ADR | Decision / capability | Evidence in inspected source | Assessment |
|---|---|---|---|
| ADR-0001 | Design-system monorepo | pnpm workspace and Turbo configs exist; apps/demo and ui-core exist. Separate ui-themes and shared-utils packages are not present in the inspected tree. | **Partial.** Monorepo exists; documented package decomposition is not yet reflected in the tree. |
| ADR-0002 | Theming strategy | ThemeProvider, CSS-variable application and base/OCL/Satellite/Vector AI themes exist. | **Source evidence present.** Runtime tenant selection and product-level configuration remain separate concerns. |
| ADR-0003 | Component layering | UI primitives, layout components, patterns, hooks, tokens and utilities exist in ui-core. | **Structurally evidenced.** Boundary enforcement and architecture conformance are not established by folder structure alone. |
| ADR-0004 | AppShell architecture | AppShell component/context/styles and layout exports exist. | **Partial/source evidence present.** The demo does not demonstrate a configured navigation/routing integration end to end. |
| ADR-0005 | Page patterns | DashboardPattern, DataTablePage, AIPromptLayout and UploadProcessFlow exist. | **Partial/source evidence present.** Not all ADR examples such as AuthPage/FormPage are evidenced by the inspected pattern list. |
| ADR-0006 | Package boundaries and monorepo governance | Workspace exists, but only ui-core and demo are present; no ui-themes/shared-utils packages or dependency-boundary tooling were identified. | **Partially implemented.** ADR itself describes future enforcement mechanisms; keep them marked future until configured. |
| ADR-0007 | Hybrid state management: React, TanStack Query, Zustand | React local state is used in the demo and ThemeProvider; TanStack Query/Zustand dependencies or store/query-hook paths were not identified in reviewed manifests/source. | **Partial.** Local React state exists; server/global state architecture is not evidenced. |
| ADR-0008 | API abstraction and TanStack Query | apps/demo/src/lib/api.ts contains a small fetch wrapper, but App.tsx does not use it; no TanStack Query dependency or query hooks were identified. | **Partial.** A helper exists; the accepted server-state abstraction is not implemented in the reviewed path. |
| ADR-0009 | Plugin extension architecture | ADR describes future plugin capabilities; no plugin registry/loader/runtime was identified in the inspected source. | **Planned / not evidenced.** Do not present plugin extensibility as a delivered feature. |
| ADR-0010 | Shell-owned routing and page-pattern integration | AppShell and patterns exist, but no routing dependency or shell-owned route registry/resolver was identified in the reviewed manifests/source. | **Not evidenced in reviewed runtime.** Navigation examples in ADR are design guidance, not proof of routing implementation. |
| ADR-0011 | Multi-tenant/white-label runtime | Multiple theme definitions and configurable ThemeProvider exist. No tenant identity resolution, feature flags/navigation configuration per tenant, or validated tenant registry was identified. | **Partial.** Theming primitives exist; the multi-tenant frontend operating model remains unverified. |

## Additional documentation and CI mismatches

- Root README and docs/ARCHITECTURE.md state Tailwind CSS v4; ui-core and demo package manifests declare Tailwind CSS 3.4.x.
- The root README lists apps/demo, ui-core, ui-themes and shared-utils; the current tree contains demo and ui-core but not the two separate packages.
- ADR-0007's state strategy includes TanStack Query and Zustand, but the inspected package manifests do not declare either library.
- ADR-0008's query-hook architecture is not shown in the demo; apps/demo/src/lib/api.ts uses fetch directly and is not imported by App.tsx.
- ADR-0010's shell-owned routing model is not evidenced by a routing dependency or route resolver in the inspected path.
- Nested workflow files under packages/ui-core/.github/workflows are not in GitHub Actions' active workflow directory. The root workflow is the current automated entry point in the inspected tree.
- The nested package CI/publish workflows reference scripts that are not defined in ui-core/package.json. They should be treated as inactive/stale configuration until corrected and relocated.
- Accessibility-first is a design principle, but this review did not identify a dedicated automated accessibility/contrast test. Existing component tests do not automatically prove WCAG conformance.
- Storybook is labeled planned in the README, which is appropriately qualified; no Storybook dependency/configuration was identified in the inspected tree.

## Recommended follow-up

1. Decide whether ui-themes and shared-utils will become real workspace packages or whether ADR-0006/README should describe the current consolidated ui-core structure.
2. Align Tailwind version statements with the actual workspace dependencies.
3. Either implement TanStack Query/Zustand and shell-owned routing as recorded in ADRs, or explicitly mark those parts as planned/changed decisions.
4. Add a tenant configuration/resolution design only when a real tenant runtime is intended; distinguish theme switching from tenant isolation/feature/navigation configuration.
5. Move intended reusable CI/publish workflows into the repository-root .github/workflows directory and correct script names/commands before relying on them.
6. Add automated accessibility tests if WCAG conformance is a requirement; do not infer it from Radix usage alone.
7. Inspect current root CI runs and package outputs separately before claiming a successful build or publication.

## Explicit non-claims

This review does not establish whether the root CI is green, whether a package has been published, or whether any product consumes the library in production. No code, dependencies, lockfiles, workflow files or deployment settings were changed.
