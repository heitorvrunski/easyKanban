import { Component, OnInit } from '@angular/core';
import { CardService } from '../../_services/card.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Card } from '../../_models/card';
import { AlertifyService } from '../../_services/alertify.service';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
  animations: [routerTransition()]
})
export class CardPageComponent implements OnInit {
  cards: Card[] = [];
  cardClass = "card"
  constructor(private cardService: CardService, 
              private actRoute: ActivatedRoute,
               private alertify: AlertifyService) { }

  ngOnInit() {
    const projectId = this.actRoute.snapshot.params.projectId;
    this.getCards(projectId);
  }

  getCards(projectId: number) {
    this.cardService.getCards(projectId).subscribe((cards: Card[]) => {
        this.cards = cards;
      }, error => {
        this.alertify.error(error);
      });
    }
}
