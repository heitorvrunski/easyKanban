import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../../_models/card';

@Component({
  selector: 'app-card-card',
  templateUrl: './card-card.component.html',
  styleUrls: ['./card-card.component.scss']
})
export class CardCardComponent implements OnInit {
  @Input() card: Card;
  classStyle: string;
  @Input() cardType: string;
  constructor() { }

  ngOnInit() {
    switch (this.cardType.toLowerCase()) {
      case "low":
        this.classStyle = "card bg-light mb-3"
        break;
      case "medium":
        this.classStyle = "card text-white bg-dark mb-3"
        break;
      case "high":
      this.classStyle = "card text-white bg-danger mb-3"
        break;
      default:
        break;
    }
  }

}
