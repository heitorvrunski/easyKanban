import { Component, OnInit } from '@angular/core';
import { CardService } from '../../_services/card.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Card } from '../../_models/card';
import { AlertifyService } from '../../_services/alertify.service';
import { routerTransition } from '../../router.animations';
import { CardInfo } from '../../_models/cardInfo';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
  animations: [routerTransition()]
})
export class CardPageComponent implements OnInit {
  cards: CardInfo[] = [];
  userId: number;
  cardClass = "card";
  projectId: number;
  constructor(private cardService: CardService, 
              private actRoute: ActivatedRoute,
               private alertify: AlertifyService,
                private authService: AuthService) { }

  ngOnInit() {
    this.projectId = this.actRoute.snapshot.params.projectId;
    this.getCards(this.projectId);
    this.userId = this.authService.getUserId();
  }

  getCards(projectId: number) {
    this.cardService.getCards(projectId).subscribe((cards: CardInfo[]) => {
        this.cards = cards;
      }, error => {
        this.alertify.error(error);
      });
    }
}
