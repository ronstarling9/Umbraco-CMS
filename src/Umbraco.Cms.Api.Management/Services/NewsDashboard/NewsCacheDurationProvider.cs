namespace Umbraco.Cms.Api.Management.Services.NewsDashboard;

public class NewsCacheDurationProvider : INewsCacheDurationProvider
{
    private const int CacheDurationMinutes = 30;

    /// <inheritdoc />
    public TimeSpan CacheDuration => TimeSpan.FromMinutes(CacheDurationMinutes);
}
