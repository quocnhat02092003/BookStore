using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using bookstore_sv.Models;

namespace bookstore_sv.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return Ok();
    }

    public IActionResult Privacy()
    {
        return Ok();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return Ok();
    }
}
