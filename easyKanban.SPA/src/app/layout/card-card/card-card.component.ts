import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../../_models/card';
import { CardInfo } from '../../_models/cardInfo';

@Component({
  selector: 'app-card-card',
  templateUrl: './card-card.component.html',
  styleUrls: ['./card-card.component.scss']
})
export class CardCardComponent implements OnInit {
  @Input() card: CardInfo;
  classStyle: string;
  @Input() cardType: string;
  @Input() isOwner: boolean;
  @Output() cardEvent  = new EventEmitter();
  constructor() { }

  ngOnInit() {
    switch (this.cardType.toLowerCase()) {
      case "low":
        this.classStyle = "card bg-light mb-3"
        break;
      case "medium":
        this.classStyle = "card text-black bg-warning mb-3"
        break;
      case "high":
      this.classStyle = "card text-white bg-danger mb-3"
        break;
      default:
        break;
    }
  }

  onCardEvent() {
    this.cardEvent.emit();
  }
}
