using Defender.Common.Entities;
using Defender.Portal.Domain.Enums;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Defender.Portal.Domain.Entities;

public class PortalUserActivity : IBaseModel
{
    [BsonId]
    public Guid Id { get; set; }

    public Guid UserId { get; private set; }
    [BsonRepresentation(BsonType.String)]
    public ActivityCode Code { get; private set; }
    public DateTime ActivityDate { get; private set; }
    public string Message { get; private set; } = string.Empty;

    public PortalUserActivity()
    {
        ActivityDate = DateTime.UtcNow;
    }

    public static PortalUserActivity Create(Guid userId, ActivityCode code, string? message)
    {
        return new PortalUserActivity()
        {
            UserId = userId,
            Code = code,
            Message = message ?? string.Empty,
        };
    }
}
