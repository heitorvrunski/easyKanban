import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectAddModalComponent } from '../project-add-modal/project-add-modal.component';
import { ProjectCardComponent } from './project-card.component';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../_services/project.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ProjectDelModalComponent } from '../project-del-modal/project-del-modal.component';
import { ProjectEditModalComponent } from '../project-edit-modal/project-edit-modal.component';
import { ProjectUserModalModule } from '../project-user-modal/project-user-modal.module';
import { RouterModule } from '../../../../node_modules/@angular/router';

@NgModule({
    imports: [CommonModule, NgbModule.forRoot(), FormsModule, ProjectUserModalModule, RouterModule],
    providers: [NgbModule, ProjectService, AlertifyService],
    exports: [ProjectCardComponent],
    declarations: [ProjectAddModalComponent, ProjectDelModalComponent,
         ProjectCardComponent, ProjectEditModalComponent ]
})
export class ProjectCardModule {}
