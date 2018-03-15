using System;
using System.Data;
using Keepr.Models;
using Dapper;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

namespace Keepr.Repositories
{
    public class VaultRepository : DbContext
    {
        public VaultRepository(IDbConnection db) : base(db)
        {
        }
        internal IEnumerable<Vault> GetVaultByUserId(string id)
        {
            var savedVault = _db.Query<Vault>(@"
            SELECT * FROM users WHERE id = @id
            ", new { id });
            if (savedVault != null)
            {
                return savedVault;
            }
            return null;
        }
        internal IEnumerable<Vault> GetAllVaults()
        {
            var vault = _db.Query<Vault>(@"
            SELECT * FROM vaults");
            if(vault != null)
            {
                return vault;
            }
            return null;
        }
    }
}