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
    [Route("[controller]")]
    public class KeepController : Controller
    {
        private readonly KeepRepository _db;

        public KeepController(KeepRepository repo)
        {
            _db = repo;
        }

    }
}