using System;

namespace Keepr.Models
{
    public class Keep
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string UserId { get; set; }
        public string ImgUrl { get; set; }
    }
}
// id | name  | description    | userId | imgUrl