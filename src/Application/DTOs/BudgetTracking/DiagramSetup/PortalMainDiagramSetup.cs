using Defender.Portal.Application.Enums;

namespace Defender.Portal.Application.DTOs.BudgetTracking.DiagramSetup;

public class PortalMainDiagramSetup
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }

    public DateOnly EndDate { get; set; }
    public int LastMonths { get; set; }

    public BudgetTrackerSupportedCurrency MainCurrency { get; set; }
}
