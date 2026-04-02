# CAST Quality Assessment — Interim Report (After Groups 1–3)

**Module:** `Umbraco.Cms.Api.Management`
**Report Date:** 2026-03-11
**Baseline Scan Date:** 2026-03-11
**Groups Completed:** 1 (Structural Complexity), 2 (Error Handling), 3 (Magic Values)
**Groups Remaining:** 4 (Style)

---

## Executive Summary

| Metric | Baseline | Current (after Groups 1–3) | Change |
|--------|----------|---------------------------|--------|
| Module Score | **0.0 / 100** | **0.0 / 100** | — |
| LOC | 42,397 | 42,397 | — |
| Total Weighted Violations | **9,896** | **≈ 9,836** | **–60** |

> **Why still 0.0?** The scoring formula is `max(0, 100 − weighted_violations / LOC × 1000)`. At 42,397 LOC the breakeven point is ≤ 4,240 weighted violations. The module currently has ~9,836 — 2.3× above breakeven. The score will remain 0 until total weighted violations drop below 4,240. The dominant contributors — `copy_paste_blocks` (4,380 weighted) and `short_identifiers` (1,926 weighted) — account for 65% of all weighted violations and have not yet been addressed.

---

## Violation Counts — Before vs. Current

| Category | Weight | Baseline | Current | Delta (raw) | Delta (weighted) | Status |
|----------|--------|----------|---------|-------------|-----------------|--------|
| copy_paste_blocks | 3 | 1,460 | 1,460 | 0 | 0 | Pending (Group 4 / future) |
| short_identifiers | 2 | 963 | 963 | 0 | 0 | **Group 4 target** |
| long_lines | 1 | 1,409 | 1,409 | 0 | 0 | **Group 4 target** |
| deep_nesting | 2 | 645 | ~630 | ~–15 | ~–30 | Partially addressed (Group 1) |
| magic_numbers | 3 | 140 | 134 | **–6** | **–18** | ✅ Group 3 complete |
| method_length | 2 | 71 | ~65 | ~–6 | ~–12 | Partially addressed (Group 1) |
| too_many_parameters | 2 | 66 | 66 | 0 | 0 | Not targeted |
| magic_strings | 3 | 40 | 31 | **–9** | **–27** | ✅ Group 3 complete |
| high_cyclomatic_complexity | 3 | 16 | ~12 | ~–4 | ~–12 | Partially addressed (Group 1) |
| catching_generic_exception | 2 | 14 | 9 | **–5** | **–10** | ✅ Group 2 complete |
| commented_out_code | 1 | 1 | 1 | 0 | 0 | Not targeted |
| empty_catch_blocks | 3 | 0 | 0 | 0 | 0 | None to fix |
| string_concat_in_loops | 2 | 0 | 0 | 0 | 0 | None to fix |
| god_classes | 2 | 0 | 0 | 0 | 0 | None to fix |

> **Note:** Group 1 (Structural Complexity) delta report was not written during the prior session. Values marked `~` are estimates based on the 3 files changed: `ConfigureBackOfficeCookieOptions.cs` (6 lambdas extracted), `BackOfficeSignInManager.cs` (method split + guard clauses), `IndexPresentationFactory.cs` (3 duplicate methods consolidated into 1 generic helper). Precise Group 1 counts can be re-derived by re-scanning the branch diff if needed.

---

## Group-by-Group Progress

### Group 1 — Structural Complexity ✅
**Branch:** `v17/improvement/cast-structural-complexity`
**PR:** https://github.com/ronstarling9/Umbraco-CMS/pull/13
**Files changed (3):**
- `Configuration/ConfigureBackOfficeCookieOptions.cs` — Extracted 6 inline event-handler lambdas into named private async methods; extracted 2 string constants (`DataProtectorPurpose`, `XhrHeaderValue`). Reduced `Configure()` from ~110 to ~20 lines.
- `Security/BackOfficeSignInManager.cs` — Split `AutoLinkAndSignInExternalAccount` (~80 lines) into `AutoLinkExistingUserAsync` + `AutoLinkNewUserAsync`. Applied guard clause to flatten double-nested conditional.
- `Factories/IndexPresentationFactory.cs` — Replaced 3 structurally identical `TryGetSearcherName`/`TryGetDocumentCount`/`TryGetFieldNameCount` methods with a single generic `TryGetIndexMetric<TSource, TResult>` helper.

| Category | Estimated Reduction |
|---|---|
| method_length | ~–6 |
| high_cyclomatic_complexity | ~–4 |
| deep_nesting | ~–15 |
| copy_paste_blocks | ~–3 (within-project duplicates from IndexPresentationFactory) |

