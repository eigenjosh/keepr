using System;
using System.Data;
using Keepr.Models;
using Dapper;
using MySql.Data.MySqlClient;

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

    }
}