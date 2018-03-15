<<<<<<< HEAD
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
    public class VaultsController : Controller
    {
        private readonly VaultRepository _db;

        public VaultsController(VaultRepository repo)
        {
            _db = repo;
        }

        [HttpGet]
        public IEnumerable<Vault> Get()
        {
            return _db.GetAllVaults();
        }
    }
=======
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
    public class VaultsController : Controller
    {
        private readonly VaultRepository _db;

        public VaultsController(VaultRepository repo)
        {
            _db = repo;
        }

        [HttpGet]
        public IEnumerable<Vault> Get()
        {
            return _db.GetAllVaults();
        }
    }
>>>>>>> 727eb598703956965dc2fc884a8ea18511484198
}