import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectUserModalComponent } from './project-user-modal.component';
import { UserFilterPipe } from './userFilter.pipe';


@NgModule({
    imports: [CommonModule],
    exports: [ProjectUserModalComponent],
    declarations: [ProjectUserModalComponent, UserFilterPipe]
})
export class ProjectUserModalModule {
    
};



