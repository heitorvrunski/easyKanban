import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPageComponent } from './card-page.component';
import { CardPageRoutingModule } from './card-page-routing.module';
import { NgbModule } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { ProjectService } from '../../_services/project.service';
import { AlertifyService } from '../../_services/alertify.service';
import { CardService } from '../../_services/card.service';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { CardCardComponent } from '../card-card/card-card.component';

@NgModule({
    imports: [CommonModule, NgbModule.forRoot(), FormsModule, CardPageRoutingModule],
    providers: [NgbModule, ProjectService, AlertifyService, CardService],
    declarations: [CardPageComponent, CardCardComponent]
})
export class CardPageModule {

};