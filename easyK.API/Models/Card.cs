using System.ComponentModel.DataAnnotations.Schema;

[Table("Cards")]
public class Card {
    public int CardId { get; set; }
    public string CardStatus { get; set; }
    public string CardDescription { get; set; }
    public string CardType { get; set; }
    public System.DateTime TS { get; set; }

}