---

### Group 2 — Error Handling ✅
**Branch:** `v17/improvement/cast-error-handling`
**PR:** https://github.com/ronstarling9/Umbraco-CMS/pull/14
**Files changed (8):**

| Category | Before | After | Delta |
|---|---|---|---|
| catching_generic_exception | 14 | 9 | **–5** |
| empty_catch_blocks | 0 | 0 | 0 |
| string_concat_in_loops | 0 | 0 | 0 |

**Approach:** 5 catches narrowed with `when (ex is SpecificType or ...)` filters (`ServerEventRouter.cs` ×3, `DictionaryItemImportService.cs`, `NewsDashboardService.cs`). 9 remaining broad catches documented with explicit justification comments explaining the technical reason for the broad catch (plug-in boundaries, security boundary, user-supplied delegates, top-level middleware).

---

### Group 3 — Magic Values ✅
**Branch:** `v17/improvement/cast-magic-values`
**PR:** https://github.com/ronstarling9/Umbraco-CMS/pull/15
**Files changed (7):**

| Category | Before | After | Delta |
|---|---|---|---|
| magic_numbers | 6¹ | 0 | **–6** |
| magic_strings | 9¹ | 0 | **–9** |

¹ *In-scope violations within method bodies, per CAST rules. Full baseline count of 140 magic_numbers and 40 magic_strings includes many in parameter defaults, attribute arguments, and other excluded contexts.*

**Constants extracted (13 total):**
- `BackOfficeUserManagerAuditer.cs` — 7 audit event type strings (`EventTypeSignInLogin`, `EventTypeSignInLogout`, `EventTypeForgotPasswordRequest`, etc.)
- `ConfigureBackOfficeCookieOptions.cs` — `XmlHttpRequestHeaderValue`
- `BackOfficeExternalLoginService.cs` — `LoginProviderSecretExpirySeconds = 30`
- `ExecuteTemplateQueryController.cs` — `MaxSampleResults = 20`
- `SetStatusRedirectUrlManagementController.cs` — `ConfigurationReloadDelayMilliseconds = 250`
- `NewsCacheDurationProvider.cs` — `CacheDurationMinutes = 30`
- `ImageResizeOptions.cs` — `DefaultDimension = 200` (public const on record)

---

## Remaining Work

### Group 4 — Style (Task 10)
**Branch:** `v17/improvement/cast-style`
**Categories:** Short identifiers (963), long lines (1,409), commented-out code (1)
**Estimated weighted impact:** Up to –3,335 weighted violations if fully addressed

This is the highest-impact remaining group. Addressing `short_identifiers` (1,926 weighted) and `long_lines` (1,409 weighted) together represents ~34% of all baseline weighted violations in this module.

> ⚠️ Short identifier renames that affect **public method parameter names** must follow the Obsolete Method pattern (CLAUDE.md §5.2) to avoid breaking named-argument call sites.

---

## Score Projection

| After | Estimated Weighted Violations | Estimated Score |
|-------|------------------------------|----------------|
| Baseline | 9,896 | 0.0 |
| Groups 1–3 (current) | ~9,836 | 0.0 |
| After Group 4 (if long_lines + short_identifiers fully fixed) | ~5,501 | 0.0 |
| Breakeven point | 4,240 | 0.0 → positive |

**To achieve a non-zero score**, weighted violations must fall below 4,240. The largest remaining obstacle is `copy_paste_blocks` (4,380 weighted), which alone exceeds the breakeven threshold and is not targeted in the current remediation scope. If copy-paste blocks were also addressed, the projected score would be:

| Scenario | Weighted Violations | Score |
|---|---|---|
| After all 4 groups (no copy-paste fix) | ~5,501 | 0.0 |
| After all 4 groups + copy-paste fix | ~1,121 | **73.6 / 100** |

---

## PRs Created

| Group | Branch | PR |
|---|---|---|
| 1 — Structural Complexity | `v17/improvement/cast-structural-complexity` | [#13](https://github.com/ronstarling9/Umbraco-CMS/pull/13) |
| 2 — Error Handling | `v17/improvement/cast-error-handling` | [#14](https://github.com/ronstarling9/Umbraco-CMS/pull/14) |
| 3 — Magic Values | `v17/improvement/cast-magic-values` | [#15](https://github.com/ronstarling9/Umbraco-CMS/pull/15) |
| 4 — Style | `v17/improvement/cast-style` | Pending |
