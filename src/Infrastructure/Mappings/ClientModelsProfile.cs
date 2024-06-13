using Defender.Common.Clients.Identity;
using Defender.Common.Clients.RiskGames;
using Defender.Common.Clients.UserManagement;
using Defender.Common.Clients.Wallet;
using Defender.Common.DB.Pagination;
using Defender.Common.Helpers;
using Defender.Common.Mapping;
using Defender.Portal.Application.DTOs.Auth;
using Defender.Portal.Application.DTOs.Banking;

namespace Defender.Portal.Infrastructure.Mappings;

public class ClientModelsProfile : BaseMappingProfile
{
    public ClientModelsProfile()
    {
        RegisterIdentityMappings();

        RegisterUserManagementMappings();

        RegisterWalletMappings();

        RegisterRiskGamesMappings();
    }

    private void RegisterUserManagementMappings()
    {
        CreateMap<UserDtoPagedResult, PagedResult<Common.DTOs.UserDto>>();
        CreateMap<Common.Clients.UserManagement.PublicUserInfoDto,
            Application.DTOs.Accounts.PublicUserInfoDto>();
    }
    private void RegisterRiskGamesMappings()
    {
        CreateMap<UserTicketDto, Application.DTOs.RiskGames.Lottery.UserTicketDto>();
        CreateMap<UserTicketDtoPagedResult,
            PagedResult<Application.DTOs.RiskGames.Lottery.UserTicketDto>>();

        CreateMap<LotteryDrawDto, Application.DTOs.RiskGames.Lottery.LotteryDrawDto>();
        CreateMap<LotteryDrawDtoPagedResult,
            PagedResult<Application.DTOs.RiskGames.Lottery.LotteryDrawDto>>();
    }

    private void RegisterWalletMappings()
    {
        CreateMap<PublicWalletInfoDto, PublicPortalWalletInfoDto>();
        CreateMap<TransactionDto, PortalTransactionDto>()
            .ForMember(dest => dest.TransactionPurpose,
                opt => opt.MapFrom(
                    src => MappingHelper.MapEnum(src.TransactionPurpose,
                    Application.Enums.Transaction.TransactionPurpose.NoPurpose)))
            .ForMember(dest => dest.TransactionType,
                opt => opt.MapFrom(
                    src => MappingHelper.MapEnum(src.TransactionType,
                    Application.Enums.Transaction.TransactionType.Unknown)))
            .ForMember(dest => dest.TransactionStatus,
                opt => opt.MapFrom(
                    src => MappingHelper.MapEnum(src.TransactionStatus,
                    Application.Enums.Transaction.TransactionStatus.Unknown)));

        CreateMap<TransactionDtoPagedResult,
            PagedResult<PortalTransactionDto>>();

        CreateMap<WalletDto, PortalWalletInfoDto>()
            .ForMember(
                dest => dest.WalletNumber,
                opt => opt.MapFrom(
                    src => src.WalletNumber))
            .ForMember(
                dest => dest.OwnerId,
                opt => opt.MapFrom(
                    src => src.OwnerId))
            .ForMember(
                dest => dest.DefaultCurrency,
                opt => opt.MapFrom(
                    src => src.CurrencyAccounts.FirstOrDefault(
                        x => x.IsDefault)!.Currency))
            .ForMember(
                dest => dest.CurrencyAccounts,
                opt => opt.MapFrom(
                    src => src.CurrencyAccounts.Select(
                        x => new CurrencyAccountDto
                        {
                            Currency = x.Currency.ToString(),
                            Balance = x.Balance
                        })));
    }


    private void RegisterIdentityMappings()
    {
        CreateMap<LoginResponse, SessionDto>()
            .ForPath(
                dest => dest.User.Id,
                opt => opt.MapFrom(
                    src => src.UserInfo.Id))
            .ForPath(
                dest => dest.User.Email,
                opt => opt.MapFrom(
                    src => src.UserInfo.Email))
            .ForPath(
                dest => dest.User.Nickname,
                opt => opt.MapFrom(
                    src => src.UserInfo.Nickname))
            .ForPath(
                dest => dest.User.Phone,
                opt => opt.MapFrom(
                    src => src.UserInfo.PhoneNumber))
            .ForPath(
                dest => dest.User.IsEmailVerified,
                opt => opt.MapFrom(
                    src => src.AccountInfo.IsEmailVerified))
            .ForPath(dest =>
                dest.User.IsPhoneVerified,
                opt => opt.MapFrom(
                    src => src.AccountInfo.IsPhoneVerified))
            .ForMember(
                dest => dest.IsAuthenticated,
                opt => opt.MapFrom(
                    src => true))
            .ForMember(
                dest => dest.Token,
                opt => opt.MapFrom(
                    src => src.Token))
            .ForPath(
                dest => dest.User.Roles,
                opt => opt.MapFrom(
                    src => src.AccountInfo.Roles))
            .ForPath(
                dest => dest.User.CreatedDate,
                opt => opt.MapFrom(
                    src => src.UserInfo.CreatedDate));
    }
}
