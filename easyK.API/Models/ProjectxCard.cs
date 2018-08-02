using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Projects_x_Cards")]
public class ProjectxCard {
    [Key, Column(Order = 0)]
    public int CardId { get; set; }
    [Key, Column(Order = 1)]
    public int ProjectId { get; set; }
}