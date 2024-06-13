namespace Defender.Portal.Application.Enums.Transaction;

public enum TransactionStatus
{
    Unknown,
    Queued,
    Failed,
    Proceed,
    QueuedForRevert,
    Reverted,
    Canceled,
}
