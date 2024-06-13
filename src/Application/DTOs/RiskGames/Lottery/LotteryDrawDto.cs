﻿using Defender.Portal.Application.Enums;

namespace Defender.Portal.Application.DTOs.RiskGames.Lottery;

public record LotteryDrawDto
{
    public long DrawNumber { get; set; }
    public Dictionary<string, string>? PublicNames { get; set; }

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public List<int>? Coefficients { get; set; }

    public List<Currency>? AllowedCurrencies { get; set; }
    public int MinBetValue { get; set; }
    public int MaxBetValue { get; set; }

    public int MinTicketNumber { get; set; }
    public int MaxTicketNumber { get; set; }

    public bool IsActive => StartDate < DateTime.UtcNow && DateTime.UtcNow < EndDate;
}
