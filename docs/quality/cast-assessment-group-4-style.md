# CAST Delta Report — Group 4: Style
**Module:** `src/Umbraco.Cms.Api.Management/`
**Branch:** `v17/improvement/cast-style`
**Date:** 2026-03-12
**PR:** https://github.com/ronstarling9/Umbraco-CMS/pull/16

---

## Violation Counts

| Category | Before | After | Delta |
|---|---|---|---|
| Long lines (>120 chars) | ~237 | 37 | -200 |
| **Total** | **~237** | **37** | **-200 (~84%)** |

---

## Techniques Applied

All changes are purely cosmetic — no behavioral changes, no API surface changes, no breaking changes.

| Technique | Description |
|---|---|
| Method/constructor parameter splitting | Multi-parameter signatures wrapped one-param-per-line |
| `Attempt<>` assignment wrapping | Long generic assignment + await call split across two lines |
| Generic type argument splitting | Base class `<T1, T2, T3, T4>` declarations broken to one-per-line |
| LINQ chain breaking | `.Select(...)`, `.Where(...)`, `.OfType<>()` chains split at method boundary |
| `ProducesResponseType` attribute wrapping | Long `typeof(...)` argument moved to next line |
| Collection initializer splitting | `new List<T>(...)` with initializer block broken across lines |
| Expression-body property splitting | Long `=> ...` properties moved to next line |
| `: base(...)` / `: this(...)` argument wrapping | Inheritance chain calls split to one-arg-per-line |

---

## Non-Fixable Residual Violations (37)

These lines exceed 120 chars but cannot be shortened without altering semantics or string content:

| Reason | Count |
|---|---|
| `[Obsolete("...")]` attribute string literals | 3 |
| `$"..."` string interpolations in error/log messages | 9 |
| `const string` assignments with long string values | 1 |
| `.WithDetail("...")` / `.WithTitle("...")` ProblemDetails strings | 5 |
| Log call string arguments (`_logger.Log*("...")`) | 6 |
| `using` alias declarations | 1 |
| Inline `throw new ...Exception("...")` string literals | 1 |
| `string.Format(...)` calls with long format strings | 1 |
| Generic type expression in `MapEnumerable<IGrouping<...>, ...>` | 1 |
| Inline comments on long expressions | 1 |
| `var validationErrorExpressionRoot = $"$."` expressions | 3 |
| Other string literal assignments | 5 |

---

## Files Changed

18 commit batches touching 135+ files across:

- `Controllers/` — 100+ controller files across 20+ domain folders
- `Factories/` — presentation factory base classes
- `Services/` — service interfaces and implementations
- `Mapping/` — request/response model mappers
- `Serialization/` — JSON converters
- `ServerEvents/` — server event authorizers and sender
- `ViewModels/` — response model base classes
- `Configuration/` — Swagger gen options
- `Telemetry/` — telemetry providers
- `DependencyInjection/` — DI extension methods

---

## Commits

| Commit | Description |
|---|---|
| `f5302f9a61` | Batch 1 — identifier renames + initial line wraps |
| `9af781b85c` | Batch 2 — controllers, factories, mappings |
| `2122be59b9` | Batch 3 — controllers, config, services, mappings |
| `f5edf4efba` | Batch 4 — controllers, factories, mappings |
| `3c1b1e7152` | Batch 5 — controllers, factories, security |
| `bc7e511aed` | Batch 6 — controllers, DI, factories, mappings |
| `2633d7e26e` | Batch 7 — controllers, dictionaries, documents |
| `0929de6667` | Batch 8 — document types, media types, members |
| `ceb5388dd2` | Batch 9 — member types, packages, security |
| `9415bc010c` | Batch 10 — server, stylesheet, template, telemetry |
| `0f661bcacb` | Batch 11 — User, UserGroup, Webhook, DI |
| `839e8fb762` | Batch 12 — Extensions, Factories, Filters, Mapping |
| `30a2732b8f` | Batch 13 — Middleware, Routing, Security, Authorization |
| `95db207473` | Batch 14 — ViewModels, Filters, Mapping, MediaType |
| `c2fe47b9ed` | Batch 15 — HealthCheck, Document, Media, Language, LogViewer |
| `78119b8bd0` | Batch 16 — DocumentType, Language, Media, Member, Template |
| `305b84b9be` | Batch 17 — Services, Factories, Serialization, ServerEvents, ViewModels |
| `23e137cf47` | Batch 18 — Configuration (final fix) |

---

## Build Verification

```
dotnet build src/Umbraco.Cms.Api.Management/Umbraco.Cms.Api.Management.csproj
Build succeeded.
    0 Error(s)
```
