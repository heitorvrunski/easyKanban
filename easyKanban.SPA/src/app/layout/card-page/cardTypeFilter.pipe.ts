import { Pipe, PipeTransform } from "../../../../node_modules/@angular/core";
import { CardInfo } from "../../_models/cardInfo";

@Pipe({
    name: 'cardTypeFilter'
})
export class CardTypeFilterPipe implements PipeTransform {
    transform(cards: CardInfo[], filter: string) {
        return cards.filter((card) => {
            if (card.cardStatus.toLowerCase().includes(filter.toLowerCase()))
                return card;
        })
    }
}