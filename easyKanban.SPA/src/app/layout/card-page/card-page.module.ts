import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPageComponent } from './card-page.component';
import { CardPageRoutingModule } from './card-page-routing.module';
import { NgbModule } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { ProjectService } from '../../_services/project.service';
import { AlertifyService } from '../../_services/alertify.service';
import { CardService } from '../../_services/card.service';
import { FormsModule, ReactiveFormsModule } from '../../../../node_modules/@angular/forms';
import { CardCardComponent } from '../card-card/card-card.component';
import { CardTypeFilterPipe } from './cardTypeFilter.pipe';
import { CardAddModalComponent } from '../card-add-modal/card-add-modal.component';
import { CardSearchFilterPipe } from './cardSearchFilter.pipe';
import { CardDelModalComponent } from '../card-del-modal/card-del-modal.component';
import { CardEditModalComponent } from '../card-edit-modal/card-edit-modal.component';

@NgModule({
    imports: [CommonModule, NgbModule.forRoot(), FormsModule, CardPageRoutingModule, FormsModule, ReactiveFormsModule],
    providers: [NgbModule, ProjectService, AlertifyService, CardService],
    declarations: [CardPageComponent, CardCardComponent, CardTypeFilterPipe,
                     CardAddModalComponent, CardDelModalComponent, CardEditModalComponent, CardSearchFilterPipe]
})
export class CardPageModule {

};