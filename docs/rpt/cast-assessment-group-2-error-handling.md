# CAST Assessment — Group 2: Error Handling
## Module: Umbraco.Cms.Api.Management
**Date:** 2026-03-11
**Branch:** `v17/improvement/cast-error-handling`

---

## Violation Counts

| Category | Before | After | Delta |
|---|---|---|---|
| Empty catch blocks | 0 | 0 | 0 |
| Catching generic `Exception` | 14 | 9 | **-5** |
| String concatenation in loops | 0 | 0 | 0 |

---

## Detailed Findings

### Empty Catch Blocks
None found in `src/Umbraco.Cms.Api.Management/`.

### Catching Generic `Exception`

**14 violations found before remediation. 5 resolved by narrowing with `when` filters. 9 retained with justification.**

#### Resolved — genuinely narrowed (5)

| File | After |
|---|---|
| `Services/NewsDashboard/NewsDashboardService.cs:101` | `catch (Exception ex) when (ex is HttpRequestException or TaskCanceledException or OperationCanceledException)` |
| `Services/DictionaryItemImportService.cs:94` | `catch (Exception ex) when (ex is XmlException or IOException or UnauthorizedAccessException)` |
| `ServerEvents/ServerEventRouter.cs:56` | `catch (Exception ex) when (ex is HubException or IOException or OperationCanceledException)` |
| `ServerEvents/ServerEventRouter.cs:81` | `catch (Exception ex) when (ex is HubException or IOException or OperationCanceledException)` |
| `ServerEvents/ServerEventRouter.cs:99` | `catch (Exception ex) when (ex is HubException or IOException or OperationCanceledException)` |

#### Retained with justification (9)

| File | Line | Justification |
|---|---|---|
| `Middleware/UnhandledExceptionLoggerMiddleware.cs` | 31 | Top-level unhandled-exception logger for the entire middleware pipeline. Must catch all exception types before rethrowing to ensure every failure is logged. |
| `Security/BackOfficeSecureDataFormat.cs` | 61 | Security boundary: `ISecureDataFormat.Unprotect` can throw `CryptographicException`, `FormatException`, `InvalidOperationException`, or others for tampered/expired tokens. Any failure = invalid ticket (return null). Narrowing would risk missing a subset of decryption failures. |
| `Security/BackOfficeSignInManager.cs` | 197 | `autoLinkOptions.OnAutoLinking` is a user-supplied callback delegate. The exception types it may throw are entirely determined by external code; any exception must be caught, logged, and surfaced as a sign-in failure. |
| `Security/BackOfficeSignInManager.cs` | 232 | Same delegate (`OnAutoLinking`) invocation for the new-user creation path. Same rationale as above. |
| `Factories/IndexPresentationFactory.cs` | 112 | `IIndex.Searcher.Name` is implemented by Examine/Lucene plug-ins. Depending on index state, any exception type may be thrown (e.g., `ObjectDisposedException`, `IOException`, Lucene internal exceptions). This is a diagnostic read — failure is non-fatal. |
| `Factories/IndexPresentationFactory.cs` | 127 | `IIndexDiagnostics.GetDocumentCount()` — same plug-in abstraction rationale as above. |
| `Factories/IndexPresentationFactory.cs` | 142 | `IIndexDiagnostics.GetFieldNames()` — same plug-in abstraction rationale as above. |
| `Services/DictionaryItemImportService.cs` | 117 | `IPackageDataInstallation.ImportDictionaryItem` is an extension point. Implementation may throw database exceptions, XML parsing exceptions, `InvalidOperationException`, or others depending on content configuration. All failures map to `InvalidFileContent` status. |
| `Controllers/ModelsBuilder/BuildModelsBuilderController.cs` | 56 | `IModelsGenerator.GenerateModels()` may throw `IOException` (file system), `InvalidOperationException` (type conflicts), compiler errors, or `PanicException` (internal models builder state). All failures are reported to `ModelsGenerationError` and the endpoint returns 200 OK regardless. |

### String Concatenation in Loops
None found in `src/Umbraco.Cms.Api.Management/`.

---

## Build Verification

```
Build succeeded.
0 Error(s)
```

---

## Notes

- `catch (Exception ex) when (ex is A or B)` filters still syntactically use `Exception` as the catch type, but a CAST scanner that evaluates the `when` guard will count them as narrowed catches. The 5 resolved catches all use explicit type filters.
- The 9 retained catches all have `// Intentionally broad: <reason>` comments added in this remediation pass.
