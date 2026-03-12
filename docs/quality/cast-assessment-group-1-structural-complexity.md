# CAST Delta Report — Group 1: Structural Complexity
**Module:** `src/Umbraco.Cms.Api.Management/`
**Branch:** `v17/improvement/cast-structural-complexity`
**Date:** 2026-03-11
**PR:** https://github.com/ronstarling9/Umbraco-CMS/pull/13

---

## Violation Counts

| Category | Before | After | Delta | Weight | Δ Weighted |
|---|---|---|---|---|---|
| high_cyclomatic_complexity | 16 | 13 | -3 | 3 | -9 |
| copy_paste_blocks | 1,460 | 1,457 | -3 | 3 | -9 |
| method_length | 71 | 68 | -3 | 2 | -6 |
| deep_nesting | 645 | 643 | -2 | 2 | -4 |
| too_many_parameters | 66 | 66 | 0 | 2 | 0 |
| god_classes | 0 | 0 | 0 | 2 | 0 |
| **Total** | **2,258** | **2,247** | **-11** | — | **-28** |

> **Note:** Exact per-violation counts are estimated from code inspection. The delta report was not generated at scan time. All figures are derived from the 3 files changed and the nature of refactorings applied.

---

## Files Changed (3)

### `Configuration/ConfigureBackOfficeCookieOptions.cs`

**Refactoring:** Extracted 6 inline event-handler lambdas from `Configure()` into named private `async` methods.

- `Configure()` reduced from ~110 LOC → ~20 LOC: **−1 method_length violation**
- Reduction in CC for `Configure()` (6 inline async delegates removed): **−2 CC violations**
- Extracted 2 string literals to private constants (magic_strings, covered in Group 3)

### `Security/BackOfficeSignInManager.cs`

**Refactoring:** Split `AutoLinkAndSignInExternalAccount` (~80 LOC) into `AutoLinkExistingUserAsync` + `AutoLinkNewUserAsync`. Applied guard clause in `ExternalLoginSignInAsync` to flatten double-nested `if` block.

- Split reduces `AutoLinkAndSignInExternalAccount` below 30 LOC: **−1 method_length violation**
- Guard clause removes one nesting level in `ExternalLoginSignInAsync`: **−1 deep_nesting violation**
- CC reduction from splitting: **−1 CC violation**

### `Factories/IndexPresentationFactory.cs`

**Refactoring:** Replaced three structurally identical `TryGet*` methods (`TryGetSearcherName`, `TryGetDocumentCount`, `TryGetFieldNames`) with a single generic `TryGetIndexMetric<TSource, TResult>` helper.

- Three methods consolidated to one; original three removed: **−1 method_length violation** (net: 2 removed, 1 added)
- Three cross-method identical blocks eliminated: **−3 copy_paste_blocks violations**
- Deep nesting in individual Try* methods flattened by extraction: **−1 deep_nesting violation**

---

## Score Projection

```
Scoring formula: Score = max(0, 100 − (weighted_violations / LOC × 1000))
Module LOC: 42,397
Module baseline weighted violations (all categories): 9,896

After Group 1 (−28 weighted): 9,868
Score: max(0, 100 − (9,868 / 42,397 × 1,000)) = max(0, 100 − 232.8) = 0.0
```

Group 1 targeted only the highest-complexity files. The bulk of weighted violations (copy_paste_blocks: 4,380 weighted; short_identifiers: 1,926 weighted; long_lines: 1,409 weighted; deep_nesting: 1,290 weighted) remain. The score remains 0.0 — breakeven requires ≤4,240 total weighted violations.

---

## Build Result

```
dotnet build src/Umbraco.Cms.Api.Management/Umbraco.Cms.Api.Management.csproj
Build succeeded.
    0 Error(s)
```

Unit tests: 293/293 passed (per PR #13 build verification).
