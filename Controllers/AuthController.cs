using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using VastraAPI.Data;
using VastraAPI.Models;

namespace VastraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // =========================
        // ✅ REGISTER
        // =========================
        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            if (user == null)
                return BadRequest("Invalid data");

            if (string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Password))
                return BadRequest("Username and Password are required");

            // Check existing user
            var exists = _context.Users.Any(x => x.Username == user.Username);
            if (exists)
                return BadRequest("User already exists");

            // (Optional but better) hash password here later
            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(new
            {
                message = "Registered successfully"
            });
        }

        // =========================
        // ✅ LOGIN
        // =========================
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
        {
            if (dto == null)
                return BadRequest("Invalid data");

            if (string.IsNullOrWhiteSpace(dto.Username) || string.IsNullOrWhiteSpace(dto.Password))
                return BadRequest("Username and Password are required");

            var user = _context.Users
                .FirstOrDefault(x =>
                    x.Username == dto.Username &&
                    x.Password == dto.Password
                );

            if (user == null)
                return Unauthorized("Invalid credentials");

            // 🔐 JWT TOKEN
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username)
            };

            var keyString = _config["Jwt:Key"];
            if (string.IsNullOrEmpty(keyString))
                return StatusCode(500, "JWT Key missing in config");

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(keyString)
            );

            var creds = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new
            {
                token = jwt,
                username = user.Username
            });
        }
    }
}