using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace easyK.API.Models
{
    [Table("Projects_x_Users")]
    public class ProjectxUser
    {   
        [Key, Column(Order = 0)]
        public int ProjectId { get; set; }
        [Key, Column(Order = 1)]
        public int UserId { get; set; }
    }
}