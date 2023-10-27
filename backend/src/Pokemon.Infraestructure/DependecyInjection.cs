using Microsoft.EntityFrameworkCore;
using Pokemon.Infraestructure.Context;
using Microsoft.Extensions.DependencyInjection;

namespace Pokemon.Infraestructure;

public static class DependecyInjection
{
    public static void AddInfraData(this IServiceCollection services, string? connectionString)
    {
        var serverVersion = new MySqlServerVersion(new Version(10, 4, 27));
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseMySql(connectionString, serverVersion);
            options.EnableDetailedErrors();
            options.EnableSensitiveDataLogging();
        });
    }
}