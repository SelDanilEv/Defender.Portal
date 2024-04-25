using Defender.Common.DTOs;
using Defender.Common.Mapping;
using Defender.Portal.Application.DTOs.Accounts;

namespace Defender.Portal.Application.Common.Mappings;

public class MappingProfile : BaseMappingProfile
{
    public MappingProfile()
    {
        CreateMap<AccountDto, AccountVerificationDto>()
            .ForMember(
            dest => dest.IsVerified,
            opt => opt.MapFrom(
                src => src.IsPhoneVerified || src.IsEmailVerified));

        CreateMap<UserDto, PortalUserDto>();
        CreateMap<AccountDto, PortalAccountDto>();

    }
}
