using Pokemon.Application.Notifications;
using Microsoft.Extensions.DependencyInjection;

namespace Pokemon.Application.Configuration;

public static class DependecyConfig
{
    public static void ResolveDependecies(this IServiceCollection services)
    {
        services.AddScoped<INotificator, Notificator>();
        
        // Services
        
        // Repository
    }
}