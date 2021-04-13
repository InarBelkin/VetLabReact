using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Database
{
    public class Theme
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual List<Post> Posts { get; set; }
    }
}
