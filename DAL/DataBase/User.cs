using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace DAL.Database
{
    public class User: IdentityUser
    {
        //public int Id { get; set; }
        //public string Name { get; set; }
        //public string Password { get; set; }
        public virtual List<Post> Posts { get; set; }
        //пока больше ничего
    }
}
