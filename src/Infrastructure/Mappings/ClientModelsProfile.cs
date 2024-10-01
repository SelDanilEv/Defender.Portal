using Defender.Common.Clients.BudgetTracker;
using Defender.Common.Clients.Identity;
using Defender.Common.Clients.RiskGames;
using Defender.Common.Clients.UserManagement;
using Defender.Common.Clients.Wallet;
using Defender.Common.DB.Pagination;
using Defender.Common.Helpers;
using Defender.Common.Mapping;
using Defender.Portal.Application.DTOs.Auth;
using Defender.Portal.Application.DTOs.Banking;
using Defender.Portal.Application.DTOs.BudgetTracking.DiagramSetup;
using Defender.Portal.Application.DTOs.BudgetTracking.Positions;
using Defender.Portal.Application.DTOs.BudgetTracking.Reviews;
using Defender.Portal.Application.Enums;

namespace Defender.Portal.Infrastructure.Mappings;

public class ClientModelsProfile : BaseMappingProfile
{
    public ClientModelsProfile()
    {
        RegisterIdentityMappings();

        RegisterUserManagementMappings();

        RegisterWalletMappings();

        RegisterRiskGamesMappings();

        RegisterRiskGamesMappings();

        RegisterBudgetTrackerMappings();
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

    private void RegisterBudgetTrackerMappings()
    {
        CreateMap<DiagramSetup, PortalMainDiagramSetup>();

        CreateMap<PositionPagedResult, PagedResult<PortalPosition>>();
        CreateMap<Position, PortalPosition>();
        CreateMap<ReviewedPosition, PortalReviewedPosition>();

        CreateMap<BudgetReviewDtoPagedResult, PagedResult<PortalBudgetReview>>();
        CreateMap<BudgetReviewDto, PortalBudgetReview>()
            .ForMember(
                dest => dest.BaseCurrency,
                opt => opt.MapFrom(
                    src => MappingHelper.MapEnum(
                        src.RatesModel.BaseCurrency, Currency.Unknown)))
            .ForMember(
                dest => dest.Rates,
                opt => opt.MapFrom(
                    src => src.RatesModel.Rates != null
                        ? src.RatesModel.Rates.ToDictionary()
                        : new Dictionary<Currency, decimal>()));

        CreateMap<PortalReviewedPosition, PositionToPublish>();
    }

}

public static class RatesExtensions
{
    public static Dictionary<Currency, decimal> ToDictionary(this Rates rates)
    {
        var dictionary = new Dictionary<Currency, decimal>();

        if (rates != null)
        {
            if (rates.USD != 0.0) dictionary[Currency.USD] = (decimal)rates.USD;
            if (rates.EUR != 0.0) dictionary[Currency.EUR] = (decimal)rates.EUR;
            if (rates.GEL != 0.0) dictionary[Currency.GEL] = (decimal)rates.GEL;
            if (rates.PLN != 0.0) dictionary[Currency.PLN] = (decimal)rates.PLN;
            if (rates.RUB != 0.0) dictionary[Currency.RUB] = (decimal)rates.RUB;
            if (rates.BYN != 0.0) dictionary[Currency.BYN] = (decimal)rates.BYN;
        }

        return dictionary;
    }
}
