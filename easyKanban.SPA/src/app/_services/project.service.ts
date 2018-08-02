import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpClient } from '@angular/common/http';
import { Project } from '../_models/project';
import { UserInfo } from '../_models/userinfo';

@Injectable()
export class ProjectService {
    baseUrl = environment.apiUrl;
constructor(private authHttp: HttpClient) { }

getProjects(): Observable<Project[]> {
    return this.authHttp.get<Project[]>(this.baseUrl + 'project/getProjects');
}

addProject(project: Project) {
    return this.authHttp.post(this.baseUrl + 'project/addProject', project);
}

editProject(project: Project) {
    return this.authHttp.post(this.baseUrl + 'project/editProject', project);
}

deleteProject(project: Project) {
    return this.authHttp.post(this.baseUrl + 'project/deleteProject', project);
}

getUsersOfProject(projectId: number): Observable<UserInfo[]> {
    return this.authHttp.get<UserInfo[]>(this.baseUrl + 'project/getUsersOfProject/' + projectId);
}

addUserToProject(userName: string, project: Project) {
    return this.authHttp.post(this.baseUrl + 'project/addUserToProject/' + userName, project);
}

deleteUserToProject(userName: string, project: Project) {
    return this.authHttp.post(this.baseUrl + 'project/deleteUserToProject/' + userName, project);
}

}
