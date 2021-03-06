using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Keepr.Models;
using Keepr.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Keepr.Controllers
{
    [Route("api/[controller]")]
    public class KeepsController : Controller
    {
        private readonly KeepRepository _db;

        public KeepsController(KeepRepository repo)
        {
            _db = repo;
        }

        [HttpGet]
        public IEnumerable<Keep> Get()
        {
            return _db.GetAllKeeps();
        }
    }
}