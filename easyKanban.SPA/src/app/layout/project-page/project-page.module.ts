import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectPageRoutingModule } from './project-page-routing.module';
import { ProjectPageComponent } from './project-page.component';
import { ProjectCardModule } from '../project-card/project-card.module';
import { ProjectCardComponent } from '../project-card/project-card.component';


@NgModule({
    imports: [CommonModule, ProjectPageRoutingModule, ProjectCardModule],
    declarations: [ProjectPageComponent]
})
export class ProjectPageModule {}
