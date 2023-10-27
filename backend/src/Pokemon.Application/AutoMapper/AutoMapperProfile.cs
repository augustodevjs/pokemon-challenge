using AutoMapper;
using Pokemon.Application.DTO.v1.ViewModel;

namespace Pokemon.Application.AutoMapper;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        #region Pokemon

        CreateMap<Domain.Entities.Pokemon, PokemonViewModel>().ReverseMap();

        #endregion
    }
}