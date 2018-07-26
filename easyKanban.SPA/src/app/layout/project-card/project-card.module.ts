import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectAddModalComponent } from '../project-add-modal/project-add-modal.component';
import { ProjectCardComponent } from './project-card.component';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../_services/project.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ProjectDelModalComponent } from '../project-del-modal/project-del-modal.component';

@NgModule({
    imports: [CommonModule, NgbModule.forRoot(), FormsModule],
    providers: [NgbModule, ProjectService, AlertifyService],
    exports: [ProjectCardComponent],
    declarations: [ProjectAddModalComponent, ProjectDelModalComponent, ProjectCardComponent]
})
export class ProjectCardModule {}
