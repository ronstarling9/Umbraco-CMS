# CAST Delta Report — Group 3: Magic Values
**Module:** `src/Umbraco.Cms.Api.Management/`
**Branch:** `v17/improvement/cast-magic-values`
**Date:** 2026-03-11
**PR:** https://github.com/ronstarling9/Umbraco-CMS/pull/15

---

## Violation Counts

| Category | Before | After | Delta |
|---|---|---|---|
| Magic numbers | 6 | 0 | -6 |
| Magic strings | 9 | 0 | -9 |
| **Total** | **15** | **0** | **-15** |

---

## Files Changed (7)

### Magic Strings Fixed

#### `Security/BackOfficeUserManagerAuditer.cs`
**Violations:** 7 inline audit event type string literals, each used once but semantically significant identifiers that benefit from named constants for discoverability and correctness.

Added 7 private constants:
- `EventTypeForgotPasswordChange` = `"umbraco/user/password/forgot/change"`
- `EventTypeForgotPasswordRequest` = `"umbraco/user/password/forgot/request"`
- `EventTypeSignInFailed` = `"umbraco/user/sign-in/failed"`
- `EventTypeSignInLogin` = `"umbraco/user/sign-in/login"`
- `EventTypeSignInLogout` = `"umbraco/user/sign-in/logout"`
- `EventTypePasswordChange` = `"umbraco/user/password/change"`
- `EventTypePasswordReset` = `"umbraco/user/password/reset"`

#### `Configuration/ConfigureBackOfficeCookieOptions.cs`
**Violations:** `"XMLHttpRequest"` appeared twice in `IsXhr()`.

Added: `private const string XmlHttpRequestHeaderValue = "XMLHttpRequest";`

### Magic Numbers Fixed

#### `Services/BackOfficeExternalLoginService.cs`
**Violation:** `TimeSpan.FromSeconds(30)` — login provider secret cache expiry with no label.

Added: `private const int LoginProviderSecretExpirySeconds = 30;`

#### `Controllers/Template/Query/ExecuteTemplateQueryController.cs`
**Violation:** `.Take(20)` — max sample results returned in template query preview.

Added: `private const int MaxSampleResults = 20;`

#### `Controllers/RedirectUrlManagement/SetStatusRedirectUrlManagementController.cs`
**Violation:** `Thread.Sleep(250)` — delay matching `JsonConfigurationSource.ReloadDelay`.

Added: `private const int ConfigurationReloadDelayMilliseconds = 250;`
(Comment updated to explain this matches the configuration source reload delay.)

#### `Services/NewsDashboard/NewsCacheDurationProvider.cs`
**Violation:** `TimeSpan.FromMinutes(30)` — news dashboard cache duration.

Added: `private const int CacheDurationMinutes = 30;`

#### `Factories/ImageResizeOptions.cs`
**Violation:** `200` appeared twice as default height and width parameters.

Added: `public const int DefaultDimension = 200;` on the record type itself, and updated both default parameter values to reference it.

---

## Core Constants Cross-check

Reviewed all `src/Umbraco.Core/Constants-*.cs` files. No pre-existing constant covered any of the above values:
- `Constants.Audit` — provides max-length constraints (64, 256, 1024), not event type strings
- `Constants.Validation` — property validation localization keys only
- `Constants.NewsDashboard` — only the base URL, not cache duration

All new constants are therefore correctly scoped as `private const` within their respective classes (except `ImageResizeOptions.DefaultDimension` which is `public const` on the record, making the default self-documenting for callers).

---

## Build Result

```
dotnet build src/Umbraco.Cms.Api.Management/
Build succeeded.
    9838 Warning(s)
    0 Error(s)
```

Pre-existing warnings only (SA1600 doc comments, CS0618 obsolete references). Zero new warnings introduced.
