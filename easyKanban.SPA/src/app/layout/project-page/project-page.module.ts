import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectPageRoutingModule } from './project-page-routing.module';
import { ProjectPageComponent } from './project-page.component';
import { ProjectCardModule } from '../project-card/project-card.module';
import { ProjectFilterPipe } from './projectFilter.pipe';

@NgModule({
    imports: [CommonModule, ProjectPageRoutingModule, ProjectCardModule],
    declarations: [ProjectPageComponent, ProjectFilterPipe]
})
export class ProjectPageModule {

};



