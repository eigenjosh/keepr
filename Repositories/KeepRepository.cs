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
        internal Keep GetKeepByUserId(string id)
        {
            Keep savedKeep = _db.QueryFirstOrDefault<Keep>(@"
            SELECT * FROM users WHERE id = @id
            ", new { id });
            if (savedKeep != null)
            {
                return savedKeep;
            }
            return null;
        }
        internal Keep GetAllKeeps()
        {
            Keep keep = _db.QueryFirstOrDefault<Keep>(@"
            SELECT * FROM keeps");
            if(keep != null)
            {
                return keep;
            }
            return null;
        }
    }
}