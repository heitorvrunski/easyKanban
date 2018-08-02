import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../_services/project.service';
import {Project } from '../../_models/project';
import { AlertifyService } from '../../_services/alertify.service';
import { routerTransition } from '../../router.animations';
import { AuthService } from '../../_services/auth.service';
import { UserInfo } from '../../_models/userinfo';

@Component({
    selector: 'app-project-page',
    templateUrl: './project-page.component.html',
    styleUrls: ['./project-page.component.scss'],
    animations: [routerTransition()]
})
export class ProjectPageComponent implements OnInit {
    projects: Project[] = [];
    userId: number;
    users: UserInfo[] = [];
    newProject: Project = {
        projectId: 0,
        isPublic: true,
        projectName: 'New Project',
        ts : new Date(),
        description: 'Press the button to add a new project!',
        owner: 0
    };
    constructor(private projectService: ProjectService, private alertify: AlertifyService, private authService: AuthService) {
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

    ngOnInit() {
        this.userId = this.authService.getUserId();
        this.getUsers();
    }

    getUsers() {
        this.authService.getUsers().subscribe((users:UserInfo[]) => {
           this.users = users;
        },
         error => { this.alertify.error(error);
         }
       );
       }
}
