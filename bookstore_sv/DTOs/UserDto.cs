using bookstore_sv.Models;

public class UserDto
{
    public Guid Id { get; set; }
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public UserRole Role { get; set; }
    public string Status { get; set; } = null!;
}