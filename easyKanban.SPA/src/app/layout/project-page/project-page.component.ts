import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../_services/project.service';
import {Project } from '../../_models/project';
import { AlertifyService } from '../../_services/alertify.service';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-project-page',
    templateUrl: './project-page.component.html',
    styleUrls: ['./project-page.component.scss'],
    animations: [routerTransition()]
})
export class ProjectPageComponent implements OnInit {
    projects: Project[];
    newProject: Project = {
        projectId: 0,
        isPublic: true,
        projectName: 'New Project',
        ts : new Date(),
        description: 'Press the button to add a new project!'
    };
    constructor(private projectService: ProjectService, private alertify: AlertifyService) {
        this.getProjects();
    }

    getProjects() {
        this.projectService.getProjects().subscribe((projects: Project[]) => {
            this.projects = projects;
            console.log(this.projects);
          }, error => {
            this.alertify.error(error);
          });
        }

    ngOnInit() {}
}
