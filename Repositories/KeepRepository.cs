using System;
using System.Data;
using Keepr.Models;
using Dapper;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

namespace Keepr.Repositories
{
    public class KeepRepository : DbContext
    {
        public KeepRepository(IDbConnection db) : base(db)
        {
        }
        internal IEnumerable<Keep> GetKeepByUserId(string id)
        {
            var savedKeep = _db.Query<Keep>(@"
            SELECT * FROM users WHERE id = @id
            ", new { id });
            if (savedKeep != null)
            {
                return savedKeep;
            }
            return null;
        }
        internal IEnumerable<Keep> GetAllKeeps()
        {
            var keep = _db.Query<Keep>(@"
            SELECT * FROM keeps");
            if(keep != null)
            {
                return keep;
            }
            return null;
        }
    }
}