using AutoMapper;
using Defender.Portal.Application.Models.Session;
using Defender.Portal.Infrastructure.Clients.Identity.Generated;
using Microsoft.AspNetCore.Mvc;

namespace Defender.Portal.Infrastructure.Mappings;

public class ClientModelsProfile : Profile
{
    public ClientModelsProfile()
    {
        CreateMap<LoginResponse, Session>()
            .ForPath(dest => dest.User.Id, opt => opt.MapFrom(src => src.UserInfo.Id))
            .ForPath(dest => dest.User.Email, opt => opt.MapFrom(src => src.UserInfo.Email))
            .ForPath(dest => dest.User.Nickname, opt => opt.MapFrom(src => src.UserInfo.Nickname))
            .ForPath(dest => dest.User.Phone, opt => opt.MapFrom(src => src.UserInfo.PhoneNumber))
            .ForPath(dest => dest.User.IsEmailVerified, opt => opt.MapFrom(src => src.AccountInfo.IsEmailVerified))
            .ForPath(dest => dest.User.IsPhoneVerified, opt => opt.MapFrom(src => src.AccountInfo.IsPhoneVerified))
            .ForMember(dest => dest.IsAuthenticated, opt => opt.MapFrom(src => true))
            .ForMember(dest => dest.Token, opt => opt.MapFrom(src => src.Token))
            .ForPath(dest => dest.User.Roles, opt => opt.MapFrom(src => src.AccountInfo.Roles))
            .ForPath(dest => dest.User.CreatedDate, opt => opt.MapFrom(src => src.UserInfo.CreatedDate));
    }
}
