# UI Core Architecture Decision Records

These ADRs are scoped to `packages/ui-core` and its design-system/monorepo architecture. They are not evidence that every future plugin, application shell, tenant integration, or consuming product is implemented or deployed.

## Decision index

| ADR | Topic |
|---|---|
| [0001](./0001-design-system-monorepo.md) | Design-system monorepo |
| [0002](./0002-theming-strategy.md) | Theming strategy |
| [0003](./0003-component-layering.md) | Component layering |
| [0004](./0004-appshell-architecture.md) | Application-shell architecture |
| [0005](./0005-page-patterns-architecture.md) | Page-pattern architecture |
| [0006](./0006-package-boundaries-monorepo-governance.md) | Package boundaries and monorepo governance |
| [0007](./0007-state-managemnt-strategy.md) | State-management strategy |
| [0008](./0008-data-fetching-API-abstraction-layer.md) | Data fetching and API abstraction |
| [0009](./0009-plugin-extension-architecture-future-system.md) | Future plugin/extension architecture |
| [0010](./0010-routing-strategy+patterns-integration.md) | Routing strategy and pattern integration |
| [0011](./0011-mutli-tenant-architecture.md) | Multi-tenant architecture |

## Review rules

- Each ADR's own status and decision text is authoritative for that record.
- A proposed/future architecture must not be described as implemented without matching source and test evidence.
- The existence of an ADR, package, component, or workflow is not proof of build success or runtime behavior.
- Correct spelling in a future ADR filename when creating new records; preserve existing paths unless a deliberate migration updates all links.
