using System;
using System.Collections.Generic;

namespace Keepr.Models
{
    public class Vault
    {
        public int Id { get; set; }
        public string Name { get; set; }
        private List<Keep> Keeps { get; set; }
    }
}