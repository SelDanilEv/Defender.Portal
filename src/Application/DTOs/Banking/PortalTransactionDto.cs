using Defender.Common.Clients.Wallet;

namespace Defender.Portal.Application.DTOs.Banking;

public class PortalTransactionDto
{
    public string? TransactionId { get; set; }
    public TransactionStatus TransactionStatus { get; set; }
    public TransactionType TransactionType { get; set; }
    public Currency Currency { get; set; }

    public int Amount { get; set; }
    public DateTime UtcTransactionDate { get; set; }

    public int FromWallet { get; set; }
    public int ToWallet { get; set; }
}
