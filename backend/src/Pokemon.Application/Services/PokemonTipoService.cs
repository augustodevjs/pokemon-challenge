using AutoMapper;
using Pokemon.Application.Contracts.Services;
using Pokemon.Application.DTO.v1.ViewModel;
using Pokemon.Application.Notifications;

namespace Pokemon.Application.Services;

public class PokemonTipoService : BaseService, IPokemonTipoServce
{
    public PokemonTipoService(IMapper mapper, INotificator notificator) : base(mapper, notificator)
    {
    }

    public Task<List<PokemonTipoViewModel>> GetAll()
    {
        throw new NotImplementedException();
    }
}