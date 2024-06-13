using Defender.Portal.Application.Enums;
using Defender.Portal.Application.Enums.Transaction;

namespace Defender.Portal.Application.DTOs.Banking;

public class PortalTransactionDto
{
    public string? TransactionId { get; set; }
    public string? ParentTransactionId { get; set; }
    public TransactionStatus TransactionStatus { get; set; }
    public TransactionType TransactionType { get; set; }
    public TransactionPurpose TransactionPurpose { get; set; }
    public Currency Currency { get; set; }

    public int Amount { get; set; }
    public DateTime UtcTransactionDate { get; set; }

    public int FromWallet { get; set; }
    public int ToWallet { get; set; }

    public string? Comment { get; set; }
}
