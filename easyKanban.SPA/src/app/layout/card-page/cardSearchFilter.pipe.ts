import { Pipe, PipeTransform } from "../../../../node_modules/@angular/core";
import { CardInfo } from "../../_models/cardInfo";

@Pipe({
    name: 'cardSearchFilter'
})
export class CardSearchFilterPipe implements PipeTransform {
    transform(cards: CardInfo[], filter: string) {
        return cards.filter((card) => {
            if (card.cardDescription.toLowerCase().includes(filter.toLowerCase()) 
                || card.cardId.toString().toLowerCase().includes(filter.toLowerCase())
                    || card.userName.toString().toLowerCase().includes(filter.toLowerCase())
                        || card.cardType.toString().toLowerCase().includes(filter.toLowerCase())
                            || card.cardStatus.toString().toLowerCase().includes(filter.toLowerCase()))
                return card;
        })
    }
}