using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace easyK.API.Models
{
    [Table("Projects_x_Users")]
    public class ProjectxUser
    {   
        [Key]
        public int ProjectId { get; set; }
        public int UserId { get; set; }
    }
}