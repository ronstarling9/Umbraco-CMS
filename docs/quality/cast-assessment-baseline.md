# CAST Quality Assessment — Baseline Report

**Scan Date**: 2026-03-11
**Repository**: Umbraco-CMS (main branch)

---

## Section 1: Executive Summary

### Overall Codebase Score

| Metric | Value |
|--------|-------|
| Overall Score (LOC-weighted, C# + TypeScript) | **0.0 / 100** |
| Total LOC Scanned | 567,046 |
| C# Total LOC | 338,781 |
| TypeScript Total LOC | 228,265 |
| Total Weighted Violations | 194,845 |

> **Interpretation**: A score of 0 indicates that every project/package in the codebase exceeds the 1 weighted violation per LOC threshold (i.e., weighted_violations / LOC × 1000 ≥ 100 for all non-trivial units). Only a handful of very small projects score above zero. The score floor is 0 — it does not go negative. This baseline establishes the starting point for remediation.

### Total Violations by Category

| Category | Weight | C# Count | TS Count | Total Weighted |
|----------|--------|----------|----------|----------------|
| magic_numbers | 3 | 1,264 | 22,060 | 69,972 |
| copy_paste_blocks | 3 | 6,049 | 6,572 | 37,863 |
| magic_strings | 3 | 885 | 4,944 | 17,487 |
| deep_nesting | 2 | 10,233 | 4,258 | 28,982 |
| short_identifiers | 2 | 7,322 | 53 | 14,750 |
| high_cyclomatic_complexity | 3 | 911 | 232 | 3,429 |
| method_length | 2 | 1,230 | 1,014 | 4,488 |
| too_many_parameters | 2 | 1,140 | 29 | 2,338 |
| long_lines | 1 | 8,972 | 2,484 | 11,456 |
| missing_semicolons (TS only) | 1 | — | 2,528 | 2,528 |
| any_type_usage (TS only) | 2 | — | 371 | 742 |
| catching_generic_exception (C# only) | 2 | 151 | — | 302 |
| god_classes | 2 | 67 | 23 | 180 |
| commented_out_code | 1 | 139 | 9 | 148 |
| debug_statements (TS only) | 1 | — | 78 | 78 |
| empty_catch_blocks | 3 | 12 | 0 | 36 |
| missing_return_types (TS only) | 1 | — | 26 | 26 |
| string_concat_in_loops (C# only) | 2 | 20 | — | 40 |

### Top 3 Most Common Violation Types (by raw count)

1. **magic_numbers** — 23,324 total occurrences (weight 3; predominantly TypeScript: 22,060 in TS vs 1,264 in C#)
2. **deep_nesting** — 14,491 total occurrences (weight 2; C#: 10,233, TS: 4,258)
3. **copy_paste_blocks** — 12,621 total occurrences (weight 3; C#: 6,049, TS: 6,572)

---

## Section 2: By-Language Breakdown

### C# — Score and Violations

| Metric | Value |
|--------|-------|
| Overall C# Score | 0.0 / 100 |
| Total C# LOC | 338,781 |
| Total C# Weighted Violations | 76,800 |

| Category | Weight | Count | Weighted Count |
|----------|--------|-------|----------------|
| high_cyclomatic_complexity | 3 | 911 | 2,733 |
| copy_paste_blocks | 3 | 6,049 | 18,147 |
| empty_catch_blocks | 3 | 12 | 36 |
| magic_numbers | 3 | 1,264 | 3,792 |
| magic_strings | 3 | 885 | 2,655 |
| catching_generic_exception | 2 | 151 | 302 |
| string_concat_in_loops | 2 | 20 | 40 |
| god_classes | 2 | 67 | 134 |
| method_length | 2 | 1,230 | 2,460 |
| too_many_parameters | 2 | 1,140 | 2,280 |
| deep_nesting | 2 | 10,233 | 20,466 |
| short_identifiers | 2 | 7,322 | 14,644 |
| long_lines | 1 | 8,972 | 8,972 |
| commented_out_code | 1 | 139 | 139 |

**C# dominant issues**: deep_nesting (20,466 weighted), copy_paste_blocks (18,147 weighted), and short_identifiers (14,644 weighted) together account for 69% of C# weighted violations.

---

### TypeScript — Score and Violations

| Metric | Value |
|--------|-------|
| Overall TypeScript Score | 0.0 / 100 |
| Total TypeScript LOC | 228,265 |
| Total TypeScript Weighted Violations | 118,045 |

| Category | Weight | Count | Weighted Count |
|----------|--------|-------|----------------|
| high_cyclomatic_complexity | 3 | 232 | 696 |
| copy_paste_blocks | 3 | 6,572 | 19,716 |
| empty_catch_blocks | 3 | 0 | 0 |
| magic_numbers | 3 | 22,060 | 66,180 |
| magic_strings | 3 | 4,944 | 14,832 |
| god_classes | 2 | 23 | 46 |
| method_length | 2 | 1,014 | 2,028 |
| too_many_parameters | 2 | 29 | 58 |
| deep_nesting | 2 | 4,258 | 8,516 |
| short_identifiers | 2 | 53 | 106 |
| any_type_usage | 2 | 371 | 742 |
| long_lines | 1 | 2,484 | 2,484 |
| commented_out_code | 1 | 9 | 9 |
| missing_return_types | 1 | 26 | 26 |
| debug_statements | 1 | 78 | 78 |
| missing_semicolons | 1 | 2,528 | 2,528 |

**TypeScript dominant issues**: magic_numbers (66,180 weighted) alone accounts for 56% of all TypeScript weighted violations. The `core` package contributes 19,860 magic_numbers — likely including large enum/constant definitions that inflate this count. copy_paste_blocks (19,716 weighted) and magic_strings (14,832 weighted) are the next largest contributors.

---

## Section 3: By-Project Table

Sorted by Score ascending (worst first — score 0 = worst). Projects with 0 LOC are excluded.

| Rank | Project / Package | Language | LOC | Score | Key Violations (Top 3) |
|------|-------------------|----------|-----|-------|------------------------|
| 1 | Umbraco.Core | C# | 178,525 | 0.0 | deep_nesting(4480), copy_paste_blocks(2824), short_identifiers(2390) |
| 2 | Umbraco.Infrastructure | C# | 76,290 | 0.0 | deep_nesting(3719), short_identifiers(3232), copy_paste_blocks(1175) |
| 3 | core | TypeScript | 81,575 | 0.0 | magic_numbers(19860), deep_nesting(4258), magic_strings(1991) |
| 4 | documents | TypeScript | 22,901 | 0.0 | copy_paste_blocks(970), magic_strings(379), magic_numbers(217) |
| 5 | Umbraco.Cms.Api.Management | C# | 42,397 | 0.0 | copy_paste_blocks(1460), short_identifiers(963), long_lines(1409) |
| 6 | block | TypeScript | 17,612 | 0.0 | copy_paste_blocks(1627), magic_strings(274), magic_numbers(195) |
| 7 | media | TypeScript | 16,588 | 0.0 | copy_paste_blocks(422), magic_strings(346), magic_numbers(255) |
| 8 | Umbraco.Web.Common | C# | 13,962 | 0.0 | copy_paste_blocks(263), deep_nesting(281), long_lines(370) |
| 9 | user | TypeScript | 12,720 | 0.0 | copy_paste_blocks(421), magic_strings(294), magic_numbers(117) |
| 10 | content | TypeScript | 10,569 | 0.0 | magic_strings(182), magic_numbers(133), copy_paste_blocks(57) |
| 11 | tiptap | TypeScript | 9,058 | 0.0 | magic_numbers(446), copy_paste_blocks(275), magic_strings(251) |
| 12 | members | TypeScript | 8,836 | 0.0 | copy_paste_blocks(293), magic_strings(137), magic_numbers(72) |
| 13 | property-editors | TypeScript | 8,516 | 0.0 | magic_strings(272), copy_paste_blocks(248), magic_numbers(104) |
| 14 | templating | TypeScript | 8,281 | 0.0 | copy_paste_blocks(307), magic_strings(186), magic_numbers(61) |
| 15 | Umbraco.PublishedCache.HybridCache | C# | 4,940 | 0.0 | short_identifiers(311), deep_nesting(242), copy_paste_blocks(98) |
| 16 | data-type | TypeScript | 4,405 | 0.0 | magic_numbers(143), magic_strings(69), copy_paste_blocks(68) |
| 17 | Umbraco.Cms.Persistence.SqlServer | C# | 4,305 | 0.0 | deep_nesting(279), magic_numbers(130), short_identifiers(66) |
| 18 | Umbraco.Cms.Api.Delivery | C# | 3,977 | 0.0 | copy_paste_blocks(73), deep_nesting(90), long_lines(151) |
| 19 | log-viewer | TypeScript | 3,117 | 0.0 | magic_numbers(181), magic_strings(92), copy_paste_blocks(46) |
| 20 | relations | TypeScript | 2,346 | 0.0 | copy_paste_blocks(117), magic_strings(42), magic_numbers(15) |
| 21 | webhook | TypeScript | 2,145 | 0.0 | copy_paste_blocks(51), magic_strings(49), magic_numbers(18) |
| 22 | Umbraco.Cms.DevelopmentMode.Backoffice | C# | 2,153 | 0.0 | deep_nesting(175), long_lines(64), method_length(21) |
| 23 | language | TypeScript | 2,260 | 0.0 | magic_strings(35), copy_paste_blocks(16), magic_numbers(13) |
| 24 | Umbraco.Cms.Api.Common | C# | 2,244 | 0.0 | deep_nesting(60), long_lines(68), short_identifiers(20) |
| 25 | dictionary | TypeScript | 2,110 | 0.0 | magic_strings(35), magic_numbers(14), missing_semicolons(39) |
| 26 | clipboard | TypeScript | 1,727 | 0.0 | copy_paste_blocks(80), magic_strings(20), any_type_usage(12) |
| 27 | multi-url-picker | TypeScript | 1,427 | 0.0 | magic_strings(38), magic_numbers(10), missing_semicolons(23) |
| 28 | Umbraco.Cms.Persistence.EFCore | C# | 1,598 | 0.0 | copy_paste_blocks(40), deep_nesting(46), long_lines(58) |
| 29 | packages | TypeScript | 1,535 | 0.0 | magic_strings(34), magic_numbers(19), missing_semicolons(32) |
| 30 | Umbraco.Cms.Persistence.Sqlite | C# | 1,282 | 0.0 | short_identifiers(26), magic_strings(17), deep_nesting(19) |
| 31 | management-api | TypeScript | 1,097 | 0.0 | copy_paste_blocks(191), short_identifiers(10), method_length(9) |
| 32 | ufm | TypeScript | 1,073 | 0.0 | copy_paste_blocks(24), magic_strings(22), method_length(8) |
| 33 | preview | TypeScript | 1,024 | 0.0 | copy_paste_blocks(58), magic_numbers(34), magic_strings(28) |
| 34 | Umbraco.Examine.Lucene | C# | 1,375 | 0.0 | deep_nesting(67), short_identifiers(52), copy_paste_blocks(16) |
| 35 | health-check | TypeScript | 765 | 0.0 | magic_strings(24), magic_numbers(18), any_type_usage(8) |
| 36 | markdown-editor | TypeScript | 825 | 0.0 | magic_strings(27), magic_numbers(24), missing_semicolons(6) |
| 37 | tags | TypeScript | 824 | 0.0 | magic_strings(20), magic_numbers(14), copy_paste_blocks(4) |
| 38 | Umbraco.Web.Website | C# | 4,565 | 0.0 | copy_paste_blocks(72), deep_nesting(100), long_lines(105) |
| 39 | code-editor | TypeScript | 1,357 | 0.0 | magic_strings(29), magic_numbers(23), long_lines(11) |
| 40 | umbraco-news | TypeScript | 440 | 0.0 | magic_numbers(28), magic_strings(10), missing_semicolons(9) |
| 41 | settings | TypeScript | 256 | 0.0 | magic_numbers(6), magic_strings(6), copy_paste_blocks(5) |
| 42 | sysinfo | TypeScript | 262 | 0.0 | magic_strings(5), missing_semicolons(6), method_length(2) |
| 43 | Umbraco.Cms.Imaging.ImageSharp | C# | 458 | 0.0 | deep_nesting(13), short_identifiers(8), magic_numbers(5) |
| 44 | Umbraco.Cms.Imaging.ImageSharp2 | C# | 413 | 0.0 | deep_nesting(15), short_identifiers(8), magic_numbers(5) |
| 45 | embedded-media | TypeScript | 283 | 0.0 | magic_strings(10), magic_numbers(7), missing_semicolons(4) |
| 46 | telemetry | TypeScript | 161 | 0.0 | magic_strings(3), magic_numbers(2), missing_semicolons(4) |
| 47 | help | TypeScript | 145 | 0.0 | magic_strings(4), magic_numbers(3), missing_semicolons(6) |
| 48 | publish-cache | TypeScript | 172 | 0.0 | magic_strings(8), magic_numbers(4), missing_semicolons(3) |
| 49 | models-builder | TypeScript | 187 | 0.0 | magic_strings(6), magic_numbers(2), long_lines(4) |
| 50 | translation | TypeScript | 81 | 0.0 | magic_numbers(2), copy_paste_blocks(1), missing_semicolons(3) |
| 51 | extension-insights | TypeScript | 72 | 0.0 | magic_numbers(1), magic_strings(1), missing_semicolons(3) |
| 52 | Umbraco.Web.UI | C# | 146 | 0.0 | short_identifiers(4), long_lines(6), deep_nesting(2) |
| 53 | rte | TypeScript | 500 | 4.0 | magic_numbers(8), magic_strings(3), method_length(2) |
| 54 | performance-profiling | TypeScript | 174 | 13.8 | magic_strings(2), missing_semicolons(4), magic_numbers(1) |
| 55 | static-file | TypeScript | 702 | 38.7 | magic_strings(8), missing_semicolons(9), method_length(2) |
| 56 | Umbraco.Cms.Persistence.EFCore.SqlServer | C# | 73 | 58.9 | short_identifiers(1), long_lines(1) |
| 57 | Umbraco.Cms.Persistence.EFCore.Sqlite | C# | 78 | 74.4 | short_identifiers(1) |
| 58 | segment | TypeScript | 137 | 85.4 | missing_semicolons(2) |

---

## Section 4: Top 10 Worst Files Per Language

Individual file scan data not available from grep-based scan; project-level data used. See By-Project Table (Section 3) for per-project rankings.

For C#, the worst projects by score and weighted violation density are:

1. Umbraco.Core (LOC: 178,525 — largest project, 33,564 weighted violations)
2. Umbraco.Infrastructure (LOC: 76,290 — 24,089 weighted violations)
3. Umbraco.Cms.Api.Management (LOC: 42,397 — 9,896 weighted violations)

For TypeScript, the worst packages by score and weighted violation density are:

1. core (LOC: 81,575 — 81,737 weighted violations; magic_numbers alone: 19,860)
2. block (LOC: 17,612 — 6,882 weighted violations; copy_paste_blocks: 1,627)
3. documents (LOC: 22,901 — 5,465 weighted violations; copy_paste_blocks: 970)

---

## Section 5: Methodology Note

### Scoring Formula

```
Score = max(0, 100 − (weighted_violations / LOC × 1000))
```

- Score is clamped to the range [0, 100].
- A score of 0 means violations exceed or meet the threshold of 1 weighted violation per LOC (i.e., the ratio reaches or exceeds 0.1 violations per line when accounting for weights).
- Higher score = better quality.

### Exclusions

- Files < 20 LOC are excluded from per-file reporting (still count toward project LOC and violation totals).
- The following paths are excluded from all scans:
  - `**/obj/**`
  - `**/bin/**`
  - `**/Migrations/**`
  - `**/GeneratedCode/**`
  - `*.Generated.cs`
  - `tests/**`

### Detection Methods

- **Copy-paste detection**: Python sliding-window SHA-256 hash comparison, window = 5 lines, minimum 2 distinct files must share the block to count as a violation.
- **Cyclomatic complexity**: Counts decision points (if, else if, while, for, foreach, switch case, catch, ternary operator, null-coalescing) per method.
- **God classes**: Methods per class exceeding threshold (≥ 20 public methods).
- **Method length**: Methods exceeding 40 lines.
- **Too many parameters**: Methods with ≥ 5 parameters.
- **Deep nesting**: Code blocks nested ≥ 4 levels deep.
- **Magic numbers/strings**: Literal numeric or string values not assigned to named constants (with language-appropriate exclusions for common trivial values).

### Scan Date

2026-03-11

### Notes on Score Interpretation

The baseline score of 0 across virtually all projects should be understood in context:

1. **Magic numbers in TypeScript**: The `core` package alone reports 19,860 magic_number violations, which heavily influences the overall TypeScript score. These may include large constant/enum tables, pixel values in UI components, or auto-generated numeric IDs. A calibration pass against actual magic number intent is recommended before remediation prioritization.

2. **Score ceiling effect**: The formula penalizes heavily for density. Even modest violation counts in small files can yield a 0 score. The score distribution (nearly all 0, with a few small near-empty projects scoring above 0) suggests the threshold constants may benefit from calibration once remediation begins.

3. **Priority recommendation**: Focus first on high-weight, high-count violations in large projects: copy_paste_blocks in Umbraco.Core and Umbraco.Infrastructure (C#), and magic_numbers in the `core` TypeScript package.
