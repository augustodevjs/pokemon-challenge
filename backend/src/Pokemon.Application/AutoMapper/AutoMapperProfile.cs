using AutoMapper;
using Pokemon.Domain.Entities;
using Pokemon.Application.DTO.v1.ViewModel;
using Pokemon.Application.DTO.v1.InputModel;

namespace Pokemon.Application.AutoMapper;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        #region Pokemon

        CreateMap<Domain.Entities.Pokemon, PokemonViewModel>().ReverseMap();
        CreateMap<Domain.Entities.Pokemon, AddPokemonViewModel>().ReverseMap();
        CreateMap<Domain.Entities.Pokemon, AddPokemonInputModel>().ReverseMap();
        CreateMap<Domain.Entities.Pokemon, UpdatePokemonViewModel>().ReverseMap();
        CreateMap<Domain.Entities.Pokemon, UpdatePokemonInputModel>().ReverseMap();

        #endregion

        #region PokemonTipo

        CreateMap<PokemonTipo, PokemonTipoViewModel>().ReverseMap();
        CreateMap<PokemonTipo, PokemonTipoViewModel>().ReverseMap();

        #endregion
    }
}