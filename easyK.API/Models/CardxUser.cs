using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Cards_x_Users")]
public class CardxUser {
    [Key, Column(Order = 0)]
    public int CardId { get; set; }
    [Key, Column(Order = 1)]
    public int UserId { get; set; }

    

}