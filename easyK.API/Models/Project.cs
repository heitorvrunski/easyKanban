using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace easyK.API.Models
{
    [Table("Projects")]
    public class Project
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public System.DateTime TS { get; set; }
        public bool isPublic { get; set; }
        public string Description { get; set; }
        public int Owner { get; set; }
    }
}