namespace bookstore_sv.Models;

public class Token
{
    public Guid Id { get; set; }
    public string RefreshTokenHash { get; set; } = null!;
    public DateTime RefreshTokenExpiration { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public DateTime? RevokedAt { get; set; }
    public Guid? ReplacedByTokenId { get; set; }
}