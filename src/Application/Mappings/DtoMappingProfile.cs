using AutoMapper;

namespace Defender.Portal.Application.Common.Mappings;

public class DtoMappingProfile : Profile
{
    public DtoMappingProfile()
    {
        //CreateMap<User, UserDto>()
        //    .ForMember(
        //    dest => dest.CreatedDate,
        //    opt => opt.MapFrom(
        //        src => src.CreatedDate.Value.ToShortDateString()));
    }
}
