import { Pipe, PipeTransform } from "../../../../node_modules/@angular/core";
import { Card } from "../../_models/card";

@Pipe({
    name: 'cardTypeFilter'
})
export class CardTypeFilterPipe implements PipeTransform {
    transform(cards: Card[], filter: string) {
        return cards.filter((card) => {
            if (card.cardStatus.toLowerCase().includes(filter.toLowerCase()))
                return card;
        })
    }
}