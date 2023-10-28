using Pokemon.Application.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Pokemon.Application;

public static class DependecyInjection
{
    public static void AddApplication(this IServiceCollection services)
    {
        services.ResolveDependecies();
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
    }
}