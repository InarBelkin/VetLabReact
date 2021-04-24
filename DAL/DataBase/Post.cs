using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Database
{
    public class Post
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        public int ThemeId { get; set; }
        [ForeignKey("ThemeId")]
        public virtual Theme Theme { get; set; }

        //public string Migrat { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ContentPreview { get; set; }
        public DateTime Date { get; set; }
    }
}
