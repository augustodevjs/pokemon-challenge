using Pokemon.Application.Services;
using Pokemon.Application.Notifications;
using Pokemon.Domain.Contracts.Repository;
using Pokemon.Infraestructure.Repositories;
using Pokemon.Application.Contracts.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Pokemon.Application.Configuration;

public static class DependecyConfig
{
    public static void ResolveDependecies(this IServiceCollection services)
    {
        services.AddScoped<INotificator, Notificator>();
        
        // Services
        services.AddScoped<IPokemonService, PokemonService>();
        
        // Repository
        services.AddScoped<IPokemonRepository, PokemonRepository>();
        services.AddScoped<IPokemonTipoRepository, PokemonTipoRepository>();
    }
}