namespace Defender.Portal.Application.Enums;

public enum BaseCurrency
{
    USD = 1,
    EUR,
    GEL,
    PLN,
    RUB,
    BYN,
}

public enum Currency
{
    Unknown = 0,
    USD = BaseCurrency.USD,
    EUR = BaseCurrency.EUR,
    GEL = BaseCurrency.GEL,
    PLN = BaseCurrency.PLN,
    RUB = BaseCurrency.RUB,
    BYN = BaseCurrency.BYN,
}

public enum BudgetTrackerSupportedCurrency
{
    ALL = 0,
    USD = BaseCurrency.USD,
    EUR = BaseCurrency.EUR,
    GEL = BaseCurrency.GEL,
    PLN = BaseCurrency.PLN,
    RUB = BaseCurrency.RUB,
    BYN = BaseCurrency.BYN,
}